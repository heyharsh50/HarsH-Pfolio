import Ecart from '../assets/E-CART.png';
import Pfolio from '../assets/Portfolio.png'
import ChatApp from '../assets/p3.png'
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Cart',
      description: '🛒 eCart – A simple app to add products and display them on the site',
      image: Ecart,
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveDemo: 'https://e-cart-072y.onrender.com/',
      github: 'https://github.com/heyharsh50/E-CART'
    },
    {
      id: 2,
      title: 'HealthCare - A Doctor Appointment System',
      description: '🩺 A doctor appointment app with booking, payments, document upload, and schedule management for patients, doctors, and admins.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Cloudinary'],
      liveDemo: '#',
      github: 'https://github.com/heyharsh50/Doctor-Appointment'
    },
    {
      id: 3,
      title: 'ChatApp - A Realtime Chat App',
      description: 'A simple ChatApp with real-time messaging, user authentication, and group chat functionality.',
      image: ChatApp,
      technologies: ['React', 'Node', 'Socket.io', 'Express', 'MongoDB'],
      liveDemo: '#',
      github: 'https://github.com/heyharsh50/CHAT-APP'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A portfolio website to showcase my skills and projects.',
      image: Pfolio,
      technologies: ['React', 'Vite'],
      liveDemo: 'https://portfolio-harshs-projects-7a4aa1a4.vercel.app/',
      github: 'https://github.com/heyharsh50/Portfolio'
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="neon-glow">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-neon mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for web development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-purple/25 group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:neon-glow transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-gradient-neon rounded-full text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={project.liveDemo}
                    className="flex items-center gap-2 btn-neon flex-1 justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a 
                    href={project.github}
                    className="flex items-center gap-2 glass-card px-4 py-3 rounded-lg border border-white/20 hover:border-neon-purple/50 transition-all duration-300 flex-1 justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
