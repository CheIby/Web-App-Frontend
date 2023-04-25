import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { EditProfileBox } from '../components/EditProfileBox'

export const ProfileCard = () => {
    const [user,setUser]=useState(null)
    const [isOpen,setIsOpen]=useState(false)
    const token = getCookie('accessToken')

    const fetchData =async()=>{
        await axios.get(`${process.env.REACT_APP_API}/User/GetUserById`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(e=>{
            setUser(e.data)
        })
    }

    useEffect(()=>{
        fetchData()
        // eslint-disable-next-line
    },[])

    console.log(user)

  return (
    <Fragment>
        <div className='flex justify-center items-center h-screen'>
        {user?<div className='  bg-orange-600 w-[60%] h-[400px] rounded-lg flex p-5'>
            <div>
                {user?<img src={`${process.env.REACT_APP_BACKEND}/${user.userImg}`} alt="" className='rounded-[50%] h-40 w-40' />:""}
                <button onClick={()=>setIsOpen(true)}>edit profile</button>
            </div>
            <div>
                <div className=''>
                    <h1>{user.username}</h1>
                </div>
                <div className=''>
                    <h2>{user.firstName}</h2>
                    <h2>{user.lastName}</h2>
                </div>
            </div>
        </div>:""}
        </div>
        {isOpen===true?<EditProfileBox setIsOpen={setIsOpen} firstName={user.firstName} lastName={user.lastName}/>:""}
    </Fragment>
    
  )
}
