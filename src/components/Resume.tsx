
import { Download, Eye, Calendar, Award, Code, CheckCircle, Star } from 'lucide-react';

const Resume = () => {
  const timeline = [
    {
      year: '2024',
      title: 'Started Web Development Journey',
      description: 'Began learning modern web technologies including React, TypeScript, and Tailwind CSS',
      icon: <Code className="w-5 h-5" />
    },
    {
      year: '2024',
      title: 'Frontend Development Certification',
      description: 'Completed comprehensive frontend development course with focus on React ecosystem',
      icon: <Award className="w-5 h-5" />
    },
    {
      year: '2024',
      title: 'First Portfolio Projects',
      description: 'Built several portfolio projects showcasing modern web development skills',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const technicalSkills = [
    {
      category: 'Frontend Technologies',
      skills: [
        { name: 'HTML5', level: 'Expert', icon: '🌐' },
        { name: 'CSS3 & SCSS', level: 'Advanced', icon: '🎨' },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: '⚡' },
        { name: 'TypeScript', level: 'Intermediate', icon: '📘' },
        { name: 'React.js', level: 'Advanced', icon: '⚛️' },
        { name: 'Next.js', level: 'Intermediate', icon: '🔺' }
      ]
    },
    {
      category: 'Styling & UI',
      skills: [
        { name: 'Tailwind CSS', level: 'Expert', icon: '💨' },
        { name: 'Bootstrap', level: 'Advanced', icon: '🥾' },
        { name: 'Material-UI', level: 'Intermediate', icon: '🎯' },
        { name: 'Responsive Design', level: 'Expert', icon: '📱' }
      ]
    },
    {
      category: 'Tools & Workflow',
      skills: [
        { name: 'Git & GitHub', level: 'Advanced', icon: '🐙' },
        { name: 'VS Code', level: 'Expert', icon: '💻' },
        { name: 'Figma', level: 'Intermediate', icon: '🎨' },
        { name: 'Vite', level: 'Advanced', icon: '⚡' }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-green-400';
      case 'Advanced': return 'text-blue-400';
      case 'Intermediate': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Expert': return <Star className="w-4 h-4 fill-current" />;
      case 'Advanced': return <CheckCircle className="w-4 h-4" />;
      case 'Intermediate': return <CheckCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <section id="resume" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="neon-glow">Resume</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-neon mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Resume Download Section */}
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Download My Resume</h3>
              <p className="text-gray-300 mb-8">
                Get a detailed overview of my skills, education, and projects in a professionally formatted document.
              </p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="/resume.pdf" 
                download
                className="btn-neon w-full flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download PDF Resume
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card w-full px-6 py-3 rounded-lg border border-white/20 hover:border-neon-purple/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                View in Browser
              </a>
            </div>
          </div>

          {/* Learning Timeline */}
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Learning <span className="neon-glow">Journey</span>
            </h3>
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gradient-neon mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-gradient-neon rounded-full text-white text-sm font-medium">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 group-hover:neon-glow transition-all duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Technical Skills */}
        <div className="mt-16 glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Technical <span className="neon-glow">Expertise</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {technicalSkills.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h4 className="text-lg font-semibold text-center mb-6 neon-glow">
                  {category.category}
                </h4>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="glass-card p-4 rounded-lg hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <div className={`flex items-center gap-1 ${getLevelColor(skill.level)}`}>
                          {getLevelIcon(skill.level)}
                          <span className="text-sm font-medium">{skill.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              <strong>Expert:</strong> Production-ready, can mentor others | 
              <strong> Advanced:</strong> Highly proficient, independent work | 
              <strong> Intermediate:</strong> Solid understanding, growing experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
