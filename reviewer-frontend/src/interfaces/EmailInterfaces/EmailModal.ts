import { Email } from "./Email";

export interface EmailModal{
    data: Email
    isOpen: boolean;
    toggle: () => void
}