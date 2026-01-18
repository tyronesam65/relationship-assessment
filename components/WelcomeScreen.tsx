
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
    <div className="text-center flex flex-col items-center justify-center p-5 md:p-8 bg-white rounded-2xl shadow-lg animate-fade-in border border-gray-100">
      <div className="bg-brand-secondary p-3 md:p-4 rounded-full mb-4 md:mb-6">
        <HeartIcon className="w-6 h-6 md:w-8 md:h-8 text-brand-primary" />
      </div>
      <h1 className="text-3xl md:text-5xl font-serif text-brand-text mb-3 md:mb-4 leading-tight">
        {isPartner2Flow ? `Welcome!` : 'Marriage Assessment'}
      </h1>
      <p className="max-w-xl mx-auto text-sm md:text-base text-brand-text-light mb-6 md:mb-8 px-2">
        {isPartner2Flow 
          ? `${partner1Name || 'Your partner'} has invited you to a relationship assessment. Complete your part to see your shared report.`
          : 'A guided journey to help you and your partner reflect on your connection and identify strengths together.'}
      </p>

      {!isPartner2Flow && (
        <div className="w-full max-w-md bg-brand-secondary p-5 md:p-6 rounded-lg mb-6 md:mb-8 text-left">
          <h2 className="text-base md:text-lg font-semibold text-brand-text mb-3">How it works</h2>
          <ul className="space-y-3 text-xs md:text-sm text-brand-text-light">
            <li className="flex items-start">
              <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
              <span><strong>Answer:</strong> Spend ~15 mins on a private questionnaire.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
              <span><strong>Invite:</strong> Share a unique link for your partner.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
              <span><strong>Report:</strong> Get a personalized combined report instantly.</span>
            </li>
          </ul>
        </div>
      )}

      <button
        onClick={isPartner2Flow ? onJoin : onStart}
        className="w-full max-w-sm bg-brand-primary text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md active:scale-95"
      >
        {isPartner2Flow ? 'Join Assessment' : 'Start Assessment'}
      </button>

      {!isPartner2Flow && (
          <p className="mt-4 text-xs md:text-sm text-brand-text-light">
              Already have an invite? <button onClick={onJoin} className="font-semibold text-brand-primary hover:underline">Join here.</button>
          </p>
      )}
    </div>
  );
};

export default WelcomeScreen;
