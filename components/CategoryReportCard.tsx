
import React from 'react';
import { CategoryScore } from '../types';

const getAlignmentClasses = (alignment: CategoryScore['alignment']) => {
    switch (alignment) {
        case 'Aligned':
            return 'bg-green-100 text-green-800';
        case 'Slightly Misaligned':
            return 'bg-yellow-100 text-yellow-800';
        case 'Misaligned':
            return 'bg-red-100 text-red-800';
    }
};

const CategoryReportCard: React.FC<CategoryScore> = ({ category, partner1Score, partner2Score, alignment, insight }) => {
    // Split the insight into "Reflection" and "Recommendation" if it contains our custom format
    const [reflection, recommendation] = insight ? insight.split(' Recommendation: ') : [null, null];

    return (
        <div className="bg-brand-secondary p-6 rounded-lg animate-fade-in shadow-sm transition-shadow duration-300 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h3 className="text-xl font-semibold text-brand-text mb-2 sm:mb-0">{category}</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getAlignmentClasses(alignment)}`}>
                    {alignment}
                </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs text-brand-text-light uppercase tracking-wider font-medium">Partner 1</p>
                    <p className="text-2xl font-bold text-brand-primary">{partner1Score.toFixed(1)}<span className="text-base font-normal text-gray-400">/5</span></p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs text-brand-text-light uppercase tracking-wider font-medium">Partner 2</p>
                    <p className="text-2xl font-bold text-brand-primary">{partner2Score.toFixed(1)}<span className="text-base font-normal text-gray-400">/5</span></p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-md border border-brand-accent shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">💡</span>
                    <h4 className="font-bold text-brand-text text-sm uppercase tracking-tight">Personalized Insights</h4>
                </div>
                
                {recommendation ? (
                    <div className="space-y-3">
                        <p className="text-brand-text text-sm leading-relaxed font-medium italic">
                            "{reflection}"
                        </p>
                        <div className="pt-2 border-t border-brand-accent">
                            <p className="text-brand-text-light text-sm leading-relaxed">
                                <strong className="text-brand-primary">Action Step:</strong> {recommendation}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-brand-text-light text-sm leading-relaxed">
                        {insight || "Reflect on these scores together to discover new ways to connect."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryReportCard;
