import React, { useState } from 'react';
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
  // Local Data for Sections
  const features = [
    { title: 'Peer Reviewed', icon: <FaUsers /> },
    { title: 'Open Access', icon: <FaGlobeAmericas /> },
    { title: 'DOI Support', icon: <FaFileAlt /> },
    { title: 'Fast Review Process', icon: <FaBolt /> },
    { title: 'International Standards', icon: <FaAward /> },
    { title: 'Easy Submission', icon: <FaBookOpen /> },
    { title: 'Secure Publication', icon: <FaLock /> },
    { title: 'Indexed Articles', icon: <FaCheckCircle /> }
  ];

  const areas = [
    { name: 'Computer Science', icon: <FaLaptopCode /> },
    { name: 'Engineering', icon: <FaCogs /> },
    { name: 'Medical Science', icon: <FaStethoscope /> },
    { name: 'Education', icon: <FaUniversity /> },
    { name: 'Commerce', icon: <FaChartLine /> },
    { name: 'Law', icon: <FaGavel /> },
    { name: 'Arts', icon: <FaPalette /> },
    { name: 'Agriculture', icon: <FaSeedling /> }
  ];

  const team = [
    { name: 'Dr. Sarah Jenkins', role: 'Editor-in-Chief', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Prof. Michael Chen', role: 'Managing Editor', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
    { name: 'Dr. Emily Carter', role: 'Associate Editor', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
    { name: 'Dr. James Wilson', role: 'Editorial Member', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  ];

  const processSteps = [
    "Submit Manuscript", "Editorial Screening", "Peer Review", 
    "Revision", "Acceptance", "Publication"
  ];

  const stats = [
    { label: 'Published Journals', value: '150+' },
    { label: 'Research Articles', value: '12,000+' },
    { label: 'Authors', value: '8,500+' },
    { label: 'Reviewers', value: '1,200+' },
    { label: 'Departments', value: '25+' },
    { label: 'Countries', value: '140+' },
  ];

  const faqs = [
    { q: "How to submit a paper?", a: "You can submit your manuscript by creating an account and navigating to the 'Submit' section. Follow the author guidelines carefully before submission." },
    { q: "Is publication free?", a: "We operate on an Open Access model. While reading is free, there is a nominal Article Processing Charge (APC) for accepted manuscripts to cover editorial costs." },
    { q: "How long does review take?", a: "Our average time to first decision is 14 days, with the full double-blind peer review process taking approximately 4-6 weeks." },
    { q: "Is DOI provided?", a: "Yes, every published article is assigned a unique Digital Object Identifier (DOI) via Crossref." }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Introduction</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-6">About The Journal</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8"></div>
            <p className="text-light-text text-lg leading-relaxed mb-6">
              The Journal of society, behaviour and institutions is a premier international publishing house established with the core purpose of bridging the gap between rigorous academic research and real-world application. 
            </p>
            <p className="text-light-text text-lg leading-relaxed">
              We publish cutting-edge, peer-reviewed research across multiple disciplines including Technology, Medicine, Arts, and Sciences, providing a robust platform for researchers worldwide to share their innovative discoveries.
            </p>
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
                  <li className="flex gap-2"><FaCheckCircle className="text-accent mt-1 shrink-0" /> Promote high-quality research</li>
                  <li className="flex gap-2"><FaCheckCircle className="text-accent mt-1 shrink-0" /> Provide a robust publication platform</li>
                  <li className="flex gap-2"><FaCheckCircle className="text-accent mt-1 shrink-0" /> Encourage global knowledge sharing</li>
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
                  <li className="flex gap-2"><FaCheckCircle className="text-primary mt-1 shrink-0" /> Connect the global research community</li>
                  <li className="flex gap-2"><FaCheckCircle className="text-primary mt-1 shrink-0" /> Maintain international quality standards</li>
                  <li className="flex gap-2"><FaCheckCircle className="text-primary mt-1 shrink-0" /> Support innovation & academic excellence</li>
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
                  <li className="flex gap-2"><FaCheckCircle className="text-blue-500 mt-1 shrink-0" /> Publish high-quality research</li>
                  <li className="flex gap-2"><FaCheckCircle className="text-blue-500 mt-1 shrink-0" /> Promote Open Access research</li>
                  <li className="flex gap-2"><FaCheckCircle className="text-blue-500 mt-1 shrink-0" /> Maintain strict publishing ethics</li>
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
            {features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 text-center group border border-gray-100 hover:shadow-lg">
                  <div className="text-3xl text-primary group-hover:text-white mb-4 transition-colors">{feature.icon}</div>
                  <h4 className="font-bold text-sm md:text-base text-text group-hover:text-white transition-colors">{feature.title}</h4>
                </div>
              </ScrollReveal>
            ))}
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
            {areas.map((area, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer group">
                  <div className="p-3 bg-accent/10 text-accent rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                    {area.icon}
                  </div>
                  <span className="font-semibold text-text text-sm">{area.name}</span>
                </div>
              </ScrollReveal>
            ))}
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
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="h-64 overflow-hidden relative">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/20 -translate-y-1/2 z-0"></div>
            
            {processSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <div className="flex flex-col items-center relative z-10 mb-8 md:mb-0 group">
                  <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center text-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div className="text-sm font-bold tracking-wide uppercase text-center w-24">
                    {step}
                  </div>
                  {/* Mobile connecting arrow */}
                  {i < processSteps.length - 1 && (
                    <div className="md:hidden text-white/40 my-2">↓</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Journal Statistics */}
      <section className="py-20 bg-gray-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
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
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    >
                      <span className="font-bold text-sm md:text-base text-text">{faq.q}</span>
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
                          <div className="pt-2">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
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
