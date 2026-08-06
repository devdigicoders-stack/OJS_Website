import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '../../data/dummyData';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-white/70 backdrop-blur-xl z-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-white/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-poppins font-bold text-primary flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-accent text-white p-2.5 rounded-xl leading-none shadow-lg shadow-primary/30 border border-white/20">OJS</div>
              <span className="hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">JournalPortal</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${isActive
                    ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_rgba(37,99,235,0.15)] backdrop-blur-md'
                    : 'border-transparent text-text hover:bg-white/60 hover:border-white hover:shadow-sm hover:text-primary backdrop-blur-sm'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button className="text-light-text hover:text-primary p-2 transition-colors duration-200">
              <FiSearch size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text hover:text-primary p-2 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-light-text hover:bg-gray-50 hover:text-primary'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search journals..."
                    className="w-full bg-gray-50 border border-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
