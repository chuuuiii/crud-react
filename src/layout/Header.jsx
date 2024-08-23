
import { NavLink, Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Header() {
  return (
    <div className="bg-white min-h-screen">
      <header className='bg-red-700 p-6'>
        <nav className='flex justify-center items-center text-2xl'>
          <div className='space-x-2 '>
            <NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink>
            <NavLink to="/crud" className="text-white hover:text-gray-300">Crud</NavLink>
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
