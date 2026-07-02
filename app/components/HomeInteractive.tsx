"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LinkedInIcon, TourIcon } from "@/components/Icons";
import Header from "@/components/Header";
import { TextSlider } from "./TextSlider";
import { VideoPopup } from "./VideoPopup";

const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20, display: "none" },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        display: "block",
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        x: -20,
        transition: { duration: 0.2 },
        transitionEnd: { display: "none" },
    },
};

export function HomeInteractive() {
    const [tourPopup, setTourPopup] = useState(false);
    const [dspPopup, setDspPopup] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<1 | 2 | null>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

    // Mobile video autoplay handler
    useEffect(() => {
        const video = mobileVideoRef.current;
        if (!video) return;

        // Ensure autoplay on mobile browsers
        const playVideo = async () => {
            try {
                if (video.paused) {
                    await video.play();
                }
            } catch {
                // Autoplay blocked, will retry on user interaction
            }
        };

        playVideo();

        // Retry on visibility change (when user returns to tab)
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                playVideo();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Retry on touch start (mobile user interaction)
        const handleTouchStart = () => {
            playVideo();
        };

        document.addEventListener("touchstart", handleTouchStart, {
            once: true,
        });

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
            document.removeEventListener("touchstart", handleTouchStart);
        };
    }, []);

    // Layout scroll lock
    useEffect(() => {
        function handleScrollLock() {
            const isDesktop = window.innerWidth >= 1024;
            const contentHeight = document.body.scrollHeight;
            const windowHeight = window.innerHeight;
            if (isDesktop) {
                document.body.style.overflow =
                    contentHeight > windowHeight ? "auto" : "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        }
        const timer = setTimeout(handleScrollLock, 100);
        window.addEventListener("resize", handleScrollLock);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleScrollLock);
        };
    }, []);

    const handleTooltipEnter = (id: 1 | 2) => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        setActiveTooltip(id);
    };

    const handleTooltipLeave = () => {
        hideTimeout.current = setTimeout(() => setActiveTooltip(null), 400);
    };

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
                                <span className="icon-box-title">
                                    Connect with Us
                                </span>
                                <LinkedInIcon />
                            </a>
                        </motion.div>

                        {/* Globe image (img-1) & Tooltip */}
                        <div
                            className="img-1"
                            style={{ position: "relative" }}
                            onMouseEnter={() => handleTooltipEnter(1)}
                            onMouseLeave={handleTooltipLeave}
                            onClick={() => handleTooltipEnter(1)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
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
                                        onMouseEnter={() => {
                                            if (hideTimeout.current)
                                                clearTimeout(
                                                    hideTimeout.current,
                                                );
                                        }}
                                        onMouseLeave={handleTooltipLeave}
                                    >
                                        <div
                                            className="tooltip-1-inner"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openTourPopup();
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    openTourPopup();
                                            }}
                                        >
                                            <TourIcon />
                                            <span className="icon-box-title">
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openTourPopup();
                                                    }}
                                                >
                                                    Take Virtual <br />
                                                    Tour
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
                                transition={{ delay: 0.6, type: "spring" }}
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
                                        onMouseEnter={() => {
                                            if (hideTimeout.current)
                                                clearTimeout(
                                                    hideTimeout.current,
                                                );
                                        }}
                                        onMouseLeave={handleTooltipLeave}
                                    >
                                        <button
                                            className="dsp-btn"
                                            onClick={openDspPopup}
                                            aria-label="The DSP Lifestyle"
                                        >
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
                    <Header />

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
                        ref={mobileVideoRef}
                        src="/images/NEW-2.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        webkit-playsinline="true"
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
