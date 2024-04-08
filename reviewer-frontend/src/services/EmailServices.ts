import api from "api/Api";
import { Email } from "interfaces/Emaill";

export const mailSender = (data: Email) => api.post("email", data)



