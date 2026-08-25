import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserCheck, FaUsers } from 'react-icons/fa';

const ReviewerBoard = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/about-page/public`);
        if (res.ok) {
          const data = await res.json();
          setTeam(data.reviewerTeam || []);
        }
      } catch (error) {
        console.error('Error fetching Reviewer Board:', error);
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
          <FaUserCheck className="text-white/20 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">Reviewer Board</h1>
          <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Reviewer Board</span>
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-12"
        >
          <div className="space-y-6 text-light-text leading-relaxed text-lg max-w-4xl mx-auto">
            <p>
              Our Reviewer Board consists of experienced researchers, academicians, and subject-matter experts who contribute to maintaining the academic quality and integrity of the journal.
            </p>
            <p>
              Reviewers play an important role in evaluating submitted manuscripts for originality, relevance, methodological quality, clarity, and overall scholarly contribution. Each manuscript is assigned to suitable reviewers based on their expertise and research interests.
            </p>
            <p>
              Our reviewers provide constructive and objective feedback to help authors improve the quality of their research. Their recommendations assist the Editorial Team in making informed decisions regarding manuscript revision and publication.
            </p>
            <p>
              We are committed to maintaining a fair, transparent, confidential, and ethical peer-review process. The contributions of our reviewers are highly valued in maintaining the quality and credibility of the journal.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading Reviewer Board...</div>
        ) : (
          <>
            {team.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No reviewer board members found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100"
                  >
                    <div className="h-64 overflow-hidden relative bg-gray-100 flex items-center justify-center text-gray-400">
                      {member.img ? (
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <FaUsers className="text-6xl opacity-30" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-text mb-1">{member.name}</h3>
                      <p className="text-primary font-semibold text-sm">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewerBoard;
