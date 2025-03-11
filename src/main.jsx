import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import CreateTrip from './create-trip/index.jsx'
import App from './App.jsx'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Header />
    <Toaster />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-trip" element={<CreateTrip />} />
    </Routes>
  </BrowserRouter>
)