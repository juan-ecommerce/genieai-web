import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';
import ContactModal from './ContactModal';


const Layout: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'AI Agents', href: '/ai-agents' },
    { name: 'RAG Systems', href: '/rag' },
    { name: 'Automation', href: '/automation' },
    { name: 'Data Science', href: '/data-science' },
    { name: 'About', href: '/about' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/src/images/small_logo_with_text.png" 
                alt="GenieAI" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-inter font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : scrollY > 50 
                        ? 'text-gray-700 hover:text-blue-600' 
                        : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className={`px-6 py-2 rounded-lg font-inter font-semibold transition-all duration-300 ${
                  scrollY > 50
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm'
                }`}
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-3 rounded-lg transition-all duration-300 border ${
                scrollY > 50 
                  ? 'bg-gray-100 hover:bg-gray-200 border-gray-300' 
                  : 'bg-white/90 backdrop-blur-sm hover:bg-white border-white/50'
              }`}
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${scrollY > 50 ? 'text-gray-700' : 'text-gray-800'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${scrollY > 50 ? 'text-gray-700' : 'text-gray-800'}`} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-200">
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 font-inter font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-inter font-semibold transition-colors duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/30">
                  <img 
                    src="/src/images/logo_dark_background.png" 
                    alt="GenieAI" 
                    className="h-16 w-auto border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <p className="text-gray-400 font-inter leading-relaxed">
                Next-generation AI automation agency specializing in multi-modal AI solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold font-inter mb-4">Services</h3>
              <ul className="space-y-3">
                <li><Link to="/ai-agents" className="text-gray-400 hover:text-white transition-colors duration-200 font-inter">AI Agents</Link></li>
                <li><Link to="/rag" className="text-gray-400 hover:text-white transition-colors duration-200 font-inter">RAG Systems</Link></li>
                <li><Link to="/automation" className="text-gray-400 hover:text-white transition-colors duration-200 font-inter">Automation</Link></li>
                <li><Link to="/data-science" className="text-gray-400 hover:text-white transition-colors duration-200 font-inter">Data Science</Link></li>
              </ul>
            </div>
            
            
            <div>
              <h3 className="text-white font-semibold font-inter mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-400 font-inter">juan@avancedev.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-400 font-inter">+46 79 334 8387</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-400 font-inter">Stockholm, Sweden</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-center">
              <p className="text-gray-400 font-inter text-sm">
                © 2025 GenieAI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;
