import { SparkToggle } from '@bosch-web-dds/spark-ui-react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';
import { AxiosResponse } from 'axios'
import api from '../../api/Api';


interface QuestionProps{
    titlePt: string;
    titleEn: string;
    isActive: boolean;
    id: number;
}

export const Question: React.FC<QuestionProps> = (props) => {

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
        <div className='p-2 flex justify-between items-center' onClick={toggle}>
            <div className='w-[90%] max-w-[90%]'>
                {/* <p className='max-w-full overflow-x-scroll'>{props.titlePt}</p> */}
                <input type="text" defaultValue={props.titlePt} className='bg-transparent w-full outline-none' />
                {/* <input>{props.titlePt}</input> */}
            </div>
            <Modal title='Editor de pergunta' titlePtValue={props.titlePt} titleEnValue={props.titleEn} id={props.id} activeValue={props.isActive} isOpen={isOpen} toggle={toggle}/>
            <div className='max-w-[10%]'>
                <SparkToggle guid="spark-toggle-right-label" selected={props.isActive} disabled={false} whenChange={()=>{}}/>
            </div>
    </div>
  )
}
