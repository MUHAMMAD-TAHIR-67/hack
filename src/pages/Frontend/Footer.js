import React from 'react';
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, TikTokOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; 

export default function Footer() {
  return (
    <footer style={{ marginTop:"-30px", background: '#0F2027',  
        background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',  
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',color:"white"}}>
   
      <div className="text-center mt-6 border-t border-gray-300 pt-4" style={{ backgroundColor: "lightgrey", color: "black", padding: "10px", paddingTop: "20px" }}>
        <p className="text-black-300">&copy; {new Date().getFullYear()} . All rights reserved. Powered by Muhammad Tahir</p>
      </div>
    </footer>
  );
}
