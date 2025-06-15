
import { useState } from 'react';
import { Mail, Linkedin, Github, Send, MapPin, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create Google Forms URL with pre-filled data
    const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    const params = new URLSearchParams({
      'entry.NAME_FIELD': formData.name,
      'entry.EMAIL_FIELD': formData.email,
      'entry.MESSAGE_FIELD': formData.message
    });

    // For now, we'll just show a success message
    toast.success('Message sent successfully! I\'ll get back to you soon.');
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // In a real implementation, you would submit to Google Forms:
    // window.open(`${formUrl}?${params.toString()}`, '_blank');
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'harshraj88253@gmail.com',
      href: 'mailto:harshraj88253@gmail.com'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: '/in/harsh-raj-dev',
      href: 'https://www.linkedin.com/in/hraj129/'
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: '/harsh-raj-dev',
      href: 'https://github.com/heyharsh50'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'India',
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Get In <span className="neon-glow">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-neon mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I'm actively seeking new opportunities and would love to hear from you. Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:border-neon-purple focus:outline-none transition-colors duration-300"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:border-neon-purple focus:outline-none transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:border-neon-purple focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              
              <button
                type="submit"
                className="btn-neon w-full flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-neon rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:neon-glow transition-all duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional CTA */}
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Open to Opportunities</h3>
              <p className="text-gray-300 mb-6">
                I'm actively seeking frontend developer positions, internships, and freelance projects. Let's build something amazing together!
              </p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="https://www.linkedin.com/in/hraj129/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-neon rounded-lg hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="https://github.com/heyharsh50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-neon rounded-lg hover:scale-110 transition-transform duration-300"
                >
                  <Github className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="mailto:harshraj88253@gmail.com"
                  className="p-3 bg-gradient-neon rounded-lg hover:scale-110 transition-transform duration-300"
                >
                  <Mail className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
