import { AllFormsInterface } from 'interfaces/AllForms'
import React from 'react'
import { Link } from 'react-router-dom';

interface cardFormProps{
  titleForm: AllFormsInterface["title"];
  link: string;
}

const CardForm: React.FC<cardFormProps> = ({titleForm, link}: cardFormProps) => {
  return (
    <Link to={link}>
      <div className='bg-boschLightGray w-full min-h-[3.8rem] p-4'> 
        <h2 className='font-bold text-xl'>
            {titleForm}
        </h2>
      </div>
    </Link>
  )
}

export default CardForm