import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ClienteValidationSchema = yup.object({
  name: yup.string().required(),    
  email: yup.string().required(),     
  password: yup.string().required(),  
  gkz: yup.string().required(), 
  manager: yup.string().required(),   
  user: yup.string().required(),  
  type: yup.string().required(),
});

export const ClienteResolver = yupResolver(ClienteValidationSchema);