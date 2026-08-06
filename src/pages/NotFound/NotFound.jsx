import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 text-center max-w-lg w-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 opacity-5">
          <FaExclamationTriangle className="text-[200px] -mt-10 -mr-10 text-primary" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-4 font-poppins">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">Page Not Found</h2>
          <p className="text-light-text mb-10 leading-relaxed text-lg">
            Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
