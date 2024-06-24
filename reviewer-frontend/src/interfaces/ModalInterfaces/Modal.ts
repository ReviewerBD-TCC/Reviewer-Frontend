import { ReactNode } from "react";

export interface ModalProps{
    id?: number,
    questionPt?: string,
    questionEn?: string,
    active?: boolean,
    title?: string,
    children?: ReactNode;
    isOpen?: boolean;
    toggle?: () => void
}