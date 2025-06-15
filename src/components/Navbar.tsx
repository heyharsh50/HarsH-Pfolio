
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, default to dark mode
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.background = '';
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-card backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold neon-glow logo-animation cursor-pointer">Harsh Raj</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link transition-colors duration-300 hover:neon-glow"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <Sun className={`w-4 h-4 ${!darkMode ? 'text-yellow-500' : 'text-gray-400'}`} />
            <Switch
              checked={darkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
            />
            <Moon className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg glass-card"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 glass-card m-4 rounded-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 nav-link transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <span className="nav-link">Theme</span>
              <div className="flex items-center gap-2">
                <Sun className={`w-4 h-4 ${!darkMode ? 'text-yellow-500' : 'text-gray-400'}`} />
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                />
                <Moon className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
