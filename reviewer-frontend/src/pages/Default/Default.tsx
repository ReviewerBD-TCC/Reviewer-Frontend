import React, { useState } from "react";
import {Header} from "../../components/Header/Header";
import { Default } from "components";

const Default: React.FC = () => {
  const [bgColor, setBgColor] = useState("#D0D0D0");
  
  const changeColor = (newColor: string) => {
    setBgColor(newColor);
  };


  return (
    <>
      <Header />
      <Default bgColor={bgColor} onFunction={toggle}/>
    </>
  );
};

export default Default;
