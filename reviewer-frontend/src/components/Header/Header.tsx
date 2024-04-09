import Logo from '../../assets/images/Logo.png'
import Supergraphic from '../../assets/images/Supergraphic.png'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className='border-b w-full bg-white top-0 flex justify-center items-center flex-col relative'>
        <img src={Supergraphic} alt="Supergraphic" />
        
        <div className='w-[80%] p-1'>
          <Link to={'/home'}>
            <img src={Logo} alt="CompanyLogo" className='w-44'/>
          </Link>
        </div>
    </div>
  )
}

