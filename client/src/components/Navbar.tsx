import { NavLink } from "react-router-dom";
import { Activity, ChartLine, Info, CircleUser } from "lucide-react";
import { useUser, Show, UserButton, SignInButton } from "@clerk/react";

import Logo from "./Logo";

function Navbar() {
  const { user } = useUser();
  const username = user?.username;

  return (
    <nav className="sticky top-0 right-0 left-0 z-50 flex h-12 w-full items-center justify-between border-b border-gray-700 bg-black px-6">
      <div className="flex items-center gap-1">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className="mx-1 h-4 w-px bg-gray-700" />
        <NavLink
          to="/testing"
          className={({ isActive }) =>
            `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-100 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Activity className="size-4" />
          Testing
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-100 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <ChartLine className="size-4" />
          History
        </NavLink>
      </div>

      <div className="flex items-center gap-1">
        <Show when="signed-out">
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `mr-2 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-bold transition-colors duration-100 ${
                isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <CircleUser className="size-4" />
            Login
          </NavLink>
        </Show>

        <Show when="signed-in">
          <div className="mr-4 flex items-center gap-2 text-sm text-gray-300">
            <UserButton />
            <p>{username}</p>
          </div>
        </Show>

        <span className="rounded-full border border-gray-700 px-2 py-0.5 text-xs text-gray-500">v0.1.0</span>
      </div>
    </nav>
  );
}

export default Navbar;
