import { SparkIcon } from '@bosch-web-dds/spark-ui-react';
import { AllFormsInterface } from 'interfaces/AllForms'
import { useAuth } from 'context/AuthProvider';
import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from "react-toastify";
import ModalConfirmation from 'components/Modal/ModalConfirmation';
import useModal from "../../hooks/useModal";

interface cardFormProps {
  titleForm: AllFormsInterface["title"];
  id: number;
  className: string,
}

const CardForm: React.FC<cardFormProps> = ({ titleForm, id, className }: cardFormProps) => {

  const { accessToken } = useAuth();
  
  const {isOpen, toggle} = useModal()

  // async function deleteForm(token: string | null, formId: number | null) {
  //   try {
  //       const response = await FormService.deleteForm(token, formId);
  //       if(response.status === 204){
  //         showToastMessage()
  //         setTimeout(
  //           ()=>{
  //             window.location.reload()
  //           }
  //         )
  //       }
  //   } catch (error) {
  //       console.error(error);
  //   }
  // }

  return (
    
      <div className={`bg-boschLightGray w-full min-h-[3.8rem] p-4 flex-row flex items-center  ${className}`}>
        <Link to={`/all-forms/single-form/${id}`} className='w-[90%]'>
          <h2 className='font-bold text-xl'>
            {titleForm}
          </h2>
        </Link>
        <div className='flex justify-end items-end w-[10%]'>
          <button className='w-auto bg-boschGrayText/10 rounded-full' onClick={toggle}>
            <SparkIcon icName={"delete"} />
          </button>
          <ModalConfirmation
            isOpen={isOpen} 
            toggle={toggle} 
            modalButtonText="Sim" 
            modalSecondButtonText="Não" 
            modalTitle="Deletar formulário" 
            modalSubtitle="Ao confirmar, o formulários será deletado permanentemente, assim como suas respostas." 
            formId={id} 
          />
        </div>
        <ToastContainer/>
      </div>
    
  )
}

export default CardForm