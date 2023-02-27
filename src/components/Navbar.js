import { Link } from 'react-router-dom';
import DropdownNavbar from './DropdownNavbar';


const Navbar = () => {
  return (
    <nav 
      className='lg:fixed mb-8 flex-auto top-0 px-40 flex flex-col sm:flex-row start w-full items-center 
        justify-between shadow-md cursor-pointer bg-white z-10'>
      <div className='w-40'>
        <Link to='/'>
          <img src="/images/new-letter-logo-transparent.png" alt='logo' className='w-full mx-auto' />
          </Link>
      </div>
      <ul className='flex items-center justify-end  m-0 mr-6'>
        <Link to='/'><li className='font-semibold text-blue-900 p-5  hover:text-blue-500'>Home</li></Link>
        <Link to='catalog'><li className='font-semibold text-blue-900 p-5  hover:text-blue-500'>Product</li></Link>
        <li className='font-semibold hover:text-blue-500'>
          <div className=' flex p-5' >
            {localStorage.getItem('token') === null
              ? <div className='flex gap-2'>
                  <Link to={'/login'} >
                    <button className='bg-blue-500 font-semibold text-white p-2 rounded-md'>
                    Login
                    </button>
                    </Link>
                  <Link to={'/register'} >
                    <button className='border text-blue-500 font-semibold p-2 rounded-md'>
                      Register
                    </button>
                    </Link>
                </div>
              : <DropdownNavbar />}
          </div>
        </li>        
      </ul>
    </nav>
  )
}

export default Navbar
