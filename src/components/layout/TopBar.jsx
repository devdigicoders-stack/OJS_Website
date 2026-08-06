import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-primary text-white text-sm py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-accent" />
            <a href="mailto:info@journalportal.com" className="hover:text-accent transition-colors">info@journalportal.com</a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-accent" />
            <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Follow Us:</span>
          <a href="#" className="hover:text-accent transition-colors"><FaFacebook /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaLinkedin /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
