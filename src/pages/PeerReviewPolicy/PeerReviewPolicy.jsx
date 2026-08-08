import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa';

const PeerReviewPolicy = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      <section className="bg-primary pt-16 pb-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FaUserCheck className="text-white/20 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">Peer Review Policy</h1>
          <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Peer Review Policy</span>
          </div>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Our Peer Review Process</h2>
          <p className="text-light-text leading-relaxed mb-4">
            Our journal employs a strict double-blind peer review process. This means that the identities of both the authors and reviewers are kept hidden from each other to ensure unbiased and objective evaluation of the manuscript.
          </p>
          <ul className="list-disc list-inside space-y-2 text-text font-medium ml-2">
            <li>Initial screening by the Editorial Board for scope and formatting.</li>
            <li>Assignment to at least two independent expert reviewers.</li>
            <li>Reviewers evaluate the manuscript based on originality, methodology, and relevance.</li>
            <li>Final decision (Accept, Minor Revision, Major Revision, Reject) made by the Editor-in-Chief.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PeerReviewPolicy;
