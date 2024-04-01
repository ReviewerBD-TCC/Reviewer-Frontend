import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 

const IndicationFormSchema = yup.object().shape({
    userIndication: yup.number().required(),
    indicateds: yup.array().of(
        yup.object().shape({
            userIndicated: yup.number().required()
        })
    )
})

export const IndicationResolver = yupResolver(IndicationFormSchema);