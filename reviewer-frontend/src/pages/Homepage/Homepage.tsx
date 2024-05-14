import { useState } from 'react'
import { Card, Header } from '../../components/index'

export const Homepage = () => {

    const [cardList]: any = useState([
        {
            key:2,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Banco de <br></br>perguntas</h2>,
            backgroundColor: 'bg-boschPurple',
            nav: '/questions',
            className: ''
        },
        {
            key:3,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Criação de <br></br>Formulário</h2>,
            backgroundColor: `bg-boschBlue`,
            nav: '/create-form',
            className: ''
        },
        {
            key:4,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Enviar <br></br>Formulário de Indicação</h2>,
            backgroundColor: 'bg-boschTurquoise',
            nav: '/send-indication',
            className: ''
        },
        {
            key:5,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Visualizar <br /> Dashboard</h2>,
            backgroundColor: 'bg-boschGreen',
            nav: '/dashboard',
            className: ''
        },
        {
            key:1,
            title: <h2 className='text-white font-bold xl:text-xl lg:text-lg'>Visualizar <br></br>Formulários</h2>,
            backgroundColor: 'bg-boschRed',
            nav: '/all-forms',
            className: ''
        },
    ])

  return (
    <div className={`bg-[#fff] w-full h-screen flex justify-center items-center flex-col`}>
        <Header/>
            <div className="bg-boschWhite h-screen w-full flex items-center justify-center flex-col">
                <div className='bg-[#fff] w-[90%] p-4 h-full flex flex-col justify-center items-center'>
                    <div className='w-full h-16 flex'>
                        <h1 className='font-bold text-3xl'>Painel administrador</h1>
                    </div>
                    <div className='w-full h-2/4 flex justify-around items-center flex-row gap-4 bg-boschWhite'>
                        {cardList.map((i:any) => (
                            <Card key={i.key} text={i.title} backgroundColor={i.backgroundColor} nav={i.nav} className={"hover:h-96"}/>
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}