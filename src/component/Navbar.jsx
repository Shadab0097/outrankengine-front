import { useState } from 'react';
// import { } from "@heroicons/react/24/outline";
import { MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { FiGlobe } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const isLogin = useSelector((store) => store.user)

    return (
        <nav className={`sticky top-0 z-30 backdrop-blur bg-white border-b border-white/10 text-white`}>
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 ">


                <div className="flex justify-between items-center h-12 px-4 py-3">
                    {/* Logo */}
                    {/* <div className="flex items-center gap-3">
                        <button className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors" onClick={() => setSidebarOpen(true)} > <FiMenu /> </button>
                        <FiGlobe className="text-white" />
                        <span className="font-semibold">OutRank Engine</span>
                        
                    </div> */}

                    <div className="flex items-center justify-center gap-2">

                        <img className="w-12 h-12" src="outranklogo.png" />

                        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">

                            <span className="font-semibold ">OutRank Engine </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">

                        <Link to="/privacy" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            Privacy Policy
                        </Link>
                        <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            Pricing
                        </Link>
                        <Link to="/contact" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            Contact Us
                        </Link>
                        <Link to="/about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            About Us
                        </Link>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? (
                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 text-sm"> <span className="opacity-80 text-black">IST: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pt-4 pb-6 space-y-4">
                    <Link to="/privacy" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                        Privacy Policy
                    </Link>
                    <Link to="/pricing" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                        Pricing
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                        Contact Us
                    </Link>
                    <Link to="/about" className="block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                        About Us
                    </Link>


                </div>
            )}
        </nav>
    );
}


{/* <div className=" sticky top-0 z-30 backdrop-blur bg-white/10 border-b border-white/10 text-white">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"> */}

{/* Left: Logo */ }
{/* <div className="flex items-center gap-3">
            <button className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors" onClick={() => setSidebarOpen(true)} > <FiMenu /> </button>
            <FiGlobe className="text-white" />
            <span className="font-semibold">OutRank Engine</span>
        </div> */}

{/* Center: Links */ }
{/* <div className="space-x-6 hidden md:flex">
            <Link to="/privacy" className="hover:underline font-medium">Privacy Policy</Link>
            <Link to="/pricing" className="hover:underline font-medium">Pricing</Link>
            <Link to="/about" className="hover:underline font-medium">About Us</Link>
        </div> */}

{/* Right: Time */ }
{/* <div className="hidden sm:flex items-center gap-6 text-sm"> <span className="opacity-80">IST: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span> </div> */ }
{/* 
    </div>
</div> */}