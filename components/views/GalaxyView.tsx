import React, { useState } from 'react';
import { Planet } from '../../types';
import GalaxyActionModal from './GalaxyActionModal';

const mockPlanets: Planet[] = [
    { coordinates: '1:1:1', name: 'Chronos Prime', player: 'Du', isOwnPlanet: true },
    { coordinates: '1:1:2', name: 'Rhea', player: 'Imperator Zurg', isOwnPlanet: false },
    { coordinates: '1:1:3', name: 'Helios', player: 'Königin Amidala', isOwnPlanet: false },
    { coordinates: '1:1:4', name: 'Ares VII', player: 'Gilde der Navigatoren', isOwnPlanet: false },
    { coordinates: '1:1:5', name: 'Veridian III', player: 'Lord Vraxx', isOwnPlanet: false },
];

const GalaxyView: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

    const handleActionClick = (planet: Planet) => {
        if (!planet.isOwnPlanet) {
            setSelectedPlanet(planet);
        }
    };

    const handleCloseModal = () => {
        setSelectedPlanet(null);
    };

    return (
        <div>
            <h2 className="text-4xl font-cinzel text-yellow-400 mb-6 border-b-2 border-yellow-800/50 pb-2">Galaxie</h2>
            <div className="steampunk-glass steampunk-border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black bg-opacity-30">
                        <tr>
                            <th className="p-4 font-cinzel text-yellow-400">Koordinaten</th>
                            <th className="p-4 font-cinzel text-yellow-400">Planetenname</th>
                            <th className="p-4 font-cinzel text-yellow-400">Spieler</th>
                            <th className="p-4 font-cinzel text-yellow-400 text-center">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockPlanets.map((planet) => (
                            <tr key={planet.coordinates} className="border-t border-yellow-800/30 hover:bg-yellow-800/10">
                                <td className="p-4">{planet.coordinates}</td>
                                <td className="p-4">{planet.name}</td>
                                <td className={`p-4 ${planet.isOwnPlanet ? 'text-green-400 font-semibold' : ''}`}>{planet.player}</td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => handleActionClick(planet)} 
                                        disabled={planet.isOwnPlanet}
                                        className="px-4 py-2 text-sm font-cinzel steampunk-button rounded-md"
                                    >
                                        Aktionen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedPlanet && <GalaxyActionModal planet={selectedPlanet} onClose={handleCloseModal} />}
        </div>
    );
};

export default GalaxyView;
