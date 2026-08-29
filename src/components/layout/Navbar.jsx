import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import { navLinks } from '../../data/dummyData';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isDropdownActive = (items) => {
    return items.some(item => location.pathname === item.path);
  };

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-xl z-50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-b border-white/60 transition-all duration-300">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-28 items-center gap-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Praxis Logo" className="h-[100px] object-contain py-1" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-4 flex-1 justify-end">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isActive = isDropdownActive(link.items);
                return (
                  <div 
                    key={link.name} 
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1 border ${isActive || activeDropdown === link.name
                        ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_rgba(37,99,235,0.15)] backdrop-blur-md'
                        : 'border-transparent text-text hover:bg-white/60 hover:border-white hover:shadow-sm hover:text-primary backdrop-blur-sm'
                      }`}
                    >
                      {link.name}
                      <FiChevronDown className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50"
                        >
                          {link.items.map(subItem => (
                            <NavLink
                              key={subItem.name}
                              to={subItem.path}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/5 text-primary' : 'text-light-text hover:bg-gray-50 hover:text-primary'}`
                              }
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center border ${isActive
                      ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_rgba(37,99,235,0.15)] backdrop-blur-md'
                      : 'border-transparent text-text hover:bg-white/60 hover:border-white hover:shadow-sm hover:text-primary backdrop-blur-sm'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
            
            <a
              href="https://user.praxis.org.in/login"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-sm"
            >
              User Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
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
            className="xl:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{link.name}</div>
                      <div className="pl-2 border-l-2 border-gray-100 ml-3 space-y-1">
                        {link.items.map(subItem => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-md font-medium text-sm ${isActive ? 'bg-primary/10 text-primary' : 'text-light-text hover:bg-gray-50 hover:text-primary'}`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md font-bold text-sm ${isActive ? 'bg-primary/10 text-primary' : 'text-text hover:bg-gray-50 hover:text-primary'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              <div className="px-3 pt-2">
                <a
                  href="https://user.praxis.org.in/login"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all duration-300"
                >
                  User Register
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
