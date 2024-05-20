import { QuestionProps } from "interfaces/Question";
import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { NewQuestions } from "interfaces/SendForm";

interface SelectedProps
  extends SelectHTMLAttributes<HTMLButtonElement | HTMLSelectElement> {
  labelText: string;
  options?: Array<string | number>;
  question?: Array<QuestionProps>;
  onSelect?: (newQuestion: NewQuestions) => void; 
  setSelectedValue: any;
  selectedValue?: number | string | Date | QuestionProps;
}

export const Selected: React.FC<SelectedProps> = (
  { labelText, options, question, onSelect, setSelectedValue, selectedValue },
  ...rest
) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [optSelected, setOptSelected] = useState(null);

  function handleOptionClick(value: any) {
    setSelectedValue(value);
    setOptSelected(value);

    if (optSelected !== selectedValue) {
      const e = question?.find((each)=>each.questionPt === selectedValue)

      if (e) {
        const questionValue: NewQuestions = {
          newQuestionId: parseInt(value.id),
          questionId: e?.id,
        };
        onSelect(questionValue);
      }
    }

    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className={`w-full w-max-full pb-1 flex flex-col h-12 bg-[#E0E2E5] relative`}
      {...rest}
      onClick={() => setIsOpen(!isOpen)}
      ref={dropdownRef}
    >
      <label className="mt-1 mr-4 ml-4 mb-auto text-xs w-auto">
        {labelText}
      </label>
      {isOpen && (
        <div className="w-full max-h-28 z-50 transition-all">
          <ul
            id="menu-dropdown"
            className="bg-boschWhite w-full min-h-9 h-auto max-h-36 mt-7 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] list-none z-50 overflow-y-auto scroll-smooth transition-transform"
          >
            {options
              ? options.map((opcao, index) => (
                  <li
                    className="bg-boschWhite z-50 pl-3 pt-1 pb-1 pr-3 min-h-9 max-h-14 h-auto hover:text-white w-full max-w-full hover:bg-boschBlue"
                    key={index}
                    onClick={() => {
                      handleOptionClick(opcao);
                    }}
                  >
                    {opcao}
                  </li>
                ))
              : question
              ? question.map((question, index) => (
                  <li
                    className="bg-boschWhite z-50 pl-3 pt-1 pb-1 min-h-9 max-h-14 h-auto hover:text-white max-w-full w-full hover:bg-boschBlue"
                    key={index}
                    onClick={() => {
                      handleOptionClick(question);
                    }}
                  >
                    {question.questionPt}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
      {typeof selectedValue === "object" ? (
        selectedValue && !isOpen ? (
          <li className="pr-11 pb-1 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate list-none">
            {optSelected}
          </li>
        ) : (
          <li className="list-none">mbvbvnbvn</li>
        )
      ) : selectedValue && !isOpen ? (
        <li className="pr-11 pb-1 pl-4 w-max-[90%] text-[13.5px] h-auto text-start truncate list-none">
          {selectedValue}
        </li>
      ) : (
        <li className="list-none"></li>
      )}

      {!selectedValue && !isOpen && (
        <li className="pr-11 pl-4 mb-2 w-max-[90%] text-xs h-auto text-boschGray text-start list-none">
          Selecione uma opção
        </li>
      )}
    </div>
  );
};
