import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
// import DropdownNavbar from './DropdownNavbar';s


const Navbar = () => {
  const {categories} = useContext(GlobalContext)
  return (
    <nav 
      className='fixed flex-auto top-0 px-40 flex start w-full items-center 
        justify-between shadow-md cursor-pointer bg-white z-10'>
      <div className='w-2/12 hover:bg-blue-500 p-5 '>
        <img src="/images/letter-logo.png" alt='logo' className='w-full mx-auto' />
      </div>
      <ul className='flex w-8/12 gap-4 items-center justify-end py-5 m-0 mr-6'>
        <li>
          <select>
            {
              categories.map((item, i) => (
                <option value={item} key={i}>{item}</option>
              ))
            }
          </select>
        </li>
        <li className='hover:text-blue-500'><Link to='/'>Home</Link></li>
        <li className='hover:text-blue-500'><Link to='catalog'>Product</Link></li>
      </ul>
      <div className='w-2/12 flex p-5' >
        <div className='flex gap-2'>
          <button className='bg-slate-900 font-semibold text-white p-2 rounded-md'>
            <Link to={'/login'} >Login</Link>
          </button>
          <button className='border font-semibold p-2 rounded-md'>
            <Link to={'/register'} >Register</Link>
          </button>
        </div>
        {/* <DropdownNavbar /> */}
      </div>
    </nav>
  )
}

export default Navbar
