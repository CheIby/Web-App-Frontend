import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faBurger } from '@fortawesome/free-solid-svg-icons'
import { deleteCookie, getCookie } from 'cookies-next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const Navbar = () => {
    const [isOpen,setIsOpen] =useState(false)
    const [user,setUser]=useState(null)
    const token = getCookie('accessToken')
    const navigate = useNavigate()
    
    const setOpen=()=>{
        setIsOpen(!isOpen)
    }

    const logoutEvent=()=>{
        deleteCookie('accessToken')
        navigate('/')
        window.location.reload()
    }

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
        if (token!=null){
            fetchData()
        }
        // eslint-disable-next-line
    },[])
    
  return (
    <nav className="py-5 px-20 bg-black shadow md:flex md:items-center md:justify-between font-Kanit font-semibold z-30 h-20 fixed top-0 w-full">
        <div className="flex justify-between items-center">
            <span>
                <Link to='/' className='text-white'><FontAwesomeIcon icon={faBurger} size='xl' className='mr-5'/>จะกินไรก็สั่งมา</Link>
            </span>
            <span className="cursor-pointer mx-2 md:hidden block">
                <FontAwesomeIcon icon={faBars} onClick={setOpen} color='white'/>
            </span>
        </div>
        <ul className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 ${isOpen? 'top-[55px] opacity-100 z-20 bg-black' : ''}`}>
            <li className="lg:mx-4 mx-2 my-3 md:my-0 text-white">
                <Link to='/' className="hover:text-cyan-500 duration-500" >Home</Link>
            </li>
            <li className="lg:mx-4 mx-2 my-3 md:my-0 text-white">
                <Link to='/scoreBoard' className="hover:text-cyan-500 duration-500" >ScoreBoard</Link>
            </li>
            {user?<><li className="lg:mx-4 mx-2 my-3 md:my-0 text-white">
                <Link to='/order' className="hover:text-cyan-500 duration-500" >Order/Receive Order</Link>
            </li>
            <li className="lg:mx-4 mx-2 my-3 md:my-0 text-white block md:hidden">
                <Link to='/profile' className="hover:text-cyan-500 duration-500">Profile</Link>
            </li>
            <li className="lg:mx-4 mx-2 my-3 md:my-0 text-white block md:hidden">
                <Link onClick={logoutEvent} className="hover:text-cyan-500 duration-500">Sign Out</Link>
            </li>
            </>:''}
            {user?
            <div className="dropdown dropdown-end hidden md:block">
                    <label  tabIndex={0} ><img src={`${process.env.REACT_APP_BACKEND}/${user.userImg}`} alt="" className='rounded-[50%] h-10 w-10' /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/profile' className="hover:text-cyan-500 duration-500">Profile</Link></li>
                        <li><Link onClick={logoutEvent} className="hover:text-cyan-500 duration-500">Sign Out</Link></li>
                    </ul>
            </div>
            :""}
            {token?"":
                <>
                    <li className="lg:mx-4 mx-2 my-3 md:my-0 text-white">
                        <Link to='/login' className="hover:text-cyan-500 duration-500">Sign In</Link>
                    </li>
                    <li className="lg:mx-4 mx-2 my-3 md:my-0 text-white">
                        <Link to='/register' className="p-3 border-2 rounded-lg hover:bg-white hover:text-black border-solid duration-500">Sign Up</Link>
                    </li>
                </>
                }
            
        </ul>
    </nav>
  )
}