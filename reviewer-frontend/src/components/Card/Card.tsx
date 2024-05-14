import React from 'react'
import RightArrow from '../../assets/icons/forward-right.svg'; 
import { Link } from 'react-router-dom';

interface cardProps{
  key:number;
  text:string;
  backgroundColor:string;
  nav: string;
  className: string;
}

export const Card: React.FC<cardProps> = ({text, backgroundColor, nav, className}) => {
  return (
    <Link to={nav} className={`${backgroundColor} flex justify-center items-center w-[22%] h-[95%] xl:h-[50%] lg:h-[60%] ${className}`}>
      <div className='w-full flex justify-center items-center flex-row '>
        <div className={`w-[80%] flex justify-between`}>
          {text}
          <img src={RightArrow} alt="" width={40} color='white' />
        </div>
      </div>
    </Link>
   )
}
