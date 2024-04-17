import React from 'react'
import { Header, Selected } from 'components'
import { SparkButton, SparkTextarea } from '@bosch-web-dds/spark-ui-react'

function Form() {

    const languageOptions = ["Português", "Inglês"]

    return (
        <div className="h-auto min-h-screen w-full flex flex-col items-center">
            <Header/>
            <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
                <div className="w-[85%] h-auto flex flex-col gap-9 pb-7 pt-7">
                    <div className='w-full flex justify-between'>
                        <div className='w-4/5 h-auto'>
                            <h1 className='font-bold text-4xl'>Feedback os times de automação</h1>
                        </div>
                        <div className='w-[20%]'>
                            <Selected labelText='Idioma' zIndex={50} options={languageOptions}/>
                        </div>
                    </div>
                    <div className="">
                        <p>Este feedback é referente ao ano de 2024</p>
                    </div>
                    <div>
                        <div>
                            <div>
                                <h2 className='font-bold text-xl' >1 - Titulo da pergunta</h2>
                            </div>
                            <div>
                                <SparkTextarea/>
                            </div>
                        </div>
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