import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';

const EmailFormSchema = z.object({
    to: z.string(),
    bcc: z.array(z.string()),
    subject: z.string(),
    body: z.string(),
})

export const EmailResolver = zodResolver(EmailFormSchema);