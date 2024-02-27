import React, { useState } from "react";
import Default from "../../components/Default/Default";
import Header from "../../components/Header/Header";


const Menu: React.FC = () => {
  const [bgColor, setBgColor] = useState("#D0D0D0");
  
  const changeColor = (newColor: string) => {
    setBgColor(newColor);
  };

  return (
    <>
      <Header />
      <Default bgColor={bgColor} onFunction={changeColor}/>
    </>
  );
};

export default Menu;
