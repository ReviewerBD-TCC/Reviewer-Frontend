import React from 'react'
import {Question} from '../Question/Question'

interface InputProps {
  id: number,
  titlePt:string,
  active: boolean,
  titleEn:string,
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className='bg-[#D0D4D8]  w-[100%] h-[40px] border-b-[1px] border-black'>
      <Question titlePt={props.titlePt} active={props.active} titleEn={props.titleEn} id={props.id} />
    </div>
  )
}
