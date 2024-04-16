import { SparkToggle } from '@bosch-web-dds/spark-ui-react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';
import { AxiosResponse } from 'axios'
import api from '../../api/Api';
import { QuestionService } from 'services/questionService';
import { useAuth } from 'context/AuthProvider';
import editIcon from '../../assets/images/edit-3.png';
import { useState } from 'react';


interface QuestionProps{
    titlePt: string;
    titleEn: string;
    active: boolean;
    id: number;
}

export const Question: React.FC<QuestionProps> = (props) => {
    const { isOpen, toggle, } = useModal();
    const [active, setActive] = useState<boolean>(props.active)
    
    const id = props.id
    const token = useAuth()

    async function updateToggle(token: string, id:number, active:boolean) {
        console.log(active);
        try{
            const response: AxiosResponse = await api.patch(
                `question/${id}`,
                {
                    active: active,
                },{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            window.location.reload()
        }catch(error){
            // console.log(active)
        }
    }

    return (
        <div className='h-full flex  justify-between items-center p-1'>
            <div className='w-[95%] max-w-[100%] flex'>
                {/* <p className='max-w-full overflow-x-scroll'>{props.titlePt}</p> */}
                <p onClick={toggle} className='m-2 truncate w-[90%]'>{props.titlePt}</p>
                {/* <input type="text" defaultValue={props.titlePt} className='bg-transparent w-full outline-none' /> */}
                {/* <input>{props.titlePt}</input> */}
                {/* <div className='flex w-auto items-center' >
                    <img src={editIcon} onClick={toggle} className='cursor-pointer size-7' />
                </div> */}
            </div>
            <Modal title='Editor de pergunta' titlePtValue={props.titlePt} titleEnValue={props.titleEn} id={props.id} active={props.active} isOpen={isOpen} toggle={toggle}/>
            <div className='w-auto'>
                <SparkToggle guid="spark-toggle-right-label" selected={active} disabled={false} whenChange={()=>{setActive(!active)}} onClick={()=>updateToggle(token.accessToken, id, active == true?false:true)}/>
            </div>
    </div>
  )
}