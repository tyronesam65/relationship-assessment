
import React, { useState } from 'react';
import { CheckIcon } from './icons/CheckIcon';
import { ShareIcon } from './icons/ShareIcon';
import { CopyIcon } from './icons/CopyIcon';

interface WaitingScreenProps {
  inviteLink: string;
  onCheckStatus: () => void;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({ inviteLink, onCheckStatus }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join a Marriage Assessment',
          text: `Join me for a marriage assessment to connect and grow together! You can join here: ${inviteLink}`,
          // The 'url' property is removed to prevent errors with blob URLs in sandboxed environments.
          // The link is included in the 'text' property instead.
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  
  return (
    <div className="text-center flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg animate-fade-in">
        <div className="bg-green-100 p-4 rounded-full mb-6">
            <CheckIcon className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-brand-text mb-4">
            Your Part is Complete!
        </h1>
        <p className="max-w-md mx-auto text-brand-text-light mb-8">
            Thank you. Your results are saved. The full relationship report will be generated as soon as your partner completes their part of the assessment using the invite link.
        </p>

        <div className="bg-brand-secondary p-6 rounded-lg mb-8 w-full max-w-md">
            <p className="text-sm text-brand-text-light uppercase tracking-wider mb-2">Share the Invite Link Again</p>
            <div className="bg-white p-3 rounded-md flex items-center justify-between gap-2">
                <input 
                    type="text"
                    readOnly 
                    value={inviteLink}
                    className="text-sm text-brand-text-light bg-transparent w-full focus:outline-none truncate"
                />
                <div className="flex-shrink-0 flex items-center gap-2">
                    <button 
                        onClick={handleCopy} 
                        className="text-brand-primary hover:text-opacity-80 font-semibold transition-all duration-200 flex items-center justify-center px-3 py-2 rounded-md hover:bg-brand-accent"
                        style={{minWidth: '100px'}}
                    >
                        {copied ? (
                            <span className="text-green-600 flex items-center gap-1">
                                <CheckIcon className="w-5 h-5" />
                                Copied!
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <CopyIcon className="w-5 h-5" />
                                Copy
                            </span>
                        )}
                    </button>
                    {navigator.share && (
                         <button 
                            onClick={handleShare} 
                            className="bg-brand-primary text-white font-semibold transition-all duration-200 flex items-center justify-center px-3 py-2 rounded-md hover:bg-opacity-90"
                        >
                            <span className="flex items-center gap-2">
                                <ShareIcon className="w-5 h-5" />
                                Share
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>

        <button
            onClick={onCheckStatus}
            className="w-full max-w-xs bg-brand-primary text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md"
        >
            Check for Results
        </button>
    </div>
  );
};

export default WaitingScreen;