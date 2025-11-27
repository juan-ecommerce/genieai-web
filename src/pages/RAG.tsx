import React, { useState } from 'react';
import { Database, Brain, Zap, ArrowRight, Network } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const RAG: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const ragTypes = [
    {
      icon: Database,
      title: "Traditional RAG",
      description: "Classic retrieval-augmented generation with vector databases and semantic search.",
      features: ["Vector embeddings", "Semantic search", "Document retrieval", "Context injection"]
    },
    {
      icon: Brain,
      title: "Agentic RAG",
      description: "Advanced multi-agent systems that autonomously plan and search information.",
      features: ["Multi-agent orchestration", "Autonomous planning", "Cross-source validation", "Dynamic reasoning"]
    },
    {
      icon: Network,
      title: "Graph RAG",
      description: "Knowledge graph-enhanced RAG systems understanding relationships between information.",
      features: ["Knowledge graphs", "Relationship mapping", "Entity linking", "Contextual connections"]
    },
    {
      icon: Zap,
      title: "Real-time RAG",
      description: "Live document processing and retrieval systems for up-to-the-minute information.",
      features: ["Live indexing", "Real-time updates", "Streaming data", "Instant retrieval"]
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6">
            <Database className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-gray-300 font-medium">RAG Systems</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Retrieval-Augmented Generation
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Build intelligent systems that combine AI with your knowledge base for accurate, contextual responses
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center shadow-lg shadow-purple-500/30 transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* RAG Types */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              RAG Solutions
            </h2>
            <p className="text-xl text-gray-400">
              Different approaches to retrieval-augmented generation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            {ragTypes.map((rag, index) => {
              const IconComponent = rag.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-8 hover:bg-black/60 hover:border-purple-500/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg w-fit mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {rag.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {rag.description}
                  </p>
                  <div className="space-y-2">
                    {rag.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Implement RAG?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Let's build intelligent knowledge systems for your organization
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
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
