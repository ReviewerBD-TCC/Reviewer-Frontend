import { QuestionProps } from "./Question"

export interface SendForm{
    id: number,
    questionFormId: number,
    answers: Array<string>,
}

export interface Form{
    id: number,
    title:string,
    questionPt: string,
    questionEn:string,
    year: string

}