import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext, { useAuth } from "../../AuthContext/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Dialog, DialogPanel } from "@headlessui/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";

export default function Header() {
  const navigate =useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {state,dispatch}=useAuth()
  const {isAuthenticated}=state
  const handllelogout=()=>{
    signOut(auth)
    .then(()=>{
      dispatch({type:"Logout"})
      navigate("/login")
    })
  }

  return (
    <header  className="container-fluid bg-light" style={{  width: "100%", height: "50px" ,zIndex:"1", }}>
      
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-12xl items-center justify-between p-2 lg:px-8 " style={{ background: '#0F2027',  // Fallback for old browsers
            background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',  // Chrome 10-25, Safari 5.1-6
            background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',color:"white"}}
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img alt="Company Logo" src="/3.png" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          <Link to="#" className="text-sm font-semibold text-white-900">
            PROFILE
          </Link>
          <Link to="/Contact" className="text-sm font-semibold text-white-900">
            HOME
          </Link>
          <Link to="/Home/note" className="text-sm font-semibold text-white-900">
             ADD NOTE
          </Link>
        </div>

        {/* Auth Links */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
         {!isAuthenticated ?<Link to={"/auth/login"}  className="text-sm font-semibold text-white-900">
              Login &rarr;
            </Link>:<button onClick={handllelogout} className="text-sm font-semibold text-white-900">
              Logout &rarr;
            </button>} 
           
        </div>
    

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full px-6 py-6 sm:max-w-sm z-10" style={{ background: '#0F2027',  // Fallback for old browsers
            background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',  // Chrome 10-25, Safari 5.1-6
            background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)'}}>
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img alt="Company Logo" src="/3.png" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-2">
              <Link to="#" className="block px-3 py-2 text-base font-semibold text-white-900 hover:bg-gray-50">
                PROFILE
              </Link>
              <Link to="/Contact" className="block px-3 py-2 text-base font-semibold text-white-900 hover:bg-gray-50">
                HOME
              </Link>
              <Link to="/Home/note" className="block px-3 py-2 text-base font-semibold text-white-900 hover:bg-gray-50">
        ADD NOTE
              </Link>
            </div>
            <div className="py-6">
              
                <button
                
                  className="block px-3 py-2.5 text-base font-semibold text-white-900 hover:bg-gray-50"
                >
                  Logout
                </button>
             
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
