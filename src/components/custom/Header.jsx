import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-2 flex shadow-sm flex justify-between items-center'>
      <img className='logo' src='/logo.svg' />
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  )
}

export default Header
