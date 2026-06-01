import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BottomNav } from './components/layout/BottomNav';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { TopNav } from './components/layout/TopNav';
import { LaunchPopup, useLaunchPopup } from './components/marketing/LaunchPopup';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Apply } from './pages/Apply';
import { Applications } from './pages/Applications';
import { Book } from './pages/Book';
import { Compare } from './pages/Compare';
import { Neighborhood } from './pages/Neighborhood';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';
import { Personal } from './pages/sub/Personal';
import { Documents } from './pages/sub/Documents';
import { Payments } from './pages/sub/Payments';
import { Notifications } from './pages/sub/Notifications';
import { Help } from './pages/sub/Help';
import { About } from './pages/sub/About';
import { Verification } from './pages/sub/Verification';
import { LeaseTerms } from './pages/sub/LeaseTerms';
import { Landlords } from './pages/sub/Landlords';
import { Contact } from './pages/sub/Contact';

const App = () => {
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const { hasJoined } = useLaunchPopup();
  const shownThisMount = useRef(false);

  useEffect(() => {
    if (location.pathname !== '/') return;
    if (shownThisMount.current) return;
    if (hasJoined()) return;
    const t = window.setTimeout(() => {
      shownThisMount.current = true;
      setPopupOpen(true);
    }, 3500);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  const dismissPopup = () => setPopupOpen(false);

  return (
    <div className="min-h-full bg-cream lg:bg-paper">
      <TopNav />
      <div className="relative mx-auto min-h-screen max-w-phone bg-paper pb-20 shadow-[0_0_60px_rgba(12,20,16,0.06)] lg:max-w-none lg:bg-paper lg:pb-0 lg:shadow-none">
        <ScrollToTop />
        <LaunchPopup open={popupOpen} onClose={dismissPopup} />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route path="/apply/:id" element={<Apply />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/neighborhood/:slug" element={<Neighborhood />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/personal" element={<Personal />} />
            <Route path="/profile/documents" element={<Documents />} />
            <Route path="/profile/payments" element={<Payments />} />
            <Route path="/profile/notifications" element={<Notifications />} />
            <Route path="/profile/help" element={<Help />} />
            <Route path="/profile/about" element={<About />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/lease-terms" element={<LeaseTerms />} />
            <Route path="/landlords" element={<Landlords />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <BottomNav />
      </div>
    </div>
  );
};

export default App;
