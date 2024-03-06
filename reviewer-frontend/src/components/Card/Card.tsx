import React from 'react'

interface cardProps{
    key:number;
    text:string;
    backgroundColor:string;
}

export const Card: React.FC<cardProps> = ({text, backgroundColor}) => {

  return (
    <div className={`${backgroundColor} flex justify-center items-center gap-4 flex-col w-[17%] h-[45%] `} >
        {text}
    </div>
  )
}
