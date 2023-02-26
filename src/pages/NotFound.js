import { Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <Result
        status='404'
        title='404 Not Found'
        subTitle='Sory, the page you visited does not exist'
        extra={
          <Link to='/'>
            <button className='bg-blue-600 text-white p-2'>Back to Home</button>
          </Link>
        }
        className='p-0'
      />
    </div>
  )
}

export default NotFound
