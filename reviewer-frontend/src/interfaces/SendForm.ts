import { QuestionProps } from "./Question"

export interface SendForm{
    id: number,
    questionFormId: number,
    answers: Array<string>,
}

export interface Form{
    id: number,
    title:string,
    questions: Array<QuestionProps>
    
    year: string
}