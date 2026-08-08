import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaUserGraduate, FaUniversity, FaCalendarAlt, 
  FaTags, FaFingerprint, FaFilePdf, FaEye, FaShareAlt, FaSearch, 
  FaFilter, FaThLarge, FaList
} from 'react-icons/fa';
import { departments } from '../../data/dummyData';

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

const Journals = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  
  const [journalsList, setJournalsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/journals/public');
        if (res.ok) {
          const data = await res.json();
          setJournalsList(data);
        }
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  // Simple filtering
  const filteredJournals = journalsList.filter(journal => 
    (activeDept === 'All' || journal.department === activeDept) &&
    (journal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     (journal.keywords && journal.keywords.some(k => typeof k === 'string' && k.toLowerCase().includes(searchTerm.toLowerCase()))))
  );

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" 
            alt="Library" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins drop-shadow-lg">Published Journals</h1>
            <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm bg-white/10 w-fit mx-auto px-5 py-1.5 rounded-full backdrop-blur-md border border-white/20 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">Published Journals</span>
            </div>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">Browse our collection of peer-reviewed research journals across various disciplines.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <div className="lg:w-1/4 shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
              <div className="flex items-center gap-2 mb-6 text-primary font-bold text-lg border-b border-gray-100 pb-4">
                <FaFilter /> Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-text mb-3 text-sm uppercase tracking-wider">Department</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveDept('All')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeDept === 'All' ? 'bg-primary/10 text-primary font-bold' : 'text-light-text hover:bg-gray-50'}`}
                    >
                      All Departments
                    </button>
                    {departments.map(dept => (
                      <button 
                        key={dept.id}
                        onClick={() => setActiveDept(dept.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeDept === dept.name ? 'bg-primary/10 text-primary font-bold' : 'text-light-text hover:bg-gray-50'}`}
                      >
                        {dept.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-text mb-3 text-sm uppercase tracking-wider">Publication Year</h4>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-text">
                    <option>All Years</option>
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="font-bold text-text mb-3 text-sm uppercase tracking-wider">Sort By</h4>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-text">
                    <option>Latest First</option>
                    <option>Oldest First</option>
                    <option>A-Z</option>
                    <option>Most Downloaded</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:w-3/4">
            
            {/* Search and Top Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Search by Title or Keywords..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className="text-sm font-medium text-light-text bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <span className="text-primary font-bold">{filteredJournals.length}</span> Journals Found
                </span>
                
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-text'}`}
                  >
                    <FaThLarge size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-text'}`}
                  >
                    <FaList size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid/List View */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {filteredJournals.map((journal, i) => (
                  <ScrollReveal key={journal._id || i} delay={i * 0.05}>
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'} h-full relative`}
                    >
                      {/* Badges */}
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">PUBLISHED</span>
                        {i === 0 && <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">NEW</span>}
                      </div>

                      {/* Cover Image */}
                      <div className={`${viewMode === 'list' ? 'sm:w-1/3 sm:h-auto' : 'w-full'} h-48 overflow-hidden relative shrink-0 bg-gray-100 flex items-center justify-center`}>
                        <img src={journal.image ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${journal.image.replace(/\\/g, '/')}` : "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"} alt={journal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                        
                        {/* DOI Badge on Image bottom */}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white/90 text-xs px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10">
                          <FaFingerprint className="text-accent" /> {journal.doi || 'DOI Pending'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-5 flex flex-col flex-grow ${viewMode === 'list' ? 'sm:w-2/3' : 'w-full'}`}>
                        {/* Department Chip */}
                        <div className="mb-3">
                          <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {journal.department}
                          </span>
                        </div>
                        
                        <h3 className="font-bold font-poppins text-lg text-text mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          <Link to={`/journals/${journal._id}`}>{journal.title}</Link>
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-light-text">
                            <FaUserGraduate className="text-primary/70 shrink-0" /> 
                            <span className="truncate font-medium">{journal.primaryAuthorName || 'Unknown Author'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-light-text">
                            <FaCalendarAlt className="text-primary/70 shrink-0" /> 
                            <span>{journal.publishDate ? new Date(journal.publishDate).toLocaleDateString() : (journal.updatedAt ? new Date(journal.updatedAt).toLocaleDateString() : 'N/A')}</span>
                            <span className="mx-1">•</span>
                            <span className="font-semibold text-text">Vol {journal.volume !== '-' ? journal.volume : '1'}, Issue {journal.issue !== '-' ? journal.issue : '1'}</span>
                          </div>
                        </div>

                        <p className={`text-sm text-light-text leading-relaxed mb-4 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                          {journal.abstract}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          <FaTags className="text-accent/70 mt-1 mr-1 shrink-0 text-xs" />
                          {journal.keywords && journal.keywords.map((kw, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded border border-gray-200">
                              {kw}
                            </span>
                          ))}
                        </div>

                        {/* Actions (pushed to bottom) */}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                          <Link to={`/journals/${journal._id}`} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-primary hover:text-white text-primary text-sm font-bold py-2 rounded-lg transition-colors">
                            <FaEye /> Details
                          </Link>
                          {journal.mainFilePath && (
                          <a href={`http://localhost:5000/${journal.mainFilePath}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-sm font-bold py-2 rounded-lg transition-colors border border-red-100 hover:border-red-600">
                            <FaFilePdf /> PDF
                          </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </AnimatePresence>
            </div>
            )}

            {/* Pagination */}
            {filteredJournals.length > 0 && (
              <div className="flex justify-center mt-12 gap-2">
                <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">&lt;&lt; Prev</button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md">1</button>
                <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">2</button>
                <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">3</button>
                <span className="px-2 py-2 text-gray-400">...</span>
                <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-text transition-colors">Next &gt;&gt;</button>
              </div>
            )}
            
            {filteredJournals.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text mb-2">No Journals Found</h3>
                <p className="text-light-text">Try adjusting your search or filters.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Journals;
