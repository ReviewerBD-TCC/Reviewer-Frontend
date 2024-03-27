import React, { SelectHTMLAttributes, useState } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement | HTMLInputElement>{
  labelText:string;
  options?:Array<string | number>;
  value?: string | undefined;
  onChange?: () => void;
  onSelect?: () => void;
}

export const Select:React.FC<SelectProps> = ({labelText, options = [], value}, ...rest) => {
  return (
    <div className='w-auto w-max-full bg-boschLightGray flex flex-col relative h-12' >
        <label className='mt-1 mr-4 ml-4 mb-auto text-xs'>{labelText}</label>
        <select value={value} {...rest} className='w-max-[90%] h-12 outline-none appearance-none pr-11 pl-4 w-full bg-transparent text-[13.5px] overflow-hidden'>
          {
            options.map((opcao, index) =>(
              <option  key={index} value={opcao} className='h-12 w-5 whitespace-nowrap'>{opcao}</option>
            ))
          }
        </select>
    </div>
  )
}

