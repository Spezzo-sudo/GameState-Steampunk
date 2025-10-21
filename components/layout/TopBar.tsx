import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ResourceType } from '../../types';
import ProgressBar from '../ui/ProgressBar';

// Hilfsfunktion zur Formatierung von Zahlen im deutschen Format.
const formatNumber = (num: number) => {
    return Math.floor(num).toLocaleString('de-DE');
};

/**
 * Eine Komponente zur Anzeige einer einzelnen Ressource mit ihrem aktuellen Wert,
 * ihrer Kapazität und einem Fortschrittsbalken.
 */
const ResourceDisplay: React.FC<{
    type: ResourceType | 'Kesseldruck';
    current: number;
    capacity: number;
}> = ({ type, current, capacity }) => {
    const progress = capacity > 0 ? (current / capacity) * 100 : 0;
    const colorClass = current > capacity ? 'text-red-500' : 'text-yellow-400';
    
    return (
        <div className="w-1/4 px-2">
            <div className="flex justify-between items-baseline">
                <span className="font-cinzel text-lg">{type}</span>
                <span className={`text-sm ${colorClass}`}>
                    {formatNumber(current)} / {formatNumber(capacity)}
                </span>
            </div>
            <ProgressBar progress={progress} />
        </div>
    );
};

/**
 * Die obere Leiste der Benutzeroberfläche.
 * Zeigt die aktuellen Ressourcen des Spielers (Orichalkum, Fokuskristalle, Vitriol)
 * und den Kesseldruck (Energie) an.
 */
const TopBar: React.FC = () => {
    const resources = useGameStore((state) => state.resources);
    const storage = useGameStore((state) => state.storage);
    const kesseldruck = useGameStore((state) => state.kesseldruck);

    return (
        <header className="w-full steampunk-glass-dark p-2 flex justify-around items-center h-20 shrink-0">
            <ResourceDisplay
                type={ResourceType.Orichalkum}
                current={resources[ResourceType.Orichalkum]}
                capacity={storage[ResourceType.Orichalkum]}
            />
            <ResourceDisplay
                type={ResourceType.Fokuskristalle}
                current={resources[ResourceType.Fokuskristalle]}
                capacity={storage[ResourceType.Fokuskristalle]}
            />
            <ResourceDisplay
                type={ResourceType.Vitriol}
                current={resources[ResourceType.Vitriol]}
                capacity={storage[ResourceType.Vitriol]}
            />
             <ResourceDisplay
                type="Kesseldruck"
                current={kesseldruck.current}
                capacity={kesseldruck.capacity}
            />
        </header>
    );
};

export default TopBar;
