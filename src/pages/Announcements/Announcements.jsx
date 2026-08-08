import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, FaBullhorn, FaArrowRight, FaSearch, 
  FaFilter, FaUserTie, FaNewspaper, FaFileAlt
} from 'react-icons/fa';
// import { announcements } from '../../data/dummyData';

const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: delay }}
  >
    {children}
  </motion.div>
);

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Call for Papers', 'Journal News', 'Editorial Notice', 'Conference', 'Publication Update'];

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/announcements/public`);
        const data = await res.json();
        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Filter real data
  const filteredAnnouncements = announcements.filter(a => 
    (activeCategory === 'All' || a.category === activeCategory) &&
    (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     (a.content && a.content.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Helper to determine border and badge color based on category
  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Call for Papers': return { border: 'border-l-blue-500', bg: 'bg-blue-100', text: 'text-blue-700', icon: <FaFileAlt /> };
      case 'Journal News': return { border: 'border-l-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700', icon: <FaNewspaper /> };
      case 'Editorial Notice': return { border: 'border-l-orange-500', bg: 'bg-orange-100', text: 'text-orange-700', icon: <FaBullhorn /> };
      case 'Conference': return { border: 'border-l-green-500', bg: 'bg-green-100', text: 'text-green-700', icon: <FaUserTie /> };
      case 'Publication Update': return { border: 'border-l-purple-500', bg: 'bg-purple-100', text: 'text-purple-700', icon: <FaBullhorn /> };
      default: return { border: 'border-l-primary', bg: 'bg-primary/10', text: 'text-primary', icon: <FaBullhorn /> };
    }
  };

  const getStatusBadge = (ann) => {
    // If published in last 7 days, show NEW
    const publishDate = new Date(ann.publishDate);
    const today = new Date();
    const diffDays = Math.ceil((Math.abs(today - publishDate)) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">NEW</span>;
    if (ann.category === 'Alert') return <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">IMPORTANT</span>;
    return null;
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2000&auto=format&fit=crop" 
            alt="Announcements" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins drop-shadow-lg">Latest Announcements</h1>
            <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm bg-white/10 w-fit mx-auto px-5 py-1.5 rounded-full backdrop-blur-md border border-white/20 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">Latest Announcements</span>
            </div>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">Stay updated with the latest journal news, publication schedules, calls for papers, and editorial announcements.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* 2. Search & Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <input 
                type="text" 
                placeholder="Search announcements..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <FaFilter className="text-gray-400" />
                <select 
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full sm:w-48 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-text font-medium"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <select className="w-full sm:w-36 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-text font-medium">
                <option>All Years</option>
                <option>2026</option>
                <option>2025</option>
              </select>

              <select className="w-full sm:w-36 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-text font-medium">
                <option>Latest First</option>
                <option>Oldest First</option>
              </select>
            </div>
            
          </div>
        </div>

        {/* 3. Announcement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredAnnouncements.map((item, i) => {
              const styles = getCategoryStyles(item.category);
              
              return (
                <ScrollReveal key={item._id} delay={i * 0.05}>
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-y border-r border-gray-100 flex flex-col h-full relative group border-l-4 ${styles.border}`}
                  >
                    
                    <div className="flex justify-between items-start mb-4">
                      {/* Category Badge */}
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${styles.bg} ${styles.text}`}>
                        {styles.icon} {item.category}
                      </span>
                      {getStatusBadge(item)}
                    </div>
                    
                    {/* Media Display */}
                    {item.mediaPath && (
                      <div className="mb-4 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex justify-center items-center">
                        {item.mediaPath.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/) ? (
                          <img 
                            src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/${item.mediaPath.replace(/\\/g, '/')}`} 
                            alt={item.title} 
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="p-4 w-full flex items-center justify-between bg-primary/5">
                            <div className="flex items-center gap-3">
                              <FaFileAlt className="text-2xl text-primary" />
                              <span className="text-sm font-semibold text-text truncate">Attachment Document</span>
                            </div>
                            <a 
                              href={`${import.meta.env.VITE_API_URL.replace('/api', '')}/${item.mediaPath.replace(/\\/g, '/')}`}
                              target="_blank" rel="noreferrer"
                              className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded shadow-sm hover:bg-accent transition-colors"
                            >
                              View
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    <h3 className="font-bold font-poppins text-lg text-text mb-3 leading-snug group-hover:text-primary transition-colors">
                      <Link to={`/announcements/${item._id}`}>{item.title}</Link>
                    </h3>

                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-light-text font-medium">
                        <FaCalendarAlt className="text-gray-400" /> {new Date(item.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-light-text font-medium">
                        <FaUserTie className="text-gray-400" /> Posted by: <span className="text-text">Admin</span>
                      </div>
                    </div>

                    <p className="text-sm text-light-text leading-relaxed mb-6 line-clamp-3">
                      {item.content || item.title}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link to={`/announcements/${item._id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group/link text-sm">
                        Read More <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </motion.div>
                </ScrollReveal>
              );
            })}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAnnouncements.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <FaBullhorn className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">No Announcements Found</h3>
            <p className="text-light-text">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredAnnouncements.length > 0 && (
          <div className="flex justify-center mt-12 gap-2">
            <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">&lt;&lt; Prev</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md">1</button>
            <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">2</button>
            <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">Next &gt;&gt;</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Announcements;
