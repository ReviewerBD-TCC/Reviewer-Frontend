import { QuestionAnswer } from "./QuestionAnswer"

export interface Form{
    questionFormId: number,
    userId: number,
    questionAnswer: QuestionAnswer[]
}