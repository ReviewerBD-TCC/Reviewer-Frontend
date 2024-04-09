import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 

const EmailFormSchema = yup.object().shape({
    to: yup.string().required(),
    cc: yup.array().of(yup.string()),
    bcc: yup.array().of(yup.string()),
    subject: yup.string().required(),
    body: yup.string().required(),
})

export const EmailResolver = yupResolver(EmailFormSchema);