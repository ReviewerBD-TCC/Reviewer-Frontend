import React from 'react'
import { cardFormProps } from 'interfaces/FormInterfaces/CardForm'

const DashboardCardForm: React.FC<cardFormProps> = ({ titleForm, id, className, onClick }: cardFormProps) => {
    return (
    <div onClick={onClick}>
        <div className={`bg-boschLightGray w-full min-h-[3.8rem] p-4 flex-row flex items-center ${className}`}>
            <h2 className='font-bold text-xl'>
                {titleForm}
            </h2>
      </div>
    </div>
  )
}

export default DashboardCardForm