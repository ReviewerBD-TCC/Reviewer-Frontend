import api from '../api/Api'
import { Email } from "interfaces/EmailInterfaces/Email";

export const mailSender = (data: Email) =>  {
    console.log(data.body)

    api.post("email", {
        bcc: data.bcc,
        to: "Feedback.BDXD-BR@br.bosch.com",
        subject: data.subject,
        body: data.body
    })
}