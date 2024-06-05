import { AllFormsInterface } from "./AllForms";

export interface cardFormProps {
    titleForm: AllFormsInterface["title"];
    subTitle?: string;
    id?: number;
    className: string,
    onClick?: () => void;
}