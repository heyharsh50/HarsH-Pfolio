
import { Code, Database, Globe, Palette } from 'lucide-react';

const About = () => {
  const skills = [
    'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 
    'HTML5', 'CSS3', 'Git', 'VS Code', 'Responsive Design',
    'REST APIs', 'Node.js', 'MongoDB', 'Express.js'
  ];

  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Backend Integration',
      description: 'Connecting frontend with robust backend services'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Web Standards',
      description: 'Following modern web development best practices'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'UI/UX Focus',
      description: 'Creating beautiful and user-friendly experiences'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="neon-glow">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-neon mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 neon-glow">Who I Am</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm a passionate frontend developer with a strong foundation in modern web technologies. 
                As a fresher actively seeking opportunities, I bring fresh perspectives, eagerness to learn, 
                and dedication to creating exceptional user experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My journey in web development started with curiosity and has evolved into a passion for 
                clean code, responsive design, and innovative solutions. I'm excited to contribute to 
                meaningful projects and grow with a dynamic team.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/25"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-neon rounded-lg">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{highlight.title}</h4>
                    <p className="text-gray-400">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Skills & <span className="neon-glow">Technologies</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="skill-badge text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
