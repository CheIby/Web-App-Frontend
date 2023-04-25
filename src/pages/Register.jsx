import React, { Fragment } from 'react'
import { Navbar } from '../components/Navbar'
import { RegisterBox } from '../components/RegisterBox'

function Register() {
    
  return (
    <Fragment>
        <Navbar/>
        <div className='flex justify-center items-center h-screen bg-registerImg bg-no-repeat bg-cover'>
            <RegisterBox/>
        </div>
    </Fragment>
    
  )
}

export default Register