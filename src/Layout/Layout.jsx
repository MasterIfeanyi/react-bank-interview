import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from '../Components/Footer'
import Navigation from '../Components/Navigation'


const Layout = () => {
  return (
    <main className='App'>
      <Navigation />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Layout