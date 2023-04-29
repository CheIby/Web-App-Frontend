import React, { Fragment} from 'react'
import { Navbar } from '../components/Navbar'
import { ProfileCard } from '../components/ProfileCard'


function Profile() {
 
  return (
    <Fragment>
        <Navbar/>
        <div className='h-screen bg-profileImg bg-no-repeat bg-cover '>
          <div className='backdrop-blur-md bg-white/30'>
            <ProfileCard/>
          </div>
        </div>
        
        
    </Fragment>
  )
}

export default Profile