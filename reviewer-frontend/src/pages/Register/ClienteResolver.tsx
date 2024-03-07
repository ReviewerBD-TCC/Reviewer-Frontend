import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Esquema de validação para dados do cliente
const ClienteValidationSchema = yup.object({

  name: yup.string().required(),    // Nome é uma string obrigatória
  email: yup.string().required(),     // CPF é uma string obrigatória
  password: yup.string().required(),    // Tipo é uma string obrigatória
  gkz: yup.string().required(), // Salário é uma string obrigatória
  manager: yup.string().required(),     // Rua é uma string obrigatória
  user: yup.string().required(),  // Bairro é uma string obrigatória
});

// Criando um resolvedor de yup para utilizar com o hookform
export const ClienteResolver = yupResolver(ClienteValidationSchema);