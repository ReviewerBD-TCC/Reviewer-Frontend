import { SparkToggle } from '@bosch-web-dds/spark-ui-react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';

interface QuestionProps{
    titlePt: string;
    titleEn: string;
    isActive: string;
    id: number;
}

const Question: React.FC<QuestionProps> = (props) => {

    const { isOpen, toggle } = useModal();

    return (
        <div className='p-2 flex justify-between items-center'>
            <button onClick={toggle}>
                <h1>{props.titlePt}</h1>
            </button>
            <Modal title='Editor de pergunta' titlePtValue={props.titlePt} titleEnValue={props.titleEn} id={props.id} activeValue={props.isActive} isOpen={isOpen} toggle={toggle}/>
            <div>
                <SparkToggle guid="spark-toggle-right-label" selected={props.isActive} disabled={false} whenChange={()=>{}}/>
            </div>
    </div>
  )
}

export default Question
