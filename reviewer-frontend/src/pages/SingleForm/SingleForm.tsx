import { Header } from "components"

export const SingleForm = () => {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
        <Header/>
        <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center p-7">
            <div className="w-[80%] h-auto flex flex-col justify-center items-center gap-10 pt-8 pb-8">
                <div className="w-full h-12 flex flex-col justify-center">
                    <h1 className="font-bold text-3xl text-start">Feedback dos times de automação</h1>
                    <p>este feedback é referente ao ano de 2024</p>
                </div>

                <div className="w-full h-auto flex flex-col gap-8 ">
                    <div className="w-full h-auto flex flex-col gap-1">
                        <p><span className="font-bold mr-3">PT -</span>O que essa pessoa já faz bem (suas fortalezas)? Se possível, por gentileza, forneça exemplos.</p>
                        <p><span className="font-bold mr-3">EN -</span>What does this person already do well (strengths)? If possible please provide examples.</p>
                    </div>

                    <div className="w-full h-auto flex flex-col gap-1">
                        <p><span className="font-bold mr-3">PT -</span>O que essa pessoa já faz bem (suas fortalezas)? Se possível, por gentileza, forneça exemplos.</p>
                        <p><span className="font-bold mr-3">EN -</span>What does this person already do well (strengths)? If possible please provide examples.</p>
                    </div>

                    <div className="w-full h-auto flex flex-col gap-1">
                        <p><span className="font-bold mr-3">PT -</span>O que essa pessoa já faz bem (suas fortalezas)? Se possível, por gentileza, forneça exemplos.</p>
                        <p><span className="font-bold mr-3">EN -</span>What does this person already do well (strengths)? If possible please provide examples.</p>
                    </div>

                    <div className="w-full h-auto flex flex-col gap-1">
                        <p><span className="font-bold mr-3">PT -</span>O que essa pessoa já faz bem (suas fortalezas)? Se possível, por gentileza, forneça exemplos.</p>
                        <p><span className="font-bold mr-3">EN -</span>What does this person already do well (strengths)? If possible please provide examples.</p>
                    </div>

                    {
                        
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
