import { GitlabOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-slate-900 text-white font-semibold py-3 md:px-28 fixed bottom-0 w-full flex justify-between'>
      <p>&copy; 2023 | Dian Prasetyo</p>
      <div className='flex gap-5 text-xl items-center'>
        <p className='text-sm al'>About Me :</p>
        <Link to={'https://www.linkedin.com/in/dianprasetyo-2021/'} target={'_blank'} ><LinkedinOutlined /></Link>
        <Link to={'mailto:dprasmail@gmail.com'} target='_blank' ><MailOutlined /></Link>
        <Link to={'https://gitlab.com/dianp/final-project-reactjs-karyawan-b41'} target='_blank' ><GitlabOutlined /></Link>
        <Link to={'https://www.instagram.com/prstydian'} target='_blank' ><InstagramOutlined /></Link>
      </div>
    </div>
  )
}

export default Footer
