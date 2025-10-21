import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  ResourceType,
  Resources,
  Storage,
  View,
  Building,
  Research,
  BuildQueueItem,
} from '../types';
import {
  INITIAL_RESOURCES,
  INITIAL_STORAGE,
  BUILDINGS,
  RESEARCH,
  TICK_INTERVAL,
  SERVER_SPEED,
} from '../constants';

type GameState = {
  resources: Resources;
  storage: Storage;
  kesseldruck: {
    current: number;
    capacity: number;
  };
  buildings: Record<string, number>;
  research: Record<string, number>;
  activeView: View;
  buildQueue: BuildQueueItem[];
};

type GameActions = {
  setView: (view: View) => void;
  gameTick: () => void;
  canAfford: (cost: Resources) => boolean;
  getUpgradeCost: (entity: Building | Research, level: number) => Resources;
  getBuildTime: (cost: Resources) => number;
  startUpgrade: (entity: Building | Research) => void;
};

export const useGameStore = create<GameState & GameActions>()(
  immer((set, get) => ({
    resources: INITIAL_RESOURCES,
    storage: INITIAL_STORAGE,
    kesseldruck: {
      current: 0,
      capacity: 0,
    },
    buildings: {
      orichalkumMine: 1,
      fokuskristallSynthesizer: 1,
      vitriolHarvester: 0,
      kesseldruckRegulator: 1,
    },
    research: {},
    activeView: View.Uebersicht,
    buildQueue: [],

    setView: (view) => set({ activeView: view }),
    
    canAfford: (cost) => {
      const { resources } = get();
      return (
        resources[ResourceType.Orichalkum] >= cost[ResourceType.Orichalkum] &&
        resources[ResourceType.Fokuskristalle] >= cost[ResourceType.Fokuskristalle] &&
        resources[ResourceType.Vitriol] >= cost[ResourceType.Vitriol]
      );
    },

    getUpgradeCost: (entity, level) => {
      const cost: Resources = {
        [ResourceType.Orichalkum]: 0,
        [ResourceType.Fokuskristalle]: 0,
        [ResourceType.Vitriol]: 0,
      };
      const multiplier = Math.pow(entity.costMultiplier, level);
      cost[ResourceType.Orichalkum] = Math.floor(entity.baseCost[ResourceType.Orichalkum] * multiplier);
      cost[ResourceType.Fokuskristalle] = Math.floor(entity.baseCost[ResourceType.Fokuskristalle] * multiplier);
      cost[ResourceType.Vitriol] = Math.floor(entity.baseCost[ResourceType.Vitriol] * multiplier);
      return cost;
    },
    
    getBuildTime: (cost) => {
        const totalCost = cost.Orichalkum + cost.Fokuskristalle * 2 + cost.Vitriol * 3;
        const timeInSeconds = Math.max(5, Math.floor(totalCost / 10 / SERVER_SPEED));
        return timeInSeconds;
    },

    startUpgrade: (entity) => {
      set((state) => {
        const isBuilding = 'baseProduction' in entity || entity.id === 'kesseldruckRegulator';
        const currentLevel = isBuilding ? state.buildings[entity.id] || 0 : state.research[entity.id] || 0;
        
        const lastQueuedLevel = state.buildQueue
            .filter(item => item.entityId === entity.id)
            .reduce((max, item) => Math.max(max, item.level), currentLevel);

        const targetLevel = lastQueuedLevel + 1;

        const cost = get().getUpgradeCost(entity, targetLevel - 1);
        if (!get().canAfford(cost) || state.buildQueue.length >= 3) return;

        state.resources[ResourceType.Orichalkum] -= cost[ResourceType.Orichalkum];
        state.resources[ResourceType.Fokuskristalle] -= cost[ResourceType.Fokuskristalle];
        state.resources[ResourceType.Vitriol] -= cost[ResourceType.Vitriol];
        
        const buildTime = get().getBuildTime(cost);
        const lastItemEndTime = state.buildQueue.length > 0 ? state.buildQueue[state.buildQueue.length - 1].endTime : Date.now();
        const startTime = lastItemEndTime;
        const endTime = startTime + buildTime * 1000;
        
        state.buildQueue.push({ entityId: entity.id, level: targetLevel, startTime, endTime });
      });
    },

    gameTick: () => {
      set((state) => {
        // 1. Process build queue
        const now = Date.now();
        const finishedItems = state.buildQueue.filter((item) => now >= item.endTime);
        
        if (finishedItems.length > 0) {
            finishedItems.forEach(item => {
                const entity = BUILDINGS[item.entityId] || RESEARCH[item.entityId];
                if (!entity) {
                  console.error(`Could not find entity with ID: ${item.entityId} in build queue.`);
                  return; // Skip this item
                }
                const isBuilding = 'baseProduction' in entity || entity.id === 'kesseldruckRegulator';
                if (isBuilding) {
                    state.buildings[item.entityId] = item.level;
                } else {
                    state.research[item.entityId] = item.level;
                }
            });
            state.buildQueue = state.buildQueue.filter((item) => now < item.endTime);
        }

        // 2. Calculate energy production and consumption
        const kesselLevel = state.buildings.kesseldruckRegulator || 0;
        const kesselRegulator = BUILDINGS.kesseldruckRegulator;
        const energyCapacity = kesselLevel > 0 ? Math.floor(30 * Math.pow(kesselRegulator.productionMultiplier!, kesselLevel)) : 0;
        
        let energyConsumption = 0;
        Object.values(BUILDINGS).forEach(b => {
          if (b.baseEnergyConsumption && state.buildings[b.id] > 0) {
            energyConsumption += Math.floor(b.baseEnergyConsumption * Math.pow(b.energyConsumptionMultiplier!, state.buildings[b.id]));
          }
        });
        state.kesseldruck.capacity = energyCapacity;
        state.kesseldruck.current = energyConsumption;

        const productionEfficiency = Math.min(1, energyCapacity / (energyConsumption || 1));


        // 3. Calculate and add resources
        Object.values(BUILDINGS).forEach((building) => {
          const level = state.buildings[building.id];
          if (level && building.baseProduction) { // level > 0
            const levelMultiplier = Math.pow(building.productionMultiplier!, level - 1);
            
            const updateResource = (resourceType: ResourceType) => {
                const baseProd = building.baseProduction![resourceType];
                if (baseProd > 0) {
                    // Formula based on spec: prod = base * level * mult^(level-1)
                    const productionPerHour = baseProd * level * levelMultiplier;
                    const productionPerSecond = (productionPerHour / 3600) * SERVER_SPEED * productionEfficiency;
                    state.resources[resourceType] = Math.min(state.storage[resourceType], state.resources[resourceType] + productionPerSecond);
                }
            };
            
            updateResource(ResourceType.Orichalkum);
            updateResource(ResourceType.Fokuskristalle);
            updateResource(ResourceType.Vitriol);
          }
        });
      });
    },
  }))
);