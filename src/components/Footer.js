import { GitlabFilled, InstagramFilled, LinkedinFilled, ChromeFilled} from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div 
      className='bg-slate-900 text-white font-semibold py-3 md:px-28 
        lg:fixed lg:bottom-0 z-50 w-full flex justify-between items-center'>
      <p>&copy; 2023 | Dian Prasetyo</p>
      <div className='flex gap-5 text-xl items-center'>
        <p className='text-sm  hidden lg:flex'>About Me :</p>
        <Link to={'https://www.linkedin.com/in/dianprasetyo-2021/'} target={'_blank'} ><LinkedinFilled /></Link>
        <Link to={'https://allshop-bydian.netlify.app/'} target='_blank' ><ChromeFilled /></Link>
        <Link to={'https://gitlab.com/dianp/final-project-reactjs-karyawan-b41'} target='_blank' ><GitlabFilled /></Link>
        <Link to={'https://www.instagram.com/prstydian'} target='_blank' ><InstagramFilled /></Link>
      </div>
    </div>
  )
}

export default Footer
