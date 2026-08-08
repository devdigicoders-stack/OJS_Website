import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUserGraduate, FaUniversity, FaCalendarAlt, FaFingerprint, 
  FaTags, FaFilePdf, FaQuoteRight, FaShareAlt, FaChevronLeft,
  FaBookOpen, FaGlobeAmericas, FaEye
} from 'react-icons/fa';

const JournalDetails = () => {
  const { id } = useParams();
  
  const [journal, setJournal] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedJournals, setRelatedJournals] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJournalDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/journals/public/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJournal(data);
        } else {
          setJournal(null);
        }
        
        // Fetch related journals (just fetching all and filtering)
        const allRes = await fetch('http://localhost:5000/api/journals/public');
        if (allRes.ok) {
          const allData = await allRes.json();
          setRelatedJournals(allData.filter(j => j._id !== id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching journal details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournalDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Loading journal details...</p>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-text mb-4">Journal Not Found</h2>
        <Link to="/journals" className="btn-primary px-6 py-2 rounded-lg">Return to Journals</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Header/Hero Section */}
      <section className="bg-white border-b border-border pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/journals" className="inline-flex items-center gap-2 text-sm font-bold text-light-text hover:text-primary transition-colors mb-8">
            <FaChevronLeft /> Back to Journals
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Cover Image */}
            <div className="lg:w-1/3 shrink-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative group"
              >
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">PUBLISHED</span>
                </div>
                <img src={journal.image ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${journal.image.replace(/\\/g, '/')}` : "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"} alt={journal.title} className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700 bg-gray-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
              </motion.div>
              
              {/* Action Buttons (Desktop Sidebar) */}
              <div className="hidden lg:flex flex-col gap-3 mt-6">
                {journal.mainFilePath && (
                <a href={`http://localhost:5000/${journal.mainFilePath}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-bold py-3.5 rounded-xl transition-colors border border-red-100 shadow-sm">
                  <FaFilePdf size={18} /> Download Full PDF
                </a>
                )}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-text font-bold py-3 rounded-xl transition-colors border border-gray-200">
                    <FaQuoteRight /> Cite
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-text font-bold py-3 rounded-xl transition-colors border border-gray-200">
                    <FaShareAlt /> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:w-2/3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                    {journal.department}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1 border border-gray-200">
                    <FaGlobeAmericas /> {journal.language || 'English'}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-extrabold text-text mb-6 font-poppins leading-tight">
                  {journal.title}
                </h1>

                {/* Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg text-primary shadow-sm"><FaUserGraduate /></div>
                    <div>
                      <p className="text-xs text-light-text font-bold uppercase tracking-wider mb-0.5">Author</p>
                      <p className="text-sm font-semibold text-text">{journal.primaryAuthorId?.name || journal.primaryAuthorName || 'Unknown Author'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg text-primary shadow-sm"><FaUniversity /></div>
                    <div>
                      <p className="text-xs text-light-text font-bold uppercase tracking-wider mb-0.5">Institution</p>
                      <p className="text-sm font-semibold text-text">{journal.primaryAuthorId?.institution || `Department of ${journal.department}`}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg text-accent shadow-sm"><FaCalendarAlt /></div>
                    <div>
                      <p className="text-xs text-light-text font-bold uppercase tracking-wider mb-0.5">Published</p>
                      <p className="text-sm font-semibold text-text">{journal.publishDate ? new Date(journal.publishDate).toLocaleDateString() : (journal.updatedAt ? new Date(journal.updatedAt).toLocaleDateString() : 'N/A')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg text-accent shadow-sm"><FaBookOpen /></div>
                    <div>
                      <p className="text-xs text-light-text font-bold uppercase tracking-wider mb-0.5">Volume & Issue</p>
                      <p className="text-sm font-semibold text-text">Vol {journal.volume !== '-' ? journal.volume : '1'}, Issue {journal.issue !== '-' ? journal.issue : '1'}</p>
                    </div>
                  </div>
                </div>

                {/* DOI Badge */}
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium mb-10 shadow-md">
                  <FaFingerprint className="text-accent" /> DOI: <span className="font-mono tracking-wide">{journal.doi || 'Pending'}</span>
                </div>

                {/* Abstract */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Abstract</h3>
                  <p className="text-light-text leading-relaxed text-lg">
                    {journal.abstract}
                  </p>
                </div>

                {/* Keywords */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-text mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                    <FaTags className="text-gray-400" /> Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {journal.keywords && journal.keywords.map((kw, idx) => (
                      <span key={idx} className="bg-primary/5 text-primary text-sm font-medium px-3 py-1.5 rounded-lg border border-primary/10">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* References */}
                {journal.references && journal.references.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-text mb-4 border-b border-gray-100 pb-2">References</h3>
                  <ul className="space-y-3 list-decimal list-inside text-light-text text-sm">
                    {journal.references.map((ref, idx) => (
                      <li key={idx} className="pl-2">{ref}</li>
                    ))}
                  </ul>
                </div>
                )}

                {/* Mobile Action Buttons */}
                <div className="lg:hidden flex flex-col gap-3 mt-10">
                  {journal.mainFilePath && (
                  <a href={`http://localhost:5000/${journal.mainFilePath}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-bold py-3.5 rounded-xl transition-colors border border-red-100 shadow-sm">
                    <FaFilePdf size={18} /> Download Full PDF
                  </a>
                  )}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-text font-bold py-3 rounded-xl transition-colors border border-gray-200">
                      <FaQuoteRight /> Cite
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-text font-bold py-3 rounded-xl transition-colors border border-gray-200">
                      <FaShareAlt /> Share
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Journals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-text mb-8">Related Journals</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedJournals.map(related => (
              <div key={related._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group flex flex-col h-full">
                <div className="h-40 overflow-hidden relative shrink-0 bg-gray-100 flex items-center justify-center">
                  <img src={related.image ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${related.image.replace(/\\/g, '/')}` : "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {related.department}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-bold text-text mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/journals/${related._id}`}>{related.title}</Link>
                  </h4>
                  <p className="text-xs text-light-text mb-4">{related.primaryAuthorName || 'Unknown'} • {new Date(related.publishDate).toLocaleDateString()}</p>
                  <div className="mt-auto border-t border-gray-100 pt-3">
                    <Link to={`/journals/${related._id}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:text-accent transition-colors">
                      <FaEye /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default JournalDetails;
