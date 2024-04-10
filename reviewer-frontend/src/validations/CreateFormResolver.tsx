import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const CreateFromValidationSchema = z.object({
    title: z.string(),
    year: z.number(),
    quastions: z.number().array(),
})

export const CreateFormResolver = zodResolver(CreateFromValidationSchema)
