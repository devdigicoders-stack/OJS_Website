import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaGlobeAmericas, FaAward, FaUsers, FaUniversity, 
  FaCheckCircle, FaLock, FaBolt, FaFileAlt, FaBalanceScale, 
  FaLaptopCode, FaStethoscope, FaGavel, FaPalette, FaSeedling,
  FaCogs, FaChartLine, FaChevronDown, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt
} from 'react-icons/fa';

// Shared animation wrapper
const ScrollReveal = ({ children, delay = 0, direction = "up", width = "100%" }) => {
  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

  return (
    <div style={{ width }}>
      <motion.div
        initial={{ opacity: 0, y: yOffset, x: xOffset }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 80 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const About = () => {
  const [aboutData, setAboutData] = useState({
    introduction: '<p>The Journal of society, behaviour and institutions is a premier international publishing house established with the core purpose of bridging the gap between rigorous academic research and real-world application.</p><p>We publish cutting-edge, peer-reviewed research across multiple disciplines including Technology, Medicine, Arts, and Sciences, providing a robust platform for researchers worldwide to share their innovative discoveries.</p>',
    mission: ['Promote high-quality research', 'Provide a robust publication platform', 'Encourage global knowledge sharing'],
    vision: ['Connect the global research community', 'Maintain international quality standards', 'Support innovation & academic excellence'],
    objectives: ['Publish high-quality research', 'Promote Open Access research', 'Maintain strict publishing ethics'],
    features: [
      { title: 'Peer Reviewed', icon: 'FaUsers' },
      { title: 'Open Access', icon: 'FaGlobeAmericas' },
      { title: 'DOI Support', icon: 'FaFileAlt' },
      { title: 'Fast Review Process', icon: 'FaBolt' },
      { title: 'International Standards', icon: 'FaAward' },
      { title: 'Easy Submission', icon: 'FaBookOpen' },
      { title: 'Secure Publication', icon: 'FaLock' },
      { title: 'Indexed Articles', icon: 'FaCheckCircle' }
    ],
    researchAreas: [
      { name: 'Computer Science', icon: 'FaLaptopCode' },
      { name: 'Engineering', icon: 'FaCogs' },
      { name: 'Medical Science', icon: 'FaStethoscope' },
      { name: 'Education', icon: 'FaUniversity' },
      { name: 'Commerce', icon: 'FaChartLine' },
      { name: 'Law', icon: 'FaGavel' },
      { name: 'Arts', icon: 'FaPalette' },
      { name: 'Agriculture', icon: 'FaSeedling' }
    ],
    team: [
      { name: 'Dr. Sarah Jenkins', role: 'Editor-in-Chief', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
      { name: 'Prof. Michael Chen', role: 'Managing Editor', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
      { name: 'Dr. Emily Carter', role: 'Associate Editor', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
      { name: 'Dr. James Wilson', role: 'Editorial Member', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' }
    ],
    processSteps: ["Submit Manuscript", "Editorial Screening", "Peer Review", "Revision", "Acceptance", "Publication"],
    stats: [
      { label: 'Published Journals', value: '150+' },
      { label: 'Research Articles', value: '12,000+' },
      { label: 'Authors', value: '8,500+' },
      { label: 'Reviewers', value: '1,200+' },
      { label: 'Departments', value: '25+' },
      { label: 'Countries', value: '140+' }
    ]
  });

  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/faqs/public`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/about-page/public`);
        if (res.ok) {
          const data = await res.json();
          // Merge with default state to ensure we always have arrays even if db is empty
          setAboutData(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error('Error fetching About Data:', error);
      }
    };
    fetchFaqs();
    fetchAboutData();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=2500&auto=format&fit=crop" 
            alt="Global Tech Data" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85 mix-blend-multiply backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 font-poppins drop-shadow-xl">About Us</h1>
            <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm md:text-base bg-white/10 w-fit mx-auto px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">About Us</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. About the Journal */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block text-left">Introduction</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-6 text-left">About The Journal</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-10 shadow-sm"></div>
            <div 
              className="text-slate-700 text-lg md:text-xl leading-relaxed md:leading-loose text-left w-full break-words whitespace-normal
              [&>p]:!text-left [&>p]:!whitespace-normal [&>p]:mb-6 [&>p:last-child]:mb-0 
              [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-text [&>h1]:mb-4 [&>h1]:mt-8
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-text [&>h2]:mb-4 [&>h2]:mt-6
              [&>ul]:list-none [&>ul]:mb-6 [&>ul>li]:mb-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
              [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>blockquote]:my-6
              about-intro-text"
              dangerouslySetInnerHTML={{ __html: aboutData.introduction }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 3, 4, 5. Mission, Vision, Objectives */}
      <section className="py-20 bg-gray-50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full group">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <FaGlobeAmericas size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">Our Mission</h3>
                <ul className="space-y-3 text-light-text text-sm">
                  {aboutData.mission.map((item, i) => item ? (
                    <li key={i} className="flex gap-2"><FaCheckCircle className="text-accent mt-1 shrink-0" /> {item}</li>
                  ) : null)}
                </ul>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full group">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <FaUniversity size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">Our Vision</h3>
                <ul className="space-y-3 text-light-text text-sm">
                  {aboutData.vision.map((item, i) => item ? (
                    <li key={i} className="flex gap-2"><FaCheckCircle className="text-primary mt-1 shrink-0" /> {item}</li>
                  ) : null)}
                </ul>
              </div>
            </ScrollReveal>

            {/* Objectives */}
            <ScrollReveal delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full group">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <FaAward size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">Our Objectives</h3>
                <ul className="space-y-3 text-light-text text-sm">
                  {aboutData.objectives.map((item, i) => item ? (
                    <li key={i} className="flex gap-2"><FaCheckCircle className="text-blue-500 mt-1 shrink-0" /> {item}</li>
                  ) : null)}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Journal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">Why Choose Our Journal</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.features.map((feature, i) => {
              // Map icon string to component if needed, else fallback
              const IconComp = <FaCheckCircle />; 
              return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 text-center group border border-gray-100 hover:shadow-lg">
                  <div className="text-3xl text-primary group-hover:text-white mb-4 transition-colors">{IconComp}</div>
                  <h4 className="font-bold text-sm md:text-base text-text group-hover:text-white transition-colors">{feature.title}</h4>
                </div>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Research Areas */}
      <section className="py-20 bg-gray-50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Disciplines</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">Research Areas</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {aboutData.researchAreas.map((area, i) => {
              const IconComp = <FaCheckCircle />;
              return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer group">
                  <div className="p-3 bg-accent/10 text-accent rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                    {IconComp}
                  </div>
                  <span className="font-semibold text-text text-sm">{area.name}</span>
                </div>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Editorial Board */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">Editorial Board</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="h-64 overflow-hidden relative">
                    <img src={member.img || 'https://via.placeholder.com/400'} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 text-center bg-white border border-t-0 border-gray-100 rounded-b-2xl">
                    <h3 className="text-xl font-bold text-text mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold text-sm">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Publication Process */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins mb-4">Publication Process</h2>
            <p className="text-white/80 max-w-2xl mx-auto">A transparent, rigorous, and efficient timeline from submission to final publication.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {aboutData.processSteps.map((step, i) => step ? (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all group h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-white text-primary flex items-center justify-center text-xl font-bold shadow-lg mb-5 group-hover:scale-110 transition-transform shrink-0">
                    {i + 1}
                  </div>
                  <div className="text-sm font-medium leading-relaxed text-white/90 whitespace-pre-line">
                    {step}
                  </div>
                </div>
              </ScrollReveal>
            ) : null)}
          </div>
        </div>
      </section>

      {/* 10. Journal Statistics */}
      <section className="py-20 bg-gray-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {aboutData.stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="text-2xl md:text-3xl font-extrabold text-primary mb-2 font-poppins">{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-bold text-light-text uppercase tracking-widest">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11 & 12. Publication Ethics & Indexing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Publication Ethics */}
            <ScrollReveal direction="right">
              <div>
                <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Guidelines</span>
                <h2 className="text-3xl font-extrabold font-poppins text-text mb-6">Publication Ethics</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <FaBalanceScale className="text-primary text-xl mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-text mb-1">Original Research</h4>
                      <p className="text-sm text-light-text">Authors must ensure their submitted work is entirely original and not under consideration elsewhere.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <FaCheckCircle className="text-primary text-xl mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-text mb-1">Zero Plagiarism</h4>
                      <p className="text-sm text-light-text">Strict anti-plagiarism tools are utilized. Similarity index must be below 10%.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <FaLock className="text-primary text-xl mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-text mb-1">Confidential Review</h4>
                      <p className="text-sm text-light-text">The double-blind peer review process guarantees complete confidentiality for both authors and reviewers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Indexing & DOI */}
            <ScrollReveal direction="left">
              <div>
                <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Global Reach</span>
                <h2 className="text-3xl font-extrabold font-poppins text-text mb-6">Indexing & DOI</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm text-primary"><FaFileAlt size={24} /></div>
                    <span className="font-bold text-sm">DOI Available</span>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm text-accent"><FaBookOpen size={24} /></div>
                    <span className="font-bold text-sm">Valid ISSN</span>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm text-blue-600"><FaCheckCircle size={24} /></div>
                    <span className="font-bold text-sm">Indexed Globally</span>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm text-green-600"><FaGlobeAmericas size={24} /></div>
                    <span className="font-bold text-sm">Open Access</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 13 & 14. Contact & FAQ */}
      <section className="py-20 bg-gray-50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <ScrollReveal>
              <h2 className="text-3xl font-extrabold font-poppins text-text mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary"><FaMapMarkerAlt size={20} /></div>
                  <div>
                    <h4 className="font-bold text-sm text-text">Office Address</h4>
                    <p className="text-xs text-light-text">123 Academic Way, Research Park, NY 10001</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-accent/10 p-3 rounded-lg text-accent"><FaEnvelope size={20} /></div>
                  <div>
                    <h4 className="font-bold text-sm text-text">Email Address</h4>
                    <p className="text-xs text-light-text">support@ojs-system.org</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><FaPhoneAlt size={20} /></div>
                  <div>
                    <h4 className="font-bold text-sm text-text">Phone / Office Hours</h4>
                    <p className="text-xs text-light-text">+1 (555) 123-4567 • Mon-Fri, 9am - 5pm EST</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl font-extrabold font-poppins text-text mb-8">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.length > 0 ? (
                  faqs.map((faq, i) => (
                    <div key={faq._id} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-bold text-sm md:text-base text-text">{faq.question}</span>
                        <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                          <FaChevronDown className="text-light-text" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-4 text-sm text-light-text bg-gray-50 border-t border-gray-50"
                          >
                            <div className="pt-2">{faq.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <p className="text-light-text">No FAQs available at the moment.</p>
                )}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 15. Call To Action */}
      <section className="py-24 bg-white text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold font-poppins text-text mb-6">Ready to publish your research?</h2>
            <p className="text-lg text-light-text mb-10">Join our global network of researchers and gain international visibility for your academic work.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/journals" className="btn-primary py-4 px-8 text-lg font-bold rounded-xl shadow-lg hover:shadow-primary/40 transition-all">
                Explore Journals
              </Link>
              <Link to="/contact" className="btn-outline py-4 px-8 text-lg font-bold rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default About;
