
import { NavLink, Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Header() {
  return (
    <div className="bg-white min-h-screen">
      <header className='bg-red-700 p-6 sticky top-0 z-50 shadow-lg'>
        <nav className='flex justify-end items-center text-2xl'>
          <div className='space-x-2 '>
            <NavLink to="/" className="text-gray-900 hover:text-gray-300">Home</NavLink>
            <NavLink to="/crud" className="text--gray-900 hover:text-gray-300">Crud</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
