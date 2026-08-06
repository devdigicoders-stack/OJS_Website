import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaUserTie, FaShareAlt, FaChevronLeft,
  FaFilePdf, FaEnvelope, FaPhoneAlt
} from 'react-icons/fa';
import { announcements } from '../../data/dummyData';

const AnnouncementDetails = () => {
  const { id } = useParams();
  const announcement = announcements.find(a => a.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!announcement) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-text mb-4">Announcement Not Found</h2>
        <Link to="/announcements" className="btn-primary px-6 py-2 rounded-lg">Return to Announcements</Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    if (status === 'New') return <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">NEW</span>;
    if (status === 'Important') return <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm animate-pulse">IMPORTANT</span>;
    if (status === 'Upcoming') return <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">UPCOMING</span>;
    return null;
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Header & Banner */}
      <section className="bg-white border-b border-border pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/announcements" className="inline-flex items-center gap-2 text-sm font-bold text-light-text hover:text-primary transition-colors mb-8">
            <FaChevronLeft /> Back to Announcements
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
                {announcement.category}
              </span>
              {getStatusBadge(announcement.status)}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text mb-6 font-poppins leading-tight">
              {announcement.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 py-4 border-y border-gray-100">
              <div className="flex items-center gap-2 text-sm text-light-text font-medium">
                <FaCalendarAlt className="text-primary/60 text-lg" /> 
                Published on <span className="text-text font-bold">{announcement.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-light-text font-medium">
                <FaUserTie className="text-primary/60 text-lg" /> 
                Posted by <span className="text-text font-bold">{announcement.postedBy}</span>
              </div>
            </div>

            {/* Banner Image */}
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-md">
              <img 
                src={announcement.bannerImage} 
                alt={announcement.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Description */}
            <div className="prose prose-lg max-w-none text-light-text mb-12 leading-relaxed">
              <p>{announcement.fullDescription}</p>
            </div>

            {/* Attachments & Actions */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                  <FaFilePdf size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text">Attached Document</h4>
                  <p className="text-xs text-light-text">Official Notice (PDF, 2.4 MB)</p>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-text font-bold py-2.5 px-6 rounded-xl transition-colors border border-gray-200 shadow-sm">
                  <FaShareAlt /> Share
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-md">
                  Download
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Support / Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <h3 className="text-xl font-bold text-text mb-2">Have any questions?</h3>
            <p className="text-light-text mb-6">Our support team is here to help you regarding this announcement.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:support@ojs.com" className="inline-flex items-center justify-center gap-2 bg-gray-50 text-text font-bold py-3 px-6 rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all">
                <FaEnvelope /> support@ojs.com
              </a>
              <a href="tel:+1234567890" className="inline-flex items-center justify-center gap-2 bg-gray-50 text-text font-bold py-3 px-6 rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all">
                <FaPhoneAlt /> +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AnnouncementDetails;
