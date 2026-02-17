'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LinkedInIcon, TourIcon, MenuOpenIcon, MenuCloseIcon } from '@/components/Icons';

/* ───────── TEXT SLIDER ───────── */

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
        <div className="text-slider">
          {SLIDER_TEXTS.map((text, i) => (
            <div key={i} className={`slide ${i === activeIndex ? 'active' : ''}`}>
              {text}
            </div>
          ))}
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
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close popup">✕</button>
        <h2 className="popup-title">{title}</h2>
        <video
          className="popup-video"
          src={videoSrc}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [tourPopup, setTourPopup] = useState(false);
  const [dspPopup, setDspPopup] = useState(false);

  // Tooltip visibility
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  // Timeout refs
  const hideTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tooltip1Class = showTooltip1 ? 'tooltip-show' : 'tooltip-hide';
  const tooltip2Class = showTooltip2 ? 'tooltip-show' : 'tooltip-hide';

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 520);
    } else {
      setMenuOpen(true);
    }
  }, [menuOpen]);

  // Show tooltip helper — close other tooltip first
  const showTooltip = useCallback(
    (which: 1 | 2) => {
      if (which === 1) {
        if (hideTimeout1.current) clearTimeout(hideTimeout1.current);
        setShowTooltip2(false);
        setShowTooltip1(true);
      } else {
        if (hideTimeout2.current) clearTimeout(hideTimeout2.current);
        setShowTooltip1(false);
        setShowTooltip2(true);
      }
    },
    []
  );



  // Scroll lock (desktop)
  useEffect(() => {
    function handleScrollLock() {
      // Defer reading layout properties to avoid thrashing during initial render
      const isDesktop = window.innerWidth >= 1024;
      const contentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (isDesktop) {
        document.body.style.overflow = contentHeight > windowHeight ? 'auto' : 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }

    // Delay initial check to reduce TBT
    const timer = setTimeout(() => {
        handleScrollLock();
    }, 100);

    window.addEventListener('resize', handleScrollLock);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleScrollLock);
    };
  }, []);

  return (
    <>
      {/* ═══ MAIN CONTAINER ═══ */}
      <div id="homecss">

        {/* ═══ LEFT COLUMN (content-left) ═══ */}
        <div className="content-left">

          {/* ── img-wrapper: LinkedIn box + Tour tooltip + Globe image ── */}
          <div className="img-wrapper">

            {/* LinkedIn "Connect with Us" (desktop only — hidden on tablet/mobile via CSS) */}
            <div className="linkedin-box">
              <a
                href="https://www.linkedin.com/in/jim-royce/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Us"
              >
                <span className="icon-box-title">Connect with Us</span>
                <LinkedInIcon />
              </a>
            </div>

            {/* Globe image (img-1) & Tooltip */}
            <div
              className="img-1"
              style={{ position: 'relative' }} /* Ensure relative positioning for tooltip */
              onMouseEnter={() => showTooltip(1)}
              onMouseLeave={() => {
                hideTimeout1.current = setTimeout(() => setShowTooltip1(false), 400);
              }}
              onClick={() => showTooltip(1)} // Mobile click support
            >
              <Image
                src="/images/Group-1321314714-1.png"
                alt="LastMile Globe"
                width={378}
                height={342}
                priority
              />

              {/* tooltip-1: Take Virtual Tour */}
              <div
                className={`tooltip-1 ${tooltip1Class}`}
                onMouseEnter={() => {
                  if (hideTimeout1.current) clearTimeout(hideTimeout1.current);
                }}
                onMouseLeave={() => {
                  hideTimeout1.current = setTimeout(() => setShowTooltip1(false), 400);
                }}
              >
                <div
                  className="tooltip-1-inner"
                  onClick={(e) => { e.stopPropagation(); setTourPopup(true); }} // Prevent bubble click from re-toggling
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setTourPopup(true); }}
                >
                  <TourIcon />
                  <span className="icon-box-title">
                    <a href="#" onClick={(e) => { e.preventDefault(); setTourPopup(true); }}>
                      Take Virtual <br />Tour
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Jim section ── */}
          <div className="jim-container">
            <div
              className="jim-wrapper"
              onMouseEnter={() => showTooltip(2)}
              onMouseLeave={() => {
                hideTimeout2.current = setTimeout(() => setShowTooltip2(false), 400);
              }}
              onClick={() => showTooltip(2)} // Mobile click support
            >
              {/* Jim Royce Image */}
              <div className="jim">
                <Image
                  src="/images/Group-1321315409-e1756292294312.png"
                  alt="Jim Royce"
                  width={560}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>

              {/* tooltip-2: DSP Lifestyle */}
              <div
                className={`tooltip-2 ${tooltip2Class}`}
                onMouseEnter={() => {
                  if (hideTimeout2.current) clearTimeout(hideTimeout2.current);
                }}
                onMouseLeave={() => {
                  hideTimeout2.current = setTimeout(() => setShowTooltip2(false), 200);
                }}
              >
                <button className="dsp-btn" onClick={() => setDspPopup(true)} aria-label="The DSP Lifestyle">
                  <Image
                    src="/images/Group-1321315414-e1756371262949.png"
                    alt="The DSP Lifestyle"
                    width={162}
                    height={141}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN (#vdeobg) ═══ */}
        <div id="vdeobg">

          {/* LinkedIn box (mobile only — hidden on desktop via CSS) */}
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
            <div className="menu-widget" id="pushmenu">
              <button
                className={`menu-toggle-btn ${menuOpen ? 'is-open' : ''}`}
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="Menu Toggle"
              >
                <span className="icon-open"><MenuOpenIcon /></span>
                <span className="icon-close"><MenuCloseIcon /></span>
              </button>

              <nav
                className={`dropdown-menu ${menuOpen ? 'is-open' : ''} ${menuClosing ? 'is-closing' : ''}`}
                aria-label="Menu"
              >
                <ul className="menu-list">
                  <li className="menu-item">
                    <Link href="/experience" className="menu-link">Experience</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/outlook" className="menu-link">Expertise</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/execution" className="menu-link">Execution</Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/logo-2.png"
                alt="LastMile NYC"
                width={174}
                height={114}
                className="logo-img"
                priority
              />
            </Link>
          </div>

          {/* ── Video (desktop — hidden on mobile via CSS) ── */}
          <div className="video-container">
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

          {/* ── Text Slider (desktop) ── */}
          <div className="desktop-text-slider">
            <TextSlider />
          </div>
        </div>
      </div>

      {/* ═══ MOBILE VIDEO SECTION (shown only on mobile via CSS) ═══ */}
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
      {tourPopup && (
        <VideoPopup
          title="Website Tour"
          videoSrc="https://clientblob1.blob.core.windows.net/websitecontent/Website_Tour_High_Res_Mp4.mp4"
          onClose={() => setTourPopup(false)}
        />
      )}
      {dspPopup && (
        <VideoPopup
          title="The DSP Lifestyle"
          videoSrc="https://clientblob1.blob.core.windows.net/websitecontent/Fitness_Video_Full_2.mp4"
          onClose={() => setDspPopup(false)}
        />
      )}
    </>
  );
}
