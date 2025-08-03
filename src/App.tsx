import React, { useState, useEffect } from 'react';
import { Bot, Zap, Brain, Settings, User, Calendar, Clock } from 'lucide-react';
import { supabase, ConsultationData } from './lib/supabase';
import { Toast } from './components/Toast';
import { ThankYouScreen } from './components/ThankYouScreen';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    isVisible: false,
    type: 'success',
    message: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    businessSize: '',
    service: '',
    processes: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "WORKFLOW AUTOMATION",
      description: "STREAMLINE REPETITIVE TASKS AND OPTIMIZE BUSINESS PROCESSES WITH INTELLIGENT AUTOMATION SOLUTIONS."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI ASSISTANTS",
      description: "DEPLOY SOPHISTICATED AI ASSISTANTS THAT HANDLE CUSTOMER INQUIRIES AND SUPPORT OPERATIONS 24/7."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "CUSTOM INTEGRATIONS",
      description: "SEAMLESSLY CONNECT YOUR EXISTING SYSTEMS WITH TAILORED AUTOMATION SOLUTIONS."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({
      isVisible: true,
      type,
      message
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.company.trim()) return 'Company name is required';
    if (!formData.businessSize) return 'Business size is required';
    if (!formData.service) return 'Service selection is required';
    if (!formData.processes.trim()) return 'Process description is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      showToast('error', validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      
      // Prepare data for Supabase (map businessSize to business_size)
      const consultationData: ConsultationData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim(),
        business_size: formData.businessSize,
        service: formData.service,
        processes: formData.processes.trim()
      };

      console.log('Prepared consultation data:', consultationData);

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('consultations')
        .insert([consultationData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Successfully inserted data:', data);

      // Success - show success message and reset form
      setShowThankYou(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        businessSize: '',
        service: '',
        processes: ''
      });


    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Something went wrong. Please try again or contact us directly.';
      
      showToast('error', `Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToBooking = () => {
    document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setShowThankYou(false);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If showing thank you screen, render only that
  if (showThankYou) {
    return <ThankYouScreen onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section - Exact Reference Match */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Dark Background */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Spline 3D Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <spline-viewer url="https://prod.spline.design/LUCK1F1ej6Ej13Re/scene.splinecode"></spline-viewer>
        </div>

        {/* Hero Content - Exact Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between w-full hero-content">
          {/* Left Side - Chrome Android Bust and Brand */}
          <div className="flex items-center space-x-4 sm:space-x-6 hero-left">
            <div className="chrome-android-bust">
              <User className="w-16 h-16 text-transparent" />
            </div>
            <div className="brand-text hidden md:block">
              <h2 className="text-xl sm:text-2xl font-light tracking-wider text-white">HER.AI AUTOMATION</h2>
            </div>
            <div className="mobile-brand-text block md:hidden">
              <h2 className="text-xl sm:text-2xl font-light tracking-wider text-white">HER.AI{'\n'}AUTOMATION</h2>
            </div>
          </div>

          {/* Center - Main Headline */}
          <div className="text-left hero-center">
            <h1 className="main-headline hidden md:block">
              AUTOMATE<br />
              YOUR<br />
              BUSINESS
            </h1>
            <h1 className="main-headline block md:hidden">
              AUTOMATE<br />
              YOUR<br />
              BUSINESS
            </h1>
          </div>

          {/* Right Side - Empty for balance */}
          <div className="flex items-center hero-right hidden md:block">
          </div>
        </div>

        {/* Book a Call Button - Top Right Corner */}
        <div className="absolute top-6 right-4 sm:top-8 sm:right-8 z-20">
          <button 
            onClick={scrollToBooking}
            className="glass-button mobile-book-button md:px-8 md:py-4 md:text-lg font-semibold hover:scale-105 transition-transform"
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            BOOK A CALL
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 gradient-text">ABOUT HER.AI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              WE REVOLUTIONIZE BUSINESSES THROUGH INTELLIGENT AUTOMATION, COMBINING CUTTING-EDGE AI 
              WITH SEAMLESS INTEGRATION TO STREAMLINE OPERATIONS AND ACCELERATE GROWTH.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="floating-card group">
              <div className="chrome-avatar mb-6">
                <Brain className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">INTELLIGENT SOLUTIONS</h3>
              <p className="text-gray-300">ADVANCED AI ALGORITHMS THAT ADAPT AND LEARN FROM YOUR BUSINESS PROCESSES.</p>
            </div>

            <div className="floating-card group">
              <div className="chrome-avatar mb-6">
                <Zap className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">LIGHTNING FAST</h3>
              <p className="text-gray-300">DEPLOY AUTOMATION SOLUTIONS IN DAYS, NOT MONTHS, WITH IMMEDIATE ROI.</p>
            </div>

            <div className="floating-card group">
              <div className="chrome-avatar mb-6">
                <Settings className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">SEAMLESS INTEGRATION</h3>
              <p className="text-gray-300">WORKS WITH YOUR EXISTING SYSTEMS WITHOUT DISRUPTING CURRENT WORKFLOWS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 gradient-text">OUR SERVICES</h2>
            <p className="text-xl text-gray-300">COMPREHENSIVE AUTOMATION SOLUTIONS TAILORED TO YOUR BUSINESS NEEDS</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card"
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="service-icon text-cyan-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book-call" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 transform-headline">
              <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                READY TO TRANSFORM?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">SCHEDULE A CONSULTATION WITH OUR AUTOMATION EXPERTS</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Purple Card */}
            <div className="bg-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">BOOK YOUR STRATEGY CALL</h3>
              <p className="text-purple-100 mb-6 text-lg">
                30-MINUTE CONSULTATION TO DISCUSS YOUR AUTOMATION NEEDS
              </p>
              
              <div className="flex items-center mb-8 text-purple-100">
                <Clock className="w-5 h-5 mr-3" />
                <span className="font-medium">AVAILABLE TIMES: MON–FRI 9AM–5PM PST</span>
              </div>

              <button className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors text-lg">
                SELECT TIME SLOT
              </button>
            </div>

            {/* Right Column - Form */}
            <div className="floating-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="futuristic-input"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="futuristic-input"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="COMPANY NAME"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="futuristic-input"
                    required
                  />
                </div>

                <div>
                  <select
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleInputChange}
                    className="futuristic-input"
                    required
                  >
                    <option value="">SELECT BUSINESS SIZE</option>
                    <option value="startup">STARTUP (1-10 EMPLOYEES)</option>
                    <option value="small">SMALL BUSINESS (11-50 EMPLOYEES)</option>
                    <option value="medium">MEDIUM BUSINESS (51-200 EMPLOYEES)</option>
                    <option value="large">LARGE ENTERPRISE (200+ EMPLOYEES)</option>
                  </select>
                </div>

                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="futuristic-input"
                    required
                  >
                    <option value="">SELECT SERVICE</option>
                    <option value="workflow">WORKFLOW AUTOMATION</option>
                    <option value="ai-assistants">AI ASSISTANTS</option>
                    <option value="integrations">CUSTOM INTEGRATIONS</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="processes"
                    placeholder="WHAT PROCESSES WOULD YOU LIKE TO AUTOMATE?"
                    value={formData.processes}
                    onChange={handleInputChange}
                    rows={4}
                    className="futuristic-input resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300
                    ${isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed opacity-70' 
                      : 'bg-purple-600 hover:bg-purple-700 hover:scale-105'
                    } text-white
                  `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      SUBMITTING...
                    </div>
                  ) : (
                    'GET YOUR AUTOMATION STRATEGY'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Removed Case Studies Section */}
      <section className="py-20 relative">
        {/* This section is intentionally empty - placeholder for future content */}
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="chrome-logo mx-auto mb-4">
            <Bot className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-gray-400 mb-2">HER.AI AUTOMATION</p>
          <p className="text-gray-500 text-sm">© 2025 HER.AI Automation. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;