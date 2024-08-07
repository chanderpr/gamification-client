import { useState } from 'react'
import './App.css'
import axios from 'axios';
import Authentication from './pages/Authentication'
import AddRank from './pages/AddRank'
import Header from './components/layout/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/layout/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Ranks from './pages/AddRank'
import AllRanks from './components/rank/AllRanks'
import Users from "./components/user/UserActivity"
import AllUsers from './components/user/AllUsers';
import UserDetails from './pages/UserDetalls';

function App() {
  return (
    <BrowserRouter>
      <>
        <div className='main-container'>
          {/* <Authentication /> */}
          {/* <Header />
          <AddRank />
          <Users id="2DHQ2IPE4YZMk0qXJ7fI"/> */}
          <div className='main-wrapper'>
            <div className='left-wrapper'>
              <Sidebar />
            </div>
            <div className='right-wrapper'>
              <Header />
              <Routes>
                <Route index path="/" Component={Dashboard}/>
                <Route path="/ranks" Component={AllRanks} />
                <Route path="/users" Component={AllUsers} />
                <Route path="/user" element={<Users id="113" />} />
              </Routes>
            </div>
          </div>
          {/* <Users id=''/> */}
          <ToastContainer />
        </div>
      </>
    </BrowserRouter>
  )
  
}

export default App
