
import { Download, ExternalLink } from 'lucide-react';
import Resume from '../assets/Harsh_Raj_Resume.pdf';


const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm <span className="neon-glow">Harsh Raj</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Frontend Developer crafting clean web experiences with modern technologies
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate about creating responsive, user-friendly applications using React + Vite cutting-edge web technologies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#projects" className="btn-neon flex items-center gap-2">
              <ExternalLink size={20} />
              View Projects
            </a>
            <a 
              href={Resume}
              target="_blank"
              className="glass-card px-6 py-3 rounded-lg border border-white/20 hover:border-neon-purple/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
