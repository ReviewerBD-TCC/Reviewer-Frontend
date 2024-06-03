import { QuestionProps } from "./Question";

export interface AnswerPerQuestionInterface{
    id: number;
    question: QuestionProps;
    questionPt: string;
    answer: string;
    whoAnsweredName: string;
    quantityAnsweredForm: number,
    quantityFormSent: number,
}