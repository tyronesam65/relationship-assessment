
import React, { useMemo, useRef, useState, lazy, Suspense } from 'react';
import { Answer } from '../types';
import { processAnswers, generateSWOTSummary } from '../utils/reportUtils';
import PDFDownload from './PDFDownload';
import { HeartIcon } from './icons/HeartIcon';
import { GrowthIcon } from './icons/GrowthIcon';
import { CheckIcon } from './icons/CheckIcon';
import { CopyIcon } from './icons/CopyIcon';
import { encodeData, getSharableBaseUrl } from '../utils/urlUtils';

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
            p1a: partner1Answers,
            p2n: partner2Name,
            p2a: partner2Answers,
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
    <div className="w-full mx-auto animate-fade-in">
        <div ref={reportRef} className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <header className="text-center pb-8 border-b border-gray-200">
                <h1 className="text-4xl md:text-5xl font-serif text-brand-text mb-2">
                    Your Relationship Report
                </h1>
                <p className="text-xl text-brand-text-light">
                    {partner1Name} & {partner2Name}
                </p>
            </header>
            
            <section className="py-8">
                 <h2 className="text-2xl font-serif text-brand-text mb-6 text-center">At a Glance</h2>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-brand-secondary p-6 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <HeartIcon className="w-6 h-6 text-green-600" />
                            <h3 className="text-xl font-semibold text-brand-text">Strengths</h3>
                        </div>
                        <p className="text-brand-text-light mb-4 text-sm">Areas where you are both strongly aligned and thriving.</p>
                        <ul className="space-y-2">
                            {strengths.map(s => <li key={s.category} className="text-sm font-medium text-gray-700 bg-white p-2 rounded border border-gray-200 shadow-sm">{s.category}</li>)}
                        </ul>
                    </div>
                     <div className="bg-brand-secondary p-6 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <GrowthIcon className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-brand-text">Growth Opportunities</h3>
                        </div>
                        <p className="text-brand-text-light mb-4 text-sm">Areas to focus on for deeper connection and understanding.</p>
                        <ul className="space-y-2">
                            {growthOpportunities.map(g => <li key={g.category} className="text-sm font-medium text-gray-700 bg-white p-2 rounded border border-gray-200 shadow-sm">{g.category}</li>)}
                        </ul>
                    </div>
                 </div>
            </section>

            <section className="py-8">
                <h2 className="text-2xl font-serif text-brand-text mb-6 text-center">Score Comparison</h2>
                <div className="p-6 bg-brand-secondary rounded-lg w-full border border-gray-100">
                    <Suspense fallback={<div className="text-brand-text-light text-center py-20">Loading Chart...</div>}>
                        <BarComparisonChart 
                            partner1Name={partner1Name}
                            partner2Name={partner2Name}
                            data={reportData} 
                        />
                    </Suspense>
                </div>
            </section>
            
            <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-serif text-brand-text mb-8 text-center">Detailed Category Breakdown</h2>
                <div className="space-y-6">
                    <Suspense fallback={<div className="text-center text-brand-text-light">Loading Insights...</div>}>
                        {reportData.map((data) => (
                           <CategoryReportCard key={data.category} {...data} />
                        ))}
                    </Suspense>
                </div>
            </section>

            {/* SWOT Overall Summary moved to end */}
            <section className="py-8">
                <div className="bg-brand-secondary p-8 rounded-xl border border-brand-accent">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">📋</span>
                        <h2 className="text-2xl font-serif text-brand-text">Overall SWOT Analysis</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-brand-text leading-relaxed text-lg italic">
                            {para1}
                        </p>
                        <p className="text-brand-text leading-relaxed text-lg">
                            {para2}
                        </p>
                    </div>
                </div>
            </section>
        </div>
        
        <div className="mt-8 text-center space-y-4">
             <div className="bg-brand-secondary p-6 rounded-lg max-w-2xl mx-auto shadow-sm border border-brand-accent">
                <h3 className="text-xl font-semibold text-brand-text mb-3">Share This Report</h3>
                <p className="text-brand-text-light mb-4">Copy this link to share the completed report with your partner.</p>
                 <div className="bg-white p-3 rounded-md flex items-center justify-between gap-2 border border-gray-200">
                    <input 
                        type="text"
                        readOnly 
                        value={reportLink}
                        className="text-sm text-brand-text-light bg-transparent w-full focus:outline-none truncate"
                    />
                     <button 
                        onClick={handleCopy} 
                        className="text-brand-primary hover:text-opacity-80 font-semibold transition-all duration-200 flex items-center justify-center px-3 py-2 rounded-md hover:bg-brand-accent flex-shrink-0"
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
                </div>
            </div>
            <PDFDownload onClick={handleDownloadPdf} disabled={isDownloading} />
        </div>
    </div>
  );
};

export default ReportScreen;
