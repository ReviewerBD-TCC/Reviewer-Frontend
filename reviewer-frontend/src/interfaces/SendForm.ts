import { QuestionAnswer } from "./QuestionAnswer"


export interface Answer{
    answer: string
}

export interface Form{
    questionFormId: number,
    userId: number,
    questionAnswer: QuestionAnswer[]
}