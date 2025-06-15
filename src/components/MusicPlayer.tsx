
import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Move } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [position, setPosition] = useState({ x: 16, y: window.innerHeight - 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Ambient music tracks
  const tracks = [
    { name: 'Coding Flow', duration: '3:24' },
    { name: 'Digital Dreams', duration: '4:12' },
    { name: 'Syntax Symphony', duration: '2:45' }
  ];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        console.log(`Playing: ${tracks[currentTrack].name}`);
      } else {
        console.log('Music paused');
      }
    }
  }, [isPlaying, currentTrack, tracks]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  return (
    <div 
      ref={playerRef}
      className="fixed z-50 glass-card rounded-xl border border-white/20 hover:border-neon-purple/50 transition-all duration-300 cursor-move"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center gap-3 p-4">
        <Move className="w-4 h-4 text-gray-400 opacity-50" />
        
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-white">
            {tracks[currentTrack].name}
          </p>
          <p className="text-xs text-gray-400">
            {tracks[currentTrack].duration}
          </p>
        </div>
        
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
        
        <button
          onClick={nextTrack}
          className="hidden sm:block text-xs text-gray-400 hover:text-white transition-colors duration-300"
        >
          Next
        </button>
      </div>
      
      {/* Progress bar */}
      {isPlaying && (
        <div className="px-4 pb-2">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gradient-neon h-1 rounded-full animate-pulse"
              style={{ width: '45%' }}
            ></div>
          </div>
        </div>
      )}
      
      <audio ref={audioRef} loop>
        {/* <source src="/music/ambient-coding.mp3" type="audio/mpeg" /> */}
      </audio>
    </div>
  );
};

export default MusicPlayer;
