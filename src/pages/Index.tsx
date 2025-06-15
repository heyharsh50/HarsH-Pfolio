
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import MusicPlayer from '../components/MusicPlayer';
import InteractiveGame from '../components/InteractiveGame';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
      <ScrollToTop />
      <MusicPlayer />
      <InteractiveGame />
      <Toaster 
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 12, 41, 0.9)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: 'white',
          },
        }}
      />
    </div>
  );
};

export default Index;
