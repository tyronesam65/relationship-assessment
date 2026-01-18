
import React, { useMemo, useRef, useState, lazy, Suspense } from 'react';
import { Answer } from '../types';
import { processAnswers, generateSWOTSummary } from '../utils/reportUtils';
import PDFDownload from './PDFDownload';
import { HeartIcon } from './icons/HeartIcon';
import { GrowthIcon } from './icons/GrowthIcon';
import { CheckIcon } from './icons/CheckIcon';
import { CopyIcon } from './icons/CopyIcon';
import { encodeData, getSharableBaseUrl, packAnswers } from '../utils/urlUtils';

const BarComparisonChart = lazy(() => import('./BarComparisonChart'));
const CategoryReportCard = lazy(() => import('./CategoryReportCard'));

declare const jspdf: any;
declare const html2canvas: any;

interface ReportScreenProps {
  partner1Name: string;
  partner2Name:string;
  partner1Answers: Answer[];
  partner2Answers: Answer[];
}

const ReportScreen: React.FC<ReportScreenProps> = ({ 
    partner1Name, partner2Name, partner1Answers, partner2Answers 
}) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [copied, setCopied] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    const reportData = useMemo(() => {
        return processAnswers(partner1Answers, partner2Answers);
    }, [partner1Answers, partner2Answers]);

    const swotSummary = useMemo(() => {
        return generateSWOTSummary(reportData);
    }, [reportData]);

    const [para1, para2] = useMemo(() => {
        const parts = swotSummary.split(' PARAGRAPH_2: ');
        return [parts[0].replace('PARAGRAPH_1: ', ''), parts[1]];
    }, [swotSummary]);

    const reportLink = useMemo(() => {
        const data = {
            p1n: partner1Name,
            p1a: packAnswers(partner1Answers),
            p2n: partner2Name,
            p2a: packAnswers(partner2Answers),
        };
        const serializedData = encodeData(data);
        const baseUrl = getSharableBaseUrl();
        return `${baseUrl}?report=${serializedData}`;
    }, [partner1Name, partner1Answers, partner2Name, partner2Answers]);

    const handleCopy = () => {
        navigator.clipboard.writeText(reportLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const strengths = reportData.filter(d => d.partner1Score > 3.5 && d.partner2Score > 3.5 && d.alignment === 'Aligned');
    const growthOpportunities = reportData.filter(d => d.partner1Score < 3 || d.partner2Score < 3 || d.alignment === 'Misaligned');

    const handleDownloadPdf = async () => {
        const reportElement = reportRef.current;
        if (!reportElement) return;

        setIsDownloading(true);
        
        try {
            const { jsPDF } = jspdf;
            
            const canvas = await html2canvas(reportElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                onclone: (clonedDoc) => {
                    const reportClone = clonedDoc.querySelector('[class*="bg-white rounded-2xl shadow-lg"]');
                    if (reportClone) {
                        (reportClone as HTMLElement).style.boxShadow = 'none';
                        (reportClone as HTMLElement).style.borderRadius = '0';
                        (reportClone as HTMLElement).style.border = 'none';
                    }

                    const animatedElements = clonedDoc.querySelectorAll('.animate-fade-in');
                    animatedElements.forEach(el => {
                        (el as HTMLElement).style.animation = 'none';
                        (el as HTMLElement).style.opacity = '1';
                        (el as HTMLElement).style.transform = 'none';
                    });
                }
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            const fileName = `Relationship_Report_${partner1Name}_${partner2Name}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("There was an error generating your PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

  return (
    <div className="w-full mx-auto animate-fade-in px-0 sm:px-4">
        <div ref={reportRef} className="p-4 md:p-8 bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
            <header className="text-center pb-6 md:pb-8 border-b border-gray-200">
                <h1 className="text-2xl md:text-5xl font-serif text-brand-text mb-2 leading-tight">
                    Relationship Report
                </h1>
                <p className="text-lg md:text-xl text-brand-text-light font-medium">
                    {partner1Name} & {partner2Name}
                </p>
            </header>
            
            <section className="py-6 md:py-8">
                 <h2 className="text-xl md:text-2xl font-serif text-brand-text mb-6 text-center">At a Glance</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-brand-secondary p-4 md:p-6 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                            <h3 className="text-lg md:text-xl font-semibold text-brand-text">Strengths</h3>
                        </div>
                        <p className="text-brand-text-light mb-4 text-xs md:text-sm">Areas where you are both aligned and thriving.</p>
                        <ul className="space-y-2">
                            {strengths.slice(0, 5).map(s => <li key={s.category} className="text-xs md:text-sm font-medium text-gray-700 bg-white p-2 rounded border border-gray-200 shadow-sm truncate">{s.category}</li>)}
                            {strengths.length === 0 && <li className="text-xs italic text-gray-500">Keep growing together!</li>}
                        </ul>
                    </div>
                     <div className="bg-brand-secondary p-4 md:p-6 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <GrowthIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                            <h3 className="text-lg md:text-xl font-semibold text-brand-text">Growth Areas</h3>
                        </div>
                        <p className="text-brand-text-light mb-4 text-xs md:text-sm">Areas for deeper connection and understanding.</p>
                        <ul className="space-y-2">
                            {growthOpportunities.slice(0, 5).map(g => <li key={g.category} className="text-xs md:text-sm font-medium text-gray-700 bg-white p-2 rounded border border-gray-200 shadow-sm truncate">{g.category}</li>)}
                            {growthOpportunities.length === 0 && <li className="text-xs italic text-gray-500">You're beautifully in sync.</li>}
                        </ul>
                    </div>
                 </div>
            </section>

            <section className="py-6 md:py-8">
                <h2 className="text-xl md:text-2xl font-serif text-brand-text mb-6 text-center">Score Comparison</h2>
                <div className="p-3 md:p-6 bg-brand-secondary rounded-lg w-full border border-gray-100 overflow-hidden">
                    <Suspense fallback={<div className="text-brand-text-light text-center py-20">Loading Chart...</div>}>
                        <BarComparisonChart 
                            partner1Name={partner1Name}
                            partner2Name={partner2Name}
                            data={reportData} 
                        />
                    </Suspense>
                </div>
            </section>
            
            <section className="py-6 md:py-8 border-b border-gray-100">
                <h2 className="text-xl md:text-2xl font-serif text-brand-text mb-6 md:mb-8 text-center">Category Breakdown</h2>
                <div className="space-y-4 md:space-y-6">
                    <Suspense fallback={<div className="text-center text-brand-text-light">Loading Insights...</div>}>
                        {reportData.map((data) => (
                           <CategoryReportCard key={data.category} {...data} />
                        ))}
                    </Suspense>
                </div>
            </section>

            <section className="py-6 md:py-8">
                <div className="bg-brand-secondary p-5 md:p-8 rounded-xl border border-brand-accent">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl md:text-2xl">📋</span>
                        <h2 className="text-xl md:text-2xl font-serif text-brand-text">SWOT Analysis</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-brand-text leading-relaxed text-sm md:text-lg italic font-medium">
                            {para1}
                        </p>
                        <p className="text-brand-text leading-relaxed text-sm md:text-lg">
                            {para2}
                        </p>
                    </div>
                </div>
            </section>
        </div>
        
        <div className="mt-8 text-center space-y-4 px-2 pb-8">
             <div className="bg-brand-secondary p-5 md:p-6 rounded-lg max-w-2xl mx-auto shadow-sm border border-brand-accent">
                <h3 className="text-lg md:text-xl font-semibold text-brand-text mb-2">Share This Report</h3>
                <p className="text-xs md:text-sm text-brand-text-light mb-4 px-2">Copy this link to share the completed report with your partner.</p>
                 <div className="bg-white p-2 md:p-3 rounded-md flex flex-col sm:flex-row items-center justify-between gap-3 border border-gray-200">
                    <input 
                        type="text"
                        readOnly 
                        value={reportLink}
                        className="text-xs text-brand-text-light bg-transparent w-full focus:outline-none truncate px-2 text-center sm:text-left font-mono"
                        style={{ minWidth: '150px' }}
                    />
                     <button 
                        onClick={handleCopy} 
                        className="w-full sm:w-auto text-brand-primary hover:text-opacity-80 font-semibold transition-all duration-200 flex items-center justify-center px-4 py-2.5 rounded-md hover:bg-brand-accent flex-shrink-0 border border-brand-primary sm:border-none active:scale-95"
                    >
                        {copied ? (
                            <span className="text-green-600 flex items-center gap-1 text-sm">
                                <CheckIcon className="w-4 h-4" />
                                Copied!
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-sm">
                                <CopyIcon className="w-4 h-4" />
                                Copy Link
                            </span>
                        )}
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <PDFDownload onClick={handleDownloadPdf} disabled={isDownloading} />
            </div>
        </div>
    </div>
  );
};

export default ReportScreen;
