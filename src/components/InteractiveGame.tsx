import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Zap, Star, Code, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type IconType = React.ComponentType<{ className?: string }>;

const icons: IconType[] = [Zap, Star, Code];

const InteractiveGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; icon: IconType }>>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setTargets([]);
  }, []);

  const closeGame = useCallback(() => {
    setIsOpen(false);
    setGameActive(false);
  }, []);

  const handleTargetClick = useCallback((id: number) => {
    setScore(prev => prev + 1);
    setTargets(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let targetInterval: NodeJS.Timeout;
    if (gameActive && gameAreaRef.current) {
      targetInterval = setInterval(() => {
        const { width, height } = gameAreaRef.current!.getBoundingClientRect();
        setTargets(prev => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * (width - 40),
            y: Math.random() * (height - 40),
            icon: icons[Math.floor(Math.random() * icons.length)],
          },
        ]);
      }, 1000);
    }
    return () => clearInterval(targetInterval);
  }, [gameActive]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 px-6 py-3 bg-gradient-neon text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Play a Game
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-16 right-4 z-50">
        <button 
          onClick={() => setIsMinimized(false)} 
          className="bg-gray-800/50 text-white p-3 rounded-full shadow-lg backdrop-blur-md hover:bg-gray-700/70 transition-colors"
          aria-label="Maximize game"
        >
          <Maximize2 size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={closeGame}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className="relative w-full max-w-md h-[500px] bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 bg-gray-800/60">
          <div className="w-5 h-5" /> {/* Spacer */}
          <h3 className="text-xl font-bold neon-glow">Code Hunter Game</h3>
          <div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 mr-2"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <button
              onClick={closeGame}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          {!gameActive ? (
            <div className="text-center m-auto">
              <h2 className="text-3xl font-bold mb-4 neon-glow">Welcome!</h2>
              <p className="text-gray-300 mb-6">
                Test your reflexes! Click the coding icons as fast as you can.
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-neon text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Start Game
              </button>
              {timeLeft === 0 && score > 0 && (
                <p className="mt-6 text-2xl font-bold">Final Score: {score}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4 text-lg">
                <p>Score: <span className="font-bold neon-glow">{score}</span></p>
                <p>Time Left: <span className="font-bold neon-glow">{timeLeft}s</span></p>
              </div>
              <div ref={gameAreaRef} className="relative flex-grow bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
                {targets.map(target => (
                  <motion.div
                    key={target.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute text-white cursor-pointer hover:scale-125 transition-transform duration-200"
                    style={{ left: target.x, top: target.y }}
                    onMouseDown={(e) => {
                      e.stopPropagation(); // Prevent dragging the window
                      handleTargetClick(target.id);
                    }}
                  >
                    <target.icon className="w-8 h-8 text-cyan-400 drop-shadow-lg" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveGame;
