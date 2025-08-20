
import React, { useState, useCallback } from 'react';
import { ARCHITECTURE_DATA } from './data/architectureData';
import { ArchitectureItem } from './types';
import ArchitectureCard from './components/ArchitectureCard';
import DetailModal from './components/DetailModal';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ArchitectureItem | null>(null);

  const handleOpenModal = useCallback((item: ArchitectureItem) => {
    setSelectedItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
            VerseFlow
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-gray-400">
            A Modern Software Architecture Proposal
          </p>
        </header>

        {ARCHITECTURE_DATA.map((section) => (
          <section key={section.title} className="mb-16">
            <div className="flex items-center mb-6">
              <span className={`h-3 w-3 ${section.color} rounded-full mr-3`}></span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-200">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.items.map((item) => (
                <ArchitectureCard
                  key={item.id}
                  item={item}
                  onLearnMore={() => handleOpenModal(item)}
                />
              ))}
            </div>
          </section>
        ))}

        {selectedItem && (
          <DetailModal item={selectedItem} onClose={handleCloseModal} />
        )}
      </main>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
