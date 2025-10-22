import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cls = ({ isActive }) =>
    "px-3 py-2 rounded-lg text-sm font-medium hover:underline " +
    (isActive ? "text-[#632EE3] underline font-bold" : "text-[#000000]");

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container-default flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <span className="font-extrabold tracking-tight text-lg italic text-blue-700">My Hero Appamedia</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink className={cls} to="/">Home</NavLink>
          <NavLink className={cls} to="/apps">Apps</NavLink>
          <NavLink className={cls} to="/installation">Installation</NavLink>
        </nav>

        <div className="hidden md:block">
          <a href="https://github.com/Ofsomarfarooq" target="_blank" rel="noreferrer"
             className="btn btn-primary bg-[#632EE3] text-white border-none">
            <FontAwesomeIcon icon={faGithubAlt} className="mr-2" /> Contribute
          </a>
        </div>

        <button className="md:hidden btn btn-ghost border" onClick={() => setOpen(v=>!v)} aria-label="Toggle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container-default py-3 flex flex-col gap-2">
            <NavLink className={cls} to="/" onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink className={cls} to="/apps" onClick={()=>setOpen(false)}>Apps</NavLink>
            <NavLink className={cls} to="/installation" onClick={()=>setOpen(false)}>Installation</NavLink>
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer"
               className="btn bg-[#632EE3] text-white">Contribute</a>
          </div>
        </div>
      )}
    </header>
  );
}
