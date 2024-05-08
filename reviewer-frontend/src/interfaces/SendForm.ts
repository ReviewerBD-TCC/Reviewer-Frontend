import { QuestionProps } from "./Question"
import { QuestionList } from "./QuestionList"

export interface Form{
    id: number,
    title:string,
    questions: QuestionList[],
    year: string
}
