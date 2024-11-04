import React from 'react'
import Header from './Header'

import Footer from './Footer'
import Main from './Main'
import NoteGrid from './Noteg'
import { Route, Routes } from 'react-router-dom'
import CreateNote from './Note'

export default function Frontroutes() {
  return (
    <>
    <Routes>
      <Route path="/note" element={<CreateNote/>}></Route>
    </Routes>
    <Header/>
    <NoteGrid/>
    <Footer/>
        </>
  )
}
