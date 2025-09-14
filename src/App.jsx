import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
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
 