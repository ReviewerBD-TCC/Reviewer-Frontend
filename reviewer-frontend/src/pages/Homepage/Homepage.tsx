import { useContext, useState } from 'react'
import Header from '../../components/Header/Header'
import { Card } from '../../components/Card/Card'
import { AuthContext } from '../../contexts/Auth'

export const Homepage = () => {

    const {token} = useContext(AuthContext)!

    const [cardList]: any = useState([
        {
            key:1,
            title: <h2 className='text-white font-bold'>Vizualizar <br></br>Feedbacks</h2>,
            backgroundColor: 'bg-boschRed'
        },
        {
            key:2,
            title: <h2 className='text-white font-bold'>Banco de <br></br>perguntas</h2>,
            backgroundColor: 'bg-boschPurple'
        },
        {
            key:3,
            title: <h2 className='text-white font-bold'>Criar <br></br>Feedbacks</h2>,
            backgroundColor: `bg-boschBlue`
        },
        {
            key:4,
            title: <h2 className='text-white font-bold'>Cadastrar <br></br>usuários</h2>,
            backgroundColor: 'bg-boschTurquoise'
        },
        {
            key:5,
            title: <h2 className='text-white font-bold'>Administrar <br></br>usuários</h2>,
            backgroundColor: 'bg-boschGreen'
        }
    ])

  return (
    <div className={`bg-[#D0D0D0] w-full flex justify-center items-center flex-col`}>
        <Header/>
            <div className="bg-boschWhite h-[100vh] w-[90%] flex items-center justify-center flex-col">
                <div className='bg-[#fff] w-[90%] h-full flex flex-col justify-center items-center'>
                    <div className='w-[95%] h-16 flex'>
                        <h1 className='font-bold text-3xl'>Painel Administrador</h1>
                    </div>
                    <div className='w-[95%] h-2/4 flex justify-center items-center flex-row gap-x-12'>
                        {cardList.map((i:any) => (
                            <Card key={i.key} text={i.title} backgroundColor={i.backgroundColor} />
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}