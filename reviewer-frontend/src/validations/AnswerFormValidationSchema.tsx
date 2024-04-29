import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const AnswerFormValidationSchema = z.object({
    answers: z.string().min(1)
})

export const AnswerFormResolver = zodResolver(AnswerFormValidationSchema)
