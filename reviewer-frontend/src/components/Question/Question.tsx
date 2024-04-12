import { SparkToggle } from '@bosch-web-dds/spark-ui-react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';
import { AxiosResponse } from 'axios'
import api from '../../api/Api';
import { QuestionService } from 'services/questionService';
import { useAuth } from 'context/AuthProvider';
import editIcon from '../../assets/images/settings-editor.png';


interface QuestionProps{
    titlePt: string;
    titleEn: string;
    active: boolean;
    id: number;
}

export const Question: React.FC<QuestionProps> = (props) => {
    const { isOpen, toggle } = useModal();
    
    const id = props.id
    const token = useAuth()

    async function updateToggle(props :QuestionProps) {
        try{
            const response: AxiosResponse = await api.put(
                `question/${id}`,
                {
                    active: props.active,
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
            <div className='w-[100%] max-w-[100%] flex'>
                {/* <p className='max-w-full overflow-x-scroll'>{props.titlePt}</p> */}
                <p className='truncate w-[100%]'>{props.titlePt}</p>
                {/* <input type="text" defaultValue={props.titlePt} className='bg-transparent w-full outline-none' /> */}
                {/* <input>{props.titlePt}</input> */}
                <div className='flex w-[100%] justify-end' >
                    <img src={editIcon} onClick={toggle} className='cursor-pointer' />
                </div>
            </div>
            <Modal title='Editor de pergunta' titlePtValue={props.titlePt} titleEnValue={props.titleEn} id={props.id} active={props.active} isOpen={isOpen} toggle={toggle}/>
            {/* <div className='max-w-[10%]'>
                <SparkToggle guid="spark-toggle-right-label" selected={props.active} disabled={false} whenChange={()=>{}} onClick={()=>QuestionService.updateQuestion(token.accessToken, id, props.active)}/>
            </div> */}
    </div>
  )
}