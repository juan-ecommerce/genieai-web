import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Database, Zap, TrendingUp } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const Home: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const services = [
    {
      icon: Bot,
      title: "AI Agents",
      description: "Custom AI agents with RAG for intelligent automation and knowledge retrieval.",
      link: "/ai-agents"
    },
    {
      icon: Database,
      title: "RAG Systems",
      description: "Advanced retrieval-augmented generation systems for enterprise knowledge.",
      link: "/rag"
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Streamline workflows with n8n, Make.com, and intelligent automation.",
      link: "/automation"
    },
    {
      icon: TrendingUp,
      title: "Data Science",
      description: "ML engineering and data science solutions for business intelligence.",
      link: "/data-science"
    }
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
        {/* Futuristic Black Background with Effects */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'gridPulse 8s ease-in-out infinite'
          }}></div>
          
          {/* Large Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
          
          {/* Floating Particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                opacity: 0.6,
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
              }}
            />
          ))}
          
          {/* Scanning Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{top: '25%', animationDuration: '3s'}}></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{top: '50%', animationDuration: '4s', animationDelay: '1s'}}></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{top: '75%', animationDuration: '3.5s', animationDelay: '2s'}}></div>
          </div>

          {/* Rotating Geometric Shapes */}
          <div className="absolute top-20 right-20 w-20 h-20 border-2 border-cyan-500/40 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-blue-500/40 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
          <div className="relative inline-block mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient-x pb-2" style={{backgroundSize: '200% auto'}}>
              AI Automation Agency
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-3xl -z-10 animate-pulse"></div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white mb-6">
            RAG Systems, AI Agents & Business Automation in Stockholm
          </p>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your business with cutting-edge retrieval-augmented generation systems, intelligent AI agents, and automated workflows. Expert AI consulting and data science solutions for modern enterprises.
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-5 rounded-lg text-xl font-semibold transition-all duration-300 inline-flex items-center shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-sm"></div>
            </div>
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-32 px-6 z-10">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
              <span className="text-cyan-400 font-semibold text-sm">OUR SERVICES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              What We Build
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cutting-edge AI solutions for the future
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={index}
                  to={service.link}
                  className="group relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-8 hover:bg-black/60 hover:border-cyan-500/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Corner Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-lg w-fit mb-6 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/60 transition-all">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                  
                  {/* Animated Border on Hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 blur-sm"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Glowing Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-16 shadow-2xl shadow-cyan-500/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform with AI?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's build something extraordinary together
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center shadow-2xl shadow-cyan-500/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Contact Us</span>
              <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            </button>
          </div>
        </div>
      </section>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  );
};

export default Home;
