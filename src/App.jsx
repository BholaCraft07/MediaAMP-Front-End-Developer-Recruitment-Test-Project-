import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ResponsiveNavbar from './component/Navbar';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './component/Footer';
import GameDetails from './pages/GameDetails';
import LibraryPage from './pages/LibraryPage'
import SearchList from './pages/SearchList';
import { ToastContainer } from 'react-toastify';
import FilterGameLayout from './pages/FilterGameLayout';

function App() {

  return (
    <>
      <div className=''
      >
        <ToastContainer />
        <ResponsiveNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/search" element={<SearchList />} />
          <Route path="/:id" element={<GameDetails />} />
          <Route path="/filter" element={<FilterGameLayout/>} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App