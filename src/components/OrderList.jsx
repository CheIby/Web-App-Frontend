import React, { Fragment,useEffect,useState } from 'react'
import { OrderCard } from '../components/OrderCard'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';

export const OrderList = () => {
    const [allOrder,setAllOrder] = useState([])
    const token = getCookie('accessToken')
    
    const fetchData = async()=>{
        await axios.get(`${process.env.REACT_APP_API}/Order/GetTheirOrder/${jwtDecode(token).UserId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(e=>{
            setAllOrder(e.data)
        })
    }

    useEffect(()=>{
        fetchData()
        // eslint-disable-next-line
    },[])

  return (
    <Fragment>
            <div className='flex justify-between items-center font-Kanit text-xl mb-6'>
                <div>Order List</div>
            </div>
            <div className='flex flex-col items-center'>
            {allOrder.length===0?
            <div className='w-full h-20 bg-opacity-30 p-7 font-Kanit'>
                <h2>Order list is currently empty.</h2>
            </div>:
            <div className='bg-[#746f6f] w-full rounded-lg bg-opacity-30 flex flex-col items-center'>
                {allOrder.map((e,key)=>{
                    return(
                        <OrderCard key={key} img={e.restaurant} restaurant={e.restaurant} detail={e.detail} username={e.username} receiveLocation={e.receiveLocation} userId={e.userId} total={e.ifDoneScore} orderId={e.orderId}/>
                    )})}
        </div>
            }
            </div>
    </Fragment>
  )
}

