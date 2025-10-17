import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic, Video, MessageSquare, Layers, Database, Bot, TrendingUp, Image } from 'lucide-react';
import ContactModal from '../components/ContactModal';
import CaseStudyModal from '../components/CaseStudyModal';

// Import the existing components from App.tsx
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`absolute opacity-20 ${
            i % 3 === 0 ? 'animate-spin' : i % 3 === 1 ? 'animate-pulse' : 'animate-bounce'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${8 + Math.random() * 6}s`
          }}
        >
          {i % 4 === 0 && <div className="w-8 h-8 border-2 border-cyan-400/40 rotate-45" />}
          {i % 4 === 1 && <div className="w-6 h-6 bg-blue-400/30 rounded-full" />}
          {i % 4 === 2 && <div className="w-4 h-12 bg-purple-400/20 rounded-full" />}
          {i % 4 === 3 && <div className="w-10 h-2 bg-cyan-400/25 rounded-full" />}
        </div>
      ))}
    </div>
  );
};

const NeuralNetwork = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        {Array.from({ length: 20 }).map((_, i) => {
          const x1 = (i % 5) * 200 + 100;
          const y1 = Math.floor(i / 5) * 150 + 75;
          const x2 = ((i + 1) % 5) * 200 + 100;
          const y2 = Math.floor((i + 1) / 5) * 150 + 75;
          
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#gradient)"
                strokeWidth="1"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <circle
                cx={x1}
                cy={y1}
                r="4"
                fill="#06b6d4"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            </g>
          );
        })}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Home: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);

  const services = [
    {
      icon: Bot,
      title: "AI Agents & RAG Systems",
      description: "Custosdsdm AI agents with Retrieval-Augmented Generation for enhanced knowledge access.",
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
    }
  ];

  const caseStudies = [
    {
      id: "zendesk-rag",
      title: "Zendesk RAG Support System",
      subtitle: "Intelligent Ticket Resolution with RAG",
      description: "AI-powered support system that automatically resolves customer tickets using historical data and knowledge retrieval.",
      challenge: "The customer support team was overwhelmed with repetitive tickets and needed a way to automatically provide accurate responses based on previously solved cases. Manual ticket resolution was time-consuming and inconsistent.",
      solution: "We developed a RAG-powered Zendesk app that uses OpenAI embeddings to create vector representations of historical tickets and solutions. When new tickets arrive, the system uses Deepseek LLM to search through the knowledge base, retrieve relevant solved cases, and generate contextually appropriate responses automatically.",
      technologies: ["OpenAI Embeddings", "Deepseek LLM", "Zendesk API", "Vector Database", "RAG Architecture", "Python", "FastAPI"],
      results: [
        "85% reduction in average ticket resolution time",
        "92% accuracy in automated responses",
        "60% decrease in support team workload",
        "Improved customer satisfaction scores by 40%",
        "24/7 automated support availability",
        "Consistent response quality across all agents"
      ],
      icon: MessageSquare,
      color: "bg-gradient-to-br from-blue-600 to-indigo-700"
    },
    {
      id: "recipe-calculator",
      title: "Smart Recipe Calculator",
      subtitle: "AI-Powered Cross-Selling for Food Products",
      description: "Intelligent system that analyzes recipes and recommends complementary food products to increase sales and customer satisfaction.",
      challenge: "A food product retailer wanted to increase cross-selling opportunities by helping customers discover complementary products for their recipes. Traditional recommendation systems were generic and didn't consider recipe context or ingredient relationships.",
      solution: "We built an AI-powered recipe analysis system that understands ingredient relationships, nutritional profiles, and cooking methods. The system analyzes customer recipes and intelligently suggests complementary products, seasonings, and ingredients that enhance the cooking experience while driving additional sales.",
      technologies: ["Natural Language Processing", "Recipe Analysis AI", "Product Recommendation Engine", "Nutritional Database", "Machine Learning", "React", "Node.js"],
      results: [
        "45% increase in average order value",
        "78% improvement in cross-selling conversion rates",
        "Enhanced customer cooking experience",
        "35% increase in customer retention",
        "Reduced food waste through better ingredient pairing",
        "Personalized shopping recommendations"
      ],
      icon: TrendingUp,
      color: "bg-gradient-to-br from-green-600 to-emerald-700"
    },
    {
      id: "n8n-sales-consultant",
      title: "AI Sales Consultant Automation",
      subtitle: "Intelligent Customer Journey Automation",
      description: "Automated sales consultant system that guides customers through their buying journey with personalized recommendations and support.",
      challenge: "The sales team couldn't provide 24/7 personalized consultation to all potential customers. Many leads were lost due to delayed responses and lack of immediate, intelligent guidance through the complex product selection process.",
      solution: "We created an intelligent n8n automation workflow that acts as a virtual sales consultant. The system uses AI to understand customer needs, preferences, and budget constraints, then provides personalized product recommendations, answers questions, and guides customers through the entire buying process with human-like intelligence.",
      technologies: ["n8n Automation", "OpenAI GPT", "Customer Journey Mapping", "CRM Integration", "Webhook APIs", "Natural Language Processing", "Decision Trees"],
      results: [
        "300% increase in lead qualification efficiency",
        "65% improvement in conversion rates",
        "24/7 intelligent customer support",
        "50% reduction in sales cycle length",
        "Personalized experience for every customer",
        "Seamless handoff to human sales team when needed"
      ],
      icon: Bot,
      color: "bg-gradient-to-br from-purple-600 to-violet-700"
    }
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "RAG-Powered Knowledge Systems",
      description: "AI agents with real-time document retrieval and contextual understanding",
      tags: ["RAG", "Knowledge Base", "Retrieval"]
    },
    {
      icon: Database,
      title: "Agentic RAG Solutions",
      description: "Multi-agent systems that autonomously search, retrieve, and synthesize information",
      tags: ["Agentic RAG", "Multi-Agent", "Autonomous"]
    },
    {
      icon: Layers,
      title: "Enterprise RAG Integration",
      description: "Connect your documents, databases, and knowledge bases to AI systems",
      tags: ["Enterprise", "Integration", "Knowledge"]
    }
  ];

  const handleCaseStudyClick = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsCaseStudyModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Ultra Futuristic Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/30"></div>
          
          {/* Enhanced Existing Components */}
          <ParticleField />
          <FloatingShapes />
          <NeuralNetwork />
          
          {/* Massive Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/70 to-indigo-500/50 rounded-full blur-3xl animate-pulse shadow-[0_0_150px_rgba(59,130,246,0.7)]" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/60 to-blue-500/70 rounded-full blur-3xl animate-pulse shadow-[0_0_120px_rgba(6,182,212,0.8)]" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-r from-purple-500/60 to-pink-500/50 rounded-full blur-2xl animate-pulse shadow-[0_0_130px_rgba(168,85,247,0.6)]" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/6 right-1/3 w-[380px] h-[380px] bg-gradient-to-r from-emerald-500/50 to-cyan-500/60 rounded-full blur-3xl animate-pulse shadow-[0_0_110px_rgba(16,185,129,0.5)]" style={{animationDelay: '6s'}}></div>
          
          {/* Large Bright Moving Particles */}
          <div className="absolute top-20 left-10 w-8 h-8 bg-blue-400 rounded-full animate-bounce shadow-[0_0_30px_rgba(59,130,246,1)]" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-10 h-10 bg-cyan-300 rounded-full animate-bounce shadow-[0_0_35px_rgba(6,182,212,1)]" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-20 w-7 h-7 bg-indigo-400 rounded-full animate-bounce shadow-[0_0_25px_rgba(99,102,241,0.9)]" style={{animationDelay: '3s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-20 right-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce shadow-[0_0_22px_rgba(168,85,247,1)]" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-60 left-1/2 w-9 h-9 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_32px_rgba(52,211,153,1)]" style={{animationDelay: '1.5s', animationDuration: '2.8s'}}></div>
          <div className="absolute bottom-60 right-1/3 w-7 h-7 bg-rose-400 rounded-full animate-bounce shadow-[0_0_28px_rgba(251,113,133,0.9)]" style={{animationDelay: '3.5s', animationDuration: '3.2s'}}></div>
          
          {/* Massive Geometric Shapes with Intense Glow */}
          <div className="absolute top-16 right-16 w-20 h-20 border-6 border-blue-400/70 rotate-45 animate-spin shadow-[0_0_50px_rgba(59,130,246,0.8)]" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-16 left-16 w-16 h-16 border-6 border-cyan-400/80 animate-spin shadow-[0_0_45px_rgba(6,182,212,0.9)]" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 right-8 w-14 h-14 bg-gradient-to-r from-blue-400/70 to-purple-400/60 transform rotate-12 animate-pulse shadow-[0_0_40px_rgba(99,102,241,0.7)]" style={{animationDelay: '1.5s'}}></div>
          
          {/* Holographic Grid Lines */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" style={{animationDuration: '3.5s', animationDelay: '2s'}}></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent animate-pulse" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
            <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" style={{animationDuration: '5s'}}></div>
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent animate-pulse" style={{animationDuration: '4s', animationDelay: '1.5s'}}></div>
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse" style={{animationDuration: '3.8s', animationDelay: '2.5s'}}></div>
            <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/25 to-transparent animate-pulse" style={{animationDuration: '4.2s', animationDelay: '0.8s'}}></div>
          </div>
          
          {/* Intense Multi-Directional Light Beams */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent animate-pulse" style={{animationDuration: '10s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent animate-pulse shadow-[0_0_80px_rgba(59,130,246,0.6)]" style={{animationDuration: '4s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400/20 to-transparent animate-pulse shadow-[0_0_70px_rgba(6,182,212,0.7)]" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-400/15 to-transparent animate-pulse shadow-[0_0_60px_rgba(168,85,247,0.5)]" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/18 to-transparent animate-pulse shadow-[0_0_65px_rgba(99,102,241,0.6)]" style={{animationDuration: '7s', animationDelay: '3s'}}></div>
          </div>
          
          {/* Massive Energy Rings */}
          <div className="absolute top-1/3 left-1/5 w-40 h-40 border-6 border-blue-400/60 rounded-full animate-spin shadow-[0_0_60px_rgba(59,130,246,0.8)]" style={{animationDuration: '12s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-32 h-32 border-5 border-cyan-400/70 rounded-full animate-spin shadow-[0_0_55px_rgba(6,182,212,0.9)]" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-3 border-purple-400/50 rounded-full animate-spin shadow-[0_0_70px_rgba(168,85,247,0.7)]" style={{animationDuration: '20s'}}></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-inter mb-8 text-white drop-shadow-2xl">
            HI, I'M JUAN
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x" style={{backgroundSize: '300% 300%'}}>
              GENAI ENGINEER & SOLUTION ARCHITECT
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto font-inter leading-relaxed">
            I'm a GenAI Engineer with 30 years of experience spanning Data Science, ML Engineering, and Solution Architecture. I specialize in Python, Hugging Face Transformers, LLMs, deep learning, and building end-to-end AI solutions from ETL pipelines with Spark to cutting-edge generative AI applications.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-5 rounded-xl text-xl font-bold font-inter transition-all duration-500 flex items-center justify-center transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">Get Contact</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              ✨ My Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              Full-Stack AI/ML Engineering
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-inter leading-relaxed">
              GenAI Engineer | Data Scientist | ML Engineer | Solution Architect - I build end-to-end AI solutions from data pipelines to production deployments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-inter mb-4 text-gray-900 group-hover:text-blue-600 transition-colors relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 font-inter relative z-10">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/ai-agents" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              🚀 My Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              Projects I've Built
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-inter leading-relaxed">
              Here are some of the AI and automation projects I've worked on that showcase my passion and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => {
              const IconComponent = caseStudy.icon;
              return (
                <div
                  key={index}
                  className={`${caseStudy.color} rounded-2xl p-8 text-white cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden group`}
                  onClick={() => handleCaseStudyClick(caseStudy)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-white/20 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-inter mb-4 relative z-10">
                    {caseStudy.title}
                  </h3>
                  <p className="text-lg opacity-90 mb-6 leading-relaxed relative z-10">
                    {caseStudy.description}
                  </p>
                  <div className="flex items-center text-white/80 hover:text-white transition-colors group-hover:translate-x-2 duration-300 relative z-10">
                    <span className="font-semibold">Read Full Case Study</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              What I Can Help You With
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-inter leading-relaxed">
              I love working on diverse AI and automation projects that combine different technologies to solve real-world problems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 group-hover:bg-blue-200 p-4 rounded-xl w-fit mb-6 transition-all duration-300">
                  <useCase.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold font-inter mb-4 text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 font-inter mb-6">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-inter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-inter">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-inter">
            I'd love to chat about your AI and automation ideas. Let's explore what we can create!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold font-inter hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link to="/about" className="border border-white text-white px-8 py-4 rounded-xl text-lg font-semibold font-inter hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      <CaseStudyModal 
        isOpen={isCaseStudyModalOpen} 
        onClose={() => setIsCaseStudyModalOpen(false)} 
        caseStudy={selectedCaseStudy}
      />
    </div>
  );
};

export default Home;
