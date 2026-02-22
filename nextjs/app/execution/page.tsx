"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";

const PREVIEW_IMAGES = {
    left: "https://thelastmilenyc.com/wp-content/uploads/2026/01/Frame-1618873756-1-e1751978398145-1.png",
    center: "https://thelastmilenyc.com/wp-content/uploads/2026/01/Frame-1618873446.png",
    right: "https://thelastmilenyc.com/wp-content/uploads/2026/01/Frame-1618873758-e1751534035578.png",
};

const POPUP_VIDEOS = {
    workforce: {
        title: "Workforce Visibility",
        src: "https://clientblob1.blob.core.windows.net/websitecontent/Why_sheludling.mp4?sv=2025-05-05&se=2026-02-13T12%3A13%3A39Z&sr=b&sp=r&sig=PE5aUj7kdljgKzwLBqwa%2Fur%2FIAImFFkrt0Kn%2BfMH4E0%3D",
    },
    alignment: {
        title: "Schedule Alignment",
        src: "https://clientblob1.blob.core.windows.net/websitecontent/FINAL_Sched_Align_Saas_Video.mp4?sv=2025-05-05&se=2026-02-13T12%3A13%3A39Z&sr=b&sp=r&sig=pP4BLJYomz0OEhOWeVCw7xXYYlGKH4v24UYV0Mc4y3s%3D",
    },
} as const;

const CENTER_VIDEO = {
    poster: "https://thelastmile.baglatd.in/wp-content/uploads/2025/11/Frame-1618873446.png",
    src: "https://thelastmile.baglatd.in/wp-content/uploads/2026/01/Comp-1_18.mp4",
};

const BUTTON_VIDEOS = [
    "https://thelastmile.baglatd.in/wp-content/uploads/2026/01/Pre-comp-1_2.mp4",
    "https://thelastmile.baglatd.in/wp-content/uploads/2026/01/Pre-comp-1_1-1.mp4",
    "https://thelastmile.baglatd.in/wp-content/uploads/2026/01/platfor-video-online-video-cutter.com_-1.mp4",
];

const BUTTON_IMAGES = [
    "https://thelastmile.baglatd.in/wp-content/uploads/2025/12/Button-14.png",
    "https://thelastmile.baglatd.in/wp-content/uploads/2025/12/Button-17.png",
    "https://thelastmile.baglatd.in/wp-content/uploads/2025/12/Button-16.png",
];

interface PopupProps {
    title: string;
    videoSrc: string;
    onClose: () => void;
}

function VideoPopup({ title, videoSrc, onClose }: PopupProps) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay"
            onClick={onClose}
            style={{ zIndex: 10000 }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="popup-content"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="popup-close"
                    onClick={onClose}
                    aria-label="Close popup"
                >
                    X
                </button>
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
            </motion.div>
        </motion.div>
    );
}

export default function ExecutionPage() {
    const [showInteractive, setShowInteractive] = useState(false);
    const [activePopup, setActivePopup] = useState<
        keyof typeof POPUP_VIDEOS | null
    >(null);
    const [menuExiting, setMenuExiting] = useState(false);
    const [videoVisible, setVideoVisible] = useState(false);
    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(
        null,
    );
    const [menuKey, setMenuKey] = useState(0);

    const finalVideoRef = useRef<HTMLVideoElement | null>(null);
    const centerVideoRef = useRef<HTMLVideoElement | null>(null);
    const transitionTimeout = useRef<number | null>(null);

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
        const timer = window.setTimeout(handleScrollLock, 100);
        window.addEventListener("resize", handleScrollLock);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener("resize", handleScrollLock);
        };
    }, []);

    useEffect(() => {
        return () => {
            if (transitionTimeout.current) {
                window.clearTimeout(transitionTimeout.current);
            }
        };
    }, []);

    useEffect(() => {
        const finalVideo = finalVideoRef.current;
        if (!finalVideo) return;

        if (videoVisible && activeVideoIndex !== null) {
            finalVideo.src = BUTTON_VIDEOS[activeVideoIndex];
            finalVideo.currentTime = 0;
            finalVideo.load();
            finalVideo.play().catch(() => {
                /* Autoplay might be blocked. */
            });
        } else {
            finalVideo.pause();
            finalVideo.removeAttribute("src");
            finalVideo.load();
        }
    }, [videoVisible, activeVideoIndex]);

    const resetMenu = () => {
        if (transitionTimeout.current) {
            window.clearTimeout(transitionTimeout.current);
            transitionTimeout.current = null;
        }
        setMenuExiting(false);
        setVideoVisible(false);
        setActiveVideoIndex(null);
        setMenuKey((prev) => prev + 1);
        const centerVideo = centerVideoRef.current;
        if (centerVideo) {
            centerVideo.currentTime = 0;
            centerVideo.load();
        }
    };

    const handleOpenInteractive = () => {
        setShowInteractive(true);
        resetMenu();
    };

    const handleBack = () => {
        setShowInteractive(false);
        resetMenu();
    };

    const handleOpenVideo = (index: number) => {
        if (menuExiting || videoVisible) return;
        setMenuExiting(true);
        setActiveVideoIndex(index);
        if (transitionTimeout.current) {
            window.clearTimeout(transitionTimeout.current);
        }
        transitionTimeout.current = window.setTimeout(() => {
            setVideoVisible(true);
        }, 700);
    };

    const handleVideoEnded = () => {
        resetMenu();
    };

    const handleVideoToggle = () => {
        const finalVideo = finalVideoRef.current;
        if (!finalVideo) return;
        if (finalVideo.paused) {
            finalVideo.play().catch(() => {
                /* No-op */
            });
        } else {
            finalVideo.pause();
        }
    };

    return (
        <>
            <div className="execution-page">
                <div className="execution-header">
                    <Header />
                </div>

                <div className="execution-body">
                    <AnimatePresence mode="wait">
                        {!showInteractive && (
                            <motion.section
                                key="sec-1"
                                className="execution-section"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="execution-hero">
                                    <h2>Workforce Command</h2>
                                    <h3>Built for the Last Mile</h3>
                                </div>

                                <div className="execution-grid">
                                    <button
                                        type="button"
                                        className="execution-thumb"
                                        onClick={() =>
                                            setActivePopup("workforce")
                                        }
                                        aria-label="Open workforce visibility video"
                                    >
                                        <img
                                            src={PREVIEW_IMAGES.left}
                                            alt="Workforce command preview"
                                        />
                                    </button>

                                    <div className="execution-center">
                                        <img
                                            onClick={handleOpenInteractive}
                                            aria-label="Open interactive execution menu"
                                            src={PREVIEW_IMAGES.center}
                                            alt="Execution command hub"
                                        />

                                        <p>
                                            From staffing to attendance, total
                                            visibility and control
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="execution-thumb"
                                        onClick={() =>
                                            setActivePopup("alignment")
                                        }
                                        aria-label="Open schedule alignment video"
                                    >
                                        <img
                                            src={PREVIEW_IMAGES.right}
                                            alt="Execution analytics preview"
                                        />
                                    </button>
                                </div>
                            </motion.section>
                        )}

                        {showInteractive && (
                            <motion.section
                                key="sec-2"
                                className="execution-interactive"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="execution-interactive-content">
                                    <div
                                        className={`execution-center-box ${menuExiting || videoVisible ? "center-zoom-out" : ""}`}
                                        onClick={handleBack}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter")
                                                handleBack();
                                        }}
                                    >
                                        <video
                                            ref={centerVideoRef}
                                            muted
                                            playsInline
                                            preload="metadata"
                                            poster={CENTER_VIDEO.poster}
                                        >
                                            <source
                                                src={CENTER_VIDEO.src}
                                                type="video/mp4"
                                            />
                                        </video>
                                    </div>

                                    <div
                                        key={menuKey}
                                        className={`execution-bottom ${menuExiting || videoVisible ? "bottom-exit" : ""}`}
                                    >
                                        {BUTTON_IMAGES.map((src, index) => (
                                            <button
                                                type="button"
                                                key={src}
                                                className="execution-circle"
                                                onClick={() =>
                                                    handleOpenVideo(index)
                                                }
                                                aria-label={`Play execution video ${index + 1}`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Execution option ${index + 1}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <video
                                    ref={finalVideoRef}
                                    className={`execution-final-video ${videoVisible ? "video-zoom-in" : ""}`}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    onClick={handleVideoToggle}
                                    onEnded={handleVideoEnded}
                                    style={{
                                        transform: videoVisible
                                            ? `scale(${activeVideoIndex === 0 ? 1.4 : 1})`
                                            : undefined,
                                    }}
                                />
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {activePopup && (
                    <VideoPopup
                        title={POPUP_VIDEOS[activePopup].title}
                        videoSrc={POPUP_VIDEOS[activePopup].src}
                        onClose={() => setActivePopup(null)}
                    />
                )}
            </AnimatePresence>

            <style jsx>{`
                :global(body) {
                    background-color: #111;
                    background-image: url("/images/execution-bg.webp");
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .execution-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    z-index: 1;
                    color: #2b2b2b;
                }

                .execution-header {
                    width: 100%;
                    background: #0c1118;
                    background-image: url("/images/home-new-1-1.png");
                    background-size: cover;
                    background-position: top;
                    padding: 28px;
                }

                .execution-header :global(.header) {
                    margin: 0 auto;
                }

                .execution-header :global(.header__desktop) {
                    align-items: center;
                }

                .execution-header :global(.linkedin-box) {
                    margin-top: 0;
                }

                .execution-header :global(.headmenu) {
                    margin: 0;
                }

                .execution-body {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    padding: 34px 32px 60px;
                    width: 100%;
                }

                .execution-section {
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    flex-direction: column;
                    gap: 26px;
                    padding: 8px 0 0;
                    margin: 0 auto;
                }

                .execution-hero {
                    text-align: center;
                }

                .execution-hero h2 {
                    font-size: 26px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: #3c3c3c;
                }

                .execution-hero h3 {
                    margin-top: 6px;
                    font-size: 40px;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: #2d73b8;
                }

                .execution-grid {
                    display: grid;
                    grid-template-columns: minmax(280px, 1fr) 240px minmax(
                            280px,
                            1fr
                        );
                    gap: 40px;
                    align-items: center;
                    justify-items: center;
                    margin-top: 26px;
                }

                .execution-thumb {
                    border: 2px solid transparent;
                    background: #ffffff;
                    cursor: pointer;
                    padding: 0;
                    border-radius: 14px;
                    overflow: hidden;
                    position: relative;
                    isolation: isolate;
                    transition: transform 0.3s ease;
                    width: 100%;
                    max-width: 420px;
                }

                .execution-thumb::before {
                    content: "";
                    position: absolute;
                    inset: -2px;
                    border-radius: 18px;
                    background: linear-gradient(
                        135deg,
                        #ffffff 0%,
                        #2a74d3 70%,
                        #ffffff 100%
                    );
                    z-index: 0;
                }

                .execution-thumb::after {
                    content: "";
                    position: absolute;
                    inset: 2px;
                    border-radius: 14px;
                    background: #ffffff;
                    z-index: 1;
                }

                .execution-thumb img {
                    width: 100%;
                    height: auto;
                    display: block;
                    position: relative;
                    z-index: 2;
                }

                .execution-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    text-align: center;
                }

                .execution-center-button img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .execution-center p {
                    max-width: 280px;
                    font-size: 16px;
                    color: #4b4b4b;
                    line-height: 1.4;
                    font-weight: 500;
                }

                .execution-interactive {
                    position: relative;
                    min-height: 78vh;
                    width: 100%;
                    max-width: 1200px;
                    padding: 8px 0 0;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin: 0 auto;
                }

                .execution-interactive-content {
                    position: relative;
                    width: 100%;
                    min-height: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .execution-center-box {
                    position: relative;
                    width: 299px;
                    height: 299px;
                    background: #ffffff;
                    border-radius: 18px;
                    overflow: hidden;
                    cursor: pointer;
                    transition:
                        transform 0.5s ease-in-out,
                        opacity 0.5s ease-in-out;
                    opacity: 1;
                }

                .execution-center-box video {
                    width: 110%;
                    height: 110%;
                    object-fit: contain;
                    background: #ffffff;
                    border-radius: 0;
                }

                .center-zoom-out {
                    transform: scale(0.4);
                    opacity: 0;
                    transition:
                        transform 1.2s ease-in-out,
                        opacity 0.8s ease-out 1s;
                }

                .execution-bottom {
                    display: flex;
                    gap: 110px;
                    justify-content: center;
                    margin-top: 40px;
                    animation: bottomBounceOnce 1s ease-out 1;
                    animation-fill-mode: both;
                }

                .execution-circle {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                    border: none;
                    padding: 0;
                    background: transparent;
                    animation: bounceWithPause 3.4s infinite ease-in-out;
                }

                .execution-circle:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .execution-circle:nth-child(3) {
                    animation-delay: 0.4s;
                }

                .execution-circle img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .bottom-exit {
                    animation: bottomBounceDown 0.6s forwards ease-in !important;
                    pointer-events: none;
                }

                .execution-final-video {
                    display: block;
                    position: fixed;
                    top: 20%;
                    left: 22%;
                    width: 55vw;
                    height: 79vh;
                    border-radius: 42px !important;
                    object-fit: contain;
                    z-index: 9999;
                    pointer-events: none;
                    opacity: 0;
                    transform: scale(0);
                    transition:
                        transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        opacity 0.5s ease;
                }

                .execution-final-video.video-zoom-in {
                    opacity: 1;
                    pointer-events: auto;
                }

                @keyframes bounceWithPause {
                    0% {
                        transform: translateY(0);
                    }
                    12% {
                        transform: translateY(-18px);
                    }
                    20% {
                        transform: translateY(6px);
                    }
                    28% {
                        transform: translateY(-10px);
                    }
                    40% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                @keyframes bottomBounceOnce {
                    0% {
                        transform: translateY(40px);
                        opacity: 0;
                    }
                    60% {
                        transform: translateY(-12px);
                        opacity: 1;
                    }
                    80% {
                        transform: translateY(6px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                @keyframes bottomBounceDown {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    30% {
                        transform: translateY(-15px);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(200px);
                        opacity: 0;
                    }
                }

                @media (max-width: 1200px) {
                    .execution-body {
                        padding: 28px 24px 50px;
                    }

                    .execution-grid {
                        grid-template-columns: 1fr;
                        gap: 26px;
                    }

                    .execution-center-button {
                        width: 170px;
                        height: 170px;
                    }

                    .execution-bottom {
                        gap: 40px;
                        flex-wrap: wrap;
                    }

                    .execution-final-video {
                        left: 8%;
                        width: 84vw;
                        height: 68vh;
                    }
                }

                @media (max-width: 768px) {
                    .execution-header {
                        padding: 14px 18px;
                    }

                    .execution-body {
                        padding: 22px 18px 40px;
                    }

                    .execution-hero h2 {
                        font-size: 22px;
                    }

                    .execution-hero h3 {
                        font-size: 30px;
                    }

                    .execution-center-box {
                        width: 240px;
                        height: 240px;
                    }

                    .execution-circle {
                        width: 120px;
                        height: 120px;
                    }

                    .execution-final-video {
                        top: 16%;
                        left: 4%;
                        width: 92vw;
                        height: 70vh;
                    }
                }
            `}</style>
        </>
    );
}
