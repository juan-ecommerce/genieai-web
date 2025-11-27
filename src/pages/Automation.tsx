import React, { useState } from 'react';
import { Zap, Workflow, Users, BarChart3, Settings, ArrowRight } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const Automation: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const automationTypes = [
    {
      icon: Workflow,
      title: "Business Process Automation",
      description: "Streamline complex workflows with intelligent automation.",
      features: ["Process mapping", "Workflow optimization", "Exception handling", "Performance monitoring"]
    },
    {
      icon: Users,
      title: "Customer Journey Automation",
      description: "Automate customer interactions from lead to support.",
      features: ["Lead qualification", "Email sequences", "Support ticketing", "Follow-up campaigns"]
    },
    {
      icon: BarChart3,
      title: "Data Pipeline Automation",
      description: "Automated data collection, processing, and analysis.",
      features: ["Data ingestion", "ETL processes", "Real-time analytics", "Automated reporting"]
    },
    {
      icon: Settings,
      title: "Integration Platforms",
      description: "No-code automation with n8n, Make.com, and Zapier.",
      features: ["n8n workflows", "Make.com automations", "Zapier integrations", "Custom API connections"]
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full mb-6">
            <Zap className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-gray-300 font-medium">Automation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Business Automation
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Streamline workflows and boost productivity with intelligent automation solutions
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center shadow-lg shadow-green-500/30 transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Automation Solutions
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive automation for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {automationTypes.map((automation, index) => {
              const IconComponent = automation.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl p-8 hover:bg-black/60 hover:border-green-500/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-lg w-fit mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {automation.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {automation.description}
                  </p>
                  <div className="space-y-2">
                    {automation.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
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
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Let's optimize your workflows and increase efficiency
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
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

export default Automation;
