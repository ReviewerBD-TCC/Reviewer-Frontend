import { SparkButton, SparkTextarea, SparkTextfield } from '@bosch-web-dds/spark-ui-react'
import { Header, Input, Selected } from 'components'
import { Email } from 'interfaces/Emaill'
import { mailSender } from 'services/EmailServices'
import { EmailResolver } from 'validations/EmailResolver'
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from 'context/AuthProvider'
import ModalEmailConfirmation from 'components/Modal/ModalEmailConfirmation'
import useModal from '../../hooks/useModal'

export default function EmailIndicationUser() {
    const { accessToken } = useAuth();

    const yearsOptions = [2024, 2025, 2026]

    const responseTime = ["15 dias", "20 dias", "30 dias"]
    
    const {getValues, handleSubmit, register } = useForm<Email>({
      resolver: EmailResolver
    });

    const {isOpen, toggle} = useModal()
    
    const sendEmail: SubmitHandler<Email> = async (values) => {
       
        mailSender(values, accessToken);
        
    }
    const data:Email = {
      to:getValues("to"),
      bcc:[getValues("bcc")],
      body:getValues("body"),
      subject:getValues("subject"),
      cc:[getValues("cc")]
     }

  return (
    <div className='h-auto min-h-screen w-full flex flex-col items-center'>
    <Header/>
    <div className="bg-boschWhite h-auto w-full flex justify-center items-center">
        <div className='h-auto w-[90%] flex items-center justify-center pt-10 pb-10'>
            <form className="w-[85%] h-auto flex flex-col justify-center gap-10">
                <h1 className='font-bold text-4xl'>Disparo de indicações</h1>
                <div className="w-[45%] flex flex-row gap-8 pb-5">
                  <div className='w-[35%] laptop:w-[45%]'>
                  <Selected labelText='Ano' zIndex={50} options={yearsOptions} />
                  </div>
                  <div className='w-[35%] laptop:w-[45%]'>
                  <Selected labelText='Tempo de resposta' zIndex={50} options={responseTime}/>
                  </div>
                  
                </div>
                {/* <SparkTextfield placeholder='Para' {...register("to")} /> */}
                <SparkTextfield placeholder='Cc' {...register("cc")} />
                <SparkTextfield placeholder='Digite o assunto do e-mail' {...register("subject")}/>
                <SparkTextarea placeholder='Corpo do e-mail' {...register("body")}/>
                
                <div className='flex justify-end'>
                    <SparkButton type='submit' pallete='primary' customWidth='13rem' text='Enviar' onClick={toggle}/>
                    <ModalEmailConfirmation isOpen={isOpen} toggle={toggle}/>
                    {/* <SparkButton type='submit' pallete='primary' customWidth='13rem' text='Enviar' onClick={()=>handleSubmit(sendEmail(getValues()))}/> */}
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}
