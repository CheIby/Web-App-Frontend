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
        {user?<div className='  bg-black w-[80%] max-w-[500px] rounded-lg pt-28 px-20 relative text-white font-Kanit drop-shadow-2xl'>
        {user?<img src={`${process.env.REACT_APP_BACKEND}/${user.userImg}`} alt="" className='rounded-[50%] h-40 w-40 absolute translate-x-1/2 right-[50%] top-[-70px] drop-shadow-2xl' />:""}
            <div className='flex justify-center'>
                <button onClick={()=>setIsOpen(true)} className=' p-2 text-black bg-white rounded-xl hover:bg-black hover:text-white border-white border-2 duration-150'>Edit Profile</button>
            </div>
            <div>
            <div className='text-center text-xl mt-5'>
                    <h2>{user.firstName} {user.lastName}</h2>
                </div>
                <div className='text-center text-xl'>
                    <h1>Username : {user.username}</h1>
                </div>
                <div className='text-center text-xl'>
                    <h1>Tel : {user.tel}</h1>
                </div>
            </div>
            <div className='flex justify-between text-xl mt-5 mb-10'>
                <div className='w-fit text-center'>
                    <h1>{user.score}</h1>
                    <h1>Score</h1>
                </div>
                <div className='w-fit text-center'>
                <h1>{user.success}</h1>
                    <h1>Success</h1>
                </div>
                <div className='w-fit text-center'>
                <h1>{user.failed}</h1>
                    <h1>Failed</h1>
                </div>
            </div>
        </div>:""}
        </div>
        {isOpen===true?<EditProfileBox setIsOpen={setIsOpen} firstName={user.firstName} lastName={user.lastName} userImg={user.userImg} tel={user.tel}/>:""}
    </Fragment>
    
  )
}
