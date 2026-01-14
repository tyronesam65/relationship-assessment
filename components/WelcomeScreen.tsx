
import React from 'react';
import { HeartIcon } from './icons/HeartIcon';
import { CheckIcon } from './icons/CheckIcon';

interface WelcomeScreenProps {
  onStart: () => void;
  onJoin: () => void;
  isPartner2Flow?: boolean;
  partner1Name?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onJoin, isPartner2Flow, partner1Name }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg animate-fade-in">
      <div className="bg-brand-secondary p-4 rounded-full mb-6">
        <HeartIcon className="w-8 h-8 text-brand-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-serif text-brand-text mb-4">
        {isPartner2Flow ? `Welcome!` : 'Marriage Relationship Assessment'}
      </h1>
      <p className="max-w-xl mx-auto text-brand-text-light mb-8">
        {isPartner2Flow 
          ? `${partner1Name || 'Your partner'} has invited you to a relationship assessment. Complete your part to see your shared report.`
          : 'A guided journey to help you and your partner reflect on your connection, identify strengths, and discover opportunities for growth together.'}
      </p>

      {!isPartner2Flow && (
        <div className="w-full max-w-md bg-brand-secondary p-6 rounded-lg mb-8 text-left">
          <h2 className="text-lg font-semibold text-brand-text mb-3">How it works</h2>
          <ul className="space-y-3 text-brand-text-light">
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
              <span><strong>Answer thoughtfully:</strong> Spend ~15 minutes on a private questionnaire about your relationship.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
              <span><strong>Invite your partner:</strong> Share a unique link for them to complete their own private assessment.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
              <span><strong>Get your report:</strong> Instantly receive a combined, personalized report with insights and conversation starters.</span>
            </li>
          </ul>
        </div>
      )}

      <button
        onClick={isPartner2Flow ? onJoin : onStart}
        className="w-full max-w-sm bg-brand-primary text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md"
      >
        {isPartner2Flow ? 'Join Assessment' : 'Start Your Assessment'}
      </button>

      {!isPartner2Flow && (
          <p className="mt-4 text-sm text-brand-text-light">
              Already have an invite? <button onClick={onJoin} className="font-semibold text-brand-primary hover:underline">Join your partner here.</button>
          </p>
      )}
    </div>
  );
};

export default WelcomeScreen;