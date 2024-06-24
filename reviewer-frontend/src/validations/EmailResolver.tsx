import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';

const EmailFormSchema = z.object({
    // to: z.string(),
    // bcc: z.array(z.string().email("E-mail inválido!")),
    subject: z.string().min(1, "Não é possível enviar um título vazio!"),
    body: z.string().min(1, "Não é possível enviar um e-mail vazio!"),
})

export const EmailResolver = zodResolver(EmailFormSchema);