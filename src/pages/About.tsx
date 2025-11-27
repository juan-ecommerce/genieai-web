import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const About: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            About GenieAI
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Your partner in AI transformation
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-12 shadow-2xl shadow-cyan-500/10">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Who We Are
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                GenieAI is a specialized AI automation agency focused on delivering cutting-edge AI solutions 
                for modern businesses. We combine deep expertise in machine learning, natural language processing, 
                and automation to create intelligent systems that drive real business value.
              </p>
              <p>
                Our team specializes in building custom AI agents, RAG systems, and automation workflows 
                that help organizations leverage the power of artificial intelligence. Whether you're looking 
                to automate customer support, build intelligent knowledge systems, or streamline business processes, 
                we have the expertise to bring your vision to life.
              </p>
              <p>
                We work with cutting-edge technologies including OpenAI, Anthropic Claude, open-source LLMs, 
                vector databases, and automation platforms like n8n, Make.com, and Zapier.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-blue-500/20">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Our Expertise
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "AI Agents & LLMs",
                  "RAG Systems",
                  "Business Automation",
                  "Machine Learning",
                  "Data Science",
                  "MLOps & Deployment",
                  "Integration Platforms",
                  "Custom AI Solutions"
                ].map((skill, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12">
          <Mail className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6 text-white">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to transform your business with AI?
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get In Touch
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

export default About;
