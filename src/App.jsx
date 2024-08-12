import React from 'react'
import Routes  from './routes/Index';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <>
    <div className="flex">
    <Routes />  
    <Toaster />

    </div>
    </>
  )
}

export default App
