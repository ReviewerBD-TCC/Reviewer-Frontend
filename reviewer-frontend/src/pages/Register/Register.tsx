import { SparkTextfield, SparkButton, SparkToggle } from "@bosch-web-dds/spark-ui-react"
import { ToastContainer, Bounce, toast, Zoom } from "react-toastify";
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from "../../interfaces/CreateUser";
import { ClienteResolver } from "../../validations/CreateUserResolver";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "../../components/index"
// import { onSubmit } from "services/CreateUserService"; 
import api from "../../api/Api";
import z from 'zod'

function Register() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserData>({
    resolver: ClienteResolver,
  });

  useEffect(() => {
    setValue("type", isAdmin ? "ROLE_ADMIN" : "ROLE_USER");
  }, [isAdmin, setValue]);


  function handleToggle(e: ChangeEvent<HTMLInputElement>) {
    setIsAdmin(e.target.checked);
  }



  const createClient = (data: UserData) => api.post('auth/register', data);

  const showToastSuccessMessage = () => {
    toast.success('Usuário cadastrado com sucesso!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    }
    );
  }

  const showToastFailMessage = () => {
    toast.error('Não foi possível cadastrar o usuário', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }
  const showToastFailMessageDuplicated = () => {
    toast.warning('Um usuário com este e-mail ou nome de usuário já existe!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }

  const onSubmit: SubmitHandler<UserData> = async (values) => {

    try {
      const { status, data } = await createClient(values);
      if (status === 201) {
        console.log('data: ', data)
        showToastSuccessMessage()
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }
    } catch (error) {
      if(error.response.status == 404){
        showToastFailMessage()
      }
      if(error.response.status == 409){
        showToastFailMessageDuplicated()
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className={`bg-[#fff] flex-grow w-full h-auto flex justify-center`}>
        <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center p-10">

          <div className="w-[1234px] h-auto flex flex-col justify-center items-center gap-8">
            <div className="w-[50%] flex flex-col justify-center items-start">
              <h1 className="font-bold text-4xl text-start w-full ">Cadastro</h1>
              <p className="text-start w-full text-base">Adicione um colaborador ao seu time</p>
            </div>
            <form className="w-[50%] flex flex-col justify-center gap-6">
              <SparkTextfield type="text" label="Usuário" {...register("user", {
                setValueAs: (value) => {
                  return value;
                },
              })} whenChange={(event) => setValue("user", event.target.value)} placeholder="Nome de usuário" />

              {errors.user && <span className="text-red-600">Por favor, insira o nome de usuário.</span>}

              <SparkTextfield type="text" label="Nome"
                {...register("name", {
                  setValueAs: (value) => {
                    return value;
                  },
                })} whenChange={(event) => setValue("name", event.target.value)} placeholder="Nome completo" />

              {errors.name && <span className="text-red-600">Por favor, insira o nome completo.</span>}
              
              <SparkTextfield type="text" label="E-mail"  {...register("email", {
                setValueAs: (value) => {
                  return value;
                },
              })} whenChange={(event) => setValue("email", event.target.value)} placeholder="E-mail" />

              {errors.email && <span className="text-red-600">Por favor, informe um endereço de e-mail válido.</span>}

              <SparkTextfield type="text" label="Departamento" {...register("gkz", {
                setValueAs: (value) => {
                  return value;
                },
              })} whenChange={(event) => setValue("gkz", event.target.value)} placeholder="Departamento" />

              {errors.gkz && <span className="text-red-600">Por favor, insira o departamento.</span>}

              <SparkTextfield type="text" label="Gestor" {...register("manager", {
                setValueAs: (value) => {
                  return value;
                },
              })} whenChange={(event) => setValue("manager", event.target.value)} placeholder="Gestor" />

              {errors.manager && <span className="text-red-600">Por favor, insira o gestor.</span>}

              <SparkTextfield type="password" label="Senha" {...register("password", {
                setValueAs: (value) => {
                  return value;
                },
              })} whenChange={(event) => setValue("password", event.target.value)} placeholder="Senha" />

              {errors.password && <span className="text-red-600">A senha precisa ter no mínimo 8 caractéres</span>}

              <SparkToggle
                guid="1"
                rightLabel="Usuário administrador"
                {...register("type")}
                whenChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleToggle(e);
                }}
              />


              <SparkButton  text="Cadastrar" customWidth="15rem" type="submit" onClick={handleSubmit(onSubmit)} />
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register