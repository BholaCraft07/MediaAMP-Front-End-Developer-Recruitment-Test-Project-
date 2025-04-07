import React, { useState } from 'react'
import Sidebar from '../component/Sidebar'
import Hero from '../component/Hero'

import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
const Home = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className='position-relative'>
      <div
        className="position-absolute top-2 px-2 z-2 text-white"
        style={{
          marginLeft: isOpen ? "160px" : "0px",
          transition: "margin-left 0.3s ease-in-out",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <GoSidebarCollapse size={24} /> : <GoSidebarExpand size={24} />}
      </div>
      <div className="d-flex">
        <Sidebar isOpen={isOpen} />
        <Hero isOpen={isOpen} />
      </div>
    </div>
  )
}

export default Home