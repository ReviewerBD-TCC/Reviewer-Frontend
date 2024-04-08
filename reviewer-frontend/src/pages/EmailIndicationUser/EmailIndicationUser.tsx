import { SparkButton, SparkTextarea, SparkTextfield } from '@bosch-web-dds/spark-ui-react'
import { Header, Input, Selected } from 'components'
import React from 'react'
import { mailSender } from 'services/EmailServices'

export default function EmailIndicationUser() {

    const yearsOptions = [2024, 2025, 2026]

    const responseTime = ["15 dias", "20 dias", "30 dias"]

    // async function sendEmail() {
    //     try{
            
    //     }
    // }

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
               
                <SparkTextfield placeholder='Digite o endereço de e-mail para ser enviado como cópia' />
                <SparkTextfield placeholder='Digite o assunto do e-mail' />
                <SparkTextarea placeholder='Corpo do e-mail' />
                
                <div className='flex justify-end'>
                    <SparkButton type='submit' pallete='primary' customWidth='13rem' text='Enviar'/>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}
