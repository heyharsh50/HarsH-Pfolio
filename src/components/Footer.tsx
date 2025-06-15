
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © 2025 Made with <Heart className="w-4 h-4 text-red-500" /> by 
            <span className="neon-glow font-medium">Harsh Raj</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Crafted with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
