import React, { Fragment } from 'react'
import { Navbar } from '../components/Navbar'

const Home = () => {
  return (
    <Fragment>
      <Navbar/>
      <div><h1 className='text-red-400'>Home</h1></div>
    </Fragment>
    
  )
}

export default Home