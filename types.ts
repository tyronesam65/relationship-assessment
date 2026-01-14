
export enum Screen {
  Welcome,
  NameEntry,
  Invitation,
  Questionnaire,
  Report,
  Booking,
}

export enum QuestionType {
  Scale,
  MultipleChoice,
}

export interface Question {
  category: string;
  type: QuestionType;
  text: string;
  options?: string[];
}

export type Answer = number | string | null;

export interface CategoryScore {
    category: string;
    partner1Score: number;
    partner2Score: number;
    alignment: 'Aligned' | 'Slightly Misaligned' | 'Misaligned';
    insight?: string;
}