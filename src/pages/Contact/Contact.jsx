import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, 
  FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube,
  FaPaperPlane, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

// Helper for scroll animations
const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// FAQ Accordion Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-bold text-text">{question}</span>
        {isOpen ? <FaChevronUp className="text-primary" /> : <FaChevronDown className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 text-light-text border-t border-gray-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/enquiries/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Message Sent Successfully! We will get back to you soon.', {
          duration: 4000,
          position: 'bottom-center',
          style: {
            background: '#10B981',
            color: '#fff',
            fontWeight: 'bold',
          },
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { icon: <FaMapMarkerAlt />, title: 'Office Address', line1: 'C 4242 Sector 12', line2: 'Rajajipuram Lucknow 226017' },
    { icon: <FaEnvelope />, title: 'Email Us', line1: 'Editor@praxis.org.in', line2: '' },
    { icon: <FaPhoneAlt />, title: 'Call Us', line1: '+91 80817 16983', line2: '' },
    { icon: <FaClock />, title: 'Office Hours', line1: 'Monday – Friday', line2: '09:00 AM – 05:00 PM' },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      <Toaster />
      
      {/* 1. Hero Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins drop-shadow-lg">Contact Us</h1>
            <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm bg-white/10 w-fit mx-auto px-5 py-1.5 rounded-full backdrop-blur-md border border-white/20 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">Contact Us</span>
            </div>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">Have questions about journal submissions or publications? We're here to help.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* 2. Contact Information Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 text-primary text-2xl rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="font-bold text-text text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-light-text mb-1 font-medium">{card.line1}</p>
                <p className="text-sm text-light-text font-medium">{card.line2}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 3 & 4. Contact Form & Google Map */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            
            {/* Left: Contact Form */}
            <div className="lg:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-text mb-2">Send us a Message</h2>
              <p className="text-light-text mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 80817 16983"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Submission Inquiry"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                  </button>
                  <button type="button" onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '' })} className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Google Map */}
            <div className="lg:w-1/2 min-h-[400px] bg-gray-200 relative">
              <iframe 
                src="https://maps.google.com/maps?q=C%204242%20Sector%2012%20Rajajipuram%20Lucknow%20226017&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>

          </div>
        </ScrollReveal>

        {/* 5. Social Media */}
        <ScrollReveal>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-text mb-6">Connect With Us</h3>
            <div className="flex justify-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61593789151403" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white border border-gray-200 text-gray-500 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white rounded-full flex items-center justify-center text-xl transition-all hover:shadow-md hover:scale-110"><FaFacebookF /></a>
              <a href="https://www.linkedin.com/in/praxis-jsbis-1133a4431/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white border border-gray-200 text-gray-500 hover:bg-[#0077B5] hover:border-[#0077B5] hover:text-white rounded-full flex items-center justify-center text-xl transition-all hover:shadow-md hover:scale-110"><FaLinkedinIn /></a>
              <a href="#" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white border border-gray-200 text-gray-500 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white rounded-full flex items-center justify-center text-xl transition-all hover:shadow-md hover:scale-110"><FaTwitter /></a>
              <a href="https://www.instagram.com/praxisjsbis/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white border border-gray-200 text-gray-500 hover:bg-[#E4405F] hover:border-[#E4405F] hover:text-white rounded-full flex items-center justify-center text-xl transition-all hover:shadow-md hover:scale-110"><FaInstagram /></a>
              <a href="#" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white border border-gray-200 text-gray-500 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white rounded-full flex items-center justify-center text-xl transition-all hover:shadow-md hover:scale-110"><FaYoutube /></a>
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Quick Contact CTA */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-primary to-blue-800 rounded-3xl p-10 md:p-14 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <FaPhoneAlt className="text-[200px] -mt-10 -mr-10" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Immediate Assistance?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Our dedicated support team is available during office hours to answer your queries regarding paper submission, peer review status, or general technical issues.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="mailto:Editor@praxis.org.in" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold py-3.5 px-8 rounded-xl shadow-md hover:bg-gray-50 transition-colors">
                  <FaEnvelope /> Email Us
                </a>
                <a href="tel:+918081716983" className="inline-flex items-center justify-center gap-2 bg-primary-dark text-white border border-white/20 font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors">
                  <FaPhoneAlt /> Call Us
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 7. FAQ */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8 text-center">Support FAQ</h2>
            <div className="space-y-1">
              {faqs.length > 0 ? (
                faqs.map(faq => (
                  <FAQItem 
                    key={faq._id}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))
              ) : (
                <p className="text-center text-light-text">No FAQs available at the moment.</p>
              )}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default Contact;
