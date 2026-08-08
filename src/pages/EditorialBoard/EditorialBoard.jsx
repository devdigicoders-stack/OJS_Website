import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const EditorialBoard = () => {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Editor-in-Chief</h2>
          <p className="text-light-text leading-relaxed">
            <strong>Prof. John Doe</strong><br/>
            Department of Computer Science, University of Technology<br/>
            Email: editor@example.com
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-text mb-4 border-b border-gray-100 pb-2">Editorial Board Members</h2>
          <ul className="list-disc list-inside space-y-4 text-light-text">
            <li>
              <strong>Dr. Jane Smith</strong> - Artificial Intelligence<br/>
              Stanford University
            </li>
            <li>
              <strong>Prof. Alan Turing</strong> - Mathematics & Computing<br/>
              MIT
            </li>
            <li>
              <strong>Dr. Emily Chen</strong> - Sustainable Energy<br/>
              UC Berkeley
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
