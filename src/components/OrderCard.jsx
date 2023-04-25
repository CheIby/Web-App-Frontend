import React from 'react'
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2'

export const OrderCard = (props) => {
    const token = getCookie('accessToken')

    const cancleOrder = (orderId) =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Click submit to cancle your order",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancle',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/Order/DeleteOrder/${orderId}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then(e=>window.location.reload())
              swalWithBootstrapButtons.fire(
                'Done!',
                'Your order have been deleted',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your order still alive',
                'error'
              )
            }
          })
    }

    const takeOrder = async(orderId) =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Click submit to cancle your order",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${process.env.REACT_APP_API}/Order/TakeOrder/${orderId}`,{receiverId:jwtDecode(token).UserId,receiverUsername:jwtDecode(token).Username},{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then(e=>window.location.reload())
              swalWithBootstrapButtons.fire(
                'Done!',
                'Your order have been deleted',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your order still alive',
                'error'
              )
            }
          })
    }

    const successOrder = async(orderId) =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Click submit to cancle your order",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/Order/SuccessOrder/${orderId}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then(e=>window.location.reload())
              swalWithBootstrapButtons.fire(
                'Done!',
                'Your order have been deleted',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your order still alive',
                'error'
              )
            }
          })
    }

    const denyOrder =async(orderId)=>{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Click submit to cancle your order",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${process.env.REACT_APP_API}/Order/DenyOrder/${orderId}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }).then(e=>window.location.reload())
          swalWithBootstrapButtons.fire(
            'Done!',
            'Your order have been deleted',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your order still alive',
            'error'
          )
        }
      })
    }

    return (
        <div className='w-[90%] h-[12rem] bg-black flex rounded-xl overflow-hidden max-w-[1200px] my-6 '>
            <div className='w-[25%] flex justify-center items-center object-cover'>
                <img src={`${process.env.REACT_APP_BACKEND}/${props.img}.jpg`} alt="" className='w-full h-full'/>
            </div>
            <div className='w-[75%] relative border-separate'> 
                <div className='p-5 text-white font-Kanit'>
                    <h1>{props.restaurant}</h1>
                    <h3>Order : {props.detail} </h3>
                    <h3>Receive Location : {props.receiveLocation}</h3>
                    <h3>Total : {parseInt(props.total)/10}</h3>
                    <h3>Status : {props.status===true?"On Delivery":"Pending"}</h3>
                </div>
                <div className='flex justify-between items-center absolute bottom-0 w-[100%] pb-5 px-5 text-white font-Kanit'>
                    <div><h1>Order by{props.username}</h1></div>
                    <div>{props.userId === jwtDecode(token).UserId?<div>
                        <button className="btn btn-outline btn-error" onClick={()=>cancleOrder(props.orderId)}>Cancel</button>
                        {props.status===true?<button className="btn btn-outline btn-success ml-3" onClick={()=>successOrder(props.orderId)}>Success</button>:""}
                    </div>:props.status===true?<button className="btn btn-outline btn-error" onClick={()=>denyOrder(props.orderId)}>Cancel</button>:
                    <button className="btn btn-outline btn-success" onClick={()=>takeOrder(props.orderId)}>Take Order</button>}</div>
                </div>
            </div>
        </div>
    )
}