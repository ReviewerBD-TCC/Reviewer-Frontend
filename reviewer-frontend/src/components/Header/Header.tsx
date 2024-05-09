import { useAuth } from 'context/AuthProvider'
import Logo from '../../assets/images/Logo.png'
import Supergraphic from '../../assets/images/Supergraphic.png'
import { Link } from 'react-router-dom'
import { SparkIcon } from '@bosch-web-dds/spark-ui-react' 

export function Header() {

  const { user } = useAuth();

  return (
    <div className='border-b w-full bg-white top-0 flex justify-center items-center flex-col relative'>
        <img src={Supergraphic} alt="Supergraphic" />
    
        <div className='w-[80%] p-1 flex flex-row justify-between items-center'>
          <Link className="w-[75%]" to={'/home'}>
            <img src={Logo} alt="CompanyLogo" className='w-44'/>
          </Link>
          <div className='w-auto'>
            <p className='font-medium text-boschGrayText text-[14px]'>{user?.name}</p>
          </div>
          <div className='w-auto'>
            <SparkIcon icName='logout' pallete='secondary' />
          </div>
        </div>
    </div>
  )
}
