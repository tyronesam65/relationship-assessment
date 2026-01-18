
import React, { useState, useMemo } from 'react';
import { CheckIcon } from './icons/CheckIcon';
import { ShareIcon } from './icons/ShareIcon';
import { CopyIcon } from './icons/CopyIcon';
import { Answer } from '../types';
import { encodeData, getSharableBaseUrl, isEnvironmentSharable, packAnswers } from '../utils/urlUtils';

interface InvitationScreenProps {
  partner1Name: string;
  partner1Answers: Answer[];
}

const InvitationScreen: React.FC<InvitationScreenProps> = ({ partner1Name, partner1Answers }) => {
  const [copied, setCopied] = useState(false);
  const isSharable = isEnvironmentSharable();
  
  const inviteLink = useMemo(() => {
      const data = {
          p1n: partner1Name,
          p1a: packAnswers(partner1Answers)
      };
      const serializedData = encodeData(data);
      const baseUrl = getSharableBaseUrl();
      return `${baseUrl}?data=${serializedData}`;
  }, [partner1Name, partner1Answers]);

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
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white p-6 md:p-12 rounded-2xl shadow-lg w-full max-w-lg mx-auto animate-fade-in">
      <div className="text-center">
        <div className="bg-green-100 p-4 rounded-full mb-6 inline-block">
          <CheckIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-serif text-brand-text mb-2">Your Part is Done!</h2>
        <p className="text-brand-text-light mb-8 text-sm md:text-base px-2">Now, share this unique link with your partner. Your answers are securely saved within it. Once they complete their part, you'll both see the final report.</p>

        {!isSharable && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-left text-xs mb-6 flex items-start gap-3">
            <span className="text-xl mt-0.5">⚠️</span>
            <div>
              <p className="font-bold mb-1">Preview Environment Detected</p>
              <p>Links generated here might not work on your partner's computer. Please ensure you are sharing the link from the <strong>publicly deployed version</strong>.</p>
            </div>
          </div>
        )}

        <div className="bg-brand-secondary p-4 md:p-6 rounded-lg mb-8">
            <p className="text-xs text-brand-text-light uppercase tracking-wider mb-2 font-bold">Your Personal Invite Link</p>
            <div className="bg-white p-2 md:p-3 rounded-md flex flex-col gap-3 border border-gray-200 shadow-inner">
                <input 
                    type="text"
                    readOnly 
                    value={inviteLink}
                    className="text-xs text-brand-text-light bg-transparent w-full focus:outline-none truncate px-1 text-center font-mono py-2"
                    style={{ minWidth: '150px' }} // Ensures it looks substantial
                />
                <div className="flex items-center gap-2 w-full">
                    <button 
                        onClick={handleCopy} 
                        className="flex-1 text-brand-primary border border-brand-primary font-semibold transition-all duration-200 flex items-center justify-center px-3 py-2.5 rounded-md hover:bg-brand-accent active:scale-95"
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
                            className="flex-1 bg-brand-pink text-white font-semibold transition-all duration-200 flex items-center justify-center px-3 py-2.5 rounded-md hover:opacity-90 active:scale-95"
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
        
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-left text-xs mb-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">ⓘ</span>
          <p>You can safely close this window. Your partner will share a new link with you once they are finished.</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationScreen;
