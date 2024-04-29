import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const LoginResolver = zodResolver(LoginSchema);