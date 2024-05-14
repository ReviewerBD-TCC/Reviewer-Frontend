import React, { useState } from "react";
import RightArrow from "../../assets/icons/forward-right.svg";
import { Link } from "react-router-dom";

interface cardProps {
  key: number;
  text: string;
  backgroundColor: string;
  nav: string;
  className: string;
  description: string;
}

export const Card: React.FC<cardProps> = ({
  text,
  backgroundColor,
  nav,
  className,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={nav}
      className={`${backgroundColor} flex justify-center items-center relative w-[22%] h-[95%] xl:h-[50%] lg:h-[60%] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full flex justify-center items-center relative">
        <div className={`w-[80%] flex justify-between ${isHovered ? 'transform -translate-y-12 duration-300' : ''}`}>
          {text}
          <img src={RightArrow} alt="" width={40} color="white" />
        </div>
        {isHovered && (
          <div className="absolute bottom-6 left-0 right-0 p-4 text-white overflow-hidden">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
};