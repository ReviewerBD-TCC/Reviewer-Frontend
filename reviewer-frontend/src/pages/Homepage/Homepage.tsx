import { useState } from 'react'
import Header from '../../components/Header/Header'
import { Card } from '../../components/Card/Card'

export const Homepage = () => {

    const [cardList]: any = useState([
        {
            key:1,
            title: <h2 className='text-white font-bold'>Vizualizar <br></br>Feedbacks</h2>,
            backgroundColor: 'bg-boschRed',
            nav: '/'
        },
        {
            key:2,
            title: <h2 className='text-white font-bold'>Banco de <br></br>perguntas</h2>,
            backgroundColor: 'bg-boschPurple',
            nav: '/home'
        },
        {
            key:3,
            title: <h2 className='text-white font-bold'>Criar <br></br>Feedbacks</h2>,
            backgroundColor: `bg-boschBlue`,
            nav: '/'
        },
        {
            key:4,
            title: <h2 className='text-white font-bold'>Cadastrar <br></br>usuários</h2>,
            backgroundColor: 'bg-boschTurquoise',
            nav: '/'
        },
        {
            key:5,
            title: <h2 className='text-white font-bold'>Administrar <br></br>usuários</h2>,
            backgroundColor: 'bg-boschGreen',
            nav: '/'
        }
    ])

  return (
    <div className={`bg-[#D0D0D0] w-full h-screen flex justify-center items-center flex-col`}>
        <Header/>
            <div className="bg-boschWhite h-[100vh] w-[90%] flex items-center justify-center flex-col">
                <div className='bg-[#fff] w-[90%] h-full flex flex-col justify-center items-center'>
                    <div className='w-[95%] h-16 flex'>
                        <h1 className='font-bold text-3xl'>Administrator panel</h1>
                    </div>
                    <div className='w-[95%] h-2/4 flex justify-between items-center flex-row gap-x-12'>
                        {cardList.map((i:any) => (
                            <Card key={i.key} text={i.title} backgroundColor={i.backgroundColor} nav={i.nav}/>
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}