import { SparkIcon } from '@bosch-web-dds/spark-ui-react';
import React from 'react'
import { Link } from 'react-router-dom';
import ModalConfirmation from 'components/Modal/ModalConfirmation';
import useModal from "../../hooks/useModal";
import { cardFormProps } from 'interfaces/FormInterfaces/CardForm';

const CardForm: React.FC<cardFormProps> = ({ titleForm, id, className }: cardFormProps) => {
  
  const {isOpen, toggle} = useModal()

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
      </div>
    
  )
}

export default CardForm