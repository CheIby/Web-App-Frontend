import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {setCookie} from'cookies-next'
import { useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'

export const LoginBox = () => {
    const navigate = useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [checkInvalid,setCheckInvalid]=useState(false)

    const enterEvent=async(e)=>{
        if(e.key==='Enter'){
            await onsubmit()
        }
    }

    const onsubmit =async()=>{
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/Auth/Login`,{Username:username,Password:password})
            if (res.status===200){
                const token =  res.data.token
                setCookie("accessToken",token,{
                        maxAge:7*24*60*60,
                        path:'/',
                        sameSite:'strict',
                        secure:true
                })
                navigate('/')
                window.location.reload()
            }

        }catch(err){
            if (err.response.status===401 || err.response.status===400){
                setCheckInvalid(true)
            }
        }
    }
    
  return (
    <div className='w-[80%] md:w-[60%] h-fit bg-white font-Kanit p-10 rounded-xl  min-w-[320px] max-w-[720px] relative'>
        <div className='w-[90%] h-[80%] m-auto'>
            <div className='text-center'>
                <h1 className='font-semibold text-xl'>Sign In To จะกินไรก็สั่งมา</h1>
            </div>
            <div className='my-4'>
                <div className='my-3'>
                    <h1 className='font-semibold text-xl'>Username</h1>
                    <input type="text" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={enterEvent}/>
                </div>
                <div className='my-3'> 
                    <h1 className='font-semibold text-xl'>Password</h1>
                    <input type="password" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={enterEvent}/>
                </div>
            </div>
            {checkInvalid?<label className='p-2 text-[red]'>*Username หรือ Password ไม่ถูกต้อง</label>:''}
            <div className='mt-6 flex'>
                <h1 className='font-semibold text-lg p-2 text-center bg-blac rounded-xl text-black cursor-pointer border-2 duration-300 border-black hover:text-white hover:bg-black w-full' onClick={onsubmit}>Login</h1>
            </div>
            <div className='flex justify-end mt-4'>
                <h2>Not a member? <Link to='/register' className='underline'>Sign Up</Link></h2>
            </div>
        </div>
    </div>
  )
}