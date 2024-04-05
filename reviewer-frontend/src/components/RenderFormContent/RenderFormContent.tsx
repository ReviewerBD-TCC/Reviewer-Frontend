import { Selected } from 'components' 

const questionsOptions  = ['O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos. O que essa pessoa já faz, mas poderia estar fazendo mais?','O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.']

export const RenderFormContent = () => {
  return (
        <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
            <div className="w-[90%]">
                <Selected zIndex={25} labelText="Pergunta" options={questionsOptions} />
                {/* <SparkDropdown  label="Pergunta" options={questionsOptions} whenChange={()=>{}} /> */}
            </div>
        </div>
    )
}
