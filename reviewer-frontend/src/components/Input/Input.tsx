import React from 'react'
import Question from '../Question/Question'

interface InputProps {
}

const Input: React.FC<InputProps> = () => {
  return (
        <div className='bg-[#D0D4D8]  w-[100%] h-[40px] border-b-[1px] border-black'>
            <Question title='Lorem ipsum dolor sit amet. Eos quia obcaecati aut totam provident 
            sit totam obcaecati aut esse expedita ut numquam incidunt. ' isActive="false" />
        </div>
  )
}

export default Input
