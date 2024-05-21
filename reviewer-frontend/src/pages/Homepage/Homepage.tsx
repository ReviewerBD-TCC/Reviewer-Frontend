import { useState } from 'react'
import { Card, Header } from '../../components/index'

export const Homepage = () => {

    const [cardList]: any = useState([
        {
            key:1,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Banco de <br></br>perguntas</h2>,
            backgroundColor: 'bg-boschPurple',
            nav: '/questions',
            description: 'Aqui é onde você vê as perguntas que foram adicionadas ao banco',
            className: ''
        },
        {
            key:2,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Criação de <br></br>Formulário</h2>,
            backgroundColor: `bg-boschBlue`,
            nav: '/create-form',
            description: 'Aqui é onde você pode fazer o formulário anualmente',
            className: ''
        },
        {
            key:3,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Enviar <br></br>Formulário de Indicação</h2>,
            backgroundColor: 'bg-boschTurquoise',
            nav: '/send-indication',
            description: 'Aqui é onde você monta o corpo do email para enviar o formulário de indicação para os funcionários',
            className: ''
        },
        {
            key:4,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Visualizar <br /> Dashboard</h2>,
            backgroundColor: 'bg-boschGreen',
            nav: '/dashboard',
            description: 'Aqui você visualiza todas as respostas dadas no feedback',
            className: ''
        },
        {
            key:5,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Visualizar <br></br>Formulários</h2>,
            backgroundColor: 'bg-boschRed',
            nav: '/all-forms',
            description: 'Aqui você visualiza os formulários feitos e pode remove-los ou edita-los',
            className: ''
        },
    ])

  return (
    <div className={`bg-[#fff] w-full h-screen flex justify-center items-center flex-col`}>
        <Header/>
            <div className="bg-boschWhite h-screen w-full flex items-center justify-center flex-col">
                <div className='bg-[#fff] w-[90%] h-full flex flex-col justify-center items-center'>
                    <div className='w-full h-16 flex'>
                        <h1 className='font-bold text-3xl'>Painel administrador</h1>
                    </div>
                    <div className='w-full h-2/4 flex justify-around items-center flex-row gap-4 bg-boschWhite'>
                        {cardList.map((i:any) => (
                            <Card key={i.key} description={i.description} text={i.title} backgroundColor={i.backgroundColor} nav={i.nav} className={"hover:h-60 shadow-2xl ease-out duration-300"}/>
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}