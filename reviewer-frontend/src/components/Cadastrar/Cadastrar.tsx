import { SparkTextfield, SparkButton, SparkToggle  } from "@bosch-web-dds/spark-ui-react"
{/* import { useState } from 'react'; */}

function Cadastrar() {

    {/*
    const minhaVariavel = 'variavel'
    const optionsString = `[{"label":"${minhaVariavel}","value":"1"},{"label":"Option 2","value":"2"},{"label":"Option 3","value":"3"},{"label":"Option 4","value":"4"}]`;
    const options = JSON.parse(optionsString);

    const [selectedOption, setSelectedOption] = useState(""); 
    */}


  return (
    <div className={`bg-[#D0D0D0] w-full h-full overflow-hidden flex justify-center items-center`}>
      <div className="bg-bosch-white h-screen w-[90%] flex items-center justify-center">
        <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
            <div className="w-[50%] flex flex-col justify-center items-start">
                <h1 className="font-bold text-4xl text-start w-[50%] ">Cadastro de colaborador</h1>
                <h2 className="text-start w-[60%] text-xl">Adicione um colaborador ao seu time</h2>
            </div>
            <div className="w-[50%] flex flex-col justify-center gap-6">
                <SparkTextfield type="text" label="Usuário" placeholder="Nome de usuário"/>
                <SparkTextfield type="text" label="Nome" placeholder="Nome completo do colaborador"/>
                <SparkTextfield type="text" label="E-mail" placeholder="E-mail do colaborador"/>
                <SparkTextfield type="text" label="Departamento" placeholder="Departamento do colaborador"/>
                <SparkTextfield type="text" label="Gestor" placeholder="Gestor do colaborador"/>
                <SparkTextfield type="password" label="Senha" placeholder="Senha do colaborador"/>
                
                {/*<SparkDropdown guid="dropdown-id" label="" selectedOption="" whenChange={(newValue) => {setSelectedOption(newValue)}}
                options={options}/>*/}
            </div>
            <div className="w-[50%] flex flex-col gap-8">
                <SparkToggle guid="spark-toggle-right-label" selected={false} disabled={false} rightLabel="Usuário administrador" whenChange={()=>{}} />
                <SparkButton text="Cadastrar" customWidth="15rem"/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastrar
