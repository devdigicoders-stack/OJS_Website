import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaExternalLinkAlt, FaUniversity } from 'react-icons/fa';

const formatImageUrl = (url) => {
  if (!url) return '';
  let cleaned = url.trim();
  // Fix corrupted "https://.praxis.org.in" or "http://.praxis.org.in"
  cleaned = cleaned.replace(/^https?:\/\/\.praxis\.org\.in(\/api)?/, 'https://api.praxis.org.in');
  // If it has /api/uploads/, change to /uploads/
  cleaned = cleaned.replace('/api/uploads/', '/uploads/');
  // If it's pointing to localhost, replace with backend URL
  const backendBase = (import.meta.env.VITE_API_URL || 'https://api.praxis.org.in/api').replace(/\/api\/?$/, '');
  cleaned = cleaned.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, backendBase);
  // If it's a relative path like /uploads/...
  if (cleaned.startsWith('/uploads')) {
    cleaned = `${backendBase}${cleaned}`;
  }
  return cleaned;
};

const EditorialBoard = () => {
  const [team, setTeam] = useState([]);
  const [editorInChief, setEditorInChief] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/about-page/public`);
        if (res.ok) {
          const data = await res.json();
          setTeam(data.team || []);
          setEditorInChief(data.editorInChief || null);
        }
      } catch (error) {
        console.error('Error fetching Editorial Board:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20">
      <section className="bg-primary pt-16 pb-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FaUsers className="text-white/20 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">Editorial Board</h1>
          <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Editorial Board</span>
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading Editorial Board...</div>
        ) : (
          <>
            {editorInChief && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Editor-in-Chief</h2>
                <div className="text-light-text leading-relaxed text-lg">
                  <strong className="text-primary text-xl block mb-1">{editorInChief.name}</strong>
                  <div className="text-gray-700 whitespace-pre-line mb-1">{editorInChief.affiliation}</div>
                  {editorInChief.email && <div className="text-gray-600 text-sm">Email: <a href={`mailto:${editorInChief.email}`} className="text-primary hover:underline">{editorInChief.email}</a></div>}
                  {editorInChief.universityUrl && (
                    <div className="mt-3">
                      <a 
                        href={editorInChief.universityUrl.startsWith('http') ? editorInChief.universityUrl : `https://${editorInChief.universityUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-lg transition-all duration-200 border border-primary/20"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>University Profile / Link</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {team.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No editorial board members found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, i) => {
                  const finalImgSrc = formatImageUrl(member.img);
                  const profileUrl = member.universityUrl 
                    ? (member.universityUrl.startsWith('http') ? member.universityUrl : `https://${member.universityUrl}`)
                    : null;

                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col justify-between h-full"
                    >
                      <div className="flex flex-col flex-grow">
                        {profileUrl ? (
                          <a 
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-64 overflow-hidden relative bg-gray-100 flex items-center justify-center text-gray-400 group/img shrink-0"
                            title={`Visit ${member.name}'s University Profile`}
                          >
                            {finalImgSrc ? (
                              <img 
                                src={finalImgSrc} 
                                alt={member.name} 
                                className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500" 
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  if (e.currentTarget.nextElementSibling) {
                                    e.currentTarget.nextElementSibling.style.display = 'block';
                                  }
                                }}
                              />
                            ) : (
                              <FaUsers className="text-6xl opacity-30" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-4">
                              <span className="text-white text-xs font-semibold bg-black/70 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-md">
                                <FaUniversity className="text-xs" />
                                Visit University Profile
                                <FaExternalLinkAlt className="text-[10px]" />
                              </span>
                            </div>
                          </a>
                        ) : (
                          <div className="h-64 overflow-hidden relative bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                            {finalImgSrc ? (
                              <img 
                                src={finalImgSrc} 
                                alt={member.name} 
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  if (e.currentTarget.nextElementSibling) {
                                    e.currentTarget.nextElementSibling.style.display = 'block';
                                  }
                                }}
                              />
                            ) : (
                              <FaUsers className="text-6xl opacity-30" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        )}
                        <div className="p-6 text-center flex-grow flex flex-col justify-start">
                          {profileUrl ? (
                            <a 
                              href={profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block group/link"
                            >
                              <h3 className="text-xl font-bold text-text mb-2 group-hover/link:text-primary transition-colors flex items-center justify-center gap-1.5">
                                {member.name}
                              </h3>
                            </a>
                          ) : (
                            <h3 className="text-xl font-bold text-text mb-2">{member.name}</h3>
                          )}
                          <p className="text-primary font-semibold text-sm leading-relaxed whitespace-pre-line">{member.role}</p>
                        </div>
                      </div>

                      {profileUrl && (
                        <div className="px-6 pb-6 pt-0">
                          <a
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 border border-primary/20 shadow-xs group/btn"
                          >
                            <FaUniversity className="text-sm text-primary group-hover/btn:text-white transition-colors" />
                            <span>University Profile</span>
                            <FaExternalLinkAlt className="text-[10px] ml-1 opacity-70 group-hover/btn:opacity-100" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditorialBoard;

