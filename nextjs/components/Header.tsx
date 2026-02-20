"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, correctBorderRadius, motion } from "framer-motion";
import { LinkedInIcon, MenuOpenIcon } from "@/components/Icons";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="header">
            {/* Mobile header */}
            <div className="header__mobile">
                <a
                    className="header__linkedin"
                        href="https://www.linkedin.com/in/jim-royce/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect with Us"
                    >
                        <span className="header__linkedin-text">
                            Connect With Us
                        </span>
                        <LinkedInIcon />
                    </a>

                    <div className="header__mobile-right">
                        <div
                            className="header__mobile-menu"
                            style={{ position: "relative" }}
                        >
                            <button
                                className={`header__menu-btn ${menuOpen ? "is-open" : ""}`}
                                type="button"
                                aria-label={
                                    menuOpen ? "Close Menu" : "Open Menu"
                                }
                                onClick={() => setMenuOpen((prev) => !prev)}
                            >
                                {menuOpen ? (
                                    <svg
                                        width="14"
                                        height="14"
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
                                ) : (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 9l6 6 6-6"
                                            stroke="white"
                                            strokeWidth="2.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        className="header__menu-panel"
                                        initial={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.96,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.96,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: "absolute",
                                            right: "0%",
                                            top: 46,
                                            transform: "translateX(-50%)",
                                            background:
                                                "rgba(74, 74, 74, 0.96)",
                                            borderRadius: 22,
                                            padding: "12px 16px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                            minWidth: 160,
                                            boxShadow:
                                                "0 16px 32px rgba(0, 0, 0, 0.35)",
                                            zIndex: 200,
                                        }}
                                    >
                                        {[
                                            {
                                                href: "/experience",
                                                label: "Experience",
                                            },
                                            {
                                                href: "/outlook",
                                                label: "Expertise",
                                            },
                                            {
                                                href: "/execution",
                                                label: "Execution",
                                            },
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="header__menu-item"
                                                style={{
                                                    color: "#ffffff",
                                                    fontSize: 16,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                    gap: 10,
                                                    width: "100%",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <span>{item.label}</span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        width: 1,
                                                        height: 18,
                                                        background:
                                                            "rgba(255, 255, 255, 0.35)",
                                                        display: "inline-block",
                                                        marginLeft: "auto",
                                                    }}
                                                />
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/" className="header__logo">
                            <Image
                                src="/images/logo-2.png"
                                alt="LastMile NYC"
                                width={120}
                                height={78}
                                priority
                            />
                    </Link>
                </div>
            </div>

            {/* Desktop header */}
            <div className="header__desktop">
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

                            <Link
                                href="/"
                                className="header__logo-desktop"
                                style={{ flexShrink: 0 }}
                            >
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

            <style jsx>{`
              
                .header__mobile {
                    display: none;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    position: relative;
                    z-index: 60;
                    overflow: visible;
                }

                .header__linkedin {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    color: #ffffff;
                    font-weight: 500;
                    border-radius: 11px !important;
                    font-size: 18px;
                    white-space: nowrap;
                }

                .header__linkedin :global(svg) {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px !important;
                    overflow: hidden;
                }

                .header__mobile-right {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    overflow: visible;
                }

                .header__menu-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: none;
                    background: linear-gradient(140deg, #3c6db4, #2a9ed8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
                    cursor: pointer;
                }

                .header__menu-btn.is-open {
                    background: #555a63;
                }

                .header__mobile-menu {
                    position: relative;
                }

                .header__menu-panel {
                    position: absolute;
                    left: 50%;
                    top: 46px;
                    transform: translateX(-50%);
                    background: rgba(74, 74, 74, 0.96);
                    border-radius: 22px;
                    padding: 12px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    min-width: 190px;
                    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
                    z-index: 200;
                }

                .header__menu-item {
                    color: #ffffff;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    width: 100%;
                }

                .header__menu-item::after {
                    content: "";
                    display: inline-block;
                    width: 1px;
                    height: 18px;
                    background: rgba(255, 255, 255, 0.35);
                    margin-left: auto;
                }

                .header__logo :global(img) {
                    display: block;
                    height: auto;
                    width: 120px;
                }

                .header__logo {
                    flex: 0 0 auto;
                }

                .header__logo-desktop {
                    flex: 0 0 auto;
                }

                .header__logo-desktop :global(img) {
                    max-width: none;
                }

                .header__desktop {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 20px;
                }

                @media (max-width: 1200px) {
                    .header {
                        min-height: 64px;
                    }

                    .header__desktop {
                        display: none;
                    }

                    .header__mobile {
                        display: flex;
                    }
                }
            `}</style>
        </div>
    );
}
