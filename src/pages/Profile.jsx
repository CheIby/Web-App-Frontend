import React, { Fragment} from 'react'
import { Navbar } from '../components/Navbar'
import { ProfileCard } from '../components/ProfileCard'


function Profile() {
 
  return (
    <Fragment>
        <Navbar/>
        <ProfileCard/>
        
    </Fragment>
  )
}

export default Profile