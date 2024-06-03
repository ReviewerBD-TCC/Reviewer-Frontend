import { Header } from 'components';
import Error from '../../assets/images/404.png'
export const Notfound = () => {

    return (
    <div className='w-full min-h-screen h-auto flex flex-col items-center'>
        <Header />
        <div className='w-full flex-grow flex flex-col gap-8 justify-center items-center'>
            <img src={Error} alt="Error Image" className="max-w-full h-auto" />
            <a href="/" className='text-boschBlue'>Voltar para home </a>
        </div>
    </div>
    );
  };