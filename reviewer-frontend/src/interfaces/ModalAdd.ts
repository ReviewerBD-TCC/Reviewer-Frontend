import {ReactNode} from "react";

export interface ModalAddProps{
    id: number,
    titlePtValue: string,
    titleEnValue: string,
    activeValue: boolean,
    title: string,
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void
}