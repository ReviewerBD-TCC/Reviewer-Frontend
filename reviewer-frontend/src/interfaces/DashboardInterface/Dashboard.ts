import { QuestionProps } from "interfaces/QuestionsInterface/Question"

export interface DashboardInterface {
    id: number
    questionFormId: number
    quantityAnsweredForm: number
    quantityFormSent: number
    whoAnsweredId: number
    whoAnsweredName: string
    question: QuestionProps
    answer: string
    forWhichUser: number
    whichUserName: string
  }