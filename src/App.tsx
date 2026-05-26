import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BottomNav } from './components/layout/BottomNav';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Apply } from './pages/Apply';
import { Applications } from './pages/Applications';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';

const App = () => {
  const location = useLocation();
  return (
    <div className="mx-auto min-h-full max-w-phone bg-paper pb-20">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
};

export default App;
