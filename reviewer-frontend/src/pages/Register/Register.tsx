import { useForm} from "react-hook-form"

import Header from "../../components/Header/Header"
import { SparkTextfield, SparkButton, SparkToggle  } from "@bosch-web-dds/spark-ui-react"

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from "../../AuthContext";

const schema = z.object({
  user: z.string().min(6, 'O usuário precisa ter pelo menos 6 digitos'),
  name: z.string(),
  email: z.string().email("Por favor, informe um E-mail inválido"),
  department: z.string(),
  manager: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'user'])
})

type FormProps = z.infer<typeof schema>;

function Register() {

  const token = useAuth()

  const { handleSubmit, register, formState: {errors} } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema) 
  });

  console.log(errors)

  const handleForm = (props: FormProps) => {
    console.log({props})
  }

  return (
    <>
      <Header/>
        <div className={`bg-[#D0D0D0] w-full h-full overflow-hidden flex justify-center items-center`}>
          <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
            <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
                <div className="w-[50%] flex flex-col justify-center items-start">
                    <h1 className="font-bold text-4xl text-start w-full ">Cadastro de colaborador</h1>
                    <p className="text-start w-full text-xl">Adicione um colaborador ao seu time</p>
                </div>
                <div className="w-[50%] flex flex-col justify-center gap-6">
                    <SparkTextfield type="text"
                      label="Usuário"
                      placeholder="Nome de usuário"
                      {...register('user')}
                    />
                    <SparkTextfield type="text"
                      label="Nome" 
                      placeholder="Nome completo do colaborador" 
                      {...register('name')}
                    />
                    <SparkTextfield type="text" 
                      label="E-mail" 
                      placeholder="E-mail do colaborador" 
                      {...register('email')}
                    />
                    <SparkTextfield type="text" 
                      label="Departamento" 
                      placeholder="Departamento do colaborador" 
                      {...register('department')}
                    />
                    <SparkTextfield type="text" 
                      label="Gestor" 
                      placeholder="Gestor do colaborador"
                      {...register('manager')}
                    />
                    <SparkTextfield type="password" 
                      label="Senha" 
                      placeholder="Senha do colaborador" 
                      {...register('password')}
                    />
                </div>
                <div className="w-[50%] flex flex-col gap-8">
                    <SparkToggle guid="spark-toggle-right-label" selected={false} disabled={false} rightLabel="Usuário administrador" whenChange={()=>{}} />
                    <SparkButton text="Cadastrar" customWidth="15rem" type="submit" onClick={handleSubmit(handleForm)}/>
                </div>
              </div>  
            </div>
          </div>
    </>
  )
}
export default Register
