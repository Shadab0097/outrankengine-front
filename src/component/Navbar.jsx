import { useState } from 'react';
// import { } from "@heroicons/react/24/outline";
import { MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FiGlobe } from 'react-icons/fi';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white/80 backdrop-blur shadow-md fixed top-0 left-0 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">

                            <span className="font-semibold">OutRank Engine </span>
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
                        <Link to="/about" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
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
