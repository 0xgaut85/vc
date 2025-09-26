'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  consent: boolean;
};

const steps = [
  // Basic Info
  { id: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Enter your company name' },
  { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'founder@company.com' },
  { id: 'founders', label: 'Founder Names', type: 'text', required: true, placeholder: 'John Doe, Jane Smith' },
  { id: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Paris, France' },
  
  // Company Details
  { id: 'sector', label: 'Sector', type: 'select', required: true, options: ['AI', 'Robotics', 'Crypto', 'Consumer App', 'Developer Tools', 'Other'] },
  { id: 'stage', label: 'Stage', type: 'select', required: true, options: ['Pre-seed', 'Seed', 'Series A'] },
  { id: 'deck', label: 'Pitch Deck URL', type: 'url', required: true, placeholder: 'https://...' },
  { id: 'site', label: 'Website / Demo', type: 'url', required: false, placeholder: 'https://...' },
  
  // Business Model
  { id: 'problem', label: 'Problem Statement', type: 'textarea', required: true, placeholder: 'What problem are you solving?' },
  { id: 'solution', label: 'Solution', type: 'textarea', required: true, placeholder: 'How does your product solve this problem?' },
  { id: 'market', label: 'Target Market', type: 'textarea', required: true, placeholder: 'Who are your customers and what is the market size?' },
  { id: 'business', label: 'Business Model', type: 'textarea', required: true, placeholder: 'How do you make money?' },
  
  // Traction & Competition
  { id: 'traction', label: 'Traction', type: 'textarea', required: true, placeholder: 'Revenue, users, partnerships, pilots...' },
  { id: 'competition', label: 'Competition', type: 'textarea', required: true, placeholder: 'Who are your competitors and what is your advantage?' },
  
  // Team & Background
  { id: 'team', label: 'Team Background', type: 'textarea', required: true, placeholder: 'Tell us about your team and relevant experience' },
  { id: 'previous', label: 'Previous Experience', type: 'textarea', required: false, placeholder: 'Previous companies, exits, relevant background...' },
  
  // Funding
  { id: 'amount', label: 'Funding Target', type: 'text', required: true, placeholder: '$1.5M' },
  { id: 'timing', label: 'Timeline', type: 'text', required: true, placeholder: 'Q2 2025' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [consent, setConsent] = useState(false);

  const currentField = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (value: string) => {
    const newData = { ...formData, [currentField.id]: value };
    setFormData(newData);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - show consent
      if (!consent) {
        setConsent(true);
        return;
      }
      handleSubmit(newData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: Partial<FormData>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/submit', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ ...data, consent: true }) 
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="container-pro py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h1 className="heading-xl">Thank You</h1>
                  <p className="body-lg mt-6 text-[color:var(--steel)] max-w-2xl">
                    We will get back to you shortly.
                  </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-pro py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center mb-12"
      >
        <h1 className="heading-xl">Submit Your Deck</h1>
        <p className="body-lg mt-6 text-[color:var(--steel)] max-w-2xl mx-auto">
          If you are building, we want to see it.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between text-sm text-[color:var(--steel)] mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[color:var(--ink)] rounded-full h-1">
            <motion.div 
              className="bg-white h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          className="bg-[color:var(--ink)] border border-[color:var(--cloud)] rounded-2xl p-8 min-h-[400px] flex flex-col justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <AnimatePresence mode="wait">
            {!consent ? (
              <GameStep
                key={currentStep}
                field={currentField}
                value={formData[currentField.id as keyof FormData] as string || ''}
                onNext={handleNext}
                onBack={handleBack}
                canGoBack={currentStep > 0}
                isLoading={loading}
              />
            ) : (
              <ConsentStep
                key="consent"
                onAccept={() => handleSubmit(formData)}
                onBack={() => setConsent(false)}
                isLoading={loading}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Hint */}
        <motion.p 
          className="text-center text-sm text-[color:var(--steel)] mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Press Enter to continue or use the buttons
        </motion.p>
      </div>
    </div>
  );
}

function GameStep({ field, value, onNext, onBack, canGoBack, isLoading }: {
  field: any;
  value: string;
  onNext: (value: string) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLoading: boolean;
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (field.required && !inputValue.trim()) return;
    onNext(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && field.type !== 'textarea' && (!field.required || inputValue.trim())) {
      onNext(inputValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-2 text-white">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </h2>
      
      {!field.required && (
        <p className="text-[color:var(--steel)] mb-8 text-sm">Optional - skip if not applicable</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {field.type === 'select' ? (
          <div className="space-y-4">
            {field.options.map((option: string) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => onNext(option)}
                className="w-full p-4 rounded-xl border border-[color:var(--cloud)] bg-transparent text-white hover:bg-[color:var(--cloud)] hover:bg-opacity-10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        ) : field.type === 'textarea' ? (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full text-left text-lg bg-transparent border-2 border-[color:var(--cloud)] rounded-xl text-white placeholder-[color:var(--steel)] p-4 focus:outline-none focus:border-white transition-colors duration-300 resize-none"
            autoFocus
          />
        ) : (
          <input
            type={field.type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={field.placeholder}
            className="w-full text-center text-xl bg-transparent border-b-2 border-[color:var(--cloud)] text-white placeholder-[color:var(--steel)] py-4 focus:outline-none focus:border-white transition-colors duration-300"
            autoFocus
          />
        )}

        <div className="flex gap-4 justify-center pt-4">
          {canGoBack && (
            <motion.button
              type="button"
              onClick={onBack}
              className="px-6 py-3 rounded-xl border border-[color:var(--cloud)] text-[color:var(--cloud)] hover:bg-[color:var(--cloud)] hover:bg-opacity-10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
          )}
          
          {field.type !== 'select' && (
            <motion.button
              type="submit"
              disabled={field.required && !inputValue.trim()}
              className="px-8 py-3 rounded-xl bg-white text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: field.required && !inputValue.trim() ? 1 : 1.05 }}
              whileTap={{ scale: field.required && !inputValue.trim() ? 1 : 0.95 }}
            >
              {field.required ? 'Continue' : 'Continue or Skip'}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

function ConsentStep({ onAccept, onBack, isLoading }: {
  onAccept: () => void;
  onBack: () => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Almost Done!</h2>
      
      <div className="bg-[color:var(--cloud)] bg-opacity-5 rounded-xl p-6 mb-8">
        <p className="text-[color:var(--steel)] leading-relaxed">
          I consent to my information being processed to evaluate my application. 
          We respect your privacy and will only use this data for investment evaluation purposes.
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[color:var(--cloud)] text-[color:var(--cloud)] hover:bg-[color:var(--cloud)] hover:bg-opacity-10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
        
        <motion.button
          onClick={onAccept}
          disabled={isLoading}
          className="px-8 py-3 rounded-xl bg-white text-black font-medium disabled:opacity-50 hover:opacity-90 transition-all duration-300"
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          {isLoading ? 'Submitting...' : 'Submit Deck'}
        </motion.button>
      </div>
    </motion.div>
  );
}
