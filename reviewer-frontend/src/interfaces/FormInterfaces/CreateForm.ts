import { User } from "interfaces/UserInterfaces/CreateUser";
import { QuestionProps } from "../QuestionsInterface/Question";
import { QuestionList } from "../QuestionsInterface/QuestionList";

export interface FormInterface{
    id?: number;
    questionFormTitle: string;
    year: Date;
    whichUserName: string;
    questions?: QuestionList[];
    forWhichUser: number;
    questionFormId: number;
}

export interface FormResponseInterface{
    id: number;
    title: string;
    year: Date;
    user: User,
    questions?: QuestionProps[];
}