import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useState, useEffect } from 'react';
import { features, steps } from '../../data/dummyData';
import { FaLaptopCode, FaCogs, FaStethoscope, FaChartLine, FaBookReader, FaBalanceScale, FaGavel, FaPalette, FaDownload, FaEye, FaArrowRight, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaUserCheck, FaLockOpen, FaLink, FaShippingFast, FaGlobe, FaShieldAlt, FaBook, FaFileAlt, FaChalkboardTeacher, FaUniversity, FaUsers, FaNewspaper, FaPenAlt, FaAward, FaStar, FaCheckCircle, FaFlask, FaAtom } from 'react-icons/fa';

const iconMap = {
  // Domain icons (colored white for dark bg)
  FaLaptopCode: <FaLaptopCode size={28} className="text-white mb-2 drop-shadow-md" />,
  FaCogs: <FaCogs size={28} className="text-white mb-2 drop-shadow-md" />,
  FaChartLine: <FaChartLine size={28} className="text-white mb-2 drop-shadow-md" />,
  FaStethoscope: <FaStethoscope size={28} className="text-white mb-2 drop-shadow-md" />,
  FaBookReader: <FaBookReader size={28} className="text-white mb-2 drop-shadow-md" />,
  FaBalanceScale: <FaBalanceScale size={28} className="text-white mb-2 drop-shadow-md" />,
  FaGavel: <FaGavel size={28} className="text-white mb-2 drop-shadow-md" />,
  FaPalette: <FaPalette size={28} className="text-white mb-2 drop-shadow-md" />,
  FaFlask: <FaFlask size={28} className="text-white mb-2 drop-shadow-md" />,
  FaAtom: <FaAtom size={28} className="text-white mb-2 drop-shadow-md" />,
  FaUniversity: <FaUniversity size={28} className="text-white mb-2 drop-shadow-md" />,
  // Stat/feature icons (colored primary for light bg)
  FaUserCheck: <FaUserCheck size={24} className="text-primary" />,
  FaLockOpen: <FaLockOpen size={24} className="text-primary" />,
  FaLink: <FaLink size={24} className="text-primary" />,
  FaShippingFast: <FaShippingFast size={24} className="text-primary" />,
  FaGlobe: <FaGlobe size={24} className="text-primary" />,
  FaShieldAlt: <FaShieldAlt size={24} className="text-primary" />,
  FaBook: <FaBook size={24} className="text-primary" />,
  FaFileAlt: <FaFileAlt size={24} className="text-primary" />,
  FaChalkboardTeacher: <FaChalkboardTeacher size={24} className="text-primary" />,
  FaUsers: <FaUsers size={24} className="text-primary" />,
  FaNewspaper: <FaNewspaper size={24} className="text-primary" />,
  FaPenAlt: <FaPenAlt size={24} className="text-primary" />,
  FaAward: <FaAward size={24} className="text-primary" />,
  FaStar: <FaStar size={24} className="text-primary" />,
  FaCheckCircle: <FaCheckCircle size={24} className="text-primary" />,
  FaChartLine2: <FaChartLine size={24} className="text-primary" />,
};

// Variants for Staggered Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12 }
  }
};

const floatingAnimation = {
  y: ["-10px", "10px", "-10px"],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  boxShadow: ["0px 0px 0px rgba(15, 118, 110, 0)", "0px 0px 20px rgba(15, 118, 110, 0.4)", "0px 0px 0px rgba(15, 118, 110, 0)"],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Reusable scroll animation wrapper
const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 80 }}
    >
      {children}
    </motion.div>
  );
};

// Review Submission Form Component
const ReviewForm = () => {
  const [form, setForm] = useState({ author: '', role: '', email: '', text: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ author: '', role: '', email: '', text: '', rating: 5 });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-12 max-w-2xl mx-auto text-center bg-white p-8 rounded-2xl border border-green-100 shadow-sm">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-text mb-2">Thank you for your review!</h3>
        <p className="text-light-text text-sm">Your review has been submitted and will appear here after approval.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-primary text-sm font-semibold hover:underline">
          Submit another review
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold font-poppins text-text">Share Your Experience</h3>
        <p className="text-light-text text-sm mt-1">Have you published with us? Let the community know!</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text" name="author" value={form.author} onChange={handleChange} required
            placeholder="Your Name *"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <input
            type="text" name="role" value={form.role} onChange={handleChange}
            placeholder="Your Role (e.g. Researcher)"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <input
          type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="Your Email (optional)"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
        />
        <textarea
          name="text" value={form.text} onChange={handleChange} required rows={4}
          placeholder="Write your review... *"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4 resize-none"
        />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-light-text">Rating:</span>
            {[1,2,3,4,5].map(star => (
              <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}
                className={`text-2xl transition-colors ${star <= form.rating ? 'text-yellow-400' : 'text-gray-200'}`}
              >★</button>
            ))}
          </div>
          <button type="submit" disabled={submitting}
            className="btn-primary py-2.5 px-8 rounded-lg text-sm font-semibold disabled:opacity-50 inline-flex items-center gap-2"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [stats, setStats] = useState([]);
  const [domains, setDomains] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [journals, setJournals] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [homeRes, journalsRes, annRes, reviewsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/home-page/public`),
          fetch(`${import.meta.env.VITE_API_URL}/journals/public`),
          fetch(`${import.meta.env.VITE_API_URL}/announcements/public`),
          fetch(`${import.meta.env.VITE_API_URL}/reviews/approved`)
        ]);

        if (homeRes.ok) {
          const homeData = await homeRes.json();
          setStats(homeData.stats || []);
          setDomains(homeData.domains || []);
          setHeroData(homeData.hero || null);
        }

        if (journalsRes.ok) {
          const journalsData = await journalsRes.json();
          // Filter out unpublished journals if needed, and take top 3
          const publishedJournals = journalsData.filter(j => j.status === 'Published').slice(0, 3);
          setJournals(publishedJournals);
        }

        if (annRes.ok) {
          const annData = await annRes.json();
          const activeAnns = annData.filter(a => a.status === 'Published').slice(0, 5);
          setAnnouncements(activeAnns);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const heroConfig = heroData || {
    title: 'Praxis Journal of Society, Behaviour and Institutional Studies',
    subtitle: 'A premium academic publishing platform dedicated to sharing high-impact knowledge globally through rigorous peer review.',
    badge: 'Empowering Global Scientific Research',
    primaryButtonText: 'Submit Manuscript',
    primaryButtonLink: '/journals',
    secondaryButtonText: 'Explore Publications',
    secondaryButtonLink: '/journals',
    backgroundType: 'video',
    backgroundUrl: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4',
    overlayOpacity: '70'
  };

  return (
    <div className="w-full">
      {/* 3. Hero Banner with Parallax and 4K Video */}
      <section ref={heroRef} className="relative text-white h-[90vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background Media */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          {heroConfig.backgroundType === 'image' ? (
            <img 
              src={heroConfig.backgroundUrl} 
              alt="Hero Background" 
              className="w-full h-full object-cover scale-105"
            />
          ) : (
            <video
              key={heroConfig.backgroundUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source src={heroConfig.backgroundUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: `rgba(15, 118, 110, ${parseInt(heroConfig.overlayOpacity) / 100})` }}></div>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-100"></div>
        </motion.div>

        <motion.div
          style={{ y: textY, opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center"
          >
            {heroConfig.badge && (
              <div className="inline-block py-1.5 px-4 rounded-full bg-black/40 border border-white/30 backdrop-blur-md text-[10px] md:text-xs font-bold mb-4 md:mb-6 text-white uppercase tracking-widest shadow-lg">
                {heroConfig.badge}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-poppins leading-tight mb-4 text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              {heroConfig.title}
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-white mb-8 max-w-2xl drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)] font-medium leading-relaxed">
              {heroConfig.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm mx-auto">
              {heroConfig.primaryButtonText && (
                <Link to={heroConfig.primaryButtonLink} className="relative group overflow-hidden bg-accent text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg hover:shadow-accent/50 text-sm">
                  <span className="relative z-10">{heroConfig.primaryButtonText}</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              )}
              {heroConfig.secondaryButtonText && (
                <Link to={heroConfig.secondaryButtonLink} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-lg text-sm">
                  {heroConfig.secondaryButtonText}
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Compact Journal Statistics (Staggered Animation & Separate Section) */}
      <section className="py-20 bg-gray-50 relative z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-extrabold tracking-widest uppercase text-xs mb-2 block">Our Impact</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">Platform Statistics</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >  {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white p-4 text-center group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex justify-center mb-2 relative z-10">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                      {iconMap[stat.icon] || <FaStar size={24} className="text-primary" />}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-primary mb-1 font-poppins relative z-10">{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-bold text-light-text uppercase tracking-widest relative z-10">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. About the Journal (Compact) */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-5/12 relative">
              <ScrollReveal direction="right">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-2xl transform -translate-x-3 translate-y-3 -z-10 opacity-30 blur-sm"></div>
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" alt="About Journal" className="rounded-2xl shadow-xl w-full h-[350px] object-cover border-4 border-white" />
              </ScrollReveal>
            </div>

            <div className="w-full md:w-7/12">
              <ScrollReveal direction="left">
                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">About The System</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4 leading-tight">Promoting Academic <span className="text-primary">Excellence</span></h2>
                <p className="text-light-text mb-6 text-sm leading-relaxed">
                  The Praxis Journal of Society, Behaviour and Institutional Studies is a premier international publishing house for peer-reviewed academic journals, bridging the gap between research and real-world application.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-5 rounded-xl border border-border mb-6 shadow-sm border-l-4 border-l-primary cursor-pointer">
                  <h3 className="font-bold text-lg mb-1 text-primary">Our Mission & Vision</h3>
                  <p className="text-light-text text-sm">Disseminating high-quality research findings to the global community, fostering innovation without barriers.</p>
                </motion.div>
                <Link to="/about" className="btn-primary inline-flex items-center gap-2 text-sm py-2.5 px-6 rounded-lg shadow-md hover:shadow-primary/40 transition-all">
                  Discover More <FaArrowRight size={12} />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Compact Latest Published Journals */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Publications</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">Latest Journals</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.length > 0 ? journals.map((journal, index) => (
              <ScrollReveal key={journal._id || index} delay={index * 0.05} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:shadow-primary/10 border border-gray-100 flex flex-col group h-full transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden rounded-t-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10"></div>
                    <img src={journal.coverImage ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${journal.coverImage}` : "https://via.placeholder.com/400x300"} alt={journal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-20">
                      {journal.researchArea || 'Journal'}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between text-white text-xs font-medium">
                      <span>{new Date(journal.createdAt).toLocaleDateString()}</span>
                      <span>Vol {journal.volume || 1}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold font-poppins text-text mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">{journal.title}</h3>
                    <p className="text-xs text-accent font-semibold mb-3 uppercase flex items-center gap-1">
                      <FaChalkboardTeacher size={12} /> {journal.authors?.map(a => a.name).join(', ') || 'Unknown Author'}
                    </p>
                    <p className="text-light-text text-xs mb-5 line-clamp-3 flex-grow">{journal.abstract}</p>
                    <div className="flex gap-2 mt-auto pt-4 border-t border-gray-50">
                      <Link to={`/journals/${journal._id}`} className="flex-1 text-center text-xs py-2 bg-gray-50 hover:bg-primary hover:text-white rounded-lg text-text font-medium transition-colors flex items-center justify-center gap-1">
                        <FaEye /> View
                      </Link>
                      <button className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-white font-medium text-center text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 group/btn">
                        <FaDownload className="group-hover/btn:-translate-y-0.5 transition-transform" /> PDF
                      </button>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            )) : <div className="col-span-3 text-center text-gray-500 py-10">No recent publications found.</div>}
          </div>
          <ScrollReveal direction="up">
            <div className="text-center mt-12">
              <Link to="/journals" className="btn-primary inline-flex items-center gap-2 text-sm py-3 px-8 rounded-lg shadow-md hover:shadow-primary/30">
                Browse Full Archive <FaArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. Featured Departments (Compact & Animated) */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Disciplines</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">Research Domains</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {domains.map((dept, index) => (
              <ScrollReveal key={index} delay={index * 0.05} direction="up">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden bg-white border border-gray-100 p-6 rounded-2xl text-center group cursor-pointer shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="p-4 bg-primary rounded-xl text-white group-hover:-translate-y-2 transition-transform duration-300 shadow-md">
                      {iconMap[dept.icon] || <FaBook size={28} className="text-white mb-2" />}
                    </div>
                    <h3 className="text-sm font-bold font-poppins text-text mt-4 group-hover:text-primary transition-colors">{dept.name}</h3>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Submission Guidelines & 10. Why Choose Us (Compact) */}
      <section className="py-20 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Why Choose Us */}
            <div>
              <ScrollReveal direction="right">
                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Features</span>
                <h2 className="text-3xl font-extrabold font-poppins text-text mb-8">Why Publish With Us?</h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <ScrollReveal key={feature.id} delay={index * 0.1} direction="right">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-background p-4 rounded-xl border border-gray-100 hover:border-accent hover:shadow-md transition-all duration-300 flex items-start gap-3"
                    >
                      <div className="mt-1 flex-shrink-0">
                        {iconMap[feature.icon]}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold font-poppins text-text mb-1">{feature.title}</h3>
                        <p className="text-xs text-light-text leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Submission Guidelines Steps */}
            <div>
              <ScrollReveal direction="left">
                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Workflow</span>
                <h2 className="text-3xl font-extrabold font-poppins text-text mb-8">Editorial Process</h2>
              </ScrollReveal>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <ScrollReveal key={step.id} delay={index * 0.1} direction="left">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold font-poppins text-text">{step.title}</h3>
                        <p className="text-xs text-light-text">{step.description}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal direction="left">
                <div className="mt-8">
                  <Link to="/author-submission-guidelines" className="btn-primary py-3 px-8 rounded-lg shadow-md hover:shadow-primary/40 inline-flex items-center gap-2 text-sm w-full sm:w-auto justify-center">
                    Start Submission <FaArrowRight size={12} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Latest Announcements (Compact Slider) */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <span className="text-accent-300 text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Updates & News</span>
                <h2 className="text-3xl font-extrabold font-poppins mb-2">Announcements</h2>
                <div className="h-1 w-16 bg-accent rounded-full"></div>
              </div>
              <Link to="/announcements" className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white py-2 px-5 rounded-lg transition-colors inline-flex items-center gap-2">
                View All <FaArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {announcements.map((item, index) => (
                <SwiperSlide key={item._id || index}>
                  <Link to={`/announcements/${item._id}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 h-full flex flex-col cursor-pointer"
                    >
                      <div className="text-xs text-accent font-bold mb-3">
                        {item.publishDate ? new Date(item.publishDate).toLocaleDateString() : 'New'}
                      </div>
                      <h3 className="text-lg font-bold font-poppins mb-3 leading-snug text-white">{item.title}</h3>
                      <p className="text-gray-300 text-xs mb-6 leading-relaxed flex-grow">{item.category}</p>
                      <span className="text-white text-xs font-bold flex items-center gap-1 group">
                        Read Full <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </ScrollReveal>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-text mb-4">What Authors Say</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          {reviews.length > 0 && (
            <ScrollReveal direction="up">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                autoplay={{ delay: 6000 }}
                pagination={{ clickable: true }}
                className="pb-12"
              >
                {reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full relative">
                      <div className="absolute top-6 right-8 text-6xl text-gray-100 font-serif leading-none">"</div>
                      <div className="flex gap-1 mb-4 text-yellow-400 text-sm relative z-10">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-light-text text-sm leading-relaxed mb-6 italic flex-grow relative z-10">
                        "{review.text}"
                      </p>
                      <div className="flex items-center gap-4 relative z-10">
                        <img 
                          src={review.image || "https://via.placeholder.com/150"} 
                          alt={review.author} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <h4 className="font-bold text-text text-sm">{review.author}</h4>
                          <p className="text-accent text-xs">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ScrollReveal>
          )}

          {/* Review Submit Form */}
          <ScrollReveal direction="up">
            <ReviewForm />
          </ScrollReveal>
        </div>
      </section>

      {/* 11. Contact Section (Compact) */}
      <section className="flex flex-col md:flex-row bg-white h-auto md:h-[500px]">
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-background">
          <ScrollReveal direction="right">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">Contact Support</span>
            <h2 className="text-3xl font-extrabold font-poppins text-text mb-6">Get In Touch</h2>
            <p className="text-light-text mb-8 text-sm max-w-sm">Reach out to our Editorial Board for quick support regarding publications.</p>

            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 cursor-pointer group">
                <div className="bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Office</h4>
                  <p className="text-xs text-light-text">123 Academic City, AC 12345</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 cursor-pointer group">
                <div className="bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Email</h4>
                  <p className="text-xs text-light-text">contact@journalportal.edu</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8">
              <Link to="/contact" className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-all text-sm inline-flex items-center gap-2 shadow-md hover:shadow-primary/40">
                Contact Form <FaArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Static Map */}
        <div className="w-full md:w-1/2 h-[300px] md:h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531615!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1611815529813!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
            className="filter grayscale-[15%] contrast-110"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Home;
