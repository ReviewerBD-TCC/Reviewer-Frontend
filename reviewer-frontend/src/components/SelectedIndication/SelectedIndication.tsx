import React, { SelectHTMLAttributes, useState } from 'react';
import { User } from '../../interfaces/CreateUser'; 


export interface SelectedProps extends SelectHTMLAttributes<HTMLDivElement | HTMLSelectElement> {
  labelText: string;
  options?: Array<User>;
  zIndex: number;
  onChange?: (value: User) => void; 
}

export const SelectedIndication: React.FC<SelectedProps> = ({ labelText, options, zIndex, onChange }, ...rest) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<User>();

  const handleOptionClick = (value: User) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`w-full w-max-full flex flex-col h-12 bg-[#E0E2E5] relative z-${zIndex}`} {...rest} onClick={() => setIsOpen(!isOpen)}>
      <label className="mt-1 mr-4 ml-4 mb-auto text-xs w-auto" >
        {labelText}
      </label>
      {isOpen && (
        <div className="mt-3 pt-1 pr-4 pl-4 pb-1 w-max-[90%] h-auto bg-[#e0e2e5] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          {options?.map((option, index) => (
            <div className='hover:bg-boschBlue hover:text-white max-w-full mt-2' key={index} onClick={() => handleOptionClick(option)}>
              {option.name}
            </div>
          ))}
        </div>
      )}
      {selectedValue && !isOpen ? (
        <p className="pr-11 pl-4 w-max-[90%] text-[13.5px] h-auto ">{selectedValue.name}</p>
      ) : (
        <p></p>
      )}
      {!selectedValue && !isOpen && (
        <p className="pr-11 pl-4 mb-2 w-max-[90%] text-xs h-auto text-boschGray ">Selecione uma opção</p>
      )}
    </div>
  );
};
