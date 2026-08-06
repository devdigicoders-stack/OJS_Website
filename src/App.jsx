import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Journals from './pages/Journals/Journals'
import JournalDetails from './pages/JournalDetails/JournalDetails'
import Announcements from './pages/Announcements/Announcements'
import AnnouncementDetails from './pages/AnnouncementDetails/AnnouncementDetails'
import SubmissionGuidelines from './pages/SubmissionGuidelines/SubmissionGuidelines'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Terms from './pages/Terms/Terms'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="journals" element={<Journals />} />
          <Route path="journals/:id" element={<JournalDetails />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="announcements/:id" element={<AnnouncementDetails />} />
          <Route path="submission-guidelines" element={<SubmissionGuidelines />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
