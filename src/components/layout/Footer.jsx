import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import footerLogo from '../../assets/footer.png';
import { navLinks } from '../../data/dummyData';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-gray-300 py-12 mt-auto">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="space-y-6">
            <p to="/" className="inline-block">
              <img src={footerLogo} alt="Praxis Logo" className="h-[100px] object-contain -ml-4" />
            </p>
            <p className="text-white/90 font-medium leading-relaxed text-sm">
              A publication by Srishti Social Research Foundation (SSRF)
            </p>
            <p className="text-white/70 leading-relaxed text-sm mt-2">

            </p>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <p className="text-xs text-gray-400 mb-4">
              Stay connected with our latest journal publications, announcements, research updates, and academic events through our official social media channels.
            </p>
            <div className="flex space-x-3">
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all hover:scale-110"><FaFacebookF /></a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all hover:scale-110"><FaLinkedinIn /></a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all hover:scale-110"><FaTwitter /></a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all hover:scale-110"><FaInstagram /></a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all hover:scale-110"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/author-submission-guidelines" className="text-gray-400 hover:text-white transition-colors text-sm">Submission Guidelines</Link></li>
              <li><Link to="/peer-review-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Peer Review Policy</Link></li>
              <li><Link to="/ethics-malpractice-statement" className="text-gray-400 hover:text-white transition-colors text-sm">Ethics & Malpractice Statement</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Help & Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>123 University Avenue, Academic City, AC 12345</li>
              <li>contact@journalportal.edu</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Srishti Social Research Foundation (SSRF). All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Crafted by <a href="https://digicoders.in/" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors font-bold">Team DIgicoders</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
