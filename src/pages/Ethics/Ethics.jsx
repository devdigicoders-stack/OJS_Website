import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';

const Ethics = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      <section className="bg-primary pt-16 pb-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FaShieldAlt className="text-white/20 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">Ethics & Malpractice Statement</h1>
          <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Ethics</span>
          </div>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Publication Ethics</h2>
          <p className="text-light-text leading-relaxed mb-4">
            We are committed to maintaining the highest ethical standards for all parties involved in the act of publishing: the author, the journal editor, the peer reviewer, and the publisher. Our ethic statements are based on COPE’s Best Practice Guidelines for Journal Editors.
          </p>
          
          <h3 className="text-xl font-bold text-text mb-2 mt-6">Duties of Authors</h3>
          <p className="text-light-text leading-relaxed mb-4">
            Authors must ensure their work is entirely original. Plagiarism in any form constitutes unethical publishing behavior and is unacceptable. Proper acknowledgment of the work of others must always be given.
          </p>

          <h3 className="text-xl font-bold text-text mb-2 mt-6">Duties of Reviewers</h3>
          <p className="text-light-text leading-relaxed mb-4">
            Peer review assists the editor in making editorial decisions. Any invited referee who feels unqualified to review the research or knows that its prompt review will be impossible should notify the editor and excuse himself from the review process.
          </p>

          <h3 className="text-xl font-bold text-text mb-2 mt-6">Duties of Editors</h3>
          <p className="text-light-text leading-relaxed mb-4">
            The editors evaluate manuscripts for their intellectual content without regard to race, gender, sexual orientation, religious belief, ethnic origin, citizenship, or political philosophy of the authors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ethics;
