import { useState, useRef, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import { Play, Pause, FastForward, Rewind, Volume2, VolumeX, Minimize2, Maximize2, Move, X } from 'lucide-react';

interface MusicPlayerProps {
  isVisible: boolean;
  onClose: () => void;
}

const MusicPlayer = ({ isVisible, onClose }: MusicPlayerProps) => {
    
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: 'Blue', artist: 'Yung Kai', url: `${import.meta.env.BASE_URL}music/Blue-Yung-Kai.mp3`, art: `${import.meta.env.BASE_URL}images/music-art.jpg` },
    { name: 'Die With A Smile', artist: 'Lady Gaga', url: `${import.meta.env.BASE_URL}music/Die With A Smile.mp3`, art: `${import.meta.env.BASE_URL}images/music-art.jpg` },
    { name: 'novamare', artist: 'novamare', url: `${import.meta.env.BASE_URL}music/novamare.mp3`, art: `${import.meta.env.BASE_URL}images/music-art.jpg` },
    { name: 'PASSO BEM SOLTO', artist: 'PASSO BEM SOLTO', url: `${import.meta.env.BASE_URL}music/PASSO BEM SOLTO.mp3`, art: `${import.meta.env.BASE_URL}images/music-art.jpg` },
    { name: 'Popular', artist: 'The Weeknd', url: `${import.meta.env.BASE_URL}music/Popular.mp3`, art: `${import.meta.env.BASE_URL}images/music-art.jpg` },
    { name: 'Starboy', artist: 'The Weeknd', url: `${import.meta.env.BASE_URL}music/Starboy.mp3`, art: `${import.meta.env.BASE_URL}images/music-art.jpg` },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrack].url;
      audioRef.current.load();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Playback failed:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);

  const nextTrack = useCallback(() => {
    setCurrentTrack(prev => (prev + 1) % tracks.length);
  }, [tracks.length]);

    const prevTrack = useCallback(() => {
    setCurrentTrack(prev => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  

      if (!isVisible) return null;

  if (isMinimized) {
    return (
      <Draggable>
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => setIsMinimized(false)} 
            className="bg-gray-800/50 text-white p-3 rounded-full shadow-lg backdrop-blur-md hover:bg-gray-700/70 transition-colors"
            aria-label="Maximize music player"
          >
            <Maximize2 size={24} />
          </button>
        </div>
      </Draggable>
    );
  }

  return (
    <Draggable handle=".handle">
      <div className="fixed bottom-4 right-4 z-50 w-80 max-w-sm rounded-xl shadow-2xl overflow-hidden bg-gray-900/50 backdrop-blur-md border border-gray-700/50">
                <div className="handle p-2 bg-gray-800/60 flex justify-between items-center cursor-move">
          <Move className="text-gray-400" />
          <h3 className="text-md font-bold text-white">Ambient Music</h3>
          <div className="flex items-center">
            <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-white" aria-label="Minimize music player">
              <Minimize2 size={20} />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white ml-2" aria-label="Close music player">
                <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
            <div className="flex items-center gap-4">
                <img src={tracks[currentTrack].art} alt="Album art" className="w-16 h-16 rounded-lg shadow-md object-cover" />
                <div>
                    <h4 className="font-bold text-white text-lg truncate">{tracks[currentTrack].name}</h4>
                    <p className="text-gray-400 text-sm">{tracks[currentTrack].artist}</p>
                </div>
            </div>

            <div className="mt-4">
                <input
                    type="range"
                    value={progress}
                    step="any"
                    max={duration || 0}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button onClick={toggleMute} className="text-gray-400 hover:text-white p-2">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <div className="flex items-center gap-4">
                    <button onClick={prevTrack} className="text-gray-400 hover:text-white p-2"><Rewind size={24} /></button>
                    <button onClick={togglePlay} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                    <button onClick={nextTrack} className="text-gray-400 hover:text-white p-2"><FastForward size={24} /></button>
                </div>
                <div className="w-9 h-9" /> 
            </div>
        </div>

        <audio 
          ref={audioRef} 
          onEnded={nextTrack} 
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
        />
      </div>
    </Draggable>
  );
};

export default MusicPlayer;
