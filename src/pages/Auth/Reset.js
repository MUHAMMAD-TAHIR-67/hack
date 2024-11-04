import React from 'react'
import { useAuth } from '../../AuthContext/AuthContext'
import { Button, Space } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/FirebaseConfig'

export default function Reset() {
    const navigate =useNavigate()
    const { email, setEmail, password, setPassword,name,setName,setUser,user, isAuthenticated } = useAuth() 
    const handlereset=(e)=>{
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Password reset email sent ")
navigate("/auth/login")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }
return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen"
    style={{  background: '#0F2027',  
        background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',  // Chrome 10-25, Safari 5.1-6
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}>
 <div className="bg-white p-8 rounded-lg shadow-lg  xs:w-90 max-w-sm w-full">
   <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
   <form >

     <div className="mb-4">
       <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
       <input
         type="email"
         id="email"
         name="email"
         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         placeholder="you@example.com"
         value={email}
         onChange={e => setEmail(e.target.value)}
         required
       />
     </div>
  
       
    
     <Space>
       <Button
         className='mx-4 w-full'
         type="primary"
         size="large"
         htmlType="submit"
         onClick={handlereset}
         style={{  background: '#0F2027',  // Fallback for old browsers
            background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',  // Chrome 10-25, Safari 5.1-6
            background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',width:"170%", }}
         icon={<AntDesignOutlined />}
       >
         Send Email
       </Button>
     </Space>
   </form>
   <p className="mt-4 text-center text-sm text-gray-600">
     Don't Want? <Link to={'/auth/login'} className="text-indigo-600 hover:text-indigo-700">sign up</Link>
   </p>
 </div>
</div>
  )
}
