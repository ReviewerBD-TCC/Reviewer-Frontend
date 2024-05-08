import { QuestionList } from "./QuestionList";

export interface CreateFormInterface{
    title: string;
    year: Date;
    questions?: QuestionList[];
}