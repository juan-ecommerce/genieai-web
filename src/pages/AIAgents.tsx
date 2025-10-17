import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Brain, MessageSquare, ArrowRight, CheckCircle, Star, Code, Database } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const AIAgents: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const agentTypes = [
    {
      icon: MessageSquare,
      title: "RAG-Powered Agents",
      description: "AI agents with Retrieval-Augmented Generation for real-time knowledge access and contextual responses.",
      features: ["Document retrieval", "Knowledge base integration", "Contextual understanding", "Real-time updates"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Agentic RAG Systems",
      description: "Multi-agent systems that autonomously search, retrieve, and synthesize information from multiple sources.",
      features: ["Multi-source retrieval", "Autonomous reasoning", "Cross-reference validation", "Dynamic knowledge graphs"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Code,
      title: "Code Generation Agents",
      description: "Specialized agents for software development, code review, and automation with RAG-enhanced capabilities.",
      features: ["Code generation", "Documentation retrieval", "Best practices integration", "Context-aware suggestions"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Database,
      title: "Knowledge Management Agents",
      description: "Intelligent agents that organize, retrieve, and synthesize information from enterprise knowledge bases.",
      features: ["Enterprise search", "Knowledge extraction", "Semantic understanding", "Automated indexing"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const capabilities = [
    "RAG System Architecture",
    "Agentic RAG Implementation", 
    "Vector Database Integration",
    "Multi-Source Knowledge Retrieval",
    "Real-time Document Processing",
    "Enterprise Security"
  ];

  const useCases = [
    {
      title: "Enterprise Knowledge Assistant",
      description: "RAG-powered agents that instantly access and synthesize information from company documents, policies, and databases.",
      results: "90% reduction in information search time, 85% accuracy improvement"
    },
    {
      title: "Intelligent Document Processing",
      description: "Agentic RAG systems that automatically extract, categorize, and cross-reference information from multiple document sources.",
      results: "75% faster document processing, 95% data accuracy"
    },
    {
      title: "Dynamic Knowledge Base",
      description: "Self-updating RAG systems that continuously learn from new documents and maintain current, relevant knowledge.",
      results: "Real-time knowledge updates, 60% reduction in manual maintenance"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Enhanced Background Effects */}
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
              <linearGradient id="aiLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
              </linearGradient>
              <filter id="aiGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g className="animate-pulse" style={{animationDuration: '8s'}}>
              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#aiLineGradient)" strokeWidth="3" filter="url(#aiGlow)"/>
              <line x1="70%" y1="10%" x2="90%" y2="30%" stroke="url(#aiLineGradient)" strokeWidth="3" filter="url(#aiGlow)"/>
              <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="url(#aiLineGradient)" strokeWidth="3" filter="url(#aiGlow)"/>
              <line x1="80%" y1="70%" x2="60%" y2="90%" stroke="url(#aiLineGradient)" strokeWidth="3" filter="url(#aiGlow)"/>
              <line x1="50%" y1="10%" x2="50%" y2="30%" stroke="url(#aiLineGradient)" strokeWidth="3" filter="url(#aiGlow)"/>
              <line x1="15%" y1="50%" x2="35%" y2="70%" stroke="url(#aiLineGradient)" strokeWidth="2" filter="url(#aiGlow)"/>
              <line x1="65%" y1="40%" x2="85%" y2="60%" stroke="url(#aiLineGradient)" strokeWidth="2" filter="url(#aiGlow)"/>
            </g>
            <g className="animate-pulse" style={{animationDuration: '6s', animationDelay: '3s'}}>
              <circle cx="20%" cy="30%" r="4" fill="#3b82f6" opacity="0.8" filter="url(#aiGlow)"/>
              <circle cx="80%" cy="20%" r="3" fill="#06b6d4" opacity="0.9" filter="url(#aiGlow)"/>
              <circle cx="30%" cy="70%" r="5" fill="#8b5cf6" opacity="0.7" filter="url(#aiGlow)"/>
              <circle cx="70%" cy="80%" r="3" fill="#3b82f6" opacity="0.8" filter="url(#aiGlow)"/>
            </g>
          </svg>
          
          {/* Floating Energy Rings */}
          <div className="absolute top-1/3 left-1/5 w-32 h-32 border-4 border-blue-400/50 rounded-full animate-spin shadow-[0_0_40px_rgba(59,130,246,0.6)]" style={{animationDuration: '12s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-24 h-24 border-3 border-cyan-400/60 rounded-full animate-spin shadow-[0_0_35px_rgba(6,182,212,0.7)]" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-purple-400/40 rounded-full animate-spin shadow-[0_0_45px_rgba(168,85,247,0.5)]" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 rounded-full mb-8">
            <Bot className="h-5 w-5 text-cyan-300 mr-2" />
            <span className="text-cyan-200 font-medium">AI Agents & LLMs</span>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 rounded-full text-sm font-semibold mb-8">
              🤖 AI Agent Specialists
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-inter mb-8 text-white leading-tight">
              AI Agents & 
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  RAG Systems
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              I specialize in building intelligent AI agents powered by RAG and Agentic RAG systems. 
              Let me help you transform your knowledge into actionable intelligence with cutting-edge AI capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
              >
                Build Your AI Agent
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              ⚡ What I Build
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-gray-900">
              AI Agent Types I Create
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-inter leading-relaxed">
              From simple task automation to complex multi-agent systems - I love building AI that thinks and acts intelligently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentTypes.map((agent, index) => {
              const IconComponent = agent.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`bg-gradient-to-r ${agent.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900 group-hover:text-blue-600 transition-colors relative z-10">
                    {agent.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed relative z-10">
                    {agent.description}
                  </p>
                  <ul className="space-y-2">
                    {agent.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              What My AI Agents Can Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I build AI agents with powerful capabilities that can handle complex tasks and reasoning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-900">{capability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              Projects I've Worked On
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some examples of AI agent projects I've built and the results they achieved.
            </p>
          </div>
          
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                    <p className="text-blue-600 font-medium">{useCase.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white font-inter">
            Let's Build Your AI Agent Together
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            I'd love to help you create an intelligent AI agent tailored to your specific needs and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
            >
              Start Your AI Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/automation" 
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore Automation
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

export default AIAgents;
