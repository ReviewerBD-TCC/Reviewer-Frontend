import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CreateQuestionSchema = z.object({
    questionPt: z.string(),
    questionEn: z.string(),
    active: z.boolean().default(true)
});

export const CreateQuestionResolver = zodResolver(CreateQuestionSchema);