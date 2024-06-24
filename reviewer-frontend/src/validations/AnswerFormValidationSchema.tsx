import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AnswerSchema = z.object({
  answer: z.string().min(1, 'A resposta não pode ser vazia.'),
});

const QuestionAnswerSchema = z.object({
  answer: AnswerSchema,
});

const FormSchema = z.object({
  questionAnswer: z.array(QuestionAnswerSchema),
});

export const AnswerFormResolver = zodResolver(FormSchema);
