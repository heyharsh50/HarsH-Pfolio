
import { useState, Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
const About = lazy(() => import('../components/About'));
const Projects = lazy(() => import('../components/Projects'));
const Resume = lazy(() => import('../components/Resume'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
import ScrollToTop from '../components/ScrollToTop';
import MusicPlayer from '../components/MusicPlayer';
import InteractiveGame from '../components/InteractiveGame';
import { Toaster } from 'sonner';

const Index = () => {
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(true);
  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      <Navbar onToggleMusicPlayer={() => setIsMusicPlayerVisible(prev => !prev)} />
      <Hero />
            <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Projects />
        <Resume />
        <Contact />
        <Footer />
      </Suspense>
      <ScrollToTop />
      <MusicPlayer isVisible={isMusicPlayerVisible} onClose={() => setIsMusicPlayerVisible(false)} />
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
