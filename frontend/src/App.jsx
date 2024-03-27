import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Book from './pages/Book'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from './components/Nav'
import LoginForm from './pages/Login'
import SignUpForm from './pages/Signup'
function App() {


  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Signup" element={<SignUpForm />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
