import { SparkToggle } from "@bosch-web-dds/spark-ui-react";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import { ModalProps } from "interfaces/ModalInterfaces/Modal";
import { QuestionService } from "services/questionService";

export const Question: React.FC<ModalProps> = (props: ModalProps) => {
  const { isOpen, toggle } = useModal();
  const [active, setActive] = useState<boolean>(props?.active);
  const id = props.id;

  const updateToggle = async (active: boolean) => {
    try {
       await QuestionService.updateQuestionActive(
        id,
        active
      );
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="h-full flex justify-between items-center p-1">
      <div className="w-[95%] max-w-[100%] flex">
        <p onClick={toggle} className="truncate w-[90%]">
          {props.questionPt}
        </p>
      </div>
      <Modal
        title="Editor de pergunta"
        questionPt={props.questionPt}
        questionEn={props.questionEn}
        id={props.id}
        active={props.active}
        isOpen={isOpen}
        toggle={toggle}
      />
      <div className="w-auto">
        <SparkToggle
          guid="spark-toggle-right-label"
          selected={active}
          disabled={false}
          whenChange={() => {
            setActive(!active);
          }}
          onClick={() => updateToggle(active == true ? false : true)}
        />
      </div>
    </div>
  );
};
