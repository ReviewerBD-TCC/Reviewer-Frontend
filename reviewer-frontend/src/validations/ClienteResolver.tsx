import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ClienteValidationSchema = z.object({
  name: z.string().min(1, "Insira um nome válido").transform(name => {
    return name.trim().split(' ').map(palavra => {
      return palavra[0].toLocaleUpperCase().concat(palavra.substring(1))
    }).join(' ')
  }),
  email: z.string().email("Insira um email válido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
  gkz: z.string().min(1, "Insira um departamento válido"), 
  manager: z.string().min(1, "Insira um nome válido"),
  user: z.string().min(1, "Insira um usuário válido"),  
  type: z.string(),
})

export const ClienteResolver = zodResolver(ClienteValidationSchema)