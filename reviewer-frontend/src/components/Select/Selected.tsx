import { useAuth } from 'context/AuthProvider';
import { QuestionProps } from 'interfaces/Question';
import React, { SelectHTMLAttributes, useEffect, useRef, useState } from 'react'

export interface SelectedProps extends SelectHTMLAttributes<HTMLButtonElement | HTMLSelectElement> {
  labelText: string;
  options?: Array<string | number>;
  question?: Array<QuestionProps>;
  zIndex: number;
  onSelect?: () => void;
  setSelectedValue: any;
  selectedValue: number | string;
}

export const Selected: React.FC<SelectedProps> = ({ labelText, options, question, zIndex, onSelect, setSelectedValue, selectedValue }, ...rest) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLButtonElement | undefined>()
  const [optSelected, setOptSelected] = useState()
  const { changeLanguage, language } = useAuth

  function handleOptionClick(value: any) {
    setSelectedValue(value);
    setOptSelected(value.questionPt)

    if(value == 'Inglês'){
      changeLanguage('Inglês')
    }else{
      changeLanguage('Português')
    }

    if (onSelect) {
      return value
    }

    setIsOpen(false);
  };

  return (
    <div className={`w-full w-max-full pb-1 flex flex-col h-12 bg-[#E0E2E5] relative z-${zIndex}`} {...rest} onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <label className="mt-1 mr-4 ml-4 mb-auto text-xs w-auto" >
        {labelText}
      </label>
      {isOpen && (
        <div id='menu-dropdown' className="mt-7 pt-1 pl-4 pb-1 w-max-[90%] w-full min-h-[115px] h-auto text-start bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-auto scroll-smooth">
          {options ? (
            options.map((opcao, index) => (
              <div className='hover:bg-boschBlue hover:text-white max-w-full mt-2' key={index} onClick={() => { handleOptionClick(opcao) }}>{opcao}</div>
            ))
          ) : question ? (
            question.map((question, index) => (
              <div className='hover:bg-boschBlue hover:text-white max-w-full mt-2' key={index} onClick={() => { handleOptionClick(question) }}>{question.questionPt}</div>
            ))
          ) : null}
        </div>
      )}
      {
        typeof selectedValue === 'object' ? (
          selectedValue && !isOpen ? (
            <p className="pr-11 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate">{optSelected}</p>
          ) : (
            <p></p>
          )
        ) : (
          selectedValue && !isOpen ? (
            <p className="pr-11 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate">{selectedValue}</p>
          ) : (
            <p></p>
          )
        )
      }

      {/* {selectedValue && !isOpen ? <p className="pr-11 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate">{selectedValue}</p> : <p></p>} */}
      {!selectedValue && !isOpen && (<p className="pr-11 pl-4 mb-2 w-max-[90%] text-xs h-auto text-boschGray text-start ">Selecione uma opção</p>)}
    </div>
  )
}