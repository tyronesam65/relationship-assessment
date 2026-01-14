
import React, { useState, useCallback, useEffect } from 'react';
import { Screen, Answer } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import NameEntryScreen from './components/NameEntryScreen';
import InvitationScreen from './components/InvitationScreen';
import QuestionnaireScreen from './components/QuestionnaireScreen';
import ReportScreen from './components/ReportScreen';
import { decodeData } from './utils/urlUtils';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [partner1Answers, setPartner1Answers] = useState<Answer[]>([]);
  const [partner2Answers, setPartner2Answers] = useState<Answer[]>([]);
  const [isPartner2Flow, setIsPartner2Flow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportDataStr = urlParams.get('report');
    const inviteDataStr = urlParams.get('data');

    setIsLoading(true);
    try {
      if (reportDataStr) {
        const decoded = decodeData(reportDataStr);
        if (decoded) {
          setPartner1Name(decoded.p1n);
          setPartner1Answers(decoded.p1a);
          setPartner2Name(decoded.p2n);
          setPartner2Answers(decoded.p2a);
          setCurrentScreen(Screen.Report);
        }
      } else if (inviteDataStr) {
        const decoded = decodeData(inviteDataStr);
        if (decoded) {
          setPartner1Name(decoded.p1n);
          setPartner1Answers(decoded.p1a);
          setIsPartner2Flow(true);
          setCurrentScreen(Screen.Welcome);
        }
      } else {
        setCurrentScreen(Screen.Welcome);
      }
    } catch (e) {
      console.error("Failed to parse data from URL", e);
      setCurrentScreen(Screen.Welcome);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStart = useCallback(() => {
    setCurrentScreen(Screen.NameEntry);
  }, []);

  const handleNameEntryContinue = useCallback((name: string) => {
    if (isPartner2Flow) {
      setPartner2Name(name);
    } else {
      setPartner1Name(name);
    }
    setCurrentScreen(Screen.Questionnaire);
  }, [isPartner2Flow]);
  
  const handleCompleteQuestionnaire = useCallback((answers: Answer[]) => {
    if (isPartner2Flow) {
      setPartner2Answers(answers);
      setCurrentScreen(Screen.Report);
    } else {
      setPartner1Answers(answers);
      setCurrentScreen(Screen.Invitation);
    }
  }, [isPartner2Flow]);

  const handleBack = useCallback((toScreen: Screen) => {
    setCurrentScreen(toScreen);
  }, []);

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-center text-brand-text-light font-medium">Preparing your assessment...</div>
        </div>
      );
    }

    switch (currentScreen) {
      case Screen.Welcome:
        return <WelcomeScreen onStart={handleStart} onJoin={handleStart} isPartner2Flow={isPartner2Flow} partner1Name={partner1Name} />;
      case Screen.NameEntry:
        return <NameEntryScreen onContinue={handleNameEntryContinue} onBack={() => handleBack(Screen.Welcome)} isPartner2Flow={isPartner2Flow}/>;
      case Screen.Invitation:
        return <InvitationScreen partner1Name={partner1Name} partner1Answers={partner1Answers} />;
      case Screen.Questionnaire:
        return <QuestionnaireScreen onComplete={handleCompleteQuestionnaire} />;
      case Screen.Report:
        return <ReportScreen 
                    partner1Name={partner1Name} 
                    partner2Name={partner2Name} 
                    partner1Answers={partner1Answers} 
                    partner2Answers={partner2Answers} 
                />;
      default:
        return <WelcomeScreen onStart={handleStart} onJoin={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-brand-text flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto transition-all duration-300">
        {renderScreen()}
      </main>
    </div>
  );
}
