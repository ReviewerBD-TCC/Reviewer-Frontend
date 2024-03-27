import React, { SelectHTMLAttributes, useState } from 'react'
import DownArrow from '../../assets/icons/down.svg'

export interface SelectedProps extends SelectHTMLAttributes<HTMLDivElement | HTMLSelectElement> {
  labelText: string;
  options?: Array<string | number> | undefined;
  zIndex:number
  onClick?: () => void;
}

export const Selected: React.FC<SelectedProps> = ({labelText, options, zIndex}, ...rest) => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null); 
 
  const handleOptionClick = (value: any) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className={`w-full w-max-full pb-1 flex flex-col h-12 bg-[#E0E2E5] relative z-${zIndex}`} {...rest} onClick={() => setIsOpen(!isOpen)}>
        <label className="mt-1 mr-4 ml-4 mb-auto text-xs w-auto" >
          {labelText}
        </label>
      
      {isOpen && (
        <div id='menu-dropdown' className="mt-7 pt-1 pl-4 pb-1 w-max-[90%] w-full min-h-[115px] h-auto text-start bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-auto">
          {
            options?.map((opcao, index) => (
              <div className='hover:bg-boschBlue hover:text-white max-w-full mt-2' key={index} onClick={() => {handleOptionClick(opcao); console.log(opcao)}}>{opcao}</div>
            ))
          } 
        </div>
      )}
      {selectedValue && !isOpen ? <p className="pr-11 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate">{selectedValue}</p> : <p></p>}
      {!selectedValue && !isOpen && (<p className="pr-11 pl-4 mb-2 w-max-[90%] text-xs h-auto text-boschGray text-start ">Selecione uma opção</p>)}
    </div>
  )
}
