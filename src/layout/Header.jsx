
import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-white min-h-screen">
      <header className='bg-red-700 p-6'>
        <nav className='flex justify-center items-center text-2xl'>
          <div className='space-x-2'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/crud">Crud Operation</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
