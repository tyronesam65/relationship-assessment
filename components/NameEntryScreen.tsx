
import React, { useState } from 'react';

interface NameEntryScreenProps {
  onContinue: (name: string) => void;
  onBack: () => void;
  isPartner2Flow?: boolean;
}

const NameEntryScreen: React.FC<NameEntryScreenProps> = ({ onContinue, onBack, isPartner2Flow }) => {
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      onContinue(name);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-lg mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-brand-text mb-2">Let's get to know you</h2>
        <p className="text-brand-text-light">
            {isPartner2Flow ? "Please enter your name to begin." : "Your partner will receive an invite to join."}
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text-light mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 bg-white border border-gray-300 text-brand-text-light py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full sm:w-1/2 bg-brand-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NameEntryScreen;