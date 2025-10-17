import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Brain, Zap, ArrowRight, CheckCircle, FileText, Network } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const RAG: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const ragTypes = [
    {
      icon: Database,
      title: "Traditional RAG",
      description: "Classic retrieval-augmented generation with vector databases and semantic search for enhanced AI responses.",
      features: ["Vector embeddings", "Semantic search", "Document retrieval", "Context injection"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Agentic RAG",
      description: "Advanced multi-agent systems that autonomously plan, search, and synthesize information from multiple sources.",
      features: ["Multi-agent orchestration", "Autonomous planning", "Cross-source validation", "Dynamic reasoning"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Network,
      title: "Graph RAG",
      description: "Knowledge graph-enhanced RAG systems that understand relationships and connections between information.",
      features: ["Knowledge graphs", "Relationship mapping", "Entity linking", "Contextual connections"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Real-time RAG",
      description: "Live document processing and retrieval systems that provide up-to-the-minute information access.",
      features: ["Live indexing", "Real-time updates", "Streaming data", "Instant retrieval"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    "Accurate, up-to-date information",
    "Reduced AI hallucinations",
    "Enterprise knowledge integration",
    "Scalable information retrieval",
    "Context-aware responses",
    "Multi-source data synthesis"
  ];

  const useCases = [
    {
      title: "Enterprise Knowledge Assistant",
      description: "Transform your company's documents, policies, and databases into an intelligent, searchable knowledge base accessible through natural language queries.",
      results: "90% faster information retrieval, 85% reduction in support tickets"
    },
    {
      title: "Legal Document Analysis",
      description: "Agentic RAG systems that can analyze contracts, legal precedents, and regulations to provide comprehensive legal insights and recommendations.",
      results: "75% faster legal research, 95% accuracy in document analysis"
    },
    {
      title: "Technical Documentation Hub",
      description: "RAG-powered systems that instantly access and synthesize information from technical manuals, API docs, and knowledge bases.",
      results: "60% reduction in developer onboarding time, instant technical support"
    },
    {
      title: "Customer Support Intelligence",
      description: "AI agents with access to product manuals, FAQs, and support history to provide accurate, contextual customer assistance.",
      results: "80% first-contact resolution, 24/7 intelligent support"
    }
  ];

  const technologies = [
    "Vector Databases (Pinecone, Weaviate, Chroma)",
    "Embedding Models (OpenAI, Sentence Transformers)",
    "LLM Integration (GPT-4, Claude, Llama)",
    "Knowledge Graphs (Neo4j, Amazon Neptune)",
    "Document Processing (LangChain, LlamaIndex)",
    "Real-time Indexing (Elasticsearch, Solr)"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-600/30"></div>
          
          {/* Large Floating Orbs with Strong Glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/60 to-indigo-500/40 rounded-full blur-3xl animate-pulse shadow-[0_0_100px_rgba(168,85,247,0.5)]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-violet-400/50 to-purple-500/60 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_rgba(139,92,246,0.6)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-indigo-500/50 to-blue-500/40 rounded-full blur-2xl animate-pulse shadow-[0_0_90px_rgba(99,102,241,0.4)]" style={{animationDelay: '4s'}}></div>
          
          {/* Bright Moving Particles */}
          <div className="absolute top-20 left-10 w-6 h-6 bg-purple-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(168,85,247,0.8)]" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-violet-300 rounded-full animate-bounce shadow-[0_0_25px_rgba(139,92,246,0.9)]" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce shadow-[0_0_18px_rgba(99,102,241,0.7)]" style={{animationDelay: '3s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-20 right-32 w-4 h-4 bg-blue-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-60 left-1/2 w-7 h-7 bg-fuchsia-400 rounded-full animate-bounce shadow-[0_0_22px_rgba(232,121,249,0.8)]" style={{animationDelay: '1.5s', animationDuration: '2.8s'}}></div>
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-pink-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(244,114,182,0.7)]" style={{animationDelay: '3.5s', animationDuration: '3.2s'}}></div>
          
          {/* Large Geometric Shapes with Glow */}
          <div className="absolute top-16 right-16 w-16 h-16 border-4 border-purple-400/60 rotate-45 animate-spin shadow-[0_0_30px_rgba(168,85,247,0.6)]" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-16 left-16 w-12 h-12 border-4 border-violet-400/70 animate-spin shadow-[0_0_25px_rgba(139,92,246,0.7)]" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-indigo-400/40 rounded-full animate-spin shadow-[0_0_45px_rgba(99,102,241,0.5)]" style={{animationDuration: '20s'}}></div>
          <div className="absolute top-1/2 right-8 w-10 h-10 bg-gradient-to-r from-purple-400/60 to-indigo-400/50 transform rotate-12 animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.5)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-32 left-1/3 w-14 h-14 border-3 border-indigo-400/50 rounded-full animate-spin shadow-[0_0_28px_rgba(99,102,241,0.5)]" style={{animationDuration: '10s'}}></div>
          <div className="absolute bottom-40 right-1/4 w-8 h-20 bg-gradient-to-t from-violet-400/40 to-purple-400/60 transform rotate-45 animate-pulse shadow-[0_0_25px_rgba(139,92,246,0.6)]" style={{animationDelay: '2.5s', animationDuration: '4s'}}></div>
          
          {/* Intense Sweeping Light Beams */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse shadow-[0_0_50px_rgba(168,85,247,0.4)]" style={{animationDuration: '4s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-violet-400/15 to-transparent animate-pulse shadow-[0_0_40px_rgba(139,92,246,0.5)]" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-400/10 to-transparent animate-pulse shadow-[0_0_35px_rgba(99,102,241,0.3)]" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          </div>
          
          {/* Enhanced Neural Network with Glowing Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ragLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#a855f7" stopOpacity="1"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8"/>
              </linearGradient>
              <filter id="ragGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g className="animate-pulse" style={{animationDuration: '8s'}}>
              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#ragLineGradient)" strokeWidth="3" filter="url(#ragGlow)"/>
              <line x1="70%" y1="10%" x2="90%" y2="30%" stroke="url(#ragLineGradient)" strokeWidth="3" filter="url(#ragGlow)"/>
              <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="url(#ragLineGradient)" strokeWidth="3" filter="url(#ragGlow)"/>
              <line x1="80%" y1="70%" x2="60%" y2="90%" stroke="url(#ragLineGradient)" strokeWidth="3" filter="url(#ragGlow)"/>
              <line x1="50%" y1="10%" x2="50%" y2="30%" stroke="url(#ragLineGradient)" strokeWidth="3" filter="url(#ragGlow)"/>
              <line x1="15%" y1="50%" x2="35%" y2="70%" stroke="url(#ragLineGradient)" strokeWidth="2" filter="url(#ragGlow)"/>
              <line x1="65%" y1="40%" x2="85%" y2="60%" stroke="url(#ragLineGradient)" strokeWidth="2" filter="url(#ragGlow)"/>
            </g>
            <g className="animate-pulse" style={{animationDuration: '6s', animationDelay: '3s'}}>
              <circle cx="20%" cy="30%" r="4" fill="#8b5cf6" opacity="0.8" filter="url(#ragGlow)"/>
              <circle cx="80%" cy="20%" r="3" fill="#a855f7" opacity="0.9" filter="url(#ragGlow)"/>
              <circle cx="30%" cy="70%" r="5" fill="#6366f1" opacity="0.7" filter="url(#ragGlow)"/>
              <circle cx="70%" cy="80%" r="3" fill="#8b5cf6" opacity="0.8" filter="url(#ragGlow)"/>
            </g>
          </svg>
          
          {/* Floating Energy Rings */}
          <div className="absolute top-1/3 left-1/5 w-32 h-32 border-4 border-purple-400/50 rounded-full animate-spin shadow-[0_0_40px_rgba(168,85,247,0.6)]" style={{animationDuration: '12s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-24 h-24 border-3 border-violet-400/60 rounded-full animate-spin shadow-[0_0_35px_rgba(139,92,246,0.7)]" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-indigo-400/40 rounded-full animate-spin shadow-[0_0_45px_rgba(99,102,241,0.5)]" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 rounded-full mb-8">
            <Database className="h-5 w-5 text-cyan-300 mr-2" />
            <span className="text-cyan-100 font-semibold">RAG & Agentic RAG Systems</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-inter mb-8 text-white">
            Retrieval-Augmented
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Generation Systems
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            I'm passionate about building RAG systems that make knowledge truly accessible. From traditional RAG to advanced Agentic RAG, 
            I create intelligent systems that eliminate information silos and provide instant, accurate access to your data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              Start Your RAG Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/ai-agents" 
              className="border border-cyan-400/50 hover:border-cyan-300 text-cyan-100 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-400/10"
              onClick={() => window.scrollTo(0, 0)}
            >
              View AI Agents
            </Link>
          </div>
        </div>
      </section>

      {/* RAG Types */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              RAG Systems I Build
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic document retrieval to advanced agentic systems, I implement the right RAG architecture for your specific needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {ragTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.color} mb-6`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {type.description}
                </p>
                <div className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              Why RAG Systems Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RAG systems bridge the gap between AI capabilities and your business knowledge, providing accurate, contextual, and up-to-date information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-900 font-semibold">{benefit}</span>
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
              RAG Projects I've Built
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some examples of RAG systems I've created and the impact they've had.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold text-gray-900">Results:</span>
                  </div>
                  <p className="text-gray-700">{useCase.results}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              RAG Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with the latest and most powerful RAG technologies to build robust, scalable systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-semibold">{tech}</span>
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
            Let's Build Your RAG System Together
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            I'd love to help you transform your knowledge into an intelligent, accessible AI system. Let's chat about your RAG needs!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
            >
              Start Your RAG Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/about" 
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Learn About Me
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

export default RAG;
