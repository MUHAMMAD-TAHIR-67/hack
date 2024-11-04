// src/pages/Mainroutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authroutes from './Auth/Authroutes';
import Dashbord from './Dashbord/Dashbord';
import Frontroutes from './Frontend/Frontroutes';
import { useAuth } from '../AuthContext/AuthContext';
import Login from './Auth/Login';

const Mainroutes = () => (
  
  <>

<Routes>
    <Route path='/*' element={<Authroutes/>}></Route>
    <Route path='Home/*' element={<Frontroutes/>}></Route>
    <Route path='/dashbord' element={<Dashbord/>}></Route>
</Routes>
    
  </>
);

export default Mainroutes;

