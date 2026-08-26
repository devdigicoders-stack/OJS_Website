import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-primary text-white text-sm py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a href="mailto:Editor@praxis.org.in" className="flex items-center gap-2 group hover:text-blue-200 transition-colors">
            <FaEnvelope className="text-blue-300 group-hover:scale-110 transition-transform" />
            <span>Editor@praxis.org.in</span>
          </a>
          <a href="tel:+918081716983" className="flex items-center gap-2 group hover:text-blue-200 transition-colors">
            <FaPhoneAlt className="text-blue-300 group-hover:scale-110 transition-transform" />
            <span>+91 80817 16983</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Follow Us:</span>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaFacebook /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaLinkedin /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
