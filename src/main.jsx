import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import CreateTrip from './create-trip/index.jsx'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'
import MyTrips from './my-trips/index.jsx'
import Layout from './components/custom/Layout'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<Viewtrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  </BrowserRouter>
)