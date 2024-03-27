import Header from "../../components/Header/Header"
import { SparkTextfield, SparkButton, SparkToggle } from "@bosch-web-dds/spark-ui-react"
import { SubmitHandler, useForm } from 'react-hook-form';
import { ClienteResolver } from "./ClienteResolver";
import Api from "../../api/Api";
import { ChangeEvent, useState } from "react";

interface UserData {
  name: string;
  email: string;
  password: string;
  user: string;
  gkz: string;
  manager: string;
  userType: 'admin' | 'user';
}

function Register() {
  const [toggle, setToggle] = useState<NonNullable<boolean | undefined>>(false)

  const { register, handleSubmit, setValue } = useForm({
    resolver: ClienteResolver,
  });

  function handleToggle(e: ChangeEvent<HTMLInputElement>){
    const newToggleValue = e.target.checked;

    // console.log('tipo:', newToggleValue == true ? "admin" : "user");
    if(newToggleValue == true){
      setValue("type", "admin")
    }
    else{
      setValue("type", "user")
    }
    setToggle(newToggleValue);
  }

  const createClient = (data: UserData) => Api.post('auth/register', data);

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    // console.log("")
    try {
      const { status, data } = await createClient(values);
      if (status === 201) {
        console.log('data: ', data)
      }
    } catch (error) {
      console.error('Erro ao enviar o cliente:', error);
    }
  };

  const handleSearch = (fieldName: string, value: string | number | boolean) => {
    // console.log(`Campo: ${fieldName}, Valor: ${value}`);    
  };

  return (
    <>
      <Header />
      <div className={`bg-[#D0D0D0] w-full h-full overflow-hidden flex justify-center items-center`}>
        <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
          <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
            <div className="w-[50%] flex flex-col justify-center items-start">
              <h1 className="font-bold text-4xl text-start w-full ">Cadastro</h1>
              <p className="text-start w-full text-base">Adicione um colaborador ao seu time</p>
            </div>
            <form className="w-[50%] flex flex-col justify-center gap-6">
              <SparkTextfield type="text" label="Usuário" {...register("user", {
                setValueAs: (value) => {
                  handleSearch("user", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("user", event.target.value)} placeholder="Nome de usuário" />

              <SparkTextfield type="text" label="Nome" {...register("name", {
                setValueAs: (value) => {
                  handleSearch("name", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("name", event.target.value)} placeholder="Nome completo do colaborador" />

              <SparkTextfield type="text" label="E-mail"  {...register("email", {
                setValueAs: (value) => {
                  handleSearch("email", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("email", event.target.value)} placeholder="E-mail do colaborador" />

              <SparkTextfield type="text" label="Departamento" {...register("gkz", {
                setValueAs: (value) => {
                  handleSearch("gkz", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("gkz", event.target.value)} placeholder="Departamento do colaborador" />

              <SparkTextfield type="text" label="Gestor" {...register("manager", {
                setValueAs: (value) => {
                  handleSearch("manager", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("manager", event.target.value)} placeholder="Gestor do colaborador" />

              <SparkTextfield type="password" label="Senha" {...register("password", {
                setValueAs: (value) => {
                  handleSearch("password", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("password", event.target.value)} placeholder="Senha do colaborador" />

              <SparkToggle 
                guid="1" 
                rightLabel="usuario administrador" 
                disabled={false} 
                {...register("type", {
                  setValueAs: (value) => {
                    handleSearch("type", value);
                    return value; 
                  },
                })}
            
                whenChange={handleToggle}
              ></SparkToggle>
              
                <SparkButton text="Cadastrar" customWidth="15rem" type="submit" onClick={handleSubmit(onSubmit)} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Register
