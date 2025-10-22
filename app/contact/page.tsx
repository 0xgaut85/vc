'use client';

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type FormData = {
  company: string;
  email: string;
  site: string;
  deck: string;
  sector: string;
  stage: string;
  amount: string;
  traction: string;
  location: string;
  timing: string;
  founders: string;
  problem: string;
  solution: string;
  market: string;
  competition: string;
  business: string;
  team: string;
  previous: string;
};

const fields = [
  { 
    section: "Essential Information",
    subtitle: "Tell us about your company",
    items: [
      { id: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Your company name', span: 1 },
      { id: 'email', label: 'Contact Email', type: 'email', required: true, placeholder: 'founder@company.com', span: 1 },
      { id: 'founders', label: 'Founder Names', type: 'text', required: true, placeholder: 'Full names of all founders', span: 1 },
      { id: 'location', label: 'Headquarters', type: 'text', required: true, placeholder: 'City, Country', span: 1 },
    ]
  },
  { 
    section: "Company Profile",
    subtitle: "Help us understand your business",
    items: [
      { id: 'sector', label: 'Primary Sector', type: 'select', required: true, options: ['AI + Blockchain', 'DeFi', 'Infrastructure', 'Gaming', 'Developer Tools', 'Other'], span: 1 },
      { id: 'stage', label: 'Funding Stage', type: 'select', required: true, options: ['Pre-seed', 'Seed', 'Series A', 'Series B'], span: 1 },
      { id: 'deck', label: 'Pitch Deck URL', type: 'url', required: true, placeholder: 'https://docsend.com/...', span: 1 },
      { id: 'site', label: 'Website URL', type: 'url', required: false, placeholder: 'https://yourcompany.com', span: 1 },
    ]
  },
  { 
    section: "The Opportunity",
    subtitle: "What problem are you solving?",
    items: [
      { id: 'problem', label: 'Problem Statement', type: 'textarea', required: true, placeholder: 'Describe the problem your company is solving and why it matters...', span: 2 },
      { id: 'solution', label: 'Your Solution', type: 'textarea', required: true, placeholder: 'Explain your solution and what makes it unique...', span: 2 },
      { id: 'market', label: 'Market Opportunity', type: 'textarea', required: true, placeholder: 'Target customers, market size, and growth potential...', span: 2 },
      { id: 'business', label: 'Business Model', type: 'textarea', required: true, placeholder: 'How do you generate revenue? What are your unit economics?', span: 2 },
    ]
  },
  { 
    section: "Traction & Competitive Edge",
    subtitle: "Show us your progress",
    items: [
      { id: 'traction', label: 'Current Traction', type: 'textarea', required: true, placeholder: 'Revenue, users, partnerships, key metrics...', span: 2 },
      { id: 'competition', label: 'Competitive Landscape', type: 'textarea', required: true, placeholder: 'Who are your competitors and what is your defensible advantage?', span: 2 },
    ]
  },
  { 
    section: "Team & Funding Details",
    subtitle: "The people and the ask",
    items: [
      { id: 'team', label: 'Team Background', type: 'textarea', required: true, placeholder: 'Relevant experience, technical expertise, and why your team is uniquely positioned to win...', span: 2 },
      { id: 'previous', label: 'Notable Experience', type: 'textarea', required: false, placeholder: 'Previous companies, exits, research, or other relevant achievements...', span: 2 },
      { id: 'amount', label: 'Raising Amount', type: 'text', required: true, placeholder: 'e.g., $2M', span: 1 },
      { id: 'timing', label: 'Closing Timeline', type: 'text', required: true, placeholder: 'e.g., Q2 2025', span: 1 },
    ]
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(section => {
      section.items.forEach(field => {
        if (field.required && !formData[field.id as keyof FormData]?.trim()) {
          newErrors[field.id] = 'This field is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submit', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4F2EF] via-white to-[#F4F2EF] opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container-pro relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-black flex items-center justify-center mx-auto mb-12 shadow-2xl"
            >
              <motion.svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-6xl font-semibold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Submission Received
            </motion.h1>
            
            <motion.p 
              className="text-xl text-[color:var(--dark-gray)] mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Thank you for your interest in Ascentis Capital. We've received your deck and will carefully review it. 
              If there's a potential fit, we'll reach out within 48 hours.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="/" className="btn-primary">
                Back to Home
              </a>
              <a href="/portfolio" className="btn-secondary">
                View Portfolio
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F4F2EF]/30 to-white" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)',
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative z-10 py-24 lg:py-32">
        <div className="container-pro">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block mb-8"
            >
              <div className="px-6 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-[color:var(--dark-gray)] font-medium">
                  Investment Inquiry
                </p>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-semibold mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Let's Build the Future<br />Together
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-[color:var(--dark-gray)] leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              We partner with exceptional founders building category-defining companies in Web3, AI, and decentralized infrastructure. 
              Share your vision with us.
            </motion.p>
            
            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-32 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent mx-auto mt-12"
            />
          </motion.div>

          {/* Form Container with Elevated Card Design */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
              {/* Form Header */}
              <div className="px-8 lg:px-16 py-12 bg-gradient-to-br from-[#F4F2EF] to-white border-b border-black/5">
                <h2 className="text-3xl font-semibold mb-3 tracking-tight">Application Form</h2>
                <p className="text-[color:var(--dark-gray)] text-lg">
                  Take your time. Quality over speed — we read every submission carefully.
                </p>
              </div>
              
              {/* Form Body */}
              <form onSubmit={handleSubmit} className="px-8 lg:px-16 py-12">
                <div className="space-y-20">
                  {fields.map((section, sectionIdx) => (
                    <motion.div 
                      key={section.section}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: sectionIdx * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {/* Section Header */}
                      <div className="mb-10">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                            {String(sectionIdx + 1).padStart(2, '0')}
                          </div>
                          <h3 className="text-2xl font-semibold tracking-tight">{section.section}</h3>
                        </div>
                        <p className="text-[color:var(--dark-gray)] ml-14">{section.subtitle}</p>
                      </div>

                      {/* Fields Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-0 lg:ml-14">
                        {section.items.map((field, fieldIdx) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: fieldIdx * 0.05 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={field.span === 2 ? 'md:col-span-2' : ''}
                          >
                            <label htmlFor={field.id} className="block text-sm font-semibold mb-3 tracking-tight">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1.5">*</span>}
                              {!field.required && <span className="text-[color:var(--dark-gray)] ml-2 text-xs font-normal">(Optional)</span>}
                            </label>
                            
                            {field.type === 'select' ? (
                              <select
                                id={field.id}
                                value={formData[field.id as keyof FormData] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                className={`w-full px-5 py-4 bg-white border-2 rounded-xl text-base
                                  transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                                  hover:border-black/30
                                  ${errors[field.id] ? 'border-red-400 focus:ring-red-400' : 'border-black/10'}`}
                                required={field.required}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : field.type === 'textarea' ? (
                              <textarea
                                id={field.id}
                                value={formData[field.id as keyof FormData] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                rows={5}
                                className={`w-full px-5 py-4 bg-white border-2 rounded-xl text-base resize-none
                                  transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                                  hover:border-black/30
                                  ${errors[field.id] ? 'border-red-400 focus:ring-red-400' : 'border-black/10'}`}
                                required={field.required}
                              />
                            ) : (
                              <input
                                id={field.id}
                                type={field.type}
                                value={formData[field.id as keyof FormData] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                className={`w-full px-5 py-4 bg-white border-2 rounded-xl text-base
                                  transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                                  hover:border-black/30
                                  ${errors[field.id] ? 'border-red-400 focus:ring-red-400' : 'border-black/10'}`}
                                required={field.required}
                              />
                            )}
                            
                            {errors[field.id] && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm mt-2 font-medium"
                              >
                                {errors[field.id]}
                              </motion.p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Submit Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-20 pt-12 border-t border-black/10"
                >
                  <div className="flex flex-col items-center gap-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`group relative px-16 py-5 bg-black text-white rounded-full text-lg font-semibold
                        transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                        overflow-hidden`}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center gap-2">
                          Submit Application
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      )}
                    </button>

                    {/* Privacy Notice */}
                    <p className="text-center text-sm text-[color:var(--dark-gray)] max-w-2xl leading-relaxed">
                      By submitting this form, you consent to your information being processed for investment evaluation purposes. 
                      We respect your privacy and handle all submissions with strict confidentiality.
                    </p>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-20"
          >
            <p className="text-[color:var(--dark-gray)] mb-6">
              Questions about the application process?
            </p>
            <a 
              href="https://x.com/ascentiscapital" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black font-medium hover:opacity-70 transition-opacity duration-300"
            >
              Reach out on X
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
