import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SparkIcon } from "@bosch-web-dds/spark-ui-react";
import { cardProps } from "interfaces/FormInterfaces/Card";

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
        <div
          className={`w-[80%] flex justify-between ${
            isHovered ? "transform -translate-y-12 duration-300" : ""
          }`}
        >
          {text}
          <SparkIcon
            icName="wide-angled-arrow"
            pallete="primary"
            noPadding={true}
          />
        </div>
        {isHovered && (
          <div className="absolute bottom-2 left-0 right-0 p-4 text-white overflow-hidden">
            <p className="text-sm">{description}</p>
          </div>
        )}
      </div>
    </Link>
  );
};
