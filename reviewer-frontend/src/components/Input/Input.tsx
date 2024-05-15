import React from 'react'
import {Question} from '../Question/Question'

interface InputProps {
  id: number,
  titlePt:string,
  active: boolean,
  titleEn:string,
  className:string,
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={`bg-[#e0e2e5] p-2 w-full h-12 ${props.className}`}>
      <Question titlePt={props.titlePt} active={props.active} titleEn={props.titleEn} id={props.id} />
    </div>
  )
}
