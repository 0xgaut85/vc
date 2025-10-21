'use client';

import { useState } from "react";
import { motion } from "framer-motion";

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
    section: "Basic Information",
    items: [
      { id: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Enter your company name', span: 1 },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'founder@company.com', span: 1 },
      { id: 'founders', label: 'Founder Names', type: 'text', required: true, placeholder: 'John Doe, Jane Smith', span: 1 },
      { id: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Paris, France', span: 1 },
    ]
  },
  { 
    section: "Company Details",
    items: [
      { id: 'sector', label: 'Sector', type: 'select', required: true, options: ['AI', 'Robotics', 'Crypto', 'Consumer App', 'Developer Tools', 'Other'], span: 1 },
      { id: 'stage', label: 'Stage', type: 'select', required: true, options: ['Pre-seed', 'Seed', 'Series A'], span: 1 },
      { id: 'deck', label: 'Pitch Deck URL', type: 'url', required: true, placeholder: 'https://...', span: 1 },
      { id: 'site', label: 'Website / Demo', type: 'url', required: false, placeholder: 'https://...', span: 1 },
    ]
  },
  { 
    section: "Business Model",
    items: [
      { id: 'problem', label: 'Problem Statement', type: 'textarea', required: true, placeholder: 'What problem are you solving?', span: 2 },
      { id: 'solution', label: 'Solution', type: 'textarea', required: true, placeholder: 'How does your product solve this problem?', span: 2 },
      { id: 'market', label: 'Target Market', type: 'textarea', required: true, placeholder: 'Who are your customers and what is the market size?', span: 2 },
      { id: 'business', label: 'Business Model', type: 'textarea', required: true, placeholder: 'How do you make money?', span: 2 },
    ]
  },
  { 
    section: "Traction & Competition",
    items: [
      { id: 'traction', label: 'Traction', type: 'textarea', required: true, placeholder: 'Revenue, users, partnerships, pilots...', span: 2 },
      { id: 'competition', label: 'Competition', type: 'textarea', required: true, placeholder: 'Who are your competitors and what is your advantage?', span: 2 },
    ]
  },
  { 
    section: "Team & Funding",
    items: [
      { id: 'team', label: 'Team Background', type: 'textarea', required: true, placeholder: 'Tell us about your team and relevant experience', span: 2 },
      { id: 'previous', label: 'Previous Experience', type: 'textarea', required: false, placeholder: 'Previous companies, exits, relevant background...', span: 2 },
      { id: 'amount', label: 'Funding Target', type: 'text', required: true, placeholder: '$1.5M', span: 1 },
      { id: 'timing', label: 'Timeline', type: 'text', required: true, placeholder: 'Q2 2025', span: 1 },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="heading-lg mb-6">Thank You!</h1>
            <p className="body-lg text-[color:var(--steel)]">
              We've received your submission and will get back to you shortly.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container-pro">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="eyebrow mb-6">Get in Touch</p>
          <h1 className="heading-xl mb-6">Submit Your Deck</h1>
          <p className="body-lg text-[color:var(--steel)]">
            If you're building something exceptional, we want to see it. 
            Fill out the form below and we'll get back to you within 48 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-16">
            {fields.map((section, sectionIdx) => (
              <div key={section.section}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mb-8"
                >
                  <h3 className="heading-sm mb-2">{section.section}</h3>
                  <div className="w-16 h-px bg-gradient-to-r from-[color:var(--cloud)] to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((field, fieldIdx) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: fieldIdx * 0.05 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className={field.span === 2 ? 'md:col-span-2' : ''}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium mb-3 tracking-tight">
                        {field.label}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                        {!field.required && <span className="text-[color:var(--steel)] ml-2 text-xs">(Optional)</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          id={field.id}
                          value={formData[field.id as keyof FormData] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className={`input-field ${errors[field.id] ? 'border-red-400' : ''}`}
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
                          rows={4}
                          className={`input-field resize-none ${errors[field.id] ? 'border-red-400' : ''}`}
                          required={field.required}
                        />
                      ) : (
                        <input
                          id={field.id}
                          type={field.type}
                          value={formData[field.id as keyof FormData] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className={`input-field ${errors[field.id] ? 'border-red-400' : ''}`}
                          required={field.required}
                        />
                      )}
                      
                      {errors[field.id] && (
                        <p className="text-red-400 text-xs mt-2">{errors[field.id]}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center pt-8"
            >
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary px-12 py-4 text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Deck'
                )}
              </button>
            </motion.div>

            {/* Privacy Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center text-sm text-[color:var(--steel)] max-w-2xl mx-auto"
            >
              By submitting this form, you consent to your information being processed to evaluate your application. 
              We respect your privacy and will only use this data for investment evaluation purposes.
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
