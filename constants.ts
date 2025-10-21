
import { Building, Research, ResourceType, Resources } from './types';

export const INITIAL_RESOURCES: Resources = {
  [ResourceType.Orichalkum]: 500,
  [ResourceType.Fokuskristalle]: 500,
  [ResourceType.Vitriol]: 100,
};

export const INITIAL_STORAGE: Resources = {
  [ResourceType.Orichalkum]: 10000,
  [ResourceType.Fokuskristalle]: 10000,
  [ResourceType.Vitriol]: 5000,
};

export const BUILDINGS: Record<string, Building> = {
  orichalkumMine: {
    id: 'orichalkumMine',
    name: 'Orichalkum-Mine',
    description: 'Fördert Orichalkum, das primäre Baumaterial für Gebäude und Schiffe.',
    baseCost: { [ResourceType.Orichalkum]: 60, [ResourceType.Fokuskristalle]: 15, [ResourceType.Vitriol]: 0 },
    costMultiplier: 1.5,
    baseProduction: { [ResourceType.Orichalkum]: 20, [ResourceType.Fokuskristalle]: 0, [ResourceType.Vitriol]: 0 },
    productionMultiplier: 1.12,
    baseEnergyConsumption: 10,
    energyConsumptionMultiplier: 1.1,
  },
  fokuskristallSynthesizer: {
    id: 'fokuskristallSynthesizer',
    name: 'Fokuskristall-Synthesizer',
    description: 'Synthetisiert Fokuskristalle, die für fortschrittliche Elektronik und Forschung benötigt werden.',
    baseCost: { [ResourceType.Orichalkum]: 48, [ResourceType.Fokuskristalle]: 24, [ResourceType.Vitriol]: 0 },
    costMultiplier: 1.6,
    baseProduction: { [ResourceType.Orichalkum]: 0, [ResourceType.Fokuskristalle]: 10, [ResourceType.Vitriol]: 0 },
    productionMultiplier: 1.13,
    baseEnergyConsumption: 12,
    energyConsumptionMultiplier: 1.1,
  },
  vitriolHarvester: {
    id: 'vitriolHarvester',
    name: 'Vitriol-Harvester',
    description: 'Gewinnt Vitriol-Gas, den Treibstoff für Flotten und schwere Maschinen.',
    baseCost: { [ResourceType.Orichalkum]: 225, [ResourceType.Fokuskristalle]: 75, [ResourceType.Vitriol]: 0 },
    costMultiplier: 1.5,
    baseProduction: { [ResourceType.Orichalkum]: 0, [ResourceType.Fokuskristalle]: 0, [ResourceType.Vitriol]: 5 },
    productionMultiplier: 1.14,
    baseEnergyConsumption: 20,
    energyConsumptionMultiplier: 1.1,
  },
  kesseldruckRegulator: {
    id: 'kesseldruckRegulator',
    name: 'Kesseldruck-Regulator',
    description: 'Erzeugt den notwendigen Kesseldruck (Energie) für den Betrieb aller Anlagen auf dem Planeten.',
    baseCost: { [ResourceType.Orichalkum]: 75, [ResourceType.Fokuskristalle]: 30, [ResourceType.Vitriol]: 0 },
    costMultiplier: 1.7,
    baseProduction: { [ResourceType.Orichalkum]: 0, [ResourceType.Fokuskristalle]: 0, [ResourceType.Vitriol]: 0 }, // Energy production is special
    productionMultiplier: 1.1,
  },
};

export const RESEARCH: Record<string, Research> = {
  aetherdynamik: {
    id: 'aetherdynamik',
    name: 'Ätherdynamik',
    description: 'Verbessert die Effizienz von Antrieben und steigert die Fluggeschwindigkeit aller Schiffe.',
    baseCost: { [ResourceType.Orichalkum]: 200, [ResourceType.Fokuskristalle]: 400, [ResourceType.Vitriol]: 100 },
    costMultiplier: 2,
  },
  panzerungstechnik: {
    id: 'panzerungstechnik',
    name: 'Panzerungstechnik',
    description: 'Verstärkt die Hüllen von Schiffen und Verteidigungsanlagen.',
    baseCost: { [ResourceType.Orichalkum]: 800, [ResourceType.Fokuskristalle]: 200, [ResourceType.Vitriol]: 0 },
    costMultiplier: 2,
  },
  spionagetechnologie: {
    id: 'spionagetechnologie',
    name: 'Spionagetechnologie',
    description: 'Ermöglicht den Bau von Spionagesonden und verbessert die Informationsgewinnung.',
    baseCost: { [ResourceType.Orichalkum]: 200, [ResourceType.Fokuskristalle]: 1000, [ResourceType.Vitriol]: 200 },
    costMultiplier: 2,
  },
};

export const TICK_INTERVAL = 1000; // 1 second
export const SERVER_SPEED = 1;
