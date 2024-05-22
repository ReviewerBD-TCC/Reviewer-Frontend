import { QuestionProps } from "../QuestionsInterface/Question";
import { NewQuestions } from "../FormInterfaces/SendForm";

export interface SelectedProps {
    labelText: string;
    options?: Array<string | number>;
    question?: Array<QuestionProps>;
    onSelect?: (newQuestion: NewQuestions) => void; 
    setSelectedValue: any;
    selectedValue?: number | string | Date | QuestionProps;
  }