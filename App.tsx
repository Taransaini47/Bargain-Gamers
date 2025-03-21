import React, { useState, useRef, useEffect } from 'react';
import { Home, Search, Library, Play, Pause, User, ChevronLeft } from 'lucide-react';
import SearchPage from './components/SearchPage';
import ReadingPage from './components/ReadingPage';
import SettingsPage from './components/SettingsPage';
import EbookPage from './components/EbookPage';
import PlayerPage from './components/PlayerPage';

function App() {
  const [currentPage, setCurrentPage] = useState('search');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const tracks = [
    {
      title: "ਜਪੁਜੀ ਸਾਹਿਬ",
      subtitle: "Morning Prayer",
      image: "https://images.unsplash.com/photo-1502570149819-b2260483d302?q=80&w=100",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "ਸੁਖਮਨੀ ਸਾਹਿਬ",
      subtitle: "Pearl of Peace",
      image: "https://images.unsplash.com/photo-1604608684575-0478ddb56d48?q=80&w=100",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "ਰਹਰਾਸ ਸਾਹਿਬ",
      subtitle: "Evening Prayer",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=100",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      title: "ਕੀਰਤਨ ਸੋਹਿਲਾ",
      subtitle: "Night Prayer",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=100",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      title: "ਆਸਾ ਦੀ ਵਾਰ",
      subtitle: "Morning Hymn",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=100",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      title: "ਅਨੰਦ ਸਾਹਿਬ",
      subtitle: "Prayer of Bliss",
      image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?q=80&w=100",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(tracks[currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    
    const handleAudioEnd = () => {
      // Play next track
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(tracks[nextIndex], nextIndex);
    };
    
    const handleAudioPlay = () => setIsPlaying(true);
    const handleAudioPause = () => setIsPlaying(false);

    // Set initial data when metadata is loaded
    audio.addEventListener('loadedmetadata', setAudioData);
    
    // Update time as audio plays
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Handle play state changes
    audio.addEventListener('ended', handleAudioEnd);
    audio.addEventListener('play', handleAudioPlay);
    audio.addEventListener('pause', handleAudioPause);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleAudioEnd);
      audio.removeEventListener('play', handleAudioPlay);
      audio.removeEventListener('pause', handleAudioPause);
    };
  }, [currentTrackIndex, tracks]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
    }
  };

  const playTrack = (track: typeof currentTrack, index: number) => {
    if (!audioRef.current) return;
    
    // Set new track
    setCurrentTrack(track);
    setCurrentTrackIndex(index);
    
    // Reset player state
    setCurrentTime(0);
    
    // Let the useEffect handle play state after metadata loads
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play()
          .catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    }, 100);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const openPlayerPage = () => {
    setCurrentPage('player');
  };

  return (
    <div className={`h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} text-white flex flex-col`}>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.audio} 
        preload="metadata"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pb-32">
          {currentPage === 'search' && <SearchPage onPlayTrack={(track, index) => playTrack(track, index)} tracks={tracks} onTrackClick={openPlayerPage} />}
          {currentPage === 'reading' && <ReadingPage onBack={() => setCurrentPage('search')} />}
          {currentPage === 'settings' && <SettingsPage onBack={() => setCurrentPage('search')} />}
          {currentPage === 'library' && <EbookPage onBack={() => setCurrentPage('search')} />}
          {currentPage === 'player' && (
            <PlayerPage 
              track={currentTrack} 
              isPlaying={isPlaying} 
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={togglePlay}
              onTimeChange={handleTimeChange}
              onBack={() => setCurrentPage('search')}
              formatTime={formatTime}
            />
          )}
          
          {/* Now Playing Mini Player - Only visible on home page */}
          {currentPage === 'search' && (
            <div 
              className="fixed bottom-14 left-[6%] right-[6%] bg-black/40 backdrop-blur-lg rounded-xl mx-auto overflow-hidden cursor-pointer"
              onClick={openPlayerPage}
            >
              <div className="flex items-center gap-3 p-3">
                <img 
                  src={currentTrack.image}
                  alt="Current Reading"
                  className="w-10 h-10 rounded-sm object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[13px] truncate">{currentTrack.title}</h4>
                  <p className="text-[11px] text-neutral-400 truncate">{currentTrack.subtitle}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-black" />
                  ) : (
                    <Play className="w-4 h-4 text-black" fill="black" />
                  )}
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="px-3 pb-3">
                <div className="w-full bg-neutral-700 rounded-full h-1 overflow-hidden">
                  <div 
                    className="bg-[#1ed760] h-1 rounded-full" 
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar with Subtle Gradient Background */}
      <div className="fixed bottom-0 left-0 right-0">
        {/* Gradient overlay - 40% opacity */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
        
        {/* Navigation buttons */}
        <div className="relative h-14 flex items-center justify-around px-6">
          <button 
            onClick={() => setCurrentPage('search')}
            className="flex flex-col items-center gap-0.5"
          >
            <Home className={`w-6 h-6 ${currentPage === 'search' ? 'text-[#1ed760]' : 'text-neutral-400'}`} />
            <span className={`text-[10px] ${currentPage === 'search' ? 'text-[#1ed760]' : 'text-neutral-400'}`}>Home</span>
          </button>
          <button 
            onClick={() => setCurrentPage('reading')}
            className="flex flex-col items-center gap-0.5"
          >
            <Search className={`w-6 h-6 ${currentPage === 'reading' ? 'text-[#1ed760]' : 'text-neutral-400'}`} />
            <span className={`text-[10px] ${currentPage === 'reading' ? 'text-[#1ed760]' : 'text-neutral-400'}`}>Search</span>
          </button>
          <button 
            onClick={() => setCurrentPage('library')}
            className="flex flex-col items-center gap-0.5"
          >
            <Library className={`w-6 h-6 ${currentPage === 'library' ? 'text-[#1ed760]' : 'text-neutral-400'}`} />
            <span className={`text-[10px] ${currentPage === 'library' ? 'text-[#1ed760]' : 'text-neutral-400'}`}>Atamarg</span>
          </button>
          <button 
            onClick={() => setCurrentPage('settings')}
            className="flex flex-col items-center gap-0.5"
          >
            <User className={`w-6 h-6 ${currentPage === 'settings' ? 'text-[#1ed760]' : 'text-neutral-400'}`} />
            <span className={`text-[10px] ${currentPage === 'settings' ? 'text-[#1ed760]' : 'text-neutral-400'}`}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;