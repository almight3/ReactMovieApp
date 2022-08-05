import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex px-12 py-8 space-x-8 items-center bg-indigo-500 min-w-max	">
        <img style = {{maxWidth:'60px'}}src="./image/movie.png"/>
        <Link to="/" className="text-white font-bold text-2xl">Movies</Link>
        <Link to="/favourite"className="text-white font-bold text-2xl">Favourites</Link>
    </nav>
  )
}

export default Navbar