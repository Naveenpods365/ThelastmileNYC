"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import { VideoPopup } from "../../components/VideoPopup";

const PREVIEW_IMAGES = {
    left: "/images/whysched.png",
    center: "/images/centerimg.png",
    right: "/images/workspace.png",
};

const POPUP_VIDEOS = {
    workforce: {
        title: "Workforce Visibility",
        src: "https://clientblob1.blob.core.windows.net/websitecontent/Why_sheludling.mp4",
    },
    alignment: {
        title: "Schedule Alignment",
        src: "https://clientblob1.blob.core.windows.net/websitecontent/FINAL_Sched_Align_Saas_Video.mp4",
    },
} as const;

const CENTER_VIDEO = {
    poster: "/images/centerimg.png",
    src: "/images/Comp-1_18.mp4",
};

const BUTTON_VIDEOS = [
    "/images/Comp-1_18.mp4",
    "/images/Pre-comp.mp4",
    "/images/platfor.mp4",
];

const BUTTON_IMAGES = [
    "/images/func.webp",
    "/images/platform.webp",
    "/images/rhythm.webp",
];

export function ExecutionInteractive() {
    const [showInteractive, setShowInteractive] = useState(false);
    const [activePopup, setActivePopup] = useState<
        keyof typeof POPUP_VIDEOS | null
    >(null);
    const [disableAfterOpen, setDisableAfterOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [centerBoxExiting, setCenterBoxExiting] = useState(false);
    const [circlesExiting, setCirclesExiting] = useState(false);
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
        setCenterBoxExiting(false);
        setCirclesExiting(false);
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
        setDisableAfterOpen(true);
        setIsExiting(true);
        setTimeout(() => {
            setShowInteractive(true);
            setIsExiting(false);
        }, 350);
        resetMenu();
    };

    const handleBack = () => {
        setShowInteractive(false);
        resetMenu();
    };

    const handleOpenVideo = (index: number) => {
        if (centerBoxExiting || circlesExiting || videoVisible) return;
        setCenterBoxExiting(true);
        setActiveVideoIndex(index);
        if (transitionTimeout.current) {
            window.clearTimeout(transitionTimeout.current);
        }
        transitionTimeout.current = window.setTimeout(() => {
            setCirclesExiting(true);
            transitionTimeout.current = window.setTimeout(() => {
                setVideoVisible(true);
            }, 600);
        }, 400);
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
            <div
                className={`execution-page ${disableAfterOpen ? "no-anim" : ""}`}
            >
                <div className="execution-header">
                    <Header />
                </div>

                <div className="execution-body">
                    <AnimatePresence mode="wait">
                        {!showInteractive && (
                            <motion.section
                                key="sec-1"
                                className="execution-section"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: disableAfterOpen ? 0 : 0.35,
                                }}
                            >
                                <div
                                    className={`execution-hero ${isExiting ? "is-exiting" : ""}`}
                                >
                                    <h2>Workforce Command</h2>
                                    <h3>Built for the Last Mile</h3>
                                </div>

                                <div className="execution-grid">
                                    <button
                                        type="button"
                                        className={`execution-thumb ${isExiting ? "is-exiting" : ""}`}
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
                                        <button
                                            type="button"
                                            className="execution-center-button"
                                            onClick={handleOpenInteractive}
                                            aria-label="Open interactive execution menu"
                                        >
                                            <img
                                                src={PREVIEW_IMAGES.center}
                                                alt="Execution command hub"
                                            />
                                        </button>

                                        <p
                                            className={
                                                isExiting ? "is-exiting" : ""
                                            }
                                        >
                                            From staffing to attendance, total
                                            visibility and control
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className={`execution-thumb ${isExiting ? "is-exiting" : ""}`}
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
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0 }}
                            >
                                <div className="execution-interactive-content">
                                    <div
                                        className={`execution-center-box ${
                                            centerBoxExiting ||
                                            circlesExiting ||
                                            videoVisible
                                                ? "center-zoom-out"
                                                : ""
                                        }`}
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
                                        className={`execution-bottom ${circlesExiting || videoVisible ? "bottom-exit" : ""}`}
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
                    background-color: #f2f6fb;
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
                    background-image: url("/images/home-new-1-1.png");
                    background-size: cover;
                    background-position: top;
                    background-repeat: no-repeat;

                    padding: 26px 32px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
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

                .execution-header :global(.icon-box-title) {
                    font-size: 26px;
                    font-weight: 500;
                    letter-spacing: -0.3px;
                }

                .execution-body {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    padding: 50px 32px 70px;
                    width: 100%;
                }

                .execution-section {
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    padding: 10px 0 0;
                    margin: 0 auto;
                }

                .execution-hero {
                    text-align: center;
                    animation: zoomIn 0.5s ease-out forwards;
                }

                .execution-hero.is-exiting {
                    animation: zoomOut 0.35s ease-in forwards;
                }

                .execution-hero h2 {
                    font-size: 25px;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    color: #3d3f42;
                }

                .execution-hero h3 {
                    margin-top: 6px;
                    font-size: 44px;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: #2c71b9;
                    background: var(
                        --Path,
                        linear-gradient(290deg, #2a9ed8 27.26%, #294e9d 70.41%)
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .execution-grid {
                    display: grid;
                    grid-template-columns: minmax(300px, 1fr) 260px minmax(
                            300px,
                            1fr
                        );
                    gap: 50px;
                    align-items: flex-end;
                    justify-items: center;
                }

                .execution-thumb {
                    border: 2px solid transparent;
                    background: #ffffff;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 22px;
                    overflow: hidden;
                    position: relative;
                    isolation: isolate;
                    transition:
                        transform 0.3s ease,
                        box-shadow 0.3s ease;
                    width: 100%;
                    max-width: 380px;
                    box-shadow: 0 20px 36px rgba(26, 58, 100, 0.16);
                    animation: zoomIn 0.5s ease-out forwards;
                }

                .execution-thumb.is-exiting {
                    animation: zoomOut 0.35s ease-in forwards;
                }

                .execution-thumb::before {
                    content: "";
                    position: absolute;
                    inset: -3px;
                    background: linear-gradient(
                        140deg,
                        #e6f0ff 0%,
                        #7fb2f3 45%,
                        #d6e8ff 70%,
                        #f4f8ff 100%
                    );
                    z-index: 0;
                }

                .execution-thumb::after {
                    content: "";
                    position: absolute;
                    inset: 3px;
                    border-radius: 18px;
                    background: linear-gradient(
                        140deg,
                        #e6f0ff 0%,
                        #7fb2f3 45%,
                        #d6e8ff 70%,
                        #f4f8ff 100%
                    );
                    z-index: 1;
                }

                .execution-thumb img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: relative;
                    z-index: 2;
                }

                .execution-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    text-align: center;
                }

                .execution-center-button img {
                    width: 295px !important;
                    height: 294px !important;
                    object-fit: cover;
                    position: relative;
                    z-index: 2;
                    animation: none;
                }

                .execution-center-button {
                    border-radius: 50%;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    isolation: isolate;
                    transition: transform 0.3s ease-in-out;
                }

                .execution-center-button,
                .execution-center-button img {
                    animation: none !important;
                    transition: none !important;
                }

                .execution-center-button::after {
                    content: "";
                    position: absolute;
                    inset: 6px;
                    border-radius: 50%;
                    background: #ffffff;
                    z-index: 1;
                }

                .execution-center p {
                    max-width: 280px;
                    font-size: 16px;
                    color: #020202ff;
                    line-height: 1.4;
                    font-weight: 600;
                    animation: zoomIn 0.5s ease-out forwards;
                }

                .execution-center p.is-exiting {
                    animation: zoomOut 0.35s ease-in forwards;
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
                    width: 309px;
                    height: 309px;
                    background: #ffffff;
                    border-radius: 18px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.3s ease-in-out;
                    opacity: 1;
                    margin-top: 74px;
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
                    margin-top: 10px;
                    animation: bottomBounceOnce 1s ease-out 1;
                    animation-fill-mode: both;
                    z-index: 1;
                    position: relative;
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
                    top: 13%;
                    left: 22%;
                    width: 55vw;
                    height: 89vh;
                    border-radius: 42px !important;
                    object-fit: contain;
                    pointer-events: none;
                    opacity: 0;
                    transform: scale(0);
                    transition:
                        transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        opacity 0.5s ease;
                    z-index: 100;
                }

                .execution-final-video.video-zoom-in {
                    opacity: 1;
                    pointer-events: auto;
                }

                @keyframes zoomIn {
                    0% {
                        transform: scale(0.85);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes zoomOut {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0.85);
                        opacity: 0;
                    }
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
                        padding: 38px 24px 56px;
                    }

                    .execution-grid {
                        grid-template-columns: 1fr;
                        gap: 28px;
                    }

                    .execution-center-button {
                        width: 180px;
                        height: 180px;
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
                        padding: 16px 18px;
                    }

                    .execution-body {
                        padding: 28px 18px 44px;
                    }

                    .execution-hero h2 {
                        font-size: 22px;
                    }

                    .execution-hero h3 {
                        font-size: 30px;
                    }

                    .execution-center-box {
                        width: 240px !important;
                        height: 240px !important;
                    }

                    .execution-circle {
                        width: 120px;
                        height: 120px;
                    }
                    .execution-center-button img {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover;
                        position: relative;
                        z-index: 2;
                        animation: none;
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
