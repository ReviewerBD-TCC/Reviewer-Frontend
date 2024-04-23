import React, { useEffect, useState } from 'react'
import { Header, Selected } from 'components'
import { SparkButton, SparkTextarea, SparkNotification } from '@bosch-web-dds/spark-ui-react'
import { getFormQuestions } from 'services/FormsService'
import { useAuth } from 'context/AuthProvider'
import { Form, SendForm } from 'interfaces/SendForm'

function Form() {

    const token = useAuth().accessToken
    const[dataApi, setDataAPi] = useState<Form[]>([])
    const [form, setForm] = useState<Form>()
    const {language} = useAuth();
   useEffect(()=>{
    const formQuestion = getFormQuestions(token, 1)
    const data = formQuestion.then(function(response){
        const data = response.map(element=>{
            return element
        })
      setDataAPi(data)
      setForm(data[0])
    })
   },[])

    const languageOptions = ["Português", "Inglês"]

   console.log(dataApi[0])

    return (
        <div className="h-auto min-h-screen w-full flex flex-col items-center">
            <Header/>
            <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
                <div className="w-[85%] h-auto flex flex-col gap-9 pb-7 pt-7">
                    <div className='w-full flex justify-between'>
                        <div className='w-4/5 h-auto'>
                            <h1 className='font-bold text-4xl'>{form?.title.charAt(0).toUpperCase() + form?.title.slice(1)}</h1>
                        </div>
                        <div className='w-[20%]'>
                            <Selected labelText='Idioma' zIndex={50} options={languageOptions}/>
                        </div>
                    </div>
                    <div className="">
                        <p>Este feedback é referente ao ano de {form?.year?.split("", 4)}</p>
                    </div>
                    <div>
                       { dataApi.map((element, index)=>(
                        <div className='mt-14 list-decimal'>
                        {/* <ol className='list-decimal'> */}
                            <p className='font text-lg' >{index+1} - {language == "Português"?element.questionPt:element.questionEn}</p>
                        {/* </ol> */}
                        <div className='mt-3'>
                            <SparkTextarea/>
                        </div>
                    </div>
                       ))}
                    </div>
                    <div className='flex justify-end'>
                        <SparkButton text='Enviar' onClick={()=>{}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form