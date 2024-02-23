import Logo from '../../assets/images/Logo.png'
import Supergraphic from '../../assets/images/Supergraphic.png'


function Header() {
  return (
    <div className='border-b'>
        <div>
            <img src={Supergraphic} alt="Supergraphic" />
            <img src={Logo} alt="CompanyLogo" className='w-44 ml-36 mt-2'/>
        </div>
    </div>
  )
}

export default Header
