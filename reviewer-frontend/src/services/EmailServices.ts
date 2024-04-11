import api from '../api/Api'
import { Email } from "interfaces/Emaill";
import { useAuth } from 'context/AuthProvider';

 export const mailSender = (data: Email, token:string) =>  {
    console.log(data.body)
    api.defaults.headers.authorization = `Bearer ${token}`
    api.post("email", {
        bcc: data.bcc,
        to: "Feedback.BDXD-BR@br.bosch.com",
        subject: data.subject,
        body: data.body
    })
}