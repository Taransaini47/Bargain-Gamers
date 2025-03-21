import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface Track {
  title: string;
  subtitle: string;
  image: string;
  audio: string;
}

interface SearchPageProps {
  onPlayTrack: (track: Track, index: number) => void;
  onTrackClick: () => void;
  tracks: Track[];
}

const SearchPage = ({ onPlayTrack, onTrackClick, tracks }: SearchPageProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'film', label: 'Film' }
  ];

  const handleTrackClick = (track: Track, index: number) => {
    setClickedIndex(index);
    onPlayTrack(track, index);
    onTrackClick();
    
    // Reset animation after it completes
    setTimeout(() => {
      setClickedIndex(null);
    }, 300);
  };

  return (
    <div className="min-h-full">
      {/* Fixed Navigation Tabs */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-2 flex gap-2 bg-black">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-[#1ed760] text-black' : 'bg-neutral-800 text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {tracks.map((track, index) => (
          <div 
            key={index}
            className="relative group cursor-pointer text-center"
            onClick={() => handleTrackClick(track, index)}
          >
            <div className={`aspect-square w-32 mx-auto transition-all duration-300 ${clickedIndex === index ? 'opacity-80 scale-90' : ''}`}>
              <img 
                src={track.image} 
                alt={track.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm truncate">{track.title}</h3>
              <p className="text-xs text-neutral-400 truncate">{track.subtitle}</p>
            </div>
            <button className="absolute bottom-12 right-2 opacity-0 group-hover:opacity-100 p-3 rounded-full bg-[#1ed760] shadow-lg transition-opacity">
              <Play className="w-4 h-4 text-black" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;