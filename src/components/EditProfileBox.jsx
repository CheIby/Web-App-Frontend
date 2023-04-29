import React, { useState } from 'react'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export const EditProfileBox = (props) => {
  const navigate = useNavigate()
    const token = getCookie('accessToken')
    const [firstName,setFirstName]=useState(props.firstName)
    const [lastName,setLastName]=useState(props.lastName)
    const [tel,setTel]=useState(props.tel)
    const [selectedImage, setSelectedImage] = useState(null);

    const submitImg= async()=>{
        const formData = new FormData();
        formData.append('Image', selectedImage);
        formData.append('FirstName',firstName)
        formData.append('LastName',lastName)
        formData.append('Tel',tel)
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
            axios.patch(`${process.env.REACT_APP_API}/User/UpdateUser/${jwtDecode(token).UserId}`,formData,{
              headers:{
                  'Authorization':`Bearer ${token}`
              }
            })
            swalWithBootstrapButtons.fire(
              'Done!',
              'Your order have been deleted',
              'success'
            ).then(e=>{
              deleteCookie('accessToken')
              navigate('/login')
              window.location.reload()
            })
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
    <div className="justify-center items-center flex overflow-x-hidden bg-black bg-opacity-30 backdrop-blur-sm z-50 overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-[80%] sm:w-[50%] my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Your Taking Order
                  </h3>
                </div>
                {/*body*/}
                <div className='p-5'>
                  <div className='flex justify-center'>
                  {selectedImage!=null?<img src={URL.createObjectURL(selectedImage)} alt='' className='w-40 h-40 rounded-[50%]'/>
                  :<img src={`${process.env.REACT_APP_BACKEND}/${props.userImg}`} alt='' className='w-40 h-40 rounded-[50%]'/>}
                  </div>
                  <div className='font-semibold sm:text-xl text-lg font-Kanit my-2'>
                    <h1 className='my-1'>Upload new Image</h1>
                    <input type="file" name="myImage" onChange={(event) => { setSelectedImage(event.target.files[0]);}} className='font-extralight'/>
                  </div>
                  <div className='sm:flex'>
                    <div className='sm:w-[50%]'>
                        <h1 className='font-semibold sm:text-xl text-lg'>First Name</h1>
                        <input type="text" className='font-extralight sm:w-[95%] w-full text-lg py-1 border-b-2 indent-2' placeholder='First Name' value={firstName} onChange={e=>setFirstName(e.target.value)}/>
                    </div>
                    <div className='sm:w-[50%]'>
                        <h1 className='font-semibold sm:text-xl text-lg'>Last Name</h1>
                        <input type="text" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Last Name' value={lastName} onChange={e=>setLastName(e.target.value)}/>
                    </div>
                    
                  </div>
                  <div className='my-2'> 
                      <h1 className='font-semibold sm:text-xl text-lg'>Tel</h1>
                      <input type="text" className='font-extralight w-full text-lg py-1 border-b-2 indent-2' placeholder='Tel' value={tel} onChange={e=>setTel(e.target.value)} />
                    </div>
                  </div>
                
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>submitImg()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}
