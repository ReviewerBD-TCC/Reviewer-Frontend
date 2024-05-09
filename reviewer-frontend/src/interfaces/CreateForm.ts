import { QuestionList } from "./QuestionList";

export interface FormInterface{
    title: string;
    year: Date;
    questions?: QuestionList[];
}