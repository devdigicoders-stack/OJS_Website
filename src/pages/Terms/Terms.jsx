import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGavel, FaCheckCircle, FaExclamationTriangle, FaCopyright, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

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

const Terms = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <section className="bg-primary pt-16 pb-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FaGavel className="text-white/20 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">Terms & Conditions</h1>
          <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Terms & Conditions</span>
          </div>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* 2. Introduction */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Introduction</h2>
            <p className="text-light-text leading-relaxed">
              Welcome to the Journal of society, behaviour and institutions. By accessing and using this website, you are requested to read these rules carefully. These Terms & Conditions outline the rules and regulations for the use of our publication platform.
            </p>
          </div>
        </ScrollReveal>

        {/* 3. Acceptance of Terms */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Acceptance of Terms</h2>
            <p className="text-light-text leading-relaxed">
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our journal portal if you do not accept all of the terms and conditions stated on this page. Your continued use implies explicit consent.
            </p>
          </div>
        </ScrollReveal>

        {/* 4. User Responsibilities */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">User Responsibilities</h2>
            <ul className="space-y-3">
              <li className="flex gap-3 text-light-text items-start">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>You must provide accurate and correct information during registration and submission.</span>
              </li>
              <li className="flex gap-3 text-light-text items-start">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>Respect all copyright laws and intellectual property rights.</span>
              </li>
              <li className="flex gap-3 text-light-text items-start">
                <FaExclamationTriangle className="text-red-500 mt-1 shrink-0" />
                <span>You must not upload any illegal, defamatory, or harmful content.</span>
              </li>
              <li className="flex gap-3 text-light-text items-start">
                <FaExclamationTriangle className="text-red-500 mt-1 shrink-0" />
                <span>Misuse of the website, including attempting unauthorized access or spreading malware, is strictly prohibited.</span>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* 5. Research Publication Rules */}
        <ScrollReveal>
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-primary/10 pb-2">Research Publication Rules</h2>
            <p className="text-light-text leading-relaxed mb-4">
              All authors submitting their manuscripts to our journal must strictly adhere to the following publication ethics:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text font-medium">
              <li>Only original research should be submitted.</li>
              <li>No plagiarism in any form is acceptable.</li>
              <li>Proper citation and referencing are required for all external data.</li>
              <li>Duplicate submissions (submitting the same paper to multiple journals simultaneously) are not allowed.</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* 6. Intellectual Property */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaCopyright className="text-gray-400" /> Intellectual Property
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-text">Journal Content Copyright</h4>
                <p className="text-sm text-light-text">The layout, design, and graphics of the journal website are copyrighted by the publisher.</p>
              </div>
              <div>
                <h4 className="font-bold text-text">Author Rights</h4>
                <p className="text-sm text-light-text">Authors retain the copyright of their published work under an Open Access Creative Commons License, allowing them to freely distribute their research.</p>
              </div>
              <div>
                <h4 className="font-bold text-text">Publisher Rights</h4>
                <p className="text-sm text-light-text">The publisher reserves the right of first publication and the right to index the article in global databases.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 7. Limitation of Liability */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Limitation of Liability</h2>
            <p className="text-light-text leading-relaxed mb-3">
              <strong className="text-text">Information Accuracy:</strong> While we strive to ensure that the information on this website is correct, we do not warrant its completeness or accuracy. The research papers published represent the views of the authors, not the journal.
            </p>
            <p className="text-light-text leading-relaxed">
              <strong className="text-text">Technical Issues:</strong> We will not be liable for any temporary unavailability of the website due to technical issues beyond our control.
            </p>
          </div>
        </ScrollReveal>

        {/* 8. Changes to Terms */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Changes to Terms</h2>
            <p className="text-light-text leading-relaxed">
              We reserve the right to revise these Terms and Conditions at any time. By using this website, you are expected to review these terms on a regular basis. Any changes will be posted on this page and will become effective immediately upon publication.
            </p>
          </div>
        </ScrollReveal>

        {/* 9. Contact Information */}
        <ScrollReveal>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h2 className="text-xl font-bold text-text mb-4">Questions about our Terms?</h2>
            <p className="text-light-text mb-6">If you have any queries regarding any of our terms, please contact us.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text font-medium">
                <FaEnvelope className="text-primary" /> legal@example.com
              </div>
              <div className="flex items-center gap-3 text-text font-medium">
                <FaPhoneAlt className="text-primary" /> +91 11 2345 6789
              </div>
              <div className="flex items-center gap-3 text-text font-medium">
                <FaMapMarkerAlt className="text-primary" /> Journal Office Building, New Delhi, India
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default Terms;
