import { SparkButton, SparkDropdown, SparkTextfield } from "@bosch-web-dds/spark-ui-react"
import Header from "../../components/Header/Header"

import { useContext, useEffect, useState } from "react";

function CreateForms() {

    
    const yearsOptions =
     '[{"label":"2024","value":"2024"},{"label":"2025","value":"2025"}]'

  return (
    <div className="h-screen">
        <Header/>
        <div className={`bg-[#D0D0D0] w-full overflow-hidden flex justify-center items-center`}>
            <div className="bg-boschWhite w-[90%] h-screen flex items-center justify-center">
                <div className="w-[90%]  flex flex-col gap-12">
                    <h1 className="text-3xl font-bold">{token}</h1>
                    <div className="flex justify-end">
                        <SparkButton text="Personalizar"/>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="w-[70%]">
                            <SparkTextfield label="Títu=lo do feedback" placeholder="Feedback" />
                        </div>
                        <div className="w-[20%]">
                            <SparkDropdown label="Ano" options={yearsOptions} whenChange={()=>{}}/>
                        </div>
                    </div>
                    <div className="bg-[#f1f1f1] w-[95%] flex justify-center items-center  ">
                        <SparkDropdown label="Pergunta" options={yearsOptions} whenChange={()=>{}}/>
                    </div>
                    <div className="">
                        <SparkButton text="Adicionar pergunta" icon="add"/>
                    </div>
                    <div className="flex justify-end">
                        <SparkButton text="Finalizar"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateForms
