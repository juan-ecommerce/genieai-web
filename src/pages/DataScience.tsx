import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Database, TrendingUp, Brain, ArrowRight, CheckCircle, Target, Users, PieChart } from 'lucide-react';

const DataScience: React.FC = () => {
  const services = [
    {
      icon: Database,
      title: "Data Engineering & Pipeline",
      description: "Build robust data infrastructure that scales with your business needs.",
      features: ["Data warehouse design", "ETL/ELT pipelines", "Real-time streaming", "Data quality assurance"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Forecast trends and outcomes with advanced machine learning models.",
      features: ["Time series forecasting", "Demand prediction", "Risk assessment", "Customer behavior modeling"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Machine Learning Models",
      description: "Custom ML solutions for classification, regression, and clustering problems.",
      features: ["Model development", "Feature engineering", "Model optimization", "A/B testing"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: PieChart,
      title: "Business Intelligence",
      description: "Transform raw data into actionable business insights and dashboards.",
      features: ["Interactive dashboards", "KPI monitoring", "Automated reporting", "Data visualization"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const technologies = [
    "Python & R",
    "TensorFlow & PyTorch",
    "Apache Spark",
    "Snowflake & BigQuery",
    "Tableau & Power BI",
    "AWS & Azure ML",
    "Docker & Kubernetes",
    "Apache Airflow"
  ];

  const useCases = [
    {
      icon: Target,
      title: "Customer Segmentation",
      description: "Identify distinct customer groups for targeted marketing campaigns.",
      results: "35% increase in conversion rates"
    },
    {
      icon: TrendingUp,
      title: "Sales Forecasting",
      description: "Predict future sales with 95% accuracy using advanced time series models.",
      results: "20% improvement in inventory management"
    },
    {
      icon: Users,
      title: "Churn Prediction",
      description: "Identify customers at risk of leaving before they actually do.",
      results: "40% reduction in customer churn"
    }
  ];

  const industries = [
    { name: "E-commerce", description: "Recommendation engines, price optimization, inventory management" },
    { name: "Healthcare", description: "Diagnostic models, treatment optimization, patient outcome prediction" },
    { name: "Finance", description: "Fraud detection, risk assessment, algorithmic trading" },
    { name: "Manufacturing", description: "Predictive maintenance, quality control, supply chain optimization" },
    { name: "Marketing", description: "Customer lifetime value, campaign optimization, attribution modeling" },
    { name: "Real Estate", description: "Property valuation, market analysis, investment recommendations" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/30"></div>
          
          {/* Large Floating Orbs with Strong Glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/60 to-pink-500/40 rounded-full blur-3xl animate-pulse shadow-[0_0_100px_rgba(168,85,247,0.5)]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-fuchsia-400/50 to-purple-500/60 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_rgba(232,121,249,0.6)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-pink-500/50 to-rose-500/40 rounded-full blur-2xl animate-pulse shadow-[0_0_90px_rgba(236,72,153,0.4)]" style={{animationDelay: '4s'}}></div>
          
          {/* Bright Moving Particles */}
          <div className="absolute top-20 left-10 w-6 h-6 bg-purple-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(168,85,247,0.8)]" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-fuchsia-300 rounded-full animate-bounce shadow-[0_0_25px_rgba(232,121,249,0.9)]" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-pink-400 rounded-full animate-bounce shadow-[0_0_18px_rgba(236,72,153,0.7)]" style={{animationDelay: '3s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-20 right-32 w-4 h-4 bg-rose-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(244,63,94,0.8)]" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-60 left-1/2 w-7 h-7 bg-violet-400 rounded-full animate-bounce shadow-[0_0_22px_rgba(139,92,246,0.8)]" style={{animationDelay: '1.5s', animationDuration: '2.8s'}}></div>
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-magenta-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(217,70,239,0.7)]" style={{animationDelay: '3.5s', animationDuration: '3.2s'}}></div>
          
          {/* Large Geometric Shapes with Glow */}
          <div className="absolute top-16 right-16 w-16 h-16 border-4 border-purple-400/50 rotate-45 animate-spin shadow-[0_0_30px_rgba(168,85,247,0.6)]" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-16 left-16 w-12 h-12 border-4 border-fuchsia-400/70 animate-spin shadow-[0_0_25px_rgba(232,121,249,0.7)]" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-pink-400/40 rounded-full animate-spin shadow-[0_0_45px_rgba(236,72,153,0.5)]" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full mb-8">
            <BarChart3 className="h-5 w-5 text-purple-300 mr-2" />
            <span className="text-purple-200 font-medium">Data Science & Analytics</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-inter mb-8 text-white drop-shadow-2xl">
            Data Science & ML Engineering
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient-x" style={{backgroundSize: '300% 300%'}}>
              From ETL to Production ML
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto font-inter leading-relaxed">
            As a Data Scientist and ML Engineer, I build complete ML pipelines from data ingestion with Spark and ETL processes to production model deployment. I combine domain expertise, stakeholder communication, and deep technical skills in big data processing, warehousing, and ML algorithms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center">
              Start Data Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border border-purple-400 text-purple-300 px-8 py-4 rounded-xl font-semibold hover:bg-purple-400/10 transition-colors duration-300">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900">Data Science & ML Engineering Services</h3>
            <p className="text-gray-600 mb-8">Full-stack ML solutions from data pipelines to production deployment</p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I love working with data - from collection and processing to advanced ML models and beautiful visualizations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold font-inter mb-4 text-gray-900">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-6 text-gray-900">
              Technologies I Work With
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I love working with these cutting-edge tools and technologies to build robust data science solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-center">
                <span className="font-semibold text-gray-900">{tech}</span>
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
              Data Science Projects I've Built
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some examples of data science projects I've worked on and the results they achieved.
            </p>
          </div>
          
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-200">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-4 rounded-xl mr-6">
                      <useCase.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-inter text-gray-900">
                        {useCase.title}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Impact:</h4>
                    <p className="text-purple-600 font-medium">{useCase.results}</p>
                  </div>
                </div>
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
              Industries I've Worked With
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I enjoy working across different industries and love learning about unique business challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold font-inter mb-3 text-gray-900">
                  {industry.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white font-inter">
            Let's Turn Your Data Into Insights
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            I'd love to help you unlock the potential in your data and build ML solutions that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center">
              Start Data Science Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
    </div>
  );
};

export default DataScience;
