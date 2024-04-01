import { useState } from 'react'
import { Card, Header } from '../../components/index'

export const Homepage = () => {

    const [cardList]: any = useState([
        {
            key:1,
            title: <h2 className='text-white font-bold text-lg'>Vizualizar <br></br>Feedbacks</h2>,
            backgroundColor: 'bg-boschRed',
            nav: '/'
        },
        {
            key:2,
            title: <h2 className='text-white font-bold text-lg'>Banco de <br></br>perguntas</h2>,
            backgroundColor: 'bg-boschPurple',
            nav: '/questions'
        },
        {
            key:3,
            title: <h2 className='text-white font-bold text-lg'>Criar <br></br>Feedbacks</h2>,
            backgroundColor: `bg-boschBlue`,
            nav: '/createform'
        },
        {
            key:4,
            title: <h2 className='text-white font-bold  text-lg'>Enviar <br></br>Formulário</h2>,
            backgroundColor: 'bg-boschTurquoise',
            nav: '/'
        },
    ])

  return (
    <div className={`bg-[#D0D0D0] w-full h-screen flex justify-center items-center flex-col`}>
        <Header/>
            <div className="bg-boschWhite h-screen w-[90%] flex items-center justify-center flex-col">
                <div className='bg-[#fff] w-[85%] h-full flex flex-col justify-center items-center'>
                    <div className='w-full h-16 flex'>
                        <h1 className='font-bold text-3xl'>Painel administrador</h1>
                    </div>
                    <div className='w-full h-2/4 flex justify-between items-center flex-row'>
                        {cardList.map((i:any) => (
                            <Card key={i.key} text={i.title} backgroundColor={i.backgroundColor} nav={i.nav}/>
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}