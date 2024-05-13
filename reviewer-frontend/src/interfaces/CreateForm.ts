import { QuestionProps } from "./Question";
import { QuestionList } from "./QuestionList";

export interface FormInterface{
    id: number;
    title: string;
    year: Date;
    questions?: QuestionList[];
}

export interface FormResponseInterface{
    id: number;
    title: string;
    year: Date;
    questions?: QuestionProps[];
}