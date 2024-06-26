import { SparkButton, SparkTextarea, SparkTextfield } from '@bosch-web-dds/spark-ui-react'
import { Header, Selected } from 'components'
import { Email } from 'interfaces/EmailInterfaces/Email'
import { EmailResolver } from 'validations/EmailResolver'
import { useForm } from "react-hook-form";
import ModalEmailConfirmation from 'components/Modal/ModalEmailConfirmation'
import useModal from '../../hooks/useModal'
import { UserService } from 'services/UserService'
import { useEffect, useState } from 'react'
import { User } from 'interfaces/UserInterfaces/CreateUser'
import BackButton from 'components/BackButton/BackButton';

export default function EmailIndicationUser() {
  const yearOptions:number[] = []
  const [year, setYear] = useState<number>()
  const [responseTimeSelect, setResponseTimeSelect] = useState<string>()

  const { getValues, handleSubmit, register, formState: { errors } } = useForm<Email>({
    resolver: EmailResolver
  });

  const { isOpen, toggle } = useModal()

  const [userList, setUserList] = useState<string[]>([])

  useEffect(() => {
    UserService.getUsers().then(
      user => {
        const email: string[] = user.map((item: User) => item.email)
        setUserList(email)
      })

  }, [])
  for(let i= 0; i<5;i++){
    const year =new Date().getFullYear()+i
    yearOptions.push(year)
    console.log(i)
  }
  const allData: Email = {
    to: getValues("to"),
    bcc: userList,
    body: getValues("body"),
    subject: getValues("subject"),
  }

  const handleYearChange = (value: number) => {
    setYear(value);
  };

  return (
    <div className='h-auto min-h-screen w-full flex flex-col items-center'>
      <Header />
      <div className="bg-boschWhite h-auto w-full flex justify-center items-center">
        <div className='h-auto w-[90%] flex items-center justify-center pt-10 pb-10'>
          <form className="w-full pt-7 h-auto flex flex-col justify-center gap-10">
            <div>
              <BackButton navigateTo='/'/>
            </div>
            <h1 className='font-bold text-4xl'>Disparo de indicações</h1>
            <div className="w-[45%] flex flex-row gap-8 pb-5">
              <div className='w-[35%] lg:w-[45%] cursor-pointer'>
                <Selected
                  labelText="Ano"
                  options={yearOptions}
                  zIndex={50}
                  selectedValue={year}
                  setSelectedValue={handleYearChange}
                  {...register("year", {
                    setValueAs: (value) => {
                      setYear(value);
                      return value;
                    },
                  })}
                />
              </div>


            </div>
            <SparkTextfield placeholder='Assunto do e-mail' {...register("subject")} />
            {errors.subject && <span className="text-red-600">Preencha o assunto do e-mail.</span>}

            <SparkTextarea placeholder='Corpo do e-mail' {...register("body")} />
            {errors.body && <span className="text-red-600">Preencha o corpo do e-mail.</span>}

            <div className='flex justify-end'>
              <SparkButton type='submit' pallete='primary' customWidth='13rem' text='Continuar' onClick={handleSubmit(toggle)} />
              <ModalEmailConfirmation isOpen={isOpen} data={allData} toggle={toggle} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}