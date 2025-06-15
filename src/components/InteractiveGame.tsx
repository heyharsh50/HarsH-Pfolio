
import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Zap, Star, Code, Move } from 'lucide-react';

const InteractiveGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState<Array<{id: number, x: number, y: number, icon: any}>>([]);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const icons = [Code, Zap, Star];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      setTargets([]);
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive) {
      interval = setInterval(() => {
        const newTarget = {
          id: Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          icon: icons[Math.floor(Math.random() * icons.length)]
        };
        setTargets(prev => [...prev.slice(-4), newTarget]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [gameActive, icons]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragOffset.y));
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

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setTargets([]);
  }, []);

  const hitTarget = useCallback((id: number) => {
    setScore(prev => prev + 10);
    setTargets(prev => prev.filter(target => target.id !== id));
  }, []);

  const closeGame = useCallback(() => {
    setIsOpen(false);
    setGameActive(false);
    setTargets([]);
  }, []);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDragging) {
      setIsOpen(true);
    }
  }, [isDragging]);

  if (!isOpen) {
    return (
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        onMouseDown={handleMouseDown}
        className="fixed z-40 glass-card p-3 rounded-full hover:scale-110 transition-transform duration-300 cursor-move"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          userSelect: 'none'
        }}
        aria-label="Open mini game"
      >
        <Zap className="w-5 h-5 text-neon-purple" />
        <Move className="w-3 h-3 text-gray-400 opacity-50 absolute -top-1 -right-1" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card p-6 rounded-2xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold neon-glow">Code Hunter Game</h3>
          <button
            onClick={closeGame}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!gameActive ? (
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Test your reflexes! Click the coding icons as fast as you can.
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {icons.map((Icon, index) => (
                <Icon key={index} className="w-8 h-8 text-neon-purple" />
              ))}
            </div>
            {score > 0 && (
              <p className="text-lg mb-4">
                Final Score: <span className="neon-glow font-bold">{score}</span>
              </p>
            )}
            <button
              onClick={startGame}
              className="btn-neon"
            >
              {score > 0 ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <div className="text-sm">
                Score: <span className="neon-glow font-bold">{score}</span>
              </div>
              <div className="text-sm">
                Time: <span className="text-red-400 font-bold">{timeLeft}s</span>
              </div>
            </div>

            <div className="relative h-64 bg-gray-900/50 rounded-lg overflow-hidden">
              {targets.map((target) => {
                const IconComponent = target.icon;
                return (
                  <button
                    key={target.id}
                    onClick={() => hitTarget(target.id)}
                    className="absolute w-8 h-8 text-neon-purple hover:text-neon-pink transition-colors duration-200 hover:scale-125"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <IconComponent className="w-full h-full animate-pulse" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGame;
