export interface Answer{
    answer: string
}

export interface QuestionAnswer{
    question: number,
    answer: Answer
}

export interface Form{
    questionFormId: number,
    userId: string,
    questionAnswer: QuestionAnswer[]
}

export interface NewQuestions{
    questionId: number,
    newQuestionId: number
}

export interface UpdateQuestion{
    newQuestions: NewQuestions[]
}