import React from 'react'
import { Router,Route } from 'react-router-dom'
import Sidebar from './componnets/Sidebar';

const App = () => {
  return (
    <div className="flex gap-6 bg-slate-700">
      <Sidebar/>
    </div>
  )
}

export default App
