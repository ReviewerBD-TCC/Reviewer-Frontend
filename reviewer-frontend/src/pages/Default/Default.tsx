import React, { useState } from "react";
import Def from "../../components/Default/Default";
import Header from "../../components/Header/Header";


const Default: React.FC = () => {
  const [bgColor, setBgColor] = useState("#D0D0D0");
  
  const changeColor = (newColor: string) => {
    setBgColor(newColor);
  };

  return (
    <>
      <Header />
      <Def bgColor={bgColor} onFunction={changeColor}/>
    </>
  );
};

export default Default;
