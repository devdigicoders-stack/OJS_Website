import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaFileAlt, FaUpload, FaSearch, FaCheckCircle, 
  FaExclamationTriangle, FaFilePdf, FaBookOpen, FaShieldAlt, 
  FaBalanceScale, FaUserGraduate, FaPhone, FaEnvelope, 
  FaChevronDown, FaChevronUp, FaFileWord, FaInfoCircle
} from 'react-icons/fa';

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

const SubmissionGuidelines = () => {

  const processSteps = [
    { title: 'Prepare Your Manuscript', desc: 'Ensure your paper strictly follows the formatting guidelines.' },
    { title: 'Submit Your Paper', desc: 'Upload your manuscript via the author portal.' },
    { title: 'Editorial Screening', desc: 'Initial check for plagiarism and scope relevance.' },
    { title: 'Peer Review', desc: 'Double-blind review by subject matter experts.' },
    { title: 'Revision (If Required)', desc: 'Address reviewer comments and resubmit.' },
    { title: 'Final Acceptance', desc: 'Official acceptance letter provided to authors.' },
    { title: 'Publication', desc: 'Paper is assigned a DOI and published online.' },
  ];

  const prepRequirements = [
    { icon: <FaCheckCircle />, title: 'Original Research Only', desc: 'Must not be published elsewhere.' },
    { icon: <FaCheckCircle />, title: 'English Language', desc: 'Must be written in clear, professional English.' },
    { icon: <FaCheckCircle />, title: 'Proper Formatting', desc: 'Use our official DOCX template.' },
    { icon: <FaCheckCircle />, title: 'References Required', desc: 'APA 7th Edition format is mandatory.' },
    { icon: <FaCheckCircle />, title: 'Figures & Tables', desc: 'Must be numbered and captioned clearly.' },
    { icon: <FaCheckCircle />, title: 'No Plagiarism', desc: 'Similarity index must be strictly < 10%.' },
  ];

  const requiredDocs = [
    { icon: <FaFilePdf />, title: 'Research Paper', color: 'text-blue-500', bg: 'bg-blue-100' },
    { icon: <FaFileAlt />, title: 'Cover Letter', color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { icon: <FaUserGraduate />, title: 'Author Details', color: 'text-purple-500', bg: 'bg-purple-100' },
    { icon: <FaBalanceScale />, title: 'Declaration Form', color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: <FaShieldAlt />, title: 'Copyright Form', color: 'text-green-500', bg: 'bg-green-100', optional: true },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2000&auto=format&fit=crop" 
            alt="Submission Guidelines" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins drop-shadow-lg">Submission Guidelines</h1>
            <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm bg-white/10 w-fit mx-auto px-5 py-1.5 rounded-full backdrop-blur-md border border-white/20 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">Submission Guidelines</span>
            </div>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">Please read the following guidelines carefully before submitting your manuscript.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* 2. Overview */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-6">Overview</h2>
            <p className="text-lg text-light-text leading-relaxed">
              We welcome original, high-quality research papers from researchers, academicians, professionals, and scholars globally. All submissions must rigorously follow our journal's formatting standards and ethical publishing guidelines to be considered for peer review.
            </p>
          </div>
        </ScrollReveal>

        {/* 3. Manuscript Preparation */}
        <ScrollReveal>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-text mb-10 text-center">Manuscript Preparation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prepRequirements.map((req, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-primary/5 transition-colors group">
                  <div className="text-primary text-xl mt-1 group-hover:scale-110 transition-transform">{req.icon}</div>
                  <div>
                    <h4 className="font-bold text-text mb-1">{req.title}</h4>
                    <p className="text-sm text-light-text">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* 4. Submission Process Timeline */}
          <div className="lg:w-1/3">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-text mb-10">Submission Process</h2>
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-10">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] w-5 h-5 bg-white border-4 border-primary rounded-full shadow-md"></div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Step {i + 1}</span>
                      <h4 className="font-bold text-text text-lg mb-2">{step.title}</h4>
                      <p className="text-sm text-light-text">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:w-2/3 space-y-20">
            
            {/* 5. Formatting Guidelines */}
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-text mb-8">Formatting Guidelines</h2>
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-light-text font-medium">File Format</span>
                    <span className="font-bold text-text">PDF / DOCX</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-light-text font-medium">Font Family</span>
                    <span className="font-bold text-text">Times New Roman</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-light-text font-medium">Font Size</span>
                    <span className="font-bold text-text">12pt (Body)</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-light-text font-medium">Line Spacing</span>
                    <span className="font-bold text-text">1.5 Lines</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-light-text font-medium">Margin</span>
                    <span className="font-bold text-text">1 Inch (All sides)</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-light-text font-medium">Citation Style</span>
                    <span className="font-bold text-text">APA 7th Edition</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-primary hover:text-white text-primary font-bold py-3 px-6 rounded-xl transition-all border border-primary shadow-sm">
                    <FaFilePdf /> Author Guidelines (PDF)
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-bold py-3 px-6 rounded-xl transition-all border border-blue-600 shadow-sm">
                    <FaFileWord /> Manuscript Template (DOCX)
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* 6. Required Documents */}
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-text mb-8">Required Documents</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {requiredDocs.map((doc, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-primary/30 transition-colors">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${doc.bg} ${doc.color} group-hover:scale-110 transition-transform`}>
                      {doc.icon}
                    </div>
                    <h4 className="font-bold text-sm text-text">{doc.title}</h4>
                    {doc.optional && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded mt-1 inline-block">Optional</span>}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* 7. Publication Ethics */}
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-text mb-8">Publication Ethics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Original Work', 'No Plagiarism', 'No Duplicate Submission', 'Proper Citations', 'Ethical Research', 'Conflict of Interest Declaration'].map((ethic, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                    <FaShieldAlt className="text-accent text-lg" />
                    <span className="font-semibold text-text">{ethic}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* 8. Peer Review Process */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <FaBookOpen className="text-[300px] -mt-10 -mr-10" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-10 text-center">Our Peer Review Process</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: <FaSearch />, title: 'Initial Screening' },
                  { icon: <FaUserGraduate />, title: 'Reviewer Assignment' },
                  { icon: <FaBookOpen />, title: 'Review Process' },
                  { icon: <FaFileAlt />, title: 'Author Revision' },
                  { icon: <FaCheckCircle />, title: 'Final Decision' },
                ].map((step, i) => (
                  <div key={i} className="w-[140px] sm:w-[160px] md:w-[180px] lg:flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/20 hover:bg-white/20 transition-colors flex flex-col items-center justify-center">
                    <div className="text-3xl mb-3 sm:mb-4 text-accent">{step.icon}</div>
                    <h4 className="font-bold text-xs sm:text-sm">{step.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 9. Important Notes */}
        <ScrollReveal>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 md:p-8 rounded-r-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
              <h3 className="text-2xl font-bold text-red-900">Important Notes</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 text-red-800 font-medium">
              <li>Submit only original work.</li>
              <li>Follow formatting guidelines strictly.</li>
              <li>Incomplete submissions may be rejected without review.</li>
              <li>Ensure all references are properly cited.</li>
              <li>Authors are exclusively responsible for the accuracy of submitted content.</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* 10. Frequently Asked Questions */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-1">
              <FAQItem 
                question="How do I submit my paper?" 
                answer="You can submit your paper online through our author portal. Click on the 'Submit Paper' button located in the top navigation bar, register an account, and follow the upload instructions." 
              />
              <FAQItem 
                question="Which file formats are accepted?" 
                answer="We accept manuscripts in Microsoft Word (.docx) and Adobe PDF (.pdf) formats. Please ensure you use the official journal template provided in the Formatting Guidelines section." 
              />
              <FAQItem 
                question="How long does the review process take?" 
                answer="Our standard double-blind peer review process typically takes between 14 to 30 days, depending on reviewer availability and the complexity of the subject matter." 
              />
              <FAQItem 
                question="Is there any publication fee?" 
                answer="Our journal follows an open-access model. There are no submission fees, but a nominal Article Processing Charge (APC) is required upon final acceptance to cover indexing and hosting costs." 
              />
              <FAQItem 
                question="Can I revise my manuscript after submission?" 
                answer="Once submitted, you cannot edit the manuscript during the Initial Screening phase. However, if reviewers request revisions, you will be able to upload a revised copy." 
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 11. Contact Support */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaInfoCircle />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">Need Help?</h3>
            <p className="text-light-text mb-8">If you have any questions regarding the submission process, feel free to contact our editorial support team.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:support@ojs.com" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-dark transition-all shadow-md">
                <FaEnvelope /> Email Support
              </a>
              <a href="tel:+1234567890" className="inline-flex items-center justify-center gap-2 bg-gray-50 text-text font-bold py-3 px-6 rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all">
                <FaPhone /> Call Us
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default SubmissionGuidelines;
