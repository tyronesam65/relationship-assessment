
import { Question, QuestionType } from './types';

const LIKERT_OPTIONS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export const CATEGORY_DETAILS: { [key:string]: { title: string; description: string } } = {
  'Overall Relationship Satisfaction': {
    title: 'Overall Satisfaction',
    description: 'A look at your general happiness and fulfillment in the relationship.',
  },
  'Communication & Understanding': {
    title: 'Communication',
    description: 'How you express yourselves and listen to one another.',
  },
  'Conflict & Repair': {
    title: 'Conflict & Repair',
    description: 'How you navigate disagreements and reconnect afterwards.',
  },
  'Emotional Safety & Trust': {
    title: 'Emotional Safety & Trust',
    description: 'The level of security, trust, and mutual support you feel.',
  },
  'Value & Importance': {
    title: 'Value & Importance',
    description: 'Feeling prioritized, appreciated, and desired by your partner.',
  },
  'Sexual Intimacy & Connection': {
    title: 'Intimacy & Connection',
    description: 'Your satisfaction with physical and emotional intimacy.',
  },
  'Spiritual & Faith Alignment': {
    title: 'Spiritual Alignment',
    description: 'Your shared values, beliefs, and spiritual connection.',
  },
  'Financial Partnership': {
    title: 'Financial Partnership',
    description: 'How you work together as a team on financial matters.',
  },
  'Parenting & Family Life': {
    title: 'Parenting & Family',
    description: 'Your alignment and teamwork in parenting and family life.',
  },
  'Household Responsibilities': {
    title: 'Household Teamwork',
    description: 'The fairness and partnership in managing household responsibilities.',
  },
  'Long-Term Vision & Shared Goals': {
    title: 'Shared Goals & Vision',
    description: 'Your alignment on future plans and long-term dreams.',
  },
  'Friendship, Fun & Laughter': {
    title: 'Friendship & Fun',
    description: 'The quality of your friendship, shared enjoyment, and laughter.',
  },
};

export const ASSESSMENT_QUESTIONS: Question[] = [
  // 1. Overall Relationship Satisfaction
  {
    category: 'Overall Relationship Satisfaction',
    type: QuestionType.Scale,
    text: 'On a scale of 1-10, how would you rate your relationship today?',
  },
  {
    category: 'Overall Relationship Satisfaction',
    type: QuestionType.MultipleChoice,
    text: 'I feel genuinely happy and fulfilled in my marriage.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Overall Relationship Satisfaction',
    type: QuestionType.MultipleChoice,
    text: 'I would choose my spouse again if I had to do it all over.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Overall Relationship Satisfaction',
    type: QuestionType.MultipleChoice,
    text: 'My relationship consistently brings out the best in me.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Overall Relationship Satisfaction',
    type: QuestionType.MultipleChoice,
    text: 'I feel optimistic and excited about our future together.',
    options: LIKERT_OPTIONS,
  },

  // 2. Communication & Understanding
  {
    category: 'Communication & Understanding',
    type: QuestionType.MultipleChoice,
    text: 'My spouse is an attentive listener when I am speaking.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Communication & Understanding',
    type: QuestionType.MultipleChoice,
    text: 'I feel safe and comfortable expressing my true feelings to my spouse.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Communication & Understanding',
    type: QuestionType.MultipleChoice,
    text: 'We are good at discussing important topics without it escalating into an argument.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Communication & Understanding',
    type: QuestionType.MultipleChoice,
    text: 'I feel heard and understood after we have a conversation.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Communication & Understanding',
    type: QuestionType.MultipleChoice,
    text: 'My spouse communicates appreciation for me regularly.',
    options: LIKERT_OPTIONS,
  },

  // 3. Conflict & Repair
  {
    category: 'Conflict & Repair',
    type: QuestionType.MultipleChoice,
    text: 'We can disagree on important matters and still respect each other\'s perspective.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Conflict & Repair',
    type: QuestionType.MultipleChoice,
    text: 'When we argue, we tend to fight fairly (no name-calling, yelling, etc.).',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Conflict & Repair',
    type: QuestionType.MultipleChoice,
    text: 'We are quick to apologize and make amends after a disagreement.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Conflict & Repair',
    type: QuestionType.MultipleChoice,
    text: 'I feel we are effective at finding compromises that work for both of us.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Conflict & Repair',
    type: QuestionType.MultipleChoice,
    text: 'We can discuss "hot button" topics without it damaging our connection.',
    options: LIKERT_OPTIONS,
  },
  
  // 4. Emotional Safety & Trust
  {
    category: 'Emotional Safety & Trust',
    type: QuestionType.MultipleChoice,
    text: 'I trust my spouse completely, without any reservations.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Emotional Safety & Trust',
    type: QuestionType.MultipleChoice,
    text: 'My spouse makes me feel emotionally safe, even when I am vulnerable.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Emotional Safety & Trust',
    type: QuestionType.MultipleChoice,
    text: 'I know my spouse has my back, no matter what.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Emotional Safety & Trust',
    type: QuestionType.MultipleChoice,
    text: 'My spouse is my biggest supporter and cheerleader.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Emotional Safety & Trust',
    type: QuestionType.MultipleChoice,
    text: 'I never worry about my spouse being unfaithful.',
    options: LIKERT_OPTIONS,
  },

  // 5. Value & Importance
  {
    category: 'Value & Importance',
    type: QuestionType.MultipleChoice,
    text: 'I feel like a top priority in my spouse\'s life.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Value & Importance',
    type: QuestionType.MultipleChoice,
    text: 'My spouse regularly makes me feel desired and wanted.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Value & Importance',
    type: QuestionType.MultipleChoice,
    text: 'I feel seen and appreciated for who I am by my spouse.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Value & Importance',
    type: QuestionType.MultipleChoice,
    text: 'My contributions to our life together are acknowledged and valued.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Value & Importance',
    type: QuestionType.MultipleChoice,
    text: 'My spouse shows they are thinking of me through small gestures.',
    options: LIKERT_OPTIONS,
  },

  // 6. Sexual Intimacy & Connection
  {
    category: 'Sexual Intimacy & Connection',
    type: QuestionType.MultipleChoice,
    text: 'I am satisfied with the quality of our sexual intimacy.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Sexual Intimacy & Connection',
    type: QuestionType.MultipleChoice,
    text: 'I am satisfied with the frequency of our sexual intimacy.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Sexual Intimacy & Connection',
    type: QuestionType.MultipleChoice,
    text: 'We are able to openly talk about our sexual desires and preferences.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Sexual Intimacy & Connection',
    type: QuestionType.MultipleChoice,
    text: 'I feel a strong sense of emotional connection during physical intimacy.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Sexual Intimacy & Connection',
    type: QuestionType.MultipleChoice,
    text: 'My spouse initiates physical affection (hugs, kisses, etc.) outside of sex.',
    options: LIKERT_OPTIONS,
  },

  // 7. Spiritual & Faith Alignment
  {
    category: 'Spiritual & Faith Alignment',
    type: QuestionType.MultipleChoice,
    text: 'My spouse and I share similar core spiritual or moral values.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Spiritual & Faith Alignment',
    type: QuestionType.MultipleChoice,
    text: 'We support each other\'s spiritual or personal growth journeys.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Spiritual & Faith Alignment',
    type: QuestionType.MultipleChoice,
    text: 'Our shared faith or values strengthen our marital bond.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Spiritual & Faith Alignment',
    type: QuestionType.MultipleChoice,
    text: 'We can discuss our beliefs respectfully, even when they differ.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Spiritual & Faith Alignment',
    type: QuestionType.MultipleChoice,
    text: 'Our spiritual connection is an important part of our relationship.',
    options: LIKERT_OPTIONS,
  },

  // 8. Financial Partnership
  {
    category: 'Financial Partnership',
    type: QuestionType.MultipleChoice,
    text: 'My spouse and I are aligned on our financial goals and priorities.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Financial Partnership',
    type: QuestionType.MultipleChoice,
    text: 'We communicate openly and honestly about our spending and saving habits.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Financial Partnership',
    type: QuestionType.MultipleChoice,
    text: 'I feel we work as a team when it comes to managing our finances.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Financial Partnership',
    type: QuestionType.MultipleChoice,
    text: 'I am comfortable with the way we make major financial decisions together.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Financial Partnership',
    type: QuestionType.MultipleChoice,
    text: 'Money is not a major source of stress or conflict in our relationship.',
    options: LIKERT_OPTIONS,
  },

  // 9. Parenting & Family Life
  {
    category: 'Parenting & Family Life',
    type: QuestionType.MultipleChoice,
    text: 'My spouse and I share a consistent and united parenting philosophy.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Parenting & Family Life',
    type: QuestionType.MultipleChoice,
    text: 'I feel supported by my spouse in my parenting role.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Parenting & Family Life',
    type: QuestionType.MultipleChoice,
    text: 'We make a great team in handling the challenges of raising children.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Parenting & Family Life',
    type: QuestionType.MultipleChoice,
    text: 'We effectively balance our roles as partners and as parents.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Parenting & Family Life',
    type: QuestionType.MultipleChoice,
    text: 'We agree on what is most important to teach our children.',
    options: LIKERT_OPTIONS,
  },
  
  // 10. Household Responsibilities
  {
    category: 'Household Responsibilities',
    type: QuestionType.MultipleChoice,
    text: 'Household chores and responsibilities are divided fairly between us.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Household Responsibilities',
    type: QuestionType.MultipleChoice,
    text: 'I feel my contributions to the household are recognized and appreciated.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Household Responsibilities',
    type: QuestionType.MultipleChoice,
    text: 'We work together effectively to manage our home.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Household Responsibilities',
    type: QuestionType.MultipleChoice,
    text: 'I am satisfied with how we manage the "mental load" of running our household.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Household Responsibilities',
    type: QuestionType.MultipleChoice,
    text: 'We have a system for household tasks that works well for both of us.',
    options: LIKERT_OPTIONS,
  },
  
  // 11. Long-Term Vision & Shared Goals
  {
    category: 'Long-Term Vision & Shared Goals',
    type: QuestionType.MultipleChoice,
    text: 'My spouse and I share a similar vision for our future.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Long-Term Vision & Shared Goals',
    type: QuestionType.MultipleChoice,
    text: 'We are actively working towards shared dreams and goals.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Long-Term Vision & Shared Goals',
    type: QuestionType.MultipleChoice,
    text: 'I feel my personal goals are supported by my spouse.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Long-Term Vision & Shared Goals',
    type: QuestionType.MultipleChoice,
    text: 'We regularly talk about our plans for the next 5, 10, or 20 years.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Long-Term Vision & Shared Goals',
    type: QuestionType.MultipleChoice,
    text: 'Our individual paths feel aligned and complementary.',
    options: LIKERT_OPTIONS,
  },
  
  // 12. Friendship, Fun & Laughter
  {
    category: 'Friendship, Fun & Laughter',
    type: QuestionType.MultipleChoice,
    text: 'My spouse is one of my best friends.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Friendship, Fun & Laughter',
    type: QuestionType.MultipleChoice,
    text: 'We make time to have fun and laugh together regularly.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Friendship, Fun & Laughter',
    type: QuestionType.MultipleChoice,
    text: 'I enjoy the time we spend together just hanging out.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Friendship, Fun & Laughter',
    type: QuestionType.MultipleChoice,
    text: 'We have shared hobbies and interests that we enjoy together.',
    options: LIKERT_OPTIONS,
  },
  {
    category: 'Friendship, Fun & Laughter',
    type: QuestionType.MultipleChoice,
    text: 'Our relationship is filled with playfulness and spontaneity.',
    options: LIKERT_OPTIONS,
  },
];

export const TOTAL_QUESTIONS = ASSESSMENT_QUESTIONS.length;

export const CATEGORIES = [
  'Overall Relationship Satisfaction',
  'Communication & Understanding',
  'Conflict & Repair',
  'Emotional Safety & Trust',
  'Value & Importance',
  'Sexual Intimacy & Connection',
  'Spiritual & Faith Alignment',
  'Financial Partnership',
  'Parenting & Family Life',
  'Household Responsibilities',
  'Long-Term Vision & Shared Goals',
  'Friendship, Fun & Laughter',
];