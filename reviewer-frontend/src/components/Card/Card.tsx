import React from 'react'
import RightArrow from '../../assets/icons/forward-right.svg'; 
import { Link } from 'react-router-dom';

interface cardProps{
  key:number;
  text:string;
  backgroundColor:string;
  nav: string
}

export const Card: React.FC<cardProps> = ({text, backgroundColor, nav}) => {
  return (
    <Link to={nav} className={`${backgroundColor} flex justify-center items-center w-[22%] h-[45%] notebook:h-[55%]`}>
      <div className='w-full flex justify-center items-center flex-row '>
        <div className='w-[80%] flex justify-between'>
          {text}
          <img src={RightArrow} alt="" width={40} color='white' />
        </div>
      </div>
    </Link>
   )
}
