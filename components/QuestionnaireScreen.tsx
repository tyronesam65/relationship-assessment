
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
    <div className="flex justify-center items-start space-x-2 md:space-x-3">
      {options.map((option, index) => (
        <div key={option} className="text-center">
          <button
            onClick={() => onSelect(option)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-semibold transition-all duration-200 border-2 ${
              selectedValue === option
                ? 'bg-brand-pink text-white border-brand-pink scale-110'
                : 'bg-white text-brand-text-light border-gray-300 hover:border-brand-pink'
            }`}
          >
            {index + 1}
          </button>
          <span className="text-xs text-gray-500 mt-2 block w-24">{labels[index]}</span>
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
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-3xl mx-auto animate-fade-in shadow-lg">
        {/* Progress Bar */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-brand-text">Progress</span>
                <span className="text-sm font-semibold text-brand-pink">{progress}%</span>
            </div>
            <div className="w-full bg-brand-accent rounded-full h-2.5">
                <div className="bg-brand-pink h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif text-brand-text mb-2">
                {categoryDetails.title}
            </h1>
            <p className="text-md text-brand-text-light max-w-xl mx-auto">{categoryDetails.description}</p>
        </div>

        {/* Questions List */}
        <div className="space-y-12">
          {questionsForCategory.map((question) => {
            const questionIndex = questionMap.get(question.text)!;
            return (
              <div key={question.text} className="text-center animate-fade-in">
                <h2 className="text-lg md:text-xl font-medium text-brand-text mb-6 max-w-2xl mx-auto">
                  {question.text}
                </h2>
                {question.type === QuestionType.Scale && (
                  <div className="flex justify-center flex-wrap gap-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                        <button key={num} onClick={() => handleAnswer(questionIndex, num)} 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition-colors border-2 ${answers[questionIndex] === num ? 'bg-brand-pink text-white border-brand-pink scale-110' : 'bg-white border-gray-300 hover:border-brand-pink'}`}>
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
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col items-center gap-4">
            <button 
              onClick={handleNext} 
              disabled={!areAllQuestionsAnswered} 
              className="w-full max-w-sm bg-brand-pink text-white py-4 px-8 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {currentCategoryIndex === CATEGORIES.length - 1 
                ? 'Complete Assessment' 
                : `Next: ${nextCategoryName}`}
            </button>
            {currentCategoryIndex > 0 && (
              <button onClick={handlePrevious} className="text-brand-text-light font-semibold hover:text-brand-primary">
                &larr; Previous: {CATEGORY_DETAILS[CATEGORIES[currentCategoryIndex - 1]].title}
              </button>
            )}
        </div>
    </div>
  );
};

export default QuestionnaireScreen;