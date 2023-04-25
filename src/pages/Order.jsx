import React, { Fragment, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { MyOrderListBox } from '../components/MyOrderListBox';
import { OrderList } from '../components/OrderList';
import { MyTakenOrderBox } from '../components/MyTakenOrderBox';


function Order() {
    const [isOpen,setIsOpen]=useState(false)
  return (
    <Fragment>
        <Navbar/>
        <div className='h-20'></div>
        <div className='w-[70%] mx-auto'>
            <MyOrderListBox/>
            <OrderList/>
        </div>
        <div className='w-[50px] h-[50px] rounded-[50%] bg-black text-white fixed bottom-10 right-10 flex items-center justify-center text-xl cursor-pointer' onClick={()=>setIsOpen(true)}>
            <h1>^</h1>
        </div>
        {isOpen===true?<MyTakenOrderBox setIsOpen={setIsOpen}/>:""}
    </Fragment>
  )
}

export default Order