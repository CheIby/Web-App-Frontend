import React, { useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'

export const EditProfileBox = (props) => {
    const token = getCookie('accessToken')
    const [firstName,setFirstname]=useState(props.firstName)
    const [lastName,setLastname]=useState(props.lastName)
    const [selectedImage, setSelectedImage] = useState(null);

    const submitImg= async()=>{
        const formData = new FormData();
        formData.append('Image', selectedImage);
        formData.append('FirstName',firstName)
        formData.append('LastName',lastName)
        await axios.patch(`${process.env.REACT_APP_API}/User/UpdateUser/${jwtDecode(token).UserId}`,formData,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
      }

      console.log(token)

  return (
    <div className="justify-center items-center flex overflow-x-hidden bg-black bg-opacity-30 backdrop-blur-sm z-50 overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-[50%] my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Your Taking Order
                  </h3>
                </div>
                {/*body*/}
                <input type="text" value={firstName} onChange={e=>setFirstname(e.target.value)}/>
                <input type="text" value={lastName} onChange={e=>setLastname(e.target.value)}/>
                <input type="file" name="myImage" onChange={(event) => { setSelectedImage(event.target.files[0]);}}/>
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
