import { SparkToggle } from '@bosch-web-dds/spark-ui-react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';

interface QuestionProps{
    title: string;
    isActive: string;
}

const Question: React.FC<QuestionProps> = (props) => {

    const { isOpen, toggle } = useModal();


    return (
        <div className='m-2 flex justify-between'>
            <button onClick={toggle}>
                <h1>{props.title}</h1>
            </button>
            <Modal isOpen={isOpen} toggle={toggle}/>
            <div>
                <SparkToggle guid="spark-toggle-right-label" selected={props.isActive} disabled={false} whenChange={()=>{}}/>
            </div>
    </div>
  )
}

export default Question
