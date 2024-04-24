import { SparkButton, SparkTextarea, SparkTextfield } from '@bosch-web-dds/spark-ui-react'
import { Header, Input, Selected } from 'components'
import { Email } from 'interfaces/Emaill'
import { mailSender } from 'services/EmailServices'
import { EmailResolver } from 'validations/EmailResolver'
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from 'context/AuthProvider'
import ModalEmailConfirmation from 'components/Modal/ModalEmailConfirmation'
import useModal from '../../hooks/useModal'
import { UserService } from 'services/UserService'
import { useEffect, useState } from 'react'

export default function EmailIndicationUser() {
    const { accessToken } = useAuth();

    const yearsOptions = [2024, 2025, 2026]

    const responseTime = ["15 dias", "20 dias", "30 dias"]
    
    const {getValues, handleSubmit, register, formState: {errors}} = useForm<Email>({
      resolver: EmailResolver
    });

    const {isOpen, toggle} = useModal()

    const [userList, setUserList] = useState<string[]>([])
    
    const sendEmail: SubmitHandler<Email> = async (values) => {
        mailSender(values, accessToken);
    }

  


    useEffect(()=>{
      const users = UserService.getUsers(accessToken).then(
        user=> {
          const email:any = user.map((item:any)=>item.email)
          setUserList(email)
        })
     
     },[])

    // const data:Email = {
    //   to:getValues("to"),
    //   bcc:[getValues("bcc")],
    //   body:getValues("body"),
    //   subject:getValues("subject"),
    //  }

    const allData:Email = {
      to:getValues("to"),
      bcc: userList,
      body:getValues("body"),
      subject:getValues("subject"),
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
                <SparkTextfield  placeholder='Assunto do e-mail' {...register("subject")}/>
                {errors.subject && <span className="text-red-600">Preencha o assunto do e-mail.</span>}

                <SparkTextarea  placeholder='Corpo do e-mail' {...register("body")} />
                {errors.body && <span className="text-red-600">Preencha o corpo do e-mail.</span>}

                <div className='flex justify-end'>
                    <SparkButton type='submit' pallete='primary' customWidth='13rem' text='Continuar' onClick={handleSubmit(toggle)}/>
                    <ModalEmailConfirmation isOpen={isOpen} data={allData}  toggle={toggle}/>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}