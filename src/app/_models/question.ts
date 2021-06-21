export interface Question {
    id: number;
    text: string;
    timeToAnswer: number;
    difficulty: number;
    imageId: number;
    uniqueKey: string;
    administratorId: number;
    questionnaireId: number;
}