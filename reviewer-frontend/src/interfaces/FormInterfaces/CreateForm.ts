import { QuestionProps } from "../QuestionsInterface/Question";
import { QuestionList } from "../QuestionsInterface/QuestionList";

export interface FormInterface{
    id?: number;
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