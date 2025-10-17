import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Settings, Workflow, Clock, ArrowRight, CheckCircle, TrendingUp, Users, BarChart3, Shield } from 'lucide-react';

const Automation: React.FC = () => {
  const automationTypes = [
    {
      icon: Workflow,
      title: "Business Process Automation",
      description: "Streamline complex workflows with intelligent automation that adapts to your business needs.",
      features: ["Process mapping", "Workflow optimization", "Exception handling", "Performance monitoring"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Customer Journey Automation",
      description: "Automate customer interactions from lead generation to post-sale support.",
      features: ["Lead qualification", "Email sequences", "Support ticketing", "Follow-up campaigns"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Data Pipeline Automation",
      description: "Automated data collection, processing, and analysis for real-time insights.",
      features: ["Data ingestion", "ETL processes", "Real-time analytics", "Automated reporting"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Settings,
      title: "Integration Platforms",
      description: "Expert implementation of no-code/low-code automation platforms for seamless workflows.",
      features: ["n8n workflows", "Make.com automations", "Zapier integrations", "Custom API connections"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce manual work by up to 80%",
      metric: "80%"
    },
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "Boost productivity across teams",
      metric: "3x"
    },
    {
      icon: Shield,
      title: "Error Reduction",
      description: "Minimize human errors in processes",
      metric: "95%"
    }
  ];

  const integrationPlatforms = [
    {
      name: "n8n",
      description: "Open-source workflow automation with 400+ integrations",
      features: ["Self-hosted option", "Visual workflow builder", "Custom nodes", "Advanced logic"]
    },
    {
      name: "Make.com",
      description: "Powerful visual platform for connecting apps and automating workflows",
      features: ["Visual scenario builder", "Real-time execution", "Advanced filters", "Error handling"]
    },
    {
      name: "Zapier",
      description: "Popular automation platform with 5000+ app integrations",
      features: ["Easy setup", "Multi-step workflows", "Conditional logic", "Team collaboration"]
    }
  ];

  const industries = [
    "Healthcare & Medical",
    "Financial Services",
    "E-commerce & Retail",
    "Manufacturing",
    "Real Estate",
    "Legal Services",
    "Marketing Agencies",
    "SaaS Companies"
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/30"></div>
          
          {/* Large Floating Orbs with Strong Glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-green-500/60 to-emerald-500/40 rounded-full blur-3xl animate-pulse shadow-[0_0_100px_rgba(34,197,94,0.5)]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-teal-400/50 to-green-500/60 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_rgba(20,184,166,0.6)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-emerald-500/50 to-cyan-500/40 rounded-full blur-2xl animate-pulse shadow-[0_0_90px_rgba(16,185,129,0.4)]" style={{animationDelay: '4s'}}></div>
          
          {/* Bright Moving Particles */}
          <div className="absolute top-20 left-10 w-6 h-6 bg-green-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(34,197,94,0.8)]" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-emerald-300 rounded-full animate-bounce shadow-[0_0_25px_rgba(16,185,129,0.9)]" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-teal-400 rounded-full animate-bounce shadow-[0_0_18px_rgba(20,184,166,0.7)]" style={{animationDelay: '3s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-20 right-32 w-4 h-4 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(6,182,212,0.8)]" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-60 left-1/2 w-7 h-7 bg-lime-400 rounded-full animate-bounce shadow-[0_0_22px_rgba(163,230,53,0.8)]" style={{animationDelay: '1.5s', animationDuration: '2.8s'}}></div>
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-mint-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(52,211,153,0.7)]" style={{animationDelay: '3.5s', animationDuration: '3.2s'}}></div>
          
          {/* Large Geometric Shapes with Glow */}
          <div className="absolute top-16 right-16 w-16 h-16 border-4 border-green-400/60 rotate-45 animate-spin shadow-[0_0_30px_rgba(34,197,94,0.6)]" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-16 left-16 w-12 h-12 border-4 border-emerald-400/70 animate-spin shadow-[0_0_25px_rgba(16,185,129,0.7)]" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-teal-400/40 rounded-full animate-spin shadow-[0_0_45px_rgba(20,184,166,0.5)]" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full mb-8">
            <Zap className="h-5 w-5 text-green-300 mr-2" />
            <span className="text-green-200 font-medium">Intelligent Automation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-inter mb-8 text-white">
            Automate Everything With
            <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              AI-Powered Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            I'm passionate about automation and love working with n8n, Make.com, and Zapier to create intelligent workflows. 
            From simple task automation to complex multi-system integrations, I build solutions that save time and eliminate repetitive work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center">
              Automate Your Processes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border border-green-400 text-green-300 px-8 py-4 rounded-xl font-semibold hover:bg-green-400/10 transition-colors duration-300">
              See Automation Demo
            </button>
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              Automation Solutions I Create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I specialize in building intelligent automation workflows using n8n, Make.com, and Zapier. I love connecting different systems and creating seamless processes that just work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {automationTypes.map((automation, index) => (
              <div key={index} className="group bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${automation.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <automation.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900">
                  {automation.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {automation.description}
                </p>
                
                <ul className="space-y-2">
                  {automation.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              Measurable Business Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our automation solutions deliver quantifiable results from day one.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-green-200 text-center hover:shadow-xl transition-all duration-300">
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {benefit.metric}
                </div>
                
                <h3 className="text-xl font-bold font-inter mb-4 text-gray-900">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Platforms */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              My Favorite Automation Platforms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I have extensive experience with these powerful automation platforms and love building with them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {integrationPlatforms.map((platform, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="bg-green-100 p-4 rounded-xl w-fit mx-auto mb-4">
                    <Settings className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold font-inter text-gray-900 mb-2">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {platform.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {platform.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automation solutions tailored for diverse industry needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 text-center">
                <span className="font-semibold text-gray-900">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              How I Approach Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My systematic approach to building automation solutions that actually work and scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Understanding", description: "I dive deep into your current processes to identify the best automation opportunities" },
              { step: "02", title: "Design", description: "I create custom automation workflows tailored specifically to your needs" },
              { step: "03", title: "Build", description: "I implement and integrate the automation with your existing systems" },
              { step: "04", title: "Optimize", description: "I monitor, refine, and help you scale the automation for maximum impact" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold font-inter mb-4 text-gray-900">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white font-inter">
            Let's Automate Your Workflows Together
          </h2>
          <p className="text-xl text-green-100 mb-12">
            I'd love to help you identify automation opportunities and build intelligent systems that save you time and effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center">
              Start Automation Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/data-science" 
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore Data Science
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Automation;
