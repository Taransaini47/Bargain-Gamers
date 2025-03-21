import React from 'react';
import { ChevronLeft, Play, Pause } from 'lucide-react';

interface PlayerPageProps {
  track: {
    title: string;
    subtitle: string;
    image: string;
    audio: string;
  };
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  formatTime: (time: number) => string;
}

const PlayerPage = ({ 
  track, 
  isPlaying, 
  currentTime, 
  duration, 
  onTogglePlay, 
  onTimeChange, 
  onBack,
  formatTime
}: PlayerPageProps) => {
  return (
    <div className="min-h-full bg-gradient-to-b from-amber-900/40 to-[#121212] px-4 pt-4 pb-20">
      {/* Back button */}
      <div className="sticky top-0 z-10 bg-transparent mb-6">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Track info and cover art */}
      <div className="flex flex-col items-center mb-8">
        <img 
          src={track.image.replace('w=100', 'w=300')}
          alt={track.title}
          className="w-64 h-64 shadow-2xl rounded-lg mb-6"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">{track.title}</h1>
          <p className="text-sm text-neutral-400">{track.subtitle}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={onTimeChange}
          className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#1ed760]"
        />
        <div className="flex justify-between text-xs text-neutral-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play/Pause button */}
      <div className="flex justify-center">
        <button 
          onClick={onTogglePlay}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-black" />
          ) : (
            <Play className="w-8 h-8 text-black" fill="black" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PlayerPage;