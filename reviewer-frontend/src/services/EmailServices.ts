import api from '../api/Api'
import { Email } from "interfaces/Emaill";
import { useAuth } from 'context/AuthProvider';

 export const mailSender = (data: Email, token:string) =>  {
    console.log(data.to)
    api.defaults.headers.authorization = `Bearer ${token}`
    api.post("email", {
        bcc: ["victor.corsi@bosch.com"],
        to: data.to,
        cc: [data.cc],
        subject: data.subject,
        body: data.body
    })
}