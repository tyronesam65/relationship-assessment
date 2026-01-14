
import React from 'react';

interface PDFDownloadProps {
  onClick: () => void;
  disabled: boolean;
}

const PDFDownload: React.FC<PDFDownloadProps> = ({ onClick, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="w-full max-w-xs bg-white border border-brand-primary text-brand-primary py-3 px-6 rounded-lg text-lg font-semibold hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-wait"
    >
      {disabled ? 'Generating PDF...' : 'Download PDF Report'}
    </button>
  );
};

export default PDFDownload;