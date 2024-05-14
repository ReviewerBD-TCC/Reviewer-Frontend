import { SparkButton, SparkIcon } from '@bosch-web-dds/spark-ui-react';
import { AllFormsInterface } from 'interfaces/AllForms'
import React from 'react'
import { Link } from 'react-router-dom';

interface cardFormProps {
  titleForm: AllFormsInterface["title"];
  id: number;
}

const CardForm: React.FC<cardFormProps> = ({ titleForm, id }: cardFormProps) => {
  return (
    
      <div className='bg-boschLightGray w-full min-h-[3.8rem] p-4 flex-row flex items-center'>
        <Link to={`/all-forms/single-form/${id}`} className='w-[90%]'>
        <h2 className='font-bold text-xl'>
          {titleForm}
        </h2>
        </Link>
        <div className='flex justify-end items-end w-[10%]'>
          <button className='w-auto bg-boschGrayText/10 rounded-full' onClick={()=>console.log(id)}>
            <SparkIcon icName={"delete"} />
          </button>
        </div>
      </div>
    
  )
}

export default CardForm