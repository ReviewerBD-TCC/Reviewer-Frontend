import React from 'react'
import Question from '../Question/Question'

interface InputProps {
}

const Input: React.FC<InputProps> = () => {
  return (
        <div className='bg-[#D0D4D8] w-[570px] h-[40px] border-2'>
            <Question title="Primeira questão" isActive="false" />
        </div>
  )
}

export default Input
