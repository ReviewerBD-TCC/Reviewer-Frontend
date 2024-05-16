export interface Answer{
    answer: string
}

export interface QuestionAnswer{
    question: number,
    answer: Answer
}

export interface Form{
    questionFormId: number,
    userId: number,
    questionAnswer: QuestionAnswer[]
}

export interface updateQuestion{
    questionId: number,
    newQuestionId: number
}