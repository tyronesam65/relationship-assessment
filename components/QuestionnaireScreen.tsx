
import React, { useState, useMemo } from 'react';
import { ASSESSMENT_QUESTIONS, TOTAL_QUESTIONS, CATEGORIES, CATEGORY_DETAILS } from '../constants';
import { QuestionType, Answer } from '../types';

const LikertScaleButtons: React.FC<{
  options: string[];
  selectedValue: Answer;
  onSelect: (value: string) => void;
}> = ({ options, selectedValue, onSelect }) => {
  const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  return (
    <div className="flex justify-between items-start w-full max-w-md mx-auto">
      {options.map((option, index) => (
        <div key={option} className="flex flex-col items-center flex-1">
          <button
            onClick={() => onSelect(option)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-lg font-semibold transition-all duration-200 border-2 ${
              selectedValue === option
                ? 'bg-brand-pink text-white border-brand-pink scale-110'
                : 'bg-white text-brand-text-light border-gray-300 hover:border-brand-pink'
            }`}
          >
            {index + 1}
          </button>
          <span className="text-[10px] md:text-xs text-gray-500 mt-2 text-center leading-tight px-0.5">
            {labels[index]}
          </span>
        </div>
      ))}
    </div>
  );
};


const QuestionnaireScreen: React.FC<{ onComplete: (answers: Answer[]) => void }> = ({ onComplete }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(Array(TOTAL_QUESTIONS).fill(null));

  const questionMap = useMemo(() => {
    const map = new Map<string, number>();
    ASSESSMENT_QUESTIONS.forEach((q, index) => map.set(q.text, index));
    return map;
  }, []);

  const currentCategoryName = CATEGORIES[currentCategoryIndex];
  const categoryDetails = CATEGORY_DETAILS[currentCategoryName];
  const questionsForCategory = ASSESSMENT_QUESTIONS.filter(q => q.category === currentCategoryName);

  const handleAnswer = (questionIndex: number, answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentCategoryIndex < CATEGORIES.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const areAllQuestionsAnswered = useMemo(() => {
    return questionsForCategory.every(q => {
      const questionIndex = questionMap.get(q.text);
      return questionIndex !== undefined && answers[questionIndex] !== null;
    });
  }, [answers, questionsForCategory, questionMap]);

  const progress = Math.round(((currentCategoryIndex + 1) / CATEGORIES.length) * 100);
  
  const nextCategoryName = currentCategoryIndex < CATEGORIES.length - 1 ? CATEGORY_DETAILS[CATEGORIES[currentCategoryIndex + 1]].title : '';

  return (
    <div className="bg-white p-5 md:p-8 rounded-2xl w-full max-w-3xl mx-auto animate-fade-in shadow-lg border border-gray-100">
        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-semibold text-brand-text uppercase tracking-wider">Progress</span>
                <span className="text-xs md:text-sm font-semibold text-brand-pink">{progress}%</span>
            </div>
            <div className="w-full bg-brand-accent rounded-full h-2 md:h-2.5">
                <div className="bg-brand-pink h-2 md:h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
        </div>

        {/* Category Header */}
        <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-serif text-brand-text mb-2 leading-tight">
                {categoryDetails.title}
            </h1>
            <p className="text-sm md:text-md text-brand-text-light max-w-xl mx-auto italic">{categoryDetails.description}</p>
        </div>

        {/* Questions List */}
        <div className="space-y-10 md:space-y-12">
          {questionsForCategory.map((question) => {
            const questionIndex = questionMap.get(question.text)!;
            return (
              <div key={question.text} className="text-center animate-fade-in">
                <h2 className="text-base md:text-xl font-medium text-brand-text mb-5 md:mb-6 max-w-2xl mx-auto leading-relaxed">
                  {question.text}
                </h2>
                {question.type === QuestionType.Scale && (
                  <div className="flex justify-center flex-wrap gap-2 max-w-sm mx-auto">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                        <button key={num} onClick={() => handleAnswer(questionIndex, num)} 
                            className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all border-2 ${answers[questionIndex] === num ? 'bg-brand-pink text-white border-brand-pink scale-110 shadow-md' : 'bg-white border-gray-200 hover:border-brand-pink'}`}>
                            {num}
                        </button>
                    ))}
                  </div>
                )}
                {question.type === QuestionType.MultipleChoice && question.options && (
                  <LikertScaleButtons
                    options={question.options}
                    selectedValue={answers[questionIndex]}
                    onSelect={(value) => handleAnswer(questionIndex, value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
            <button 
              onClick={handleNext} 
              disabled={!areAllQuestionsAnswered} 
              className="w-full max-w-sm bg-brand-pink text-white py-3.5 md:py-4 px-8 rounded-lg text-base md:text-lg font-semibold hover:opacity-90 transition-colors shadow-md active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {currentCategoryIndex === CATEGORIES.length - 1 
                ? 'Finish Assessment' 
                : `Next Category`}
            </button>
            {currentCategoryIndex > 0 && (
              <button onClick={handlePrevious} className="text-sm md:text-base text-brand-text-light font-medium hover:text-brand-primary transition-colors py-2">
                &larr; Back to {CATEGORY_DETAILS[CATEGORIES[currentCategoryIndex - 1]].title}
              </button>
            )}
        </div>
    </div>
  );
};

export default QuestionnaireScreen;
