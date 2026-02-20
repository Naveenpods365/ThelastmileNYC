"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LinkedInIcon, MenuOpenIcon } from "@/components/Icons";

type PinId =
    | "about"
    | "people"
    | "technology"
    | "scale"
    | "innovation"
    | "communication";

const BADGE_SIZE_PX = 130;
const PIN_W_PX = 170;
const PIN_H_PX = 222;
const PIN_TOOLTIP_Y_OFFSET_PX = Math.round(PIN_H_PX / 2) + 46;

const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 4, display: "none" as const },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        display: "block" as const,
        transition: { type: "spring" as const, stiffness: 350, damping: 25 },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 4,
        transition: { duration: 0.15 },
        transitionEnd: { display: "none" as const },
    },
};

const tooltipBaseStyle = {
    background: "#ffffff",
    border: "1px solid rgba(103, 61, 61, 0.06)",
    borderRadius: 11,
    padding: "12px 26px 12px 18px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 0,
    boxShadow:
        "0 14px 26px rgba(0, 0, 0, 0.18), 0 6px 12px rgba(0, 0, 0, 0.08)",
    color: "#0c0c0c",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    position: "relative" as const,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    minHeight: 56,
};

const tooltipIconStyle = {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
};

const tooltipContentStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row" as const,
    gap: 14,
    flexWrap: "nowrap" as const,
};

const tooltipTextStyle = {
    display: "inline-flex",
    alignItems: "center",
    height: 32,
    lineHeight: "32px",
    whiteSpace: "nowrap" as const,
};

const getTooltipArrowStyle = (direction: "down" | "left") => {
    if (direction === "left") {
        return {
            position: "absolute" as const,
            left: -12,
            top: "50%",
            width: 0,
            height: 0,
            borderTop: "14px solid transparent",
            borderBottom: "14px solid transparent",
            borderRight: "12px solid #ffffff",
            transform: "translateY(-50%)",
            filter: "drop-shadow(-6px 0 8px rgba(0, 0, 0, 0.12))",
        };
    }
    return {
        position: "absolute" as const,
        left: "50%",
        bottom: -12,
        width: 0,
        height: 0,
        borderLeft: "14px solid transparent",
        borderRight: "14px solid transparent",
        borderTop: "12px solid #ffffff",
        transform: "translateX(-50%)",
        filter: "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.12))",
    };
};

interface PopupProps {
    title: string;
    videoSrc: string;
    onClose: () => void;
}

function VideoPopup({ title, videoSrc, onClose }: PopupProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
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
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="popup-close"
                    onClick={onClose}
                    aria-label="Close popup"
                >
                    ✕
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

export default function ExperiencePage() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [activeTooltip, setActiveTooltip] = useState<PinId | null>(null);
    const [activePopup, setActivePopup] = useState<PinId | null>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const showTooltip = (id: PinId) => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        setActiveTooltip(id);
    };

    const scheduleHideTooltip = () => {
        hideTimeout.current = setTimeout(() => setActiveTooltip(null), 350);
    };

    const ABOUT_JIM = {
        id: "about" as const,
        label: "About Jim Royce",
        icon: "person" as const,
        videoSrc:
            "https://clientblob1.blob.core.windows.net/websitecontent/About_Jim.mp4?sv=2025-05-05&se=2026-02-09T12%3A46%3A05Z&sr=b&sp=r&sig=Kr%2BQvNOXzxx%2BWIfiyRIhQ%2FKM7uqTUZ4Glh2DlCM3YtE%3D",
    };

    const PINS: Array<{
        id: PinId;
        label: string;
        icon:
            | "person"
            | "people"
            | "technology"
            | "scale"
            | "communication"
            | "innovation";
        left: string;
        top: string;
        tooltipLeft: string;
        tooltipTop: string;
        videoSrc: string;
    }> = [
        {
            id: "people",
            label: "People",
            icon: "people",
            left: "8.3%",
            top: "66.5%",
            tooltipLeft: "8.3%",
            tooltipTop: "56.5%",
            videoSrc:
                "https://clientblob1.blob.core.windows.net/websitecontent/People.mp4?sv=2025-05-05&se=2026-02-09T12%3A46%3A05Z&sr=b&sp=r&sig=OH2GwYCj2mauQdVIE5IeWv2v%2FiXFjiRTLA%2F95pnNR5s%3D",
        },
        {
            id: "technology",
            label: "Technology",
            icon: "technology",
            left: "30.5%",
            top: "54.5%",
            tooltipLeft: "30.5%",
            tooltipTop: "52.5%",
            videoSrc:
                "https://clientblob1.blob.core.windows.net/websitecontent/Experience_Video_Technology.mp4?sv=2025-05-05&se=2026-02-09T12%3A46%3A05Z&sr=b&sp=r&sig=66IvzyDPAqG%2FGzPVG%2B5bjrw3ofeuXjESS3XU%2FraMiNA%3D",
        },
        {
            id: "scale",
            label: "Scale",
            icon: "scale",
            left: "47.8%",
            top: "37.5%",
            tooltipLeft: "47.8%",
            tooltipTop: "45.5%",
            videoSrc:
                "https://clientblob1.blob.core.windows.net/websitecontent/Experience_Video_Scale.mp4?sv=2025-05-05&se=2026-02-09T12%3A46%3A05Z&sr=b&sp=r&sig=vRBLbCKBcaZ%2BXaC2gVzc2IPCDv5nrCxrE1XJhXZMk6M%3D",
        },
        {
            id: "innovation",
            label: "Innovation",
            icon: "innovation",
            left: "52.0%",
            top: "77.0%",
            tooltipLeft: "56.0%",
            tooltipTop: "68.0%",
            videoSrc:
                "https://clientblob1.blob.core.windows.net/websitecontent/Experience_Video_Innovation.mp4?sv=2025-05-05&se=2026-02-09T12%3A46%3A05Z&sr=b&sp=r&sig=NMvH0MCc0hDSpiUymWNFvPSEb5zm3KLt%2Bwk2KASaXAE%3D",
        },
        {
            id: "communication",
            label: "Communication",
            icon: "communication",
            left: "67.6%",
            top: "45.0%",
            tooltipLeft: "72.6%",
            tooltipTop: "52.0%",
            videoSrc:
                "https://clientblob1.blob.core.windows.net/websitecontent/Communication.mp4?sv=2025-05-05&se=2026-02-09T12%3A46%3A05Z&sr=b&sp=r&sig=tt0v%2FeNslEbit%2BA5HFf%2F75IBtCtG9QJF%2FhsYzi12jnQ%3D",
        },
    ];

    const activePopupConfig = activePopup
        ? activePopup === ABOUT_JIM.id
            ? { label: ABOUT_JIM.label, videoSrc: ABOUT_JIM.videoSrc }
            : PINS.find((p) => p.id === activePopup)
        : null;

    const openPopupFor = (id: PinId) => {
        setActivePopup(id);
        setActiveTooltip(null);
    };

    const renderTooltipIcon = (icon: (typeof PINS)[number]["icon"]) => {
        if (icon === "people") {
            return (
                <Image
                    src="/images/people-exp.png"
                    alt=""
                    width={32}
                    height={32}
                    style={{ display: "block" }}
                />
            );
        }
        if (icon === "technology") {
            return (
                <Image
                    src="/images/technology-exp.png"
                    alt=""
                    width={32}
                    height={32}
                    style={{ display: "block" }}
                />
            );
        }
        if (icon === "scale") {
            return (
                <Image
                    src="/images/scale-exp.png"
                    alt=""
                    width={32}
                    height={32}
                    style={{ display: "block" }}
                />
            );
        }
        if (icon === "communication") {
            return (
                <Image
                    src="/images/communication-exp.png"
                    alt=""
                    width={32}
                    height={32}
                    style={{ display: "block" }}
                />
            );
        }
        if (icon === "innovation") {
            return (
                <Image
                    src="/images/innovation-exp.png"
                    alt=""
                    width={32}
                    height={32}
                    style={{ display: "block" }}
                />
            );
        }
        if (icon === "person") {
            return (
                <Image
                    src="/images/aboutjim-exp.png"
                    alt=""
                    width={32}
                    height={32}
                    style={{ display: "block" }}
                />
            );
        }
        return (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                    stroke="#2A9ED8"
                    strokeWidth="2"
                />
                <path
                    d="M20 20C20 16.6863 16.4183 14 12 14C7.58172 14 4 16.6863 4 20"
                    stroke="#2A9ED8"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        );
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#000",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url(/images/home-new.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.35,
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100vh",
                    padding: "28px 28px 24px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 20,
                    }}
                >
                    <div className="linkedin-box" style={{ marginTop: 19 }}>
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
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                        }}
                    >
                        <div className="headmenu" style={{ margin: 0 }}>
                            <div
                                className="menu-widget"
                                id="pushmenu"
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    height: "50px",
                                }}
                            >
                                <motion.div
                                    className="menu-container"
                                    layout
                                    initial={false}
                                    animate={{
                                        width: menuOpen ? "auto" : 50,
                                        backgroundColor: menuOpen
                                            ? "rgba(51, 51, 51, 0.95)"
                                            : "rgba(0,0,0,0)",
                                        borderRadius: 50,
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        overflow: "hidden",
                                        height: "50px",
                                        boxShadow: menuOpen
                                            ? "0 4px 15px rgba(0, 0, 0, 0.3)"
                                            : "none",
                                        position: "relative",
                                        zIndex: 20,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 180,
                                        damping: 30,
                                        mass: 1,
                                    }}
                                >
                                    <AnimatePresence
                                        mode="popLayout"
                                        initial={false}
                                    >
                                        {!menuOpen ? (
                                            <motion.button
                                                layout="position"
                                                key="open-btn"
                                                className="menu-toggle-btn open"
                                                onClick={() =>
                                                    setMenuOpen(true)
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "anticipate",
                                                }}
                                                aria-label="Open Menu"
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    padding: 0,
                                                    width: "50px",
                                                    height: "50px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    position: "absolute",
                                                    right: 0,
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
                                                exit={{
                                                    opacity: 0,
                                                    x: -5,
                                                    transition: {
                                                        duration: 0.15,
                                                    },
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.05,
                                                    ease: "easeOut",
                                                }}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    paddingRight: "6px",
                                                    paddingLeft: "24px",
                                                    gap: "15px",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                <div
                                                    className="menu-links-container"
                                                    style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Link
                                                        href="/experience"
                                                        className="capsule-link"
                                                    >
                                                        Experience
                                                    </Link>
                                                    <span className="capsule-divider">
                                                        |
                                                    </span>
                                                    <Link
                                                        href="/outlook"
                                                        className="capsule-link"
                                                    >
                                                        Expertise
                                                    </Link>
                                                    <span className="capsule-divider">
                                                        |
                                                    </span>
                                                    <Link
                                                        href="/execution"
                                                        className="capsule-link"
                                                    >
                                                        Execution
                                                    </Link>
                                                </div>

                                                <button
                                                    className="capsule-close-btn"
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                    aria-label="Close Menu"
                                                    style={{ margin: 0 }}
                                                >
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M13 1L1 13M1 1L13 13"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            <Link href="/">
                                <motion.div
                                    initial={{ scale: 1, opacity: 1 }}
                                    animate={{ scale: 1, opacity: 1 }}
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
                    </div>
                </div>

                <div
                    style={{
                        width: "100%",
                        borderRadius: 14,
                        overflow: "hidden",
                        border: "2px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
                        background: "rgba(255,255,255,0.02)",
                        flex: 1,
                        minHeight: 0,
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Image
                            src="/images/Frame-1618873644-1.png"
                            alt="Experience Map"
                            fill
                            priority
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                                pointerEvents: "none",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                left: "20px",
                                top: "20px",
                                width: `${BADGE_SIZE_PX}px`,
                                height: `${BADGE_SIZE_PX}px`,
                                zIndex: 5,
                                pointerEvents: "auto",
                            }}
                            onMouseEnter={() => showTooltip(ABOUT_JIM.id)}
                            onMouseLeave={scheduleHideTooltip}
                        >
                            <button
                                type="button"
                                aria-label={ABOUT_JIM.label}
                                onFocus={() => showTooltip(ABOUT_JIM.id)}
                                onBlur={scheduleHideTooltip}
                                onClick={() => showTooltip(ABOUT_JIM.id)}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    cursor: "pointer",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src="/images/Group-1321315370-1.svg"
                                    alt="25 years badge"
                                    fill
                                    sizes={`${BADGE_SIZE_PX}px`}
                                    style={{ objectFit: "contain" }}
                                />
                            </button>

                            <div
                                style={{
                                    position: "absolute",
                                    left: `${BADGE_SIZE_PX + 18}px`,
                                    top: `${Math.round(BADGE_SIZE_PX / 2)}px`,
                                    transform: "translateY(-50%)",
                                    pointerEvents: "auto",
                                }}
                            >
                                <AnimatePresence>
                                    {activeTooltip === ABOUT_JIM.id && (
                                        <motion.button
                                            key="about-tooltip"
                                            type="button"
                                            variants={tooltipVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            onMouseEnter={() => {
                                                if (hideTimeout.current)
                                                    clearTimeout(
                                                        hideTimeout.current,
                                                    );
                                            }}
                                            onMouseLeave={scheduleHideTooltip}
                                            onFocus={() => {
                                                if (hideTimeout.current)
                                                    clearTimeout(
                                                        hideTimeout.current,
                                                    );
                                            }}
                                            onBlur={scheduleHideTooltip}
                                            onClick={() =>
                                                openPopupFor(ABOUT_JIM.id)
                                            }
                                            data-direction="left"
                                            className="experience-tooltip"
                                            style={{
                                                ...tooltipBaseStyle,
                                                fontSize: 22,
                                            }}
                                        >
                                            <span style={tooltipContentStyle}>
                                                <span style={tooltipIconStyle}>
                                                    {renderTooltipIcon(
                                                        ABOUT_JIM.icon,
                                                    )}
                                                </span>
                                                <span style={tooltipTextStyle}>
                                                    {ABOUT_JIM.label}
                                                </span>
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                style={getTooltipArrowStyle(
                                                    "left",
                                                )}
                                            />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 4,
                                pointerEvents: "none",
                            }}
                        >
                            {PINS.map((pin) => (
                                <div
                                    key={pin.id}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        pointerEvents: "none",
                                    }}
                                >
                                    <button
                                        type="button"
                                        aria-label={pin.label}
                                        onMouseEnter={() => showTooltip(pin.id)}
                                        onMouseLeave={scheduleHideTooltip}
                                        onFocus={() => showTooltip(pin.id)}
                                        onBlur={scheduleHideTooltip}
                                        onClick={() => showTooltip(pin.id)}
                                        style={{
                                            position: "absolute",
                                            left: pin.left,
                                            top: pin.top,
                                            width: `${PIN_W_PX}px`,
                                            height: `${PIN_H_PX}px`,
                                            transform: "translate(-50%, -50%)",
                                            background: "transparent",
                                            border: "none",
                                            padding: 0,
                                            cursor: "pointer",
                                            pointerEvents: "auto",
                                        }}
                                    >
                                        <Image
                                            src="/images/Soft-Brown-Modern-Rip-Instagram-Post-72-1-1.svg"
                                            alt="Map pin"
                                            fill
                                            sizes={`${PIN_W_PX}px`}
                                            style={{ objectFit: "contain" }}
                                        />
                                    </button>

                                    <div
                                        style={{
                                            position: "absolute",
                                            left: pin.left,
                                            top: `calc(${pin.top} - ${PIN_TOOLTIP_Y_OFFSET_PX}px)`,
                                            transform: "translate(-50%, 0)",
                                            pointerEvents: "auto",
                                        }}
                                    >
                                        <AnimatePresence>
                                            {activeTooltip === pin.id && (
                                                <motion.button
                                                    key={`${pin.id}-tooltip`}
                                                    type="button"
                                                    variants={tooltipVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    onMouseEnter={() => {
                                                        if (hideTimeout.current)
                                                            clearTimeout(
                                                                hideTimeout.current,
                                                            );
                                                    }}
                                                    onMouseLeave={
                                                        scheduleHideTooltip
                                                    }
                                                    onFocus={() => {
                                                        if (hideTimeout.current)
                                                            clearTimeout(
                                                                hideTimeout.current,
                                                            );
                                                    }}
                                                    onBlur={scheduleHideTooltip}
                                                    onClick={() =>
                                                        openPopupFor(pin.id)
                                                    }
                                                    data-direction="down"
                                                    className="experience-tooltip"
                                                    style={{
                                                        ...tooltipBaseStyle,
                                                        fontSize: 26,
                                                    }}
                                                >
                                                    <span
                                                        style={
                                                            tooltipContentStyle
                                                        }
                                                    >
                                                        <span
                                                            style={
                                                                tooltipIconStyle
                                                            }
                                                        >
                                                            {renderTooltipIcon(
                                                                pin.icon,
                                                            )}
                                                        </span>
                                                        <span
                                                            style={
                                                                tooltipTextStyle
                                                            }
                                                        >
                                                            {pin.label}
                                                        </span>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={getTooltipArrowStyle(
                                                            "down",
                                                        )}
                                                    />
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {activePopupConfig && (
                    <VideoPopup
                        key="experience-popup"
                        title={activePopupConfig.label}
                        videoSrc={activePopupConfig.videoSrc}
                        onClose={() => setActivePopup(null)}
                    />
                )}
            </AnimatePresence>

            <style jsx>{`
                @media (max-width: 768px) {
                    .headmenu {
                        gap: 12px;
                    }
                }
            `}</style>
        </div>
    );
}
