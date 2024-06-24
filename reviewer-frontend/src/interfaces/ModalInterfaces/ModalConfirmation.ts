export interface ModalConfirmationProps{
    isOpen: boolean;
    toggle: () => void;
    modalTitle: string;
    modalSubtitle: string;
    modalButtonText: string;
    modalSecondButtonText: string;
    formId: number | null;
}