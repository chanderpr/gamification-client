import { useState } from 'react'
import './App.css'
import axios from 'axios';
import Authentication from './pages/Authentication'
import AddRank from './pages/AddRank'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className='main-container'>
        {/* <Authentication /> */}
        <Header />
        <AddRank />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
