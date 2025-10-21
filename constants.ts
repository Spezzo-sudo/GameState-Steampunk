
import { Building, Planet, PlanetBiome, Research, ResourceType, Resources } from './types';

/**
 * Starting resource amounts granted to every player at account creation.
 */
export const INITIAL_RESOURCES: Resources = {
  [ResourceType.Orichalkum]: 500,
  [ResourceType.Fokuskristalle]: 500,
  [ResourceType.Vitriol]: 100,
};

/**
 * Storage capacities for the initial colony warehouses.
 */
export const INITIAL_STORAGE: Resources = {
  [ResourceType.Orichalkum]: 10000,
  [ResourceType.Fokuskristalle]: 10000,
  [ResourceType.Vitriol]: 5000,
};

/**
 * Definitions of all constructible buildings with their economy parameters.
 */
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
    baseEnergySupply: 30,
    energySupplyMultiplier: 1.12,
  },
};

/**
 * Definitions of all research topics available in the MVP build.
 */
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

/**
 * Duration of a simulation tick in milliseconds.
 */
export const TICK_INTERVAL = 1000; // 1 second

/**
 * Global server speed modifier applied to production and build times.
 */
export const SERVER_SPEED = 1;

/**
 * Default starting levels for all buildings on a new colony.
 */
export const INITIAL_BUILDING_LEVELS: Record<string, number> = {
  orichalkumMine: 1,
  fokuskristallSynthesizer: 1,
  vitriolHarvester: 0,
  kesseldruckRegulator: 1,
};

/**
 * Default starting levels for all unlocked research topics.
 */
export const INITIAL_RESEARCH_LEVELS: Record<string, number> = {};

/**
 * Maximum number of entries allowed in the build queue simultaneously.
 */
export const MAX_BUILD_QUEUE_LENGTH = 3;

/**
 * Fixed set of preview planets representing the active Sonnensystem für die Tabellen- und Hex-Ansicht.
 */
export const GALAXY_SNAPSHOT: Planet[] = [
  {
    coordinates: '1:1:1',
    name: 'Chronos Prime',
    player: 'Du',
    isOwnPlanet: true,
    biome: PlanetBiome.Messingwueste,
    axial: { q: 0, r: 0 },
  },
  {
    coordinates: '1:1:2',
    name: 'Rhea',
    player: 'Imperator Zurg',
    isOwnPlanet: false,
    biome: PlanetBiome.Aethermoor,
    axial: { q: 1, r: 0 },
  },
  {
    coordinates: '1:1:3',
    name: 'Helios',
    player: 'Königin Amidala',
    isOwnPlanet: false,
    biome: PlanetBiome.Dampfarchipel,
    axial: { q: 1, r: -1 },
  },
  {
    coordinates: '1:1:4',
    name: 'Ares VII',
    player: 'Gilde der Navigatoren',
    isOwnPlanet: false,
    biome: PlanetBiome.Uhrwerksteppe,
    axial: { q: 0, r: 1 },
  },
  {
    coordinates: '1:1:5',
    name: 'Veridian III',
    player: 'Lord Vraxx',
    isOwnPlanet: false,
    biome: PlanetBiome.Glimmerkluft,
    axial: { q: -1, r: 1 },
  },
  {
    coordinates: '1:2:1',
    name: 'Aetherion',
    player: 'Haus Zephyr',
    isOwnPlanet: false,
    biome: PlanetBiome.Aethermoor,
    axial: { q: 2, r: -1 },
  },
  {
    coordinates: '1:2:2',
    name: 'Ferrum',
    player: 'Konsortium Vulcanus',
    isOwnPlanet: false,
    biome: PlanetBiome.Messingwueste,
    axial: { q: -2, r: 2 },
  },
  {
    coordinates: '1:2:3',
    name: 'Aurora',
    player: 'Kapitän Selene',
    isOwnPlanet: false,
    biome: PlanetBiome.Glimmerkluft,
    axial: { q: 0, r: -1 },
  },
  {
    coordinates: '1:2:4',
    name: 'Nimbus Reach',
    player: 'Ätherpakt Helion',
    isOwnPlanet: false,
    biome: PlanetBiome.Dampfarchipel,
    axial: { q: -1, r: 0 },
  },
  {
    coordinates: '1:2:5',
    name: 'Cinderfall',
    player: 'Schmiedeclan Borr',
    isOwnPlanet: false,
    biome: PlanetBiome.Uhrwerksteppe,
    axial: { q: 2, r: 0 },
  },
];

/**
 * Visual theme tokens for alle Planetenbiome inklusive Label und Farbcodes für die Hex-Map.
 */
export const BIOME_STYLES: Record<PlanetBiome, { label: string; fill: string; stroke: string }> = {
  [PlanetBiome.Messingwueste]: {
    label: 'Messingwüste',
    fill: '#b8860b',
    stroke: '#f0d68a',
  },
  [PlanetBiome.Aethermoor]: {
    label: 'Äthermoor',
    fill: '#3a7f8c',
    stroke: '#8be0f2',
  },
  [PlanetBiome.Dampfarchipel]: {
    label: 'Dampfarchipel',
    fill: '#6c4f3d',
    stroke: '#d4b08c',
  },
  [PlanetBiome.Uhrwerksteppe]: {
    label: 'Uhrwerksteppe',
    fill: '#44663b',
    stroke: '#a5e267',
  },
  [PlanetBiome.Glimmerkluft]: {
    label: 'Glimmerkluft',
    fill: '#593f7d',
    stroke: '#c6a4ff',
  },
};
