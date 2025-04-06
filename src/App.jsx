import './App.css'

import {NavLink, Outlet} from 'react-router-dom'

import UserStatus from './components/UserStatus'

function App() {
  return (
    <div className="min-h-screen bg-[#F5ECE0] text-[#336D82] font-sans">
      <h1 className="text-3xl font-bold text-center py-6">Supabase + Auth + Router</h1>

      <header className="bg-[#5F99AE] text-white shadow-md">
        <nav className="flex justify-center space-x-6 py-4">
          <NavLink to="/" className="hover:underline">Domů</NavLink>
          <NavLink to="/about" className="hover:underline">O nás</NavLink>
          <NavLink to="/secret" className="hover:underline">Tajemství</NavLink>
          <NavLink to="/login" className="hover:underline">Přihlášení</NavLink>
          <NavLink to="/register" className="hover:underline">Registrace</NavLink>
        </nav>

        <div className="text-center pb-2">
          <UserStatus />
        </div>
      </header>

      <main className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
        <Outlet />
      </main>
    </div>
  )
}

export default App

