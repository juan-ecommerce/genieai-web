import React, { useState } from 'react';
import { X, Mail, Phone, User, Send, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    contactType: 'email',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = encodeURIComponent('New Contact Form Submission - GenieAI');
      const body = encodeURIComponent(`
Name: ${formData.name}
${formData.contactType === 'email' ? 'Email' : 'Phone'}: ${formData.contact}
Message: ${formData.message || 'No additional message provided'}

Submitted from GenieAI website contact form.
      `);
      
      window.location.href = `mailto:juan@avancedev.com?subject=${subject}&body=${body}`;
      
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', contact: '', contactType: 'email', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setFormData({ name: '', contact: '', contactType: 'email', message: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold font-inter text-gray-900">
            Get Started
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold font-inter mb-4 text-gray-900">
              Thank You!
            </h3>
            <p className="text-gray-600">
              Your message has been sent successfully. I'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <p className="text-gray-600 text-sm">
              Share your details and I'll get back to you within 24 hours to discuss your AI project.
            </p>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Contact Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Preferred Contact Method *
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactType"
                    value="email"
                    checked={formData.contactType === 'email'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactType"
                    value="phone"
                    checked={formData.contactType === 'phone'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Phone</span>
                </label>
              </div>
            </div>

            {/* Contact Field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-gray-900 mb-2">
                {formData.contactType === 'email' ? 'Email Address' : 'Phone Number'} *
              </label>
              <div className="relative">
                {formData.contactType === 'email' ? (
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                ) : (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                )}
                <input
                  type={formData.contactType === 'email' ? 'email' : 'tel'}
                  id="contact"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder={formData.contactType === 'email' ? 'your@email.com' : '+1 (555) 123-4567'}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Tell me about your project (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Briefly describe your AI automation needs..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.contact}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-gray-500 text-xs text-center">
              Your information is secure and will only be used to contact you about your inquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
