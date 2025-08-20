
import React from 'react';
import type { ArchitectureItem } from '../types';

interface ArchitectureCardProps {
  item: ArchitectureItem;
  onLearnMore: () => void;
}

const ArchitectureCard: React.FC<ArchitectureCardProps> = ({ item, onLearnMore }) => {
  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex flex-col items-start h-full group transition-all duration-300 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1"
    >
      <div className="mb-4">
        {item.icon}
      </div>
      <h3 className="text-lg font-bold text-gray-100 mb-1">{item.component}</h3>
      <p className="text-sm text-sky-300 font-mono mb-4">{item.tech}</p>
      
      <div className="flex-grow"></div> 
      
      <button
        onClick={onLearnMore}
        className="mt-auto text-sm font-semibold text-gray-300 bg-gray-700/50 px-4 py-2 rounded-md transition-all duration-300 hover:bg-sky-500 hover:text-white"
      >
        Learn More
      </button>
    </div>
  );
};

export default ArchitectureCard;
