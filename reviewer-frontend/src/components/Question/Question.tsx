import { SparkToggle } from '@bosch-web-dds/spark-ui-react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';
import { AxiosResponse } from 'axios'
import api from '../../api/Api';


interface QuestionProps{
    titlePt: string;
    titleEn: string;
    isActive: string;
    id: number;
}

const Question: React.FC<QuestionProps> = (props) => {

    const { isOpen, toggle } = useModal();
    
    const id = props.id
    const token = localStorage.getItem('token');

    
    async function updateToggle(props :QuestionProps) {


        try{
            const response: AxiosResponse = await api.put(
                `question/${id}`,
                {
                    active: props.isActive,
                },{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            console.log(response.data.question);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='p-2 flex justify-between items-center'>
            <button onClick={toggle}>
                <h1>{props.titlePt}</h1>
            </button>
            <Modal title='Editor de pergunta' titlePtValue={props.titlePt} titleEnValue={props.titleEn} id={props.id} activeValue={props.isActive} isOpen={isOpen} toggle={toggle}/>
            <div>
                <SparkToggle guid="spark-toggle-right-label" selected={props.isActive} disabled={false} whenChange={()=>{updateToggle}}/>
            </div>
    </div>
  )
}

export default Question
