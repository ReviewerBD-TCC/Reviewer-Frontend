import { QuestionProps } from 'interfaces/Question';
import React, { SelectHTMLAttributes, useEffect, useRef, useState } from 'react'

export interface SelectedProps extends SelectHTMLAttributes<HTMLButtonElement | HTMLSelectElement> {
  labelText: string;
  options?: Array<string | number>;
  question?: Array<QuestionProps>;
  // zIndex: number;
  onSelect?: () => void;
  setSelectedValue: any;
  selectedValue?: number | string | Date | QuestionProps[];
}

export const Selected: React.FC<SelectedProps> = ({ labelText, options, question, onSelect, setSelectedValue, selectedValue }, ...rest) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<any>(null)
  const [optSelected, setOptSelected] = useState()

  function handleOptionClick(value: any) {
    setSelectedValue(value);
    setOptSelected(value.questionPt)

    if (onSelect) {
      return value
    }

    setIsOpen(false);
  };

  useEffect(() => {
		function handleClickOutside(event: any) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);
  

  return (
    <div className={`w-full w-max-full pb-1 flex flex-col h-12 bg-[#E0E2E5] relative`} {...rest} onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <label className="mt-1 mr-4 ml-4 mb-auto text-xs w-auto" >
        {labelText}
      </label>
      {isOpen && (
        <ul id='menu-dropdown' className="w-full mt-7 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] list-none z-50">
          {options ? (
            options.map((opcao, index) => (
              <li className='bg-boschWhite z-50 pl-3 pt-1 pb-1 pr-3 hover:text-white h-7 w-full max-w-full hover:bg-boschBlue' key={index} onClick={() => { handleOptionClick(opcao)}}>{opcao}</li>
            ))
          ) : question ? (
            question.map((question, index) => (
              <li className='bg-boschWhite z-50 pl-3 pt-1 pb-1 h-6 hover:text-white max-w-full w-full hover:bg-boschBlue' key={index} onClick={() => { handleOptionClick(question)}}>{question.questionPt}</li>
            ))
          ) : null}
        </ul>
      )}
      {
        typeof selectedValue === 'object' ? (
          selectedValue && !isOpen ? (
            <li className="pr-11 pb-1 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate list-none">{optSelected}</li>
          ) : (
            <li className='list-none'></li>
          )
        ) : (
          selectedValue && !isOpen ? (
            <li className="pr-11 pb-1 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate list-none">{selectedValue}</li>
          ) : (
            <li className='list-none'></li>
          )
        )
      }

      {/* {selectedValue && !isOpen ? <p className="pr-11 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate">{selectedValue}</p> : <p></p>} */}
      {!selectedValue && !isOpen && (<p className="pr-11 pl-4 mb-2 w-max-[90%] text-xs h-auto text-boschGray text-start ">Selecione uma opção</p>)}
    </div>
  )
}