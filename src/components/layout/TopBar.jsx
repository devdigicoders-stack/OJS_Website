import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  const [issn, setIssn] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/public`)
      .then(res => res.json())
      .then(data => setIssn(data.issn || ''))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-primary text-white text-xs sm:text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <a href="mailto:editor@praxis.org.in" className="flex items-center gap-1.5 group hover:text-blue-200 transition-colors">
            <FaEnvelope className="text-blue-300 group-hover:scale-110 transition-transform" />
            <span>editor@praxis.org.in</span>
          </a>
          <a href="tel:+918081716983" className="hidden sm:flex items-center gap-1.5 group hover:text-blue-200 transition-colors">
            <FaPhoneAlt className="text-blue-300 group-hover:scale-110 transition-transform" />
            <span>+91 80817 16983</span>
          </a>
          <span className="text-blue-100 font-semibold tracking-wide bg-white/10 px-2 py-0.5 rounded border border-white/20">
            e-ISSN{issn ? `: ${issn}` : ''}
          </span>
          <span className="text-blue-100/90 font-medium hidden md:inline">
            Established in 2026
          </span>
          <span className="text-blue-100/90 font-medium hidden xl:inline">
            • An online refereed Journal (peer reviewed Journal)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-gray-300">Follow Us:</span>
          <a href="https://www.facebook.com/profile.php?id=61593789151403" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><FaFacebook /></a>
          <a href="https://www.linkedin.com/in/praxis-jsbis-1133a4431/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><FaLinkedin /></a>
          <a href="https://www.instagram.com/praxisjsbis/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
