import React, { useState } from 'react';
import { TrendingUp, Database, Brain, Code, ArrowRight } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const DataScience: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const services = [
    {
      icon: Brain,
      title: "Machine Learning Engineering",
      description: "Build and deploy ML models for production environments.",
      features: ["Model development", "Feature engineering", "Model deployment", "Performance optimization"]
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Extract insights from your data with advanced analytics.",
      features: ["Data analysis", "Statistical modeling", "Predictive analytics", "Business intelligence"]
    },
    {
      icon: Code,
      title: "MLOps & Infrastructure",
      description: "Scalable ML infrastructure and deployment pipelines.",
      features: ["CI/CD for ML", "Model monitoring", "A/B testing", "Version control"]
    },
    {
      icon: TrendingUp,
      title: "AI Strategy & Consulting",
      description: "Strategic guidance for AI implementation and scaling.",
      features: ["AI roadmap", "Use case identification", "ROI analysis", "Team training"]
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full mb-6">
            <TrendingUp className="h-5 w-5 text-orange-400 mr-2" />
            <span className="text-gray-300 font-medium">Data Science</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Data Science & ML Engineering
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Transform data into actionable insights with advanced analytics and machine learning
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center shadow-lg shadow-orange-500/30 transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Our Services
            </h2>
            <p className="text-xl text-gray-400">
              End-to-end data science and ML solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-8 hover:bg-black/60 hover:border-orange-500/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-lg w-fit mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>
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
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Leverage Your Data?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Let's build intelligent data solutions for your business
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
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

export default DataScience;
