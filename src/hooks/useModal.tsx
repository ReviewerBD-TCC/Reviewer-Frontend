import { useState } from "react"

function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return{
        isOpen,
        toggle
    }
};


export default useModal
