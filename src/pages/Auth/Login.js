import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/FirebaseConfig';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import { useAuth } from '../../AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, setUser, dispatch } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault(); 

    if (email === "" || password === "") {
      message.warning("Please fill in all fields.");
      return; 
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(userCredential);
      setUser({ uid: user.uid, email: user.email });
      dispatch({ type: "LOGIN" });
      message.success("Login successful!");
      navigate("/home");
    } catch (error) {
      const errorMessage = error.message;
      message.error(`Error: ${errorMessage}`); 
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
      }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <Space>
            <Button
              className='mx-4 w-full'
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
              }}
              icon={<AntDesignOutlined />}
            >
              Login
            </Button>
          </Space>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to='/register' className="text-indigo-600 hover:text-indigo-700">Sign Up</Link>
        </p>
        <p className="mt-1 text-center text-sm text-gray-600">
          Reset Password? <Link to='/reset' className="text-indigo-600 hover:text-indigo-700">Reset</Link>
        </p>
      </div>
    </div>
  );
}
