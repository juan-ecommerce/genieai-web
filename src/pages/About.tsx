import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Brain, Zap, Shield, User } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const About: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const founderProfile = {
    name: "Juan",
    role: "GenAI Engineer & Solution Architect",
    description: "I'm a passionate technologist with nearly 30 years of experience spanning the full AI/ML stack. As a GenAI Engineer, I specialize in Python, Hugging Face Transformers, LLMs, and deep learning. My background as a Data Scientist, Solution Architect, Senior Developer, and ML Engineer gives me a unique perspective on building end-to-end AI solutions - from ETL pipelines and big data processing with Spark to cutting-edge generative AI applications.",
    image: "/src/images/juan_about.png"
  };

  const values = [
    {
      icon: Brain,
      title: "Always Learning",
      description: "I'm constantly exploring new AI technologies, reading research papers, and experimenting with the latest tools and techniques."
    },
    {
      icon: Shield,
      title: "Ethical Approach",
      description: "I believe in building responsible AI solutions that are transparent, fair, and designed to help people, not replace them."
    },
    {
      icon: Zap,
      title: "Practical Solutions",
      description: "I focus on creating AI and automation solutions that solve real problems and deliver genuine value."
    }
  ];

  const stats = [
    { number: "30", label: "Years of IT Experience" },
    { number: "∞", label: "Passion for Learning" },
    { number: "24/7", label: "Thinking About AI" }
  ];


  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/30"></div>
          
          {/* Large Floating Orbs with Strong Glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/60 to-indigo-500/40 rounded-full blur-3xl animate-pulse shadow-[0_0_100px_rgba(59,130,246,0.5)]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400/50 to-blue-500/60 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_rgba(6,182,212,0.6)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-purple-500/50 to-pink-500/40 rounded-full blur-2xl animate-pulse shadow-[0_0_90px_rgba(168,85,247,0.4)]" style={{animationDelay: '4s'}}></div>
          
          {/* Bright Moving Particles */}
          <div className="absolute top-20 left-10 w-6 h-6 bg-blue-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(59,130,246,0.8)]" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-cyan-300 rounded-full animate-bounce shadow-[0_0_25px_rgba(6,182,212,0.9)]" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce shadow-[0_0_18px_rgba(99,102,241,0.7)]" style={{animationDelay: '3s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-20 right-32 w-4 h-4 bg-purple-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(168,85,247,0.8)]" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-60 left-1/2 w-7 h-7 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_22px_rgba(52,211,153,0.8)]" style={{animationDelay: '1.5s', animationDuration: '2.8s'}}></div>
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-rose-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(251,113,133,0.7)]" style={{animationDelay: '3.5s', animationDuration: '3.2s'}}></div>
          
          {/* Large Geometric Shapes with Glow */}
          <div className="absolute top-16 right-16 w-16 h-16 border-4 border-blue-400/60 rotate-45 animate-spin shadow-[0_0_30px_rgba(59,130,246,0.6)]" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-16 left-16 w-12 h-12 border-4 border-cyan-400/70 animate-spin shadow-[0_0_25px_rgba(6,182,212,0.7)]" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 right-8 w-10 h-10 bg-gradient-to-r from-blue-400/60 to-purple-400/50 transform rotate-12 animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.5)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-32 left-1/3 w-14 h-14 border-3 border-purple-400/50 rounded-full animate-spin shadow-[0_0_28px_rgba(168,85,247,0.5)]" style={{animationDuration: '10s'}}></div>
          <div className="absolute bottom-40 right-1/4 w-8 h-20 bg-gradient-to-t from-cyan-400/40 to-blue-400/60 transform rotate-45 animate-pulse shadow-[0_0_25px_rgba(6,182,212,0.6)]" style={{animationDelay: '2.5s', animationDuration: '4s'}}></div>
          
          {/* Intense Sweeping Light Beams */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse shadow-[0_0_50px_rgba(59,130,246,0.4)]" style={{animationDuration: '4s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400/15 to-transparent animate-pulse shadow-[0_0_40px_rgba(6,182,212,0.5)]" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-400/10 to-transparent animate-pulse shadow-[0_0_35px_rgba(168,85,247,0.3)]" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          </div>
          
          {/* Enhanced Neural Network with Glowing Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g className="animate-pulse" style={{animationDuration: '8s'}}>
              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="3" filter="url(#glow)"/>
              <line x1="70%" y1="10%" x2="90%" y2="30%" stroke="url(#lineGradient)" strokeWidth="3" filter="url(#glow)"/>
              <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="url(#lineGradient)" strokeWidth="3" filter="url(#glow)"/>
              <line x1="80%" y1="70%" x2="60%" y2="90%" stroke="url(#lineGradient)" strokeWidth="3" filter="url(#glow)"/>
              <line x1="50%" y1="10%" x2="50%" y2="30%" stroke="url(#lineGradient)" strokeWidth="3" filter="url(#glow)"/>
              <line x1="15%" y1="50%" x2="35%" y2="70%" stroke="url(#lineGradient)" strokeWidth="2" filter="url(#glow)"/>
              <line x1="65%" y1="40%" x2="85%" y2="60%" stroke="url(#lineGradient)" strokeWidth="2" filter="url(#glow)"/>
            </g>
            <g className="animate-pulse" style={{animationDuration: '6s', animationDelay: '3s'}}>
              <circle cx="20%" cy="30%" r="4" fill="#3b82f6" opacity="0.8" filter="url(#glow)"/>
              <circle cx="80%" cy="20%" r="3" fill="#06b6d4" opacity="0.9" filter="url(#glow)"/>
              <circle cx="30%" cy="70%" r="5" fill="#8b5cf6" opacity="0.7" filter="url(#glow)"/>
              <circle cx="70%" cy="80%" r="3" fill="#3b82f6" opacity="0.8" filter="url(#glow)"/>
            </g>
          </svg>
          
          {/* Floating Energy Rings */}
          <div className="absolute top-1/3 left-1/5 w-32 h-32 border-4 border-blue-400/50 rounded-full animate-spin shadow-[0_0_40px_rgba(59,130,246,0.6)]" style={{animationDuration: '12s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-24 h-24 border-3 border-cyan-400/60 rounded-full animate-spin shadow-[0_0_35px_rgba(6,182,212,0.7)]" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-purple-400/40 rounded-full animate-spin shadow-[0_0_45px_rgba(168,85,247,0.5)]" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full mb-8">
            <Users className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-blue-200 font-medium">About GenieAI</span>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 rounded-full text-sm font-semibold mb-8 animate-fade-in">
              🎆 30 Years of IT Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-inter mb-8 text-white leading-tight animate-fade-in-up">
              Transforming Business with 
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              GenieAI is a specialized AI consultancy founded on the belief that advanced artificial intelligence should be 
              accessible to businesses of all sizes. With extensive experience across all AI modalities, I provide personalized, 
              expert guidance to help you harness the full potential of AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-5xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg relative z-10">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              ✨ My Philosophy
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              What Drives Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              The principles that guide my approach to AI and automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900 group-hover:text-blue-600 transition-colors relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed relative z-10">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              My Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I believe AI should be accessible, understandable, and genuinely helpful to everyone.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-12 rounded-2xl text-center text-white">
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To make AI and automation accessible to individuals and businesses by sharing my knowledge, 
              building practical solutions, and helping others discover the incredible potential of these technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              👨‍💻 About Me
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              My Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              From IT professional to AI enthusiast - here's my journey
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-3xl border border-blue-200">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group">
                <div className="md:flex">
                  <div className="md:w-1/3 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-48 h-48 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                      <img 
                        src={founderProfile.image} 
                        alt={founderProfile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8 md:p-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-3xl font-bold font-inter mb-4 text-gray-900 relative z-10">
                      {founderProfile.name}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-6 relative z-10">
                      {founderProfile.role}
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                      {founderProfile.description}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start relative z-10">
                      {["GenAI Engineering", "Python", "Hugging Face", "LLMs", "Deep Learning", "Data Science", "ML Engineering", "Spark", "ETL", "Big Data", "Solution Architecture", "AWS Cloud", "Azure Cloud", "RAG Systems", "n8n"].map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-200 cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Expertise Breakdown */}
          <div className="mt-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">GenAI Engineer</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Python & Hugging Face</li>
                  <li>• LLMs & Transformers</li>
                  <li>• Deep Learning</li>
                  <li>• Machine Learning</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">ML Engineer</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Apache Spark</li>
                  <li>• ETL Pipelines</li>
                  <li>• Big Data Processing</li>
                  <li>• S3 & Parquet</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Data Scientist</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Domain Knowledge</li>
                  <li>• Communication</li>
                  <li>• Stakeholder Management</li>
                  <li>• ML Algorithms</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Solution Architect</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• System Design</li>
                  <li>• Cloud Architecture</li>
                  <li>• Senior Development</li>
                  <li>• Technical Leadership</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900">
                Full-Stack AI/ML Expertise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With experience spanning Data Science, ML Engineering, GenAI Engineering, and Solution Architecture, I bring a comprehensive understanding of the entire AI/ML pipeline. You'll work directly with me from data strategy through deployment, ensuring end-to-end solutions that actually work in production.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white font-inter">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            I'd love to hear about your AI and automation ideas. Let's chat about what we can build!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/ai-agents" 
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default About;
