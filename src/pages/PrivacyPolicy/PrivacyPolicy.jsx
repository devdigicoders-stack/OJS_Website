import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserShield, FaDatabase, FaCookieBite, FaLock, FaExternalLinkAlt, FaUserEdit, FaEnvelope } from 'react-icons/fa';

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

const PrivacyPolicy = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <section className="bg-primary pt-16 pb-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FaUserShield className="text-white/20 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">Privacy Policy</h1>
          <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Privacy Policy</span>
          </div>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* 2. Introduction */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Introduction</h2>
            <p className="text-light-text leading-relaxed">
              We are deeply committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines how we collect, use, maintain, and disclose information collected from users (authors, reviewers, and readers) of our Open Journal System.
            </p>
          </div>
        </ScrollReveal>

        {/* 3. Information We Collect */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaDatabase className="text-gray-400" /> Information We Collect
            </h2>
            <p className="text-light-text leading-relaxed mb-4">
              When you register on our site, submit a manuscript, or subscribe to our newsletter, we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text font-medium ml-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Institution / Affiliation Details</li>
              <li>Manuscript Details and related academic documents</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* 4. How We Use Information */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">How We Use Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-primary mb-1">Journal Communication</h4>
                <p className="text-sm text-light-text">To send periodic emails regarding updates and new issues.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-primary mb-1">Submission Processing</h4>
                <p className="text-sm text-light-text">To facilitate the peer review and editorial workflow.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-primary mb-1">User Support</h4>
                <p className="text-sm text-light-text">To respond to inquiries, technical issues, and support requests.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-primary mb-1">Website Improvement</h4>
                <p className="text-sm text-light-text">To understand how users interact with our site and improve UI/UX.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5. Cookies */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaCookieBite className="text-yellow-600" /> Cookies Policy
            </h2>
            <p className="text-light-text leading-relaxed mb-3">
              Our website uses "cookies" to enhance user experience. A cookie is a small file placed on your device that helps us analyze web traffic and remember your preferences.
            </p>
            <p className="text-light-text leading-relaxed">
              We primarily use cookies for <strong className="text-text">Analytics</strong> (to track page views and interactions) and for keeping you logged into the author portal. You may choose to set your web browser to refuse cookies, but some parts of the site may not function properly.
            </p>
          </div>
        </ScrollReveal>

        {/* 6. Data Security */}
        <ScrollReveal>
          <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-4 border-b border-green-200 pb-2 flex items-center gap-2">
              <FaLock /> Data Security
            </h2>
            <p className="text-green-700 leading-relaxed mb-3">
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, and data stored on our site.
            </p>
            <p className="text-green-700 leading-relaxed">
              Sensitive and private data exchange between the site and its users happens over an SSL secured communication channel and is encrypted and protected.
            </p>
          </div>
        </ScrollReveal>

        {/* 7. Third-Party Services */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaExternalLinkAlt className="text-gray-400" /> Third-Party Services
            </h2>
            <p className="text-light-text leading-relaxed mb-4">
              We do not sell, trade, or rent users' personal identification information to others. However, we may use third-party service providers to help us operate our business, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text font-medium ml-2">
              <li><strong>Google Maps:</strong> Used on our contact page to display our office location.</li>
              <li><strong>Email Services:</strong> Used to send out newsletters, submission receipts, and review notifications.</li>
              <li><strong>Analytics:</strong> Used to track website performance and visitor demographics.</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* 8. User Rights */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaUserEdit className="text-primary" /> User Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-text">View Personal Data</h4>
                <p className="text-sm text-light-text">You have the right to request a copy of the information we hold about you.</p>
              </div>
              <div>
                <h4 className="font-bold text-text">Update Information</h4>
                <p className="text-sm text-light-text">You can request us to correct any information you believe is inaccurate or incomplete.</p>
              </div>
              <div>
                <h4 className="font-bold text-text">Request Deletion</h4>
                <p className="text-sm text-light-text">Under certain conditions, you have the right to request that we erase your personal data from our systems.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 9. Contact for Privacy Issues */}
        <ScrollReveal>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
              <FaEnvelope />
            </div>
            <h2 className="text-xl font-bold text-text mb-2">Privacy Concerns?</h2>
            <p className="text-light-text mb-6">If you have any questions about this Privacy Policy or our data handling practices, please contact our Data Protection Officer.</p>
            <a href="mailto:privacy@example.com" className="inline-block bg-white text-primary font-bold py-2.5 px-6 rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm">
              privacy@example.com
            </a>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
