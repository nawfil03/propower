import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';

const PhotoJourney3D = lazy(() => import('./components/PhotoJourney3D'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      {/*
        Mounted here — a sibling of PageTransition's motion.div, not a
        descendant — because framer-motion leaves a resting `transform` on
        that wrapper even after its enter animation completes, and any
        `position: fixed` descendant of a transformed ancestor stops being
        fixed to the viewport (it anchors to that ancestor's box instead,
        so it scrolls away with the page). Only mounted on Home.
      */}
      {location.pathname === '/' && (
        <Suspense fallback={null}>
          <PhotoJourney3D />
        </Suspense>
      )}
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
