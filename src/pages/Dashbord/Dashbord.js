import React, { useContext, useEffect } from 'react';
import AuthContext, { useAuth } from '../../AuthContext/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/FirebaseConfig';

export default function Dashboard() {
    const { user, setUser} = useAuth()
useEffect(()=>{
    const fatchData=async()=>{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((user) => {
          console.log(user.data());
          setUser(user.data())
        });
    }
    
    fatchData()
},[])

    return (
        <div>
            
            <h1>Welcome, {user.email}</h1>
            <p>Your User ID is: {user.uid}</p>
        </div>
    );
}
