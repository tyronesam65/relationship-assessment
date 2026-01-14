
import { Answer, CategoryScore, Question } from '../types';
import { ASSESSMENT_QUESTIONS, CATEGORIES } from '../constants';

const LIKERT_SCORE_MAP: { [key: string]: number } = {
  'Strongly Disagree': 1,
  'Disagree': 2,
  'Neutral': 3,
  'Agree': 4,
  'Strongly Agree': 5,
};

const CATEGORY_ADVICE: Record<string, {
  strength: string;
  growth: string;
  misaligned: string;
}> = {
  'Overall Relationship Satisfaction': {
    strength: "You both feel a deep sense of fulfillment. Recommendation: Celebrate this foundation by sharing one thing you specifically admire about your partner today.",
    growth: "You are both feeling a pull for more connection. Recommendation: Schedule a 'State of the Union' talk to discuss what a '10/10' day looks like for each of you.",
    misaligned: "One partner is feeling more satisfied than the other. Recommendation: The more satisfied partner should lean in with curiosity: 'What can I do this week to make you feel more loved?'"
  },
  'Communication & Understanding': {
    strength: "Your communication is a superpower. Recommendation: Keep it sharp by practicing 'Daily 20'—20 minutes of talk with no screens and no talk of logistics/kids.",
    growth: "Communication feels a bit strained lately. Recommendation: Try the 'Speaker-Listener Technique.' One person holds a 'floor' object and speaks while the other only listens and summarizes back.",
    misaligned: "There's a gap in how heard you each feel. Recommendation: Practice 'The Gentle Startup'—start requests with 'I feel...' instead of 'You always...'"
  },
  'Conflict & Repair': {
    strength: "You navigate disagreements with grace. Recommendation: Notice your 'Repair Attempts' (like a joke or a touch during a fight) and keep rewarding them.",
    growth: "Arguments may feel circular or draining. Recommendation: Agree on a 'Time Out' signal. If things get too heated, take 20 minutes apart to soothe before returning to the topic.",
    misaligned: "You have different styles of handling conflict. Recommendation: Discuss your 'Conflict History.' How did your parents argue? Understanding your blueprints helps build empathy."
  },
  'Emotional Safety & Trust': {
    strength: "Your trust is a fortress. Recommendation: Continue being each other's 'Safe Harbor' by being the first person you share good or bad news with.",
    growth: "Safety feels a bit fragile right now. Recommendation: Build trust through 'Micro-Commitments'—small promises kept consistently (like being on time or doing a promised chore).",
    misaligned: "Vulnerability levels differ between you. Recommendation: Share one 'Soft' feeling today (e.g., 'I felt lonely' vs 'I am annoyed') to invite the other in."
  },
  'Value & Importance': {
    strength: "You both feel highly prioritized. Recommendation: Keep the 'Appreciation Jar' going—write down one thing you're grateful for about your partner every day.",
    growth: "You may feel like you've moved to the back burner. Recommendation: Use the '3x3 Rule'—three compliments a day for three weeks to reset the culture of appreciation.",
    misaligned: "One of you is feeling less valued than the other. Recommendation: Discuss your 'Love Languages.' You might be showing love in a way your partner doesn't 'translate' as value."
  },
  'Sexual Intimacy & Connection': {
    strength: "Your physical connection is thriving. Recommendation: Keep prioritizing 'Physical Touch' as a non-verbal way to stay bonded throughout the day.",
    growth: "Intimacy has taken a backseat to life's busyness. Recommendation: Focus on 'Sensate Focus'—start with non-sexual touch like a long hug or a foot rub to rebuild the bridge.",
    misaligned: "Your needs or drives are currently out of sync. Recommendation: Have a 'Curiosity Date' to talk about desires and barriers without the pressure of immediate action."
  },
  'Spiritual & Faith Alignment': {
    strength: "Your shared values provide a strong compass. Recommendation: Find a way to serve your community together this month to put those values into shared action.",
    growth: "You've lost touch with your shared 'Why.' Recommendation: Spend an evening discussing your 'Legacy'—what do you want your marriage to be remembered for?",
    misaligned: "Your individual journeys are heading in different directions. Recommendation: Look for the 'Overlapping Circles'—find the 3 core values you still share and build from there."
  },
  'Financial Partnership': {
    strength: "You are an excellent financial team. Recommendation: Set a 'Dream Goal'—something fun to save for together that isn't a bill or a necessity.",
    growth: "Money is creating friction. Recommendation: Hold a 'Budget Peace' meeting. Focus on shared goals first, then look at the numbers as a team vs. the problem.",
    misaligned: "You have different 'Money Personalities' (e.g., Saver vs. Spender). Recommendation: Assign 'Fun Money' to each partner that can be spent without any input from the other."
  },
  'Parenting & Family Life': {
    strength: "You are a united front in parenting. Recommendation: Make sure to 'Date the Spouse'—remember you were a couple before you were parents.",
    growth: "Parenting is feeling overwhelming. Recommendation: Create a 'Unified Discipline' plan for the top 3 recurring kid issues to reduce daily decision fatigue.",
    misaligned: "You feel like you're pulling in different directions with the kids. Recommendation: Go for a walk (without kids) and share your 'Ideal Parenting Day' to find middle ground."
  },
  'Household Responsibilities': {
    strength: "You manage your home as true partners. Recommendation: Take turns 'Taking the Lead' on a major household project to keep the skills balanced.",
    growth: "The 'Mental Load' feels unbalanced. Recommendation: Use a 'Fair Play' approach. List every task and decide who 'Owns' it from conception to completion.",
    misaligned: "One partner feels they are doing significantly more. Recommendation: Conduct a 'Resentment Audit.' What one chore is most draining? See if you can outsource or trade it."
  },
  'Long-Term Vision & Shared Goals': {
    strength: "Your futures are beautifully aligned. Recommendation: Create a 'Marriage Vision Board' to visualize the adventures you have planned.",
    growth: "You're living day-to-day but lost the 'Big Picture.' Recommendation: Take a weekend away to dream. Where do you want to be in 5 years? What steps do you take today?",
    misaligned: "Your individual dreams seem to compete. Recommendation: Find the 'Dream within the Dream.' If one wants a city and one a farm, maybe the shared dream is 'Adventure' or 'Peace'."
  },
  'Friendship, Fun & Laughter': {
    strength: "Your friendship is the heart of your marriage. Recommendation: Try a 'New First'—something neither of you has ever done before to create a fresh memory.",
    growth: "Life has become all work and no play. Recommendation: Revisit your 'Dating History.' Go back to a place you loved when you first met to trigger that early fun.",
    misaligned: "One partner is craving more play while the other is focused on duty. Recommendation: The 'serious' partner picks the activity this week—choose something low-stakes and silly."
  }
};

function answerToScore(answer: Answer, question: Question): number {
  if (answer === null) return 0;
  if (typeof answer === 'number') {
    return answer / 2; // Normalize 1-10 scale to 1-5 scale
  }
  if (typeof answer === 'string') {
    return LIKERT_SCORE_MAP[answer] || 0;
  }
  return 0;
}

function getAlignment(score1: number, score2: number): CategoryScore['alignment'] {
    const diff = Math.abs(score1 - score2);
    if (diff <= 0.6) return 'Aligned';
    if (diff <= 1.4) return 'Slightly Misaligned';
    return 'Misaligned';
}

function generateLocalInsight(category: string, s1: number, s2: number): string {
    const avg = (s1 + s2) / 2;
    const diff = Math.abs(s1 - s2);
    const advice = CATEGORY_ADVICE[category] || { 
      strength: "You have a solid foundation here.", 
      growth: "There is an opportunity to connect deeper in this area.", 
      misaligned: "Differing perspectives here offer a chance for growth." 
    };

    if (diff > 1.4) {
      return advice.misaligned;
    } else if (avg >= 3.8) {
      return advice.strength;
    } else {
      return advice.growth;
    }
}

export function generateSWOTSummary(report: CategoryScore[]): string {
    const strengths = report.filter(d => d.partner1Score >= 3.8 && d.partner2Score >= 3.8 && d.alignment === 'Aligned').map(d => d.category);
    const weaknesses = report.filter(d => d.partner1Score < 3.2 && d.partner2Score < 3.2 && d.alignment === 'Aligned').map(d => d.category);
    const opportunities = report.filter(d => d.alignment === 'Slightly Misaligned' || (d.alignment === 'Aligned' && d.partner1Score < 4)).map(d => d.category);
    const threats = report.filter(d => d.alignment === 'Misaligned').map(d => d.category);

    const sText = strengths.length > 0 ? `Your relationship's core strengths are rooted in ${strengths.slice(0, 2).join(' and ')}, providing a resilient foundation of shared fulfillment.` : "Your foundation is built on a shared commitment to growth, even as you navigate current challenges.";
    const wText = weaknesses.length > 0 ? `However, common weaknesses in ${weaknesses.slice(0, 2).join(' and ')} suggest that daily stresses may be dampening your connection in these areas.` : "While you lack major shared weaknesses, keeping your connection intentional is vital to preventing stagnation.";
    
    const oText = opportunities.length > 0 ? `A significant opportunity exists to lean into ${opportunities[0]}, where small, intentional shifts in curiosity can yield high rewards for your bond.` : "Your greatest opportunity lies in rediscovering shared play and new experiences to refresh your dynamic.";
    const tText = threats.length > 0 ? `The primary threat to your long-term harmony is the current misalignment in ${threats[0]}, which requires non-judgmental dialogue to bridge your differing perspectives.` : "With no major misalignments, your main challenge is to guard against the 'drift' that comes from a busy, routine-focused life.";

    return `PARAGRAPH_1: ${sText} ${wText} PARAGRAPH_2: ${oText} ${tText} By addressing these dynamics together, you can transform these insights into a roadmap for a deeper, more enduring partnership.`;
}

export function processAnswers(
  partner1Answers: Answer[],
  partner2Answers: Answer[]
): CategoryScore[] {
  const report: CategoryScore[] = CATEGORIES.map(category => {
    const categoryQuestions = ASSESSMENT_QUESTIONS.filter(q => q.category === category);
    
    let p1TotalScore = 0;
    let p2TotalScore = 0;

    categoryQuestions.forEach(q => {
      const questionIndex = ASSESSMENT_QUESTIONS.findIndex(aq => aq.text === q.text);
      if (questionIndex !== -1) {
        p1TotalScore += answerToScore(partner1Answers[questionIndex], q);
        p2TotalScore += answerToScore(partner2Answers[questionIndex], q);
      }
    });

    const p1Average = p1TotalScore / (categoryQuestions.length || 1);
    const p2Average = p2TotalScore / (categoryQuestions.length || 1);

    return {
      category,
      partner1Score: parseFloat(p1Average.toFixed(2)),
      partner2Score: parseFloat(p2Average.toFixed(2)),
      alignment: getAlignment(p1Average, p2Average),
      insight: generateLocalInsight(category, p1Average, p2Average)
    };
  });

  return report;
}
