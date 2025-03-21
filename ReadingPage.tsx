import React from 'react';
import { ChevronLeft, Play, Heart, Share2, MoreHorizontal } from 'lucide-react';

interface ReadingPageProps {
  onBack: () => void;
}

const ReadingPage = ({ onBack }: ReadingPageProps) => {
  const verses = [
    {
      gurmukhi: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ",
      translation: "One Universal Creator God, The Name Is Truth",
      duration: "2:45"
    },
    {
      gurmukhi: "ਨਿਰਭਉ ਨਿਰਵੈਰੁ",
      translation: "Fearless, Without hatred",
      duration: "3:12"
    },
    {
      gurmukhi: "ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ",
      translation: "Timeless Form, Unborn, Self-Existent",
      duration: "4:01"
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-amber-900/40 to-[#121212]">
      <div className="sticky top-0 z-10 bg-transparent p-4">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 pt-4">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1502570149819-b2260483d302?q=80&w=300"
            alt="Japji Sahib"
            className="w-64 h-64 shadow-2xl rounded-lg mb-6"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">ਜਪੁਜੀ ਸਾਹਿਬ</h1>
            <p className="text-sm text-neutral-400 mb-2">Morning prayer composed by Guru Nanak Dev Ji</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-white font-medium">Ratwara Sahib</span>
              <span className="text-neutral-400">• 40 verses</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <Heart className="w-7 h-7 text-[#1ed760]" />
          <button className="w-14 h-14 rounded-full bg-[#1ed760] flex items-center justify-center shadow-lg">
            <Play className="w-8 h-8 text-black" />
          </button>
          <Share2 className="w-7 h-7 text-neutral-400" />
        </div>

        <div className="space-y-4">
          {verses.map((verse, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg active:bg-neutral-800/40"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{verse.gurmukhi}</p>
                <p className="text-xs text-neutral-400 truncate">{verse.translation}</p>
              </div>
              <MoreHorizontal className="w-5 h-5 text-neutral-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;