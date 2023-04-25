import React, { Fragment,useEffect,useState } from 'react'
import { OrderCard } from '../components/OrderCard'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { AddOrderBox } from './AddOrderBox';

export const MyOrderListBox = () => {
    const [allOrder,setAllOrder] = useState([])
    const [showModal, setShowModal] = useState(false)
    const token = getCookie('accessToken')
    
    const fetchData = async()=>{
        await axios.get(`${process.env.REACT_APP_API}/Order/GetMyOrder/${jwtDecode(token).UserId}`,{
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
            <div className='flex justify-between items-center font-Kanit text-xl mt-6 mb-6'>
                <div>My Order List</div>
                <div className='text-white bg-black rounded-lg p-2 hover:text-black hover:bg-white border-black border-2 duration-200 cursor-pointer' onClick={() => setShowModal(true)}>Place Order</div>
            </div>
            <div className='flex flex-col items-center mb-8'>
                {allOrder.length===0?
                <div className='w-full h-20 bg-opacity-30 p-7 font-Kanit'>
                    <h2>Your order list is currently empty.</h2>
                </div>:
                <div className='bg-[#746f6f] w-full rounded-lg flex flex-col items-center bg-opacity-30'>
                    {allOrder.map((e,key)=>{
                    return(
                        <OrderCard key={key} img={e.restaurant} restaurant={e.restaurant} detail={e.detail} receiveLocation={e.receiveLocation} userId={e.userId} username={e.username} total={e.ifDoneScore} status={e.isTaken} orderId={e.orderId}/>
                    )
                })}
                </div>}
            </div>
           {showModal?<AddOrderBox setModal={setShowModal}/>:""}
    </Fragment>
  )
}
