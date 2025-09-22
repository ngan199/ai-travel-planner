import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import TrendingDestinations from './components/custom/TrendingDestinations'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      <TrendingDestinations />
    </>
  )
}

export default App
 