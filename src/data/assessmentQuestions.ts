// OCEAN and RIASEC Assessment Questions
// 40 total questions: 20 OCEAN + 20 RIASEC

export interface AssessmentQuestion {
    id: string;
    type: 'OCEAN' | 'RIASEC';
    trait: string; // OCEAN: O,C,E,A,N | RIASEC: R,I,A,S,E,C
    text: string;
    reverse: boolean; // If true, scoring is reversed (5=1, 4=2, 3=3, 2=4, 1=5)
}

// OCEAN Questions (Big Five Personality Traits)
// 4 questions per trait × 5 traits = 20 questions
export const OCEAN_QUESTIONS: AssessmentQuestion[] = [
    // Openness to Experience (O) - 4 questions
    { id: 'O1', type: 'OCEAN', trait: 'O', text: 'I enjoy exploring new ideas and trying new things', reverse: false },
    { id: 'O2', type: 'OCEAN', trait: 'O', text: 'I am imaginative and creative', reverse: false },
    { id: 'O3', type: 'OCEAN', trait: 'O', text: 'I prefer routine and familiar experiences over novelty', reverse: true },
    { id: 'O4', type: 'OCEAN', trait: 'O', text: 'I enjoy artistic and cultural activities', reverse: false },

    // Conscientiousness (C) - 4 questions
    { id: 'C1', type: 'OCEAN', trait: 'C', text: 'I am organized and pay attention to detail', reverse: false },
    { id: 'C2', type: 'OCEAN', trait: 'C', text: 'I complete tasks thoroughly and on time', reverse: false },
    { id: 'C3', type: 'OCEAN', trait: 'C', text: 'I tend to be messy and disorganized', reverse: true },
    { id: 'C4', type: 'OCEAN', trait: 'C', text: 'I make plans and stick to them', reverse: false },

    // Extraversion (E) - 4 questions
    { id: 'E1', type: 'OCEAN', trait: 'E', text: 'I feel energized when spending time with others', reverse: false },
    { id: 'E2', type: 'OCEAN', trait: 'E', text: 'I enjoy being the center of attention', reverse: false },
    { id: 'E3', type: 'OCEAN', trait: 'E', text: 'I prefer quiet, solitary activities', reverse: true },
    { id: 'E4', type: 'OCEAN', trait: 'E', text: 'I find it easy to start conversations with strangers', reverse: false },

    // Agreeableness (A) - 4 questions
    { id: 'A1', type: 'OCEAN', trait: 'A', text: 'I am compassionate and caring towards others', reverse: false },
    { id: 'A2', type: 'OCEAN', trait: 'A', text: 'I trust people and believe in their good intentions', reverse: false },
    { id: 'A3', type: 'OCEAN', trait: 'A', text: 'I often put my own needs before others', reverse: true },
    { id: 'A4', type: 'OCEAN', trait: 'A', text: 'I enjoy helping others and working cooperatively', reverse: false },

    // Neuroticism (N) - 4 questions
    { id: 'N1', type: 'OCEAN', trait: 'N', text: 'I often feel anxious or worried', reverse: false },
    { id: 'N2', type: 'OCEAN', trait: 'N', text: 'My mood changes frequently', reverse: false },
    { id: 'N3', type: 'OCEAN', trait: 'N', text: 'I remain calm in stressful situations', reverse: true },
    { id: 'N4', type: 'OCEAN', trait: 'N', text: 'I tend to be emotionally sensitive', reverse: false }
];

// RIASEC Questions (Holland Codes)
// ~3-4 questions per code × 6 codes = 20 questions
export const RIASEC_QUESTIONS: AssessmentQuestion[] = [
    // Realistic (R) - 4 questions
    { id: 'R1', type: 'RIASEC', trait: 'R', text: 'I enjoy working with tools, machines, or equipment', reverse: false },
    { id: 'R2', type: 'RIASEC', trait: 'R', text: 'I prefer hands-on physical work over desk work', reverse: false },
    { id: 'R3', type: 'RIASEC', trait: 'R', text: 'I like outdoor activities and working with my hands', reverse: false },
    { id: 'R4', type: 'RIASEC', trait: 'R', text: 'I enjoy building, repairing, or fixing things', reverse: false },

    // Investigative (I) - 4 questions
    { id: 'I1', type: 'RIASEC', trait: 'I', text: 'I enjoy solving complex problems and thinking analytically', reverse: false },
    { id: 'I2', type: 'RIASEC', trait: 'I', text: 'I am curious about how things work scientifically', reverse: false },
    { id: 'I3', type: 'RIASEC', trait: 'I', text: 'I like conducting research and analyzing data', reverse: false },
    { id: 'I4', type: 'RIASEC', trait: 'I', text: 'I enjoy learning about math, science, or technology', reverse: false },

    // Artistic (A) - 3 questions
    { id: 'A1', type: 'RIASEC', trait: 'A', text: 'I enjoy creative expression through art, music, or writing', reverse: false },
    { id: 'A2', type: 'RIASEC', trait: 'A', text: 'I prefer unstructured environments that allow creativity', reverse: false },
    { id: 'A3', type: 'RIASEC', trait: 'A', text: 'I am drawn to design, aesthetics, and self-expression', reverse: false },

    // Social (S) - 3 questions
    { id: 'S1', type: 'RIASEC', trait: 'S', text: 'I enjoy helping people and making a positive impact', reverse: false },
    { id: 'S2', type: 'RIASEC', trait: 'S', text: 'I like teaching, counseling, or supporting others', reverse: false },
    { id: 'S3', type: 'RIASEC', trait: 'S', text: 'I am skilled at understanding and relating to people', reverse: false },

    // Enterprising (E) - 3 questions
    { id: 'E1', type: 'RIASEC', trait: 'E', text: 'I enjoy leading projects and persuading others', reverse: false },
    { id: 'E2', type: 'RIASEC', trait: 'E', text: 'I am motivated by business, sales, or entrepreneurship', reverse: false },
    { id: 'E3', type: 'RIASEC', trait: 'E', text: 'I like taking risks and being competitive', reverse: false },

    // Conventional (C) - 3 questions
    { id: 'C1', type: 'RIASEC', trait: 'C', text: 'I prefer structured, organized work environments', reverse: false },
    { id: 'C2', type: 'RIASEC', trait: 'C', text: 'I enjoy working with data, numbers, and details', reverse: false },
    { id: 'C3', type: 'RIASEC', trait: 'C', text: 'I am skilled at following procedures and maintaining accuracy', reverse: false }
];

// Combined questions for the assessment
export const ALL_QUESTIONS = [...OCEAN_QUESTIONS, ...RIASEC_QUESTIONS];

// Trait labels for display
export const OCEAN_LABELS = {
    O: 'Openness',
    C: 'Conscientiousness',
    E: 'Extraversion',
    A: 'Agreeableness',
    N: 'Neuroticism'
};

export const RIASEC_LABELS = {
    R: 'Realistic',
    I: 'Investigative',
    A: 'Artistic',
    S: 'Social',
    E: 'Enterprising',
    C: 'Conventional'
};

// Answer options (5-point Likert scale)
export const ANSWER_OPTIONS = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' }
];

// Calculate OCEAN scores from answers
// Returns scores scaled to 0-100
export function calculateOceanScores(answers: Record<string, number>): Record<string, number> {
    const traits = ['O', 'C', 'E', 'A', 'N'];
    const scores: Record<string, number> = {};

    traits.forEach(trait => {
        const traitQuestions = OCEAN_QUESTIONS.filter(q => q.trait === trait);
        let totalScore = 0;

        traitQuestions.forEach(q => {
            const answer = answers[q.id] || 3; // Default to neutral
            const score = q.reverse ? (6 - answer) : answer; // Reverse if needed
            totalScore += score;
        });

        // Scale from (4-20) to (0-100)
        // Min possible = 4 (all 1s), Max possible = 20 (all 5s)
        const rawScore = totalScore;
        const scaledScore = ((rawScore - 4) / 16) * 100;
        scores[OCEAN_LABELS[trait as keyof typeof OCEAN_LABELS]] = Math.round(scaledScore);
    });

    return scores;
}

// Calculate RIASEC code from answers
// Returns the top 3 codes in order (e.g. "IAS", "RIE")
export function calculateRiasecCode(answers: Record<string, number>): string {
    const codes = ['R', 'I', 'A', 'S', 'E', 'C'];
    const scores: Record<string, number> = {};

    codes.forEach(code => {
        const codeQuestions = RIASEC_QUESTIONS.filter(q => q.trait === code);
        let totalScore = 0;

        codeQuestions.forEach(q => {
            const answer = answers[q.id] || 3; // Default to neutral
            totalScore += answer;
        });

        scores[code] = totalScore;
    });

    // Sort codes by score (descending) and take top 3
    const sortedCodes = codes.sort((a, b) => scores[b] - scores[a]);
    return sortedCodes.slice(0, 3).join('');
}
