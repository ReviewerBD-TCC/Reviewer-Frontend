import React from 'react'
import Question from '../Question/Question'

interface InputProps {
  title:string,
  isActive:boolean,
}

const Input: React.FC<InputProps> = () => {
  return (
        <div className='bg-[#D0D4D8]  w-[100%] h-[40px] border-b-[1px] border-black'>
            <Question title='' isActive="true" />
        </div>
  )
}

export default Input
