import { AllFormsInterface } from 'interfaces/AllForms'
import React from 'react'
import { Link } from 'react-router-dom';

interface cardFormProps{
  titleForm: AllFormsInterface["title"];
  id: number;
}

const CardForm: React.FC<cardFormProps> = ({titleForm, id}: cardFormProps) => {
  return (
    <Link to={`/all-forms/single-form/${id}`}>
      <div className='bg-boschLightGray w-full min-h-[3.8rem] p-4'> 
        <h2 className='font-bold text-xl'>
            {titleForm}
        </h2>
      </div>
    </Link>
  )
}

export default CardForm