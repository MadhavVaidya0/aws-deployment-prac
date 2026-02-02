import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, ChevronDown, Menu, Shield } from "lucide-react"
import { useState } from "react"

function getStoredUser() {
  try {
    const u = localStorage.getItem("user")
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = getStoredUser()
  const isAdmin = user?.role === "ADMIN"

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

       
        <div className="flex items-center gap-2">
          <div className="text-3xl text-blue-500">“</div>
          <Link to="/" className="text-2xl font-bold text-[#003366]">
            CabBuddy
          </Link>
        </div>

       
        <div className="flex items-center gap-8">
       
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/search"
              className="flex items-center text-blue-500 font-medium hover:text-blue-600"
            >
              <Search className="h-5 w-5 mr-1" />
              Search
            </Link>

            <Link
              to="/publish-ride"
              className="flex items-center text-blue-500 font-medium hover:text-blue-600"
            >
              <Plus className="h-5 w-5 mr-1" />
              Publish a ride
            </Link>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center text-amber-600 font-medium hover:text-amber-700"
              >
                <Shield className="h-5 w-5 mr-1" />
                Admin
              </Link>
            )}
          </nav>

         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="user"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-bookings">My Bookings</Link>
              </DropdownMenuItem>
                
              <DropdownMenuItem asChild>
                <Link to="/my-payments">Payments</Link>
              </DropdownMenuItem>


              <DropdownMenuItem asChild>
                <Link to="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

         
          <button
            className="md:hidden text-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

    
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-inner px-6 py-3 space-y-3">
          <Link
            to="/search"
            className="flex items-center text-blue-500 font-medium hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Link>
          <Link
            to="/publish-ride"
            className="flex items-center text-blue-500 font-medium hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Publish a ride
          </Link>
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="flex items-center text-amber-600 font-medium hover:text-amber-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <Shield className="h-5 w-5 mr-2" />
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
