import { AntDesignOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../../firebase/FirebaseConfig';
import { useAuth } from '../../AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function Register() {
  const navigate = useNavigate();
  const [cPassword, setCPasword] = useState('');
  const { email, setEmail, password, setPassword, name, setName, setProfilepic, profilePic } = useAuth();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!email || !password || !name) {
      message.warning("Please fill in all fields.");
      return;
    }

    if (password !== cPassword) {
      message.warning("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    
      if (profilePic) {
        const storageRef = ref(storage, `users/${profilePic.name}`);
        await uploadBytes(storageRef, profilePic);
        console.log('Uploaded a blob or file!');
      }

      await updateProfile(user, { displayName: name });
      await createUserProfile(user);
      message.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  const createUserProfile = async (user) => {
    const userData = {
      name,
      email,
      uid: user.uid,
      status: "active",
      dateCreated: serverTimestamp(),
      role: ["superAdmin"],
    };

    try {
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("User profile created:", userData);
    } catch (e) {
      console.error("Error adding document:", e.message);
      message.error("Failed to save user data. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
      }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              value={cPassword}
              onChange={e => setCPasword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Attach Image (optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setProfilepic(file);
                }
              }}
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
              Register
            </Button>
          </Space>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to={"/auth/login"} className="text-indigo-600 hover:text-indigo-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
