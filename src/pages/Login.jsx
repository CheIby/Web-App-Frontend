import React, { Fragment } from 'react'
import { LoginBox } from '../components/LoginBox'
import { Navbar } from '../components/Navbar'

function Login() {
  return (
    <Fragment>
        <Navbar/>
        <div className='flex justify-center items-center h-screen bg-loginImg bg-no-repeat bg-cover'>
            <LoginBox/>
        </div>
    </Fragment>
    
  )
}

export default Login