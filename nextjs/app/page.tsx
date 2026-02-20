'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInIcon, TourIcon, MenuCloseIcon, MenuOpenIcon } from '@/components/Icons';

/* ───────── ANIMATION VARIANTS ───────── */
const tooltipVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -20, display: 'none' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    x: 0, 
    display: 'block',
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    x: -20, 
    transition: { duration: 0.2 },
    transitionEnd: { display: 'none' }
  }
};

const menuVariants = {
  closed: { 
    opacity: 0, 
    x: 20, 
    maxWidth: 0,
    pointerEvents: 'none' as const,
    transition: { duration: 0.3 }
  },
  open: { 
    opacity: 1, 
    x: 0, 
    maxWidth: 400,
    pointerEvents: 'auto' as const, 
    transition: { type: 'spring' as const, stiffness: 300, damping: 30, staggerChildren: 0.05, delayChildren: 0.1 } 
  }
};

const menuItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 }
};

/* ───────── TEXT SLIDER ───────── */
const SLIDER_TEXTS = [
  '✨ On the experience tab, we share stories of seminal moments that forged our last-mile strategy',
  '🔥 Our expertise section gives you insights to run your last-mile operation with precision and profit',
  '🚀  On our execution page, see how we turned our last-mile playbook into software that walks the walk',
];
const SLIDER_TIMES = [9000, 10000, 9000];

function TextSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDER_TEXTS.length);
    }, SLIDER_TIMES[activeIndex]);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <div className="text-slider-section">
      <div className="text-slider-widget">
        <div className="text-slider" style={{ position: 'relative', height: '6rem', minHeight: '3rem', overflow: 'hidden' }}>
          <AnimatePresence>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="slide active"
              style={{ position: 'absolute', width: '100%' }}
            >
              {SLIDER_TEXTS[activeIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ───────── POPUP ───────── */
interface PopupProps {
  title: string;
  videoSrc: string;
  onClose: () => void;
}

function VideoPopup({ title, videoSrc, onClose }: PopupProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="popup-overlay"
      onClick={onClose}
      style={{ zIndex: 10000 }} // Ensure it's on top
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose} aria-label="Close popup">✕</button>
        <h2 className="popup-title">{title}</h2>
        <video
          className="popup-video"
          src={videoSrc}
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
      </motion.div>
    </motion.div>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tourPopup, setTourPopup] = useState(false);
  const [dspPopup, setDspPopup] = useState(false);

  // Tooltip state
  const [activeTooltip, setActiveTooltip] = useState<1 | 2 | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Layout scroll lock
  useEffect(() => {
    function handleScrollLock() {
      const isDesktop = window.innerWidth >= 1024;
      const contentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (isDesktop) {
        document.body.style.overflow = contentHeight > windowHeight ? 'auto' : 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    const timer = setTimeout(handleScrollLock, 100);
    window.addEventListener('resize', handleScrollLock);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleScrollLock);
    };
  }, []);

  const handleTooltipEnter = (id: 1 | 2) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setActiveTooltip(id);
  };

  const handleTooltipLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveTooltip(null), 400);
  };

  // Prevent multiple popups
  const openTourPopup = () => setTourPopup(true);
  const openDspPopup = () => setDspPopup(true);

  return (
    <>
      {/* ═══ MAIN CONTAINER ═══ */}
      <motion.div
        id="homecss"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* ═══ LEFT COLUMN (content-left) ═══ */}
        <div className="content-left">

          {/* ── img-wrapper: LinkedIn box + Tour tooltip + Globe image ── */}
          <div className="img-wrapper">

            {/* LinkedIn "Connect with Us" (desktop only) */}
            <motion.div
              className="linkedin-box"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://www.linkedin.com/in/jim-royce/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Us"
              >
                <span className="icon-box-title">Connect with Us</span>
                <LinkedInIcon />
              </a>
            </motion.div>

            {/* Globe image (img-1) & Tooltip */}
            <div
              className="img-1"
              style={{ position: 'relative' }}
              onMouseEnter={() => handleTooltipEnter(1)}
              onMouseLeave={handleTooltipLeave}
              onClick={() => handleTooltipEnter(1)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <Image
                  src="/images/Group-1321314714-1.png"
                  alt="LastMile Globe"
                  width={378}
                  height={342}
                  priority
                />
              </motion.div>

              <AnimatePresence>
                {activeTooltip === 1 && (
                  <motion.div
                    key="tooltip1"
                    className="tooltip-1"
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ zIndex: 999 }}
                    onMouseEnter={() => { if (hideTimeout.current) clearTimeout(hideTimeout.current); }}
                    onMouseLeave={handleTooltipLeave}
                  >
                    <div
                      className="tooltip-1-inner"
                      onClick={(e) => { e.stopPropagation(); openTourPopup(); }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') openTourPopup(); }}
                    >
                      <TourIcon />
                      <span className="icon-box-title">
                        <a href="#" onClick={(e) => { e.preventDefault(); openTourPopup(); }}>
                          Take Virtual <br />Tour
                        </a>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Jim section ── */}
          <div className="jim-container">
            <div
              className="jim-wrapper"
              onMouseEnter={() => handleTooltipEnter(2)}
              onMouseLeave={handleTooltipLeave}
              onClick={() => handleTooltipEnter(2)}
            >
              {/* Jim Royce Image */}
              <motion.div
                className="jim"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <Image
                  src="/images/Group-1321315409-e1756292294312.png"
                  alt="Jim Royce"
                  width={560}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </motion.div>

              {/* tooltip-2: DSP Lifestyle */}
              <AnimatePresence>
                {activeTooltip === 2 && (
                  <motion.div
                    key="tooltip2"
                    className="tooltip-2"
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ zIndex: 999 }}
                    onMouseEnter={() => { if (hideTimeout.current) clearTimeout(hideTimeout.current); }}
                    onMouseLeave={handleTooltipLeave}
                  >
                    <button className="dsp-btn" onClick={openDspPopup} aria-label="The DSP Lifestyle">
                      <Image
                        src="/images/Group-1321315414-e1756371262949.png"
                        alt="The DSP Lifestyle"
                        width={162}
                        height={141}
                      />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN (#vdeobg) ═══ */}
        <div id="vdeobg">

          {/* LinkedIn box (mobile only) */}
          <div className="linkedin-box-mobile">
            <a
              href="https://www.linkedin.com/in/jim-royce/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Us"
            >
              <LinkedInIcon />
              <span className="icon-box-title">Connect with Us</span>
            </a>
          </div>

          {/* ── Header / Menu ── */}
          <div className="headmenu">

            {/* Mega menu widget */}
            <div className="menu-widget" id="pushmenu" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px' }}>
              <motion.div
                className="menu-container"
                layout
                initial={false}
                animate={{
                  width: menuOpen ? 'auto' : 50,
                  backgroundColor: menuOpen ? 'rgba(51, 51, 51, 0.95)' : 'rgba(0,0,0,0)',
                  borderRadius: 50,
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                  height: '50px',
                  boxShadow: menuOpen ? '0 4px 15px rgba(0, 0, 0, 0.3)' : 'none',
                  position: 'relative', // Ensure stacking context
                  zIndex: 20
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 30, mass: 1 }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {!menuOpen ? (
                    <motion.button
                      layout="position"
                      key="open-btn"
                      className="menu-toggle-btn open"
                      onClick={() => setMenuOpen(true)}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "anticipate" }}
                      aria-label="Open Menu"
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: 0, 
                        width: '50px', 
                        height: '50px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        position: 'absolute', // Absolute to overlap nicely during transition
                        right: 0
                      }}
                    >
                      <MenuOpenIcon />
                    </motion.button>
                  ) : (
                    <motion.div
                      layout="position"
                      key="menu-content"
                      className="menu-links-wrapper"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
                      style={{ display: 'flex', alignItems: 'center', paddingRight: '6px', paddingLeft: '24px', gap: '15px', whiteSpace: 'nowrap' }}
                    >
                       <div className="menu-links-container" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <Link href="/experience" className="capsule-link">Experience</Link>
                          <span className="capsule-divider">|</span>
                          <Link href="/outlook" className="capsule-link">Expertise</Link>
                          <span className="capsule-divider">|</span>
                          <Link href="/execution" className="capsule-link">Execution</Link>
                       </div>

                      <button 
                        className="capsule-close-btn"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close Menu"
                        style={{ margin: 0 }} // Override any external margin
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Logo */}
            <Link href="/">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <Image
                  src="/images/logo-2.png"
                  alt="LastMile NYC"
                  width={174}
                  height={114}
                  className="logo-img"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* ── Video (desktop) ── */}
          <motion.div
            className="video-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="homevideo">
              <video
                src="/images/NEW-2.webm"
                autoPlay
                loop
                muted
                playsInline
                controlsList="nodownload"
              />
            </div>
          </motion.div>

          {/* ── Text Slider (desktop) ── */}
          <motion.div
            className="desktop-text-slider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <TextSlider />
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ MOBILE VIDEO SECTION ═══ */}
      <div className="mobile-video-section">
        <div className="homevideo">
          <video
            src="/images/NEW-2.webm"
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload"
          />
        </div>
      </div>

      {/* ── Text Slider (mobile) ── */}
      <div className="mobile-text-slider">
        <TextSlider />
      </div>

      {/* ═══ POPUPS ═══ */}
      <AnimatePresence>
        {tourPopup && (
          <VideoPopup
            key="tour-popup"
            title="Website Tour"
            videoSrc="https://clientblob1.blob.core.windows.net/websitecontent/Website_Tour_High_Res_Mp4.mp4"
            onClose={() => setTourPopup(false)}
          />
        )}
        {dspPopup && (
          <VideoPopup
            key="dsp-popup"
            title="The DSP Lifestyle"
            videoSrc="https://clientblob1.blob.core.windows.net/websitecontent/Fitness_Video_Full_2.mp4"
            onClose={() => setDspPopup(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
