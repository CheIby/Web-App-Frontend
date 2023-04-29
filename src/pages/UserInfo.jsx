import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { setCookie,getCookie } from 'cookies-next';

function UserInfo() {
    const token = getCookie("userInfoToken")
  
    const [selectedImage, setSelectedImage] = useState(null);
   

    const submitImg= async()=>{
      const formData = new FormData();
      formData.append('Image', selectedImage);
      await axios.post('https://localhost:7135/api/User/UploadIMG',formData)
    }
    return (
      <div className="App">
        <h1>Upload and Display Image usign React Hook's</h1>
  
  {selectedImage && (
    <div>
      {selectedImage!=null?<img
        alt="not found"
        width={"250px"}
        src={window.URL.createObjectURL(selectedImage)}
      />:<img/>}
      <img
        alt="not found"
        width={"250px"}
        src="null."
      />
      <br />
      <button onClick={() => setSelectedImage(null)}>Remove</button>
    </div>
  )}
  
  <br />
  <br />
  
  <input
    type="file"
    name="myImage"
    onChange={(event) => {
      console.log(event.target.files[0]);
      setSelectedImage(event.target.files[0]);
    }}
  />
  <button onClick={submitImg}>submit</button>  
      </div>
    );
  //   const [userInfo,setUserInfo]=useState(null)
    
  
  //     const fetchData =async()=>{
  //         await axios.get("https://localhost:7135/api/User/GetUserInfoToken/42d8e9a7-9853-434d-a64e-4b3b310195c3").then(e=>{
  //           const token =  e.data.token
  //           setCookie("userInfoToken",token,{
  //                   maxAge:7*24*60*60,
  //                   path:'/',
  //                   sameSite:'strict',
  //                   secure:true
  //           })
  //         }   
  //         )
  //     }
      
  //     useEffect(() => {
  //         // fetchData()
  //         if (token!=null){
  //           setUserInfo(jwt_decode(token))
  //         }
          
  //       },[]);
  
      
  //   return (
  //     <div>
  //         {/* {token?setUserInfo(jwt_decode(token)):""} */}
  //         {JSON.stringify(userInfo)}
  //         {userInfo==null?"":<img src={`https://localhost:7135/static/${userInfo.UserImg}`} alt="" />}
          
  //     </div>
  //   )
  // }
}
export default UserInfo;