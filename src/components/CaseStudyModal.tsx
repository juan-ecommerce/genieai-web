import React from 'react';
import { X } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  icon: React.ComponentType<any>;
  color: string;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, caseStudy }) => {
  if (!isOpen || !caseStudy) return null;

  const IconComponent = caseStudy.icon;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className={`${caseStudy.color} px-10 py-8 text-white relative`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative z-10">
              <div className="flex items-start space-x-6 mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 shadow-lg">
                  <IconComponent className="h-10 w-10" />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold font-inter mb-2 leading-tight">{caseStudy.title}</h2>
                  <p className="text-xl opacity-90 font-medium">{caseStudy.subtitle}</p>
                </div>
              </div>
              
              <p className="text-lg opacity-95 leading-relaxed max-w-4xl">
                {caseStudy.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          <div className="px-10 py-8 space-y-10">
            {/* Challenge */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-4 shadow-lg"></div>
                The Challenge
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {caseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow-lg"></div>
                Our Solution
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {caseStudy.solution}
              </p>
            </div>

            {/* Technologies */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 shadow-lg"></div>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 bg-white text-gray-800 rounded-xl font-semibold border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-4 shadow-lg"></div>
                Results & Impact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="bg-green-100 p-2 rounded-full mt-1 shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CaseStudyModal;
