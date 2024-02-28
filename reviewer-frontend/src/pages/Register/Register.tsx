import Header from "../../components/Header/Header"
import { SparkTextfield, SparkButton, SparkToggle  } from "@bosch-web-dds/spark-ui-react"

function Register() {
  return (
    <>
      <Header/>
        <div className={`bg-[#D0D0D0] w-full h-full overflow-hidden flex justify-center items-center`}>
          <div className="bg-bosch-white w-[90%] h-auto flex items-center justify-center">
            <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
                <div className="w-[50%] flex flex-col justify-center items-start">
                    <h1 className="font-bold text-4xl text-start w-full ">Cadastro de colaborador</h1>
                    <p className="text-start w-full text-xl">Adicione um colaborador ao seu time</p>
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
      </>
  )
  }
export default Register
