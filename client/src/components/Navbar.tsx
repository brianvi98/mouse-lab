import { NavLink } from "react-router-dom";
import { Activity, ChartLine, Info, CircleUser } from "lucide-react";

function Navbar() {
  return (
    <nav
      className="flex items-center justify-between h-12 w-full border-b
     border-gray-700 px-6 bg-black sticky top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center gap-1">
        <NavLink to="/">
          <div className="text-sm font-medium tracking-wide mr-4">
            mouse<span className="text-gray-400 font-normal">lab</span>
          </div>
        </NavLink>
        <div className="w-px h-4 bg-gray-700 mx-1" />
        <NavLink
          to="/testing"
          className={({ isActive }) =>
            `flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors duration-100
            ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Activity className="size-4" />
          Testing
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md 
            transition-colors duration-100
            ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <ChartLine className="size-4" />
          History
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors duration-100
            ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Info className="size-4" />
          About
        </NavLink>
      </div>

      <div className="flex items-center gap-1">
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md 
            transition-colors duration-100 font-bold
            ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <CircleUser className="size-4" />
          Login
        </NavLink>
        <span
          className="text-xs text-gray-500 border border-gray-700 
          rounded-full px-2 py-0.5"
        >
          v0.1.0
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
