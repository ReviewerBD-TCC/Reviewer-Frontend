import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ClienteValidationSchema = z.object({
  name: z.string().transform(name => {
    return name.trim().split(' ').map(palavra => {
      return palavra[0].toLocaleUpperCase().concat(palavra.substring(1))
    }).join(' ')
  }),
  email: z.string().email("Insira um email válido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
  gkz: z.string(), 
  manager: z.string(),
  user: z.string(),  
  type: z.string(),
})

export const ClienteResolver = zodResolver(ClienteValidationSchema)