import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ClienteValidationSchema = z.object({
  name: z.string(),
  email: z.string().email({message: "Insira um email valido"}),
  password: z.string().min(8),
  gkz: z.string(), 
  manager: z.string(),
  user: z.string(),  
  type: z.string(),
})

export const ClienteResolver = zodResolver(ClienteValidationSchema)