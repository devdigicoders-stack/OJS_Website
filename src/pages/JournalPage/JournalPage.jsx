import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JournalPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/journal-pages/public/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPageData(data);
          // Set Document Title for SEO
          document.title = data.seoTitle || `${data.title} | Journal`;
        } else {
          // Page not found or not published
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pageData) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 overflow-x-hidden">
      {/* Header Banner */}
      <div className="bg-primary text-white py-16 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 break-words px-4"
        >
          {pageData.title}
        </motion.h1>
        {pageData.shortDescription && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            {pageData.shortDescription}
          </motion.p>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 overflow-hidden break-words">
        Home / Journal Policies / <span className="font-semibold text-gray-800">{pageData.title}</span>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-12 overflow-hidden">
          {/* Rich Text Render Area */}
          <div 
            className="prose prose-sm md:prose-lg max-w-none prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:text-blue-800 overflow-x-auto break-words"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
          
          <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-400 text-right">
            Last Updated: {new Date(pageData.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalPage;
