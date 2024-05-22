import React from "react";
import { Question } from "../Question/Question";
import { InputProps } from "interfaces/ModalInterfaces/Input";

export const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={`bg-[#e0e2e5] p-2 w-full h-12 ${props.className}`}>
      <Question
        questionPt={props.titlePt}
        active={props.active}
        questionEn={props.titleEn}
        id={props.id}
      />
    </div>
  );
};
