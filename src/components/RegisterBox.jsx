import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'

export const RegisterBox = () => {
    const navigate = useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [reEnterPassword,setReEnterPassword]=useState('')
    const [checkInvalid,setCheckInvalid]=useState(false)
    const [passwordReCheck,setPasswordRecheck]=useState(false)
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [tel,setTel]=useState('')

    const enterEvent=async(e)=>{
        if(e.key==='Enter'){
            await onsubmit()
        }
    }

    const onsubmit =async()=>{
        if(password !== reEnterPassword || password === ''){
            setPasswordRecheck(true)
            setCheckInvalid(false)
        }else if(username.length === 0 || firstName.length===0 || lastName.length===0 || tel.length ===0){
            setCheckInvalid(true)
            setPasswordRecheck(false)
        }else{
            try{
                const res = await axios.post(`${process.env.REACT_APP_API}/Auth/Register`,{Username:username,
                    Password:password,
                    FirstName : firstName,
                    LastName : lastName,
                    Tel: tel})    
                if (res.status===200){
                    navigate('/login')
                    window.location.reload()
                }
                
            }catch(err){
                if (err.response.status===400){
                    setCheckInvalid(true)
                    setPasswordRecheck(false)
                }
            }
        }
    }

  return (
    <div className='w-[80%] md:w-[60%] h-fit bg-white font-Kanit p-5 rounded-xl  min-w-[320px] max-w-[720px] relative'>
        <div className='w-[90%] h-[80%] m-auto'>
            <div className='text-center'>
                <h1 className='font-semibold sm:text-xl text-lg'>Sign Up To จะกินไรก็สั่งมา</h1>
            </div>
            <div className='my-4'>
                <div className='my-3'>
                    <h1 className='font-semibold sm:text-xl text-lg'>Username</h1>
                    <input type="text" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={enterEvent}/>
                </div>
                <div className='sm:flex'>
                    <div className='sm:w-[50%]'>
                        <h1 className='font-semibold sm:text-xl text-lg'>First Name</h1>
                        <input type="text" className='font-extralight sm:w-[95%] w-full text-lg py-1 border-b-2 indent-2' placeholder='First Name' value={firstName} onChange={e=>setFirstName(e.target.value)} onKeyDown={enterEvent}/>
                    </div>
                    <div className='sm:w-[50%]'>
                        <h1 className='font-semibold sm:text-xl text-lg'>Last Name</h1>
                        <input type="text" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Last Name' value={lastName} onChange={e=>setLastName(e.target.value)} onKeyDown={enterEvent}/>
                    </div>
                </div>
                <div className='my-3'> 
                    <h1 className='font-semibold sm:text-xl text-lg'>Tel</h1>
                    <input type="text" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Tel' value={tel} onChange={e=>setTel(e.target.value)} onKeyDown={enterEvent}/>
                </div>
                <div className='my-3'> 
                    <h1 className='font-semibold sm:text-xl text-lg'>Password</h1>
                    <input type="password" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={enterEvent}/>
                </div>
                <div className='my-3'> 
                    <h1 className='font-semibold sm:text-xl text-lg'>Re-Enter Password</h1>
                    <input type="password" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Re-Enter Password' value={reEnterPassword} onChange={e=>setReEnterPassword(e.target.value)} onKeyDown={enterEvent}/>
                </div>
            </div>
            {checkInvalid?<label className='p-2 text-[red] sm:text-xl text-lg'>*กรุณาใส่ Username, First Name, Last Name และ Tel</label>:''}
            {passwordReCheck?<label className='p-2 text-[red] sm:text-xl text-lg'>*Password และ Re-Enter Password ไม่ตรงกัน</label>:''}
            <div className='mt-6 flex'>
                <h1 className='font-semibold p-2 text-center bg-blac rounded-xl text-black cursor-pointer border-2 duration-300 border-black hover:text-white hover:bg-black w-full sm:text-xl text-lg' onClick={onsubmit}>Create Account</h1>
            </div>
            <div className='flex justify-end mt-4 sm:text-xl text-lg'>
                <h2>Already have an account? <Link to='/login' className='underline'>Sign In</Link></h2>
            </div>
        </div>
    </div>
  )
}
