import React from 'react'

export default function Footer() {
  return (
    <footer className='footer bg-slate-700 p-4 text-center text-white'>
      <p>&copy; {new Date().getFullYear()} All rights reserved</p>
      <p>Contact us: XXXX</p>
    </footer>
  )
}
