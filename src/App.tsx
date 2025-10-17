import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Bot, 
  Brain, 
  Zap, 
  Shield, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Target, 
  Sparkles, 
  ShoppingCart, 
  BarChart3,
  Database,
  Cloud,
  Settings,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Play,
  Pause,
  Image,
  Mic,
  Video,
  FileText,
  Layers,
  Wand2
} from 'lucide-react';

function App() {
  const [activeService, setActiveService] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      icon: Bot,
      title: "AI Agents & LLMs",
      description: "Custom AI agents powered by advanced language models.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Image,
      title: "AI Image Generation",
      description: "Create stunning visuals with DALL-E, Midjourney, and Stable Diffusion.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Mic,
      title: "Voice & Audio AI",
      description: "Speech synthesis, voice cloning, and audio processing.",
      color: "from-green-400 to-cyan-500"
    },
    {
      icon: Video,
      title: "AI Video Creation",
      description: "Generate videos from text with Sora, RunwayML, and custom models.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: MessageSquare,
      title: "Multi-Agent Systems",
      description: "Coordinated AI teams for enterprise workflows.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Layers,
      title: "Multi-Modal AI",
      description: "Integrated text, image, voice, and video AI solutions.",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: Brain,
      title: "Custom Model Training",
      description: "Fine-tuned models for any modality and industry.",
      color: "from-teal-400 to-blue-500"
    },
    {
      icon: Wand2,
      title: "AI Workflow Automation",
      description: "End-to-end automation with multi-modal AI capabilities.",
      color: "from-pink-400 to-purple-500"
    }
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "Intelligent Customer Support",
      description: "24/7 AI agents with voice, text, and visual understanding",
      delay: "0ms",
      tags: ["LLMs", "Voice AI", "Multi-Modal"]
    },
    {
      icon: Image,
      title: "Creative Content Studio",
      description: "Generate images, videos, and marketing materials from text",
      delay: "200ms",
      tags: ["Image Gen", "Video AI", "Creative"]
    },
    {
      icon: Mic,
      title: "Voice-Powered Applications",
      description: "Speech synthesis, podcasts, and interactive voice systems",
      delay: "400ms",
      tags: ["Voice AI", "Speech", "Audio"]
    },
    {
      icon: Video,
      title: "Video Production Pipeline",
      description: "Automated video creation for training, marketing, and entertainment",
      delay: "600ms",
      tags: ["Video AI", "Automation", "Production"]
    },
    {
      icon: Layers,
      title: "Multi-Modal Analytics",
      description: "Analyze text, images, audio, and video data simultaneously",
      delay: "800ms",
      tags: ["Analytics", "Multi-Modal", "Insights"]
    },
    {
      icon: Wand2,
      title: "AI-Powered Workflows",
      description: "End-to-end automation combining all AI modalities",
      delay: "1000ms",
      tags: ["Automation", "Integration", "Enterprise"]
    }
  ];

  const processSteps = [
    { title: "Discover", description: "Identify AI opportunities", icon: "🔍" },
    { title: "Design", description: "Architect custom solutions", icon: "🎨" },
    { title: "Deploy", description: "Seamless implementation", icon: "🚀" },
    { title: "Manage", description: "Ongoing optimization", icon: "⚡" }
  ];

  // Advanced particle system
  const ParticleField = () => {
    const particles = Array.from({ length: 80 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${2 + Math.random() * 4}s`
        }}
      />
    ));
    return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>;
  };

  // Floating geometric shapes with AI theme
  const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-300/30 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-indigo-300/20 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rotate-12 animate-bounce" style={{animationDuration: '4s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-blue-400/20 transform rotate-45 animate-pulse" style={{animationDuration: '2.5s'}}></div>
      <div className="absolute top-10 right-10 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 border border-indigo-400/30 animate-spin" style={{animationDuration: '15s'}}></div>
    </div>
  );

  // Neural network animation
  const NeuralNetwork = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Neural connections */}
        <g className="animate-pulse" style={{animationDuration: '4s'}}>
          <line x1="100" y1="150" x2="300" y2="200" stroke="url(#neuralGradient)" strokeWidth="1" />
          <line x1="300" y1="200" x2="500" y2="150" stroke="url(#neuralGradient)" strokeWidth="1" />
          <line x1="150" y1="300" x2="350" y2="250" stroke="url(#neuralGradient)" strokeWidth="1" />
          <line x1="350" y1="250" x2="550" y2="300" stroke="url(#neuralGradient)" strokeWidth="1" />
          <line x1="200" y1="400" x2="400" y2="350" stroke="url(#neuralGradient)" strokeWidth="1" />
          <line x1="400" y1="350" x2="600" y2="400" stroke="url(#neuralGradient)" strokeWidth="1" />
        </g>
        {/* Neural nodes */}
        <g>
          <circle cx="100" cy="150" r="4" fill="#3b82f6" className="animate-pulse" />
          <circle cx="300" cy="200" r="4" fill="#06b6d4" className="animate-pulse" style={{animationDelay: '0.5s'}} />
          <circle cx="500" cy="150" r="4" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1s'}} />
          <circle cx="150" cy="300" r="4" fill="#06b6d4" className="animate-pulse" style={{animationDelay: '1.5s'}} />
          <circle cx="350" cy="250" r="4" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '2s'}} />
          <circle cx="550" cy="300" r="4" fill="#06b6d4" className="animate-pulse" style={{animationDelay: '2.5s'}} />
        </g>
      </svg>
    </div>
  );


  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-semibold font-inter text-gray-900">
                GenieAI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'About', 'Showcase', 'Process'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative py-2 px-4 transition-all duration-200 hover:text-blue-600 font-inter text-gray-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item}</span>
                </a>
              ))}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-inter font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Advanced animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20"></div>
          <ParticleField />
          <FloatingShapes />
          <NeuralNetwork />
          
          {/* Dynamic gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/25 to-blue-500/20 rounded-full blur-2xl animate-float"></div>
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold font-inter mb-8 text-white drop-shadow-2xl">
              BUILDING THE FUTURE WITH
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x" style={{backgroundSize: '300% 300%'}}>
                MULTI-MODAL AI & INTELLIGENT AUTOMATION
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto font-inter animate-fade-in-up leading-relaxed" style={{animationDelay: '0.2s'}}>
            Next-generation AI automation agency specializing in LLMs, image generation, voice synthesis, video creation, and intelligent multi-modal AI systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-5 rounded-xl text-xl font-bold font-inter transition-all duration-500 flex items-center justify-center transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 animate-glow">
              <span className="relative z-10">Book a Free Consultation</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </button>
            <button className="group border-2 border-cyan-400/50 hover:border-cyan-300 text-cyan-100 hover:text-white px-10 py-5 rounded-xl text-xl font-bold font-inter transition-all duration-500 transform hover:scale-110 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/25">
              <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '15s', animationDelay: '5s'}}></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-6 text-gray-900">
              About GenieAI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter">
              AI experts specializing in LLMs, image generation, voice synthesis, video creation, and comprehensive multi-modal AI solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Multi-Modal AI Expertise",
                description: "Advanced capabilities across text, image, voice, and video AI models."
              },
              {
                icon: Zap,
                title: "Comprehensive AI Integration",
                description: "Seamlessly integrate LLMs, image, voice, and video AI into workflows."
              },
              {
                icon: Shield,
                title: "Enterprise-Grade Solutions",
                description: "Scalable multi-modal AI systems with proven ROI across industries."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-blue-100 group-hover:bg-blue-200 p-3 rounded-lg w-fit mb-6 transition-all duration-300 group-hover:scale-110">
                  <item.icon className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 font-inter group-hover:text-blue-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-inter">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5"></div>
          <ParticleField />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-white drop-shadow-lg">
              Complete AI Model Ecosystem
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto font-inter leading-relaxed">
              From LLMs to image generation, voice synthesis to video creation - we master every AI modality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-scale-in ${
                  activeService === index ? 'ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/25 bg-white/20' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className={`bg-gradient-to-br from-cyan-400/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 p-4 rounded-xl w-fit mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 ${
                  activeService === index ? 'animate-glow shadow-lg shadow-cyan-400/50' : ''
                }`}>
                  <service.icon className="h-8 w-8 text-cyan-300 group-hover:text-cyan-200 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold font-inter mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-blue-100 leading-relaxed font-inter">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase/Use Cases */}
      <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-200/15 to-indigo-200/20 rounded-full blur-3xl animate-float"></div>
          <FloatingShapes />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              Multi-Modal AI Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-inter leading-relaxed">
              Revolutionary applications combining text, image, voice, and video AI across industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 animate-slide-in-left relative overflow-hidden"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 p-4 rounded-xl w-fit mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-lg group-hover:shadow-xl">
                    <useCase.icon className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-all duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-inter mb-6 text-lg">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 text-blue-700 text-sm rounded-full font-inter transition-all duration-300 hover:scale-110 hover:shadow-md transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Complex background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-purple-600/10"></div>
          <ParticleField />
          <NeuralNetwork />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/25 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-indigo-500/25 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #06b6d4 2px, transparent 2px)',
              backgroundSize: '60px 60px',
              animation: 'float 25s ease-in-out infinite'
            }}></div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-white drop-shadow-lg">
              Our Process
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto font-inter leading-relaxed">
              From concept to deployment in 4 intelligent steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-center hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up relative overflow-hidden"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:animate-bounce transition-all duration-300 filter drop-shadow-lg">
                    {step.icon}
                  </div>
                  <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 text-cyan-200 text-sm font-bold px-4 py-2 rounded-full mb-6 inline-block transition-all duration-500 group-hover:scale-125 shadow-lg">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold font-inter mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-blue-100 font-inter">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        {/* Epic background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/30"></div>
          <ParticleField />
          <FloatingShapes />
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/40 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-indigo-500/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
              <div className="w-full h-full animate-spin" style={{animationDuration: '60s'}}>
                <div className="w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400/30 to-transparent rounded-full absolute bottom-0 right-1/2 transform translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white font-inter drop-shadow-2xl animate-fade-in-up">
            Ready to Transform Your Business?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 font-inter leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Let's discuss how AI can revolutionize your success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative bg-gradient-to-r from-white to-gray-100 text-blue-700 px-12 py-6 rounded-2xl text-2xl font-bold font-inter hover:from-gray-50 hover:to-white transition-all duration-500 flex items-center justify-center transform hover:scale-110 hover:shadow-2xl hover:shadow-white/25 animate-fade-in-up overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Start Your AI Journey</span>
              <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </button>
            <button className="group border-3 border-white/70 hover:border-white text-white px-12 py-6 rounded-2xl text-2xl font-bold font-inter hover:bg-white/10 transition-all duration-500 flex items-center justify-center transform hover:scale-110 hover:shadow-xl hover:shadow-white/20 animate-fade-in-up backdrop-blur-sm" style={{animationDelay: '0.2s'}}>
              <Calendar className="mr-3 h-7 w-7 group-hover:scale-125 transition-transform duration-300" />
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Bot className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold text-white font-inter">
                  GenieAI
                </span>
              </div>
              <p className="text-gray-400 font-inter">
                AI automation agency specializing in intelligent agents.
              </p>
            </div>
            
            {[
              {
                title: "Services",
                links: ["AI Agents", "Automation", "AI Consulting", "Data Science"]
              },
              {
                title: "Company",
                links: ["About Us", "Our Process", "Case Studies", "Blog"]
              },
              {
                title: "Contact",
                links: [
                  { icon: Mail, text: "hello@genieai.com" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "San Francisco, CA" }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4 text-white font-inter">{section.title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {typeof link === 'string' ? (
                        <a href="#" className="hover:text-white transition-colors duration-200 font-inter">
                          {link}
                        </a>
                      ) : (
                        <div className="flex items-center">
                          <link.icon className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-inter">{link.text}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 font-inter">
              © 2024 GenieAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;