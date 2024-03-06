import Logo from '../../assets/images/Logo.png'
import Supergraphic from '../../assets/images/Supergraphic.png'


function Header() {
  return (
    <div className='border-b w-full bg-white top-0 flex justify-center items-center flex-col'>
        <img src={Supergraphic} alt="Supergraphic" />
        <div className='w-[80%] p-2'>
            <img src={Logo} alt="CompanyLogo" className='w-44'/>
        </div>
    </div>
  )
}

export default Header;