import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-400 py-3 font-serif'>
      <div className="logo">
        <span className="font-bold text-xl mx-9 hover:underline px-3 py-1 hover:rounded-xl transition-all duration-200">Task Manager</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:bg-violet-600 px-3 py-1 hover:rounded-xl hover:text-cyan-50 transition-all duration-200'>Home</li>
        <li className='cursor-pointer hover:bg-violet-600 px-3 py-1 hover:rounded-xl hover:text-cyan-50 transition-all duration-200'>Your Tasks</li>
        
      </ul>
    </nav>
  )
}

export default Navbar
