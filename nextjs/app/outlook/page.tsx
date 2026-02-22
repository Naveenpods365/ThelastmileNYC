"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";

// Word cloud data from the original HTML
const WORD_CLOUD_DATA = [
    { tag: "Process", weight: 100, percent: 12.6, size: 1260, slug: "process" },
    {
        tag: "Technology",
        weight: 97,
        percent: 12.33,
        size: 1196.01,
        slug: "technology",
    },
    {
        tag: "Employees",
        weight: 74,
        percent: 9.38,
        size: 694.12,
        slug: "employees",
    },
    {
        tag: "Accountability",
        weight: 59,
        percent: 7.51,
        size: 443.09,
        slug: "accountability",
    },
    {
        tag: "Last-Mile",
        weight: 38,
        percent: 4.83,
        size: 183.54,
        slug: "last-mile",
    },
    {
        tag: "Culture",
        weight: 29,
        percent: 3.75,
        size: 108.75,
        slug: "culture",
    },
    {
        tag: "Attendance",
        weight: 21,
        percent: 2.68,
        size: 56.28,
        slug: "attendance",
    },
    {
        tag: "Communication",
        weight: 21,
        percent: 2.68,
        size: 56.28,
        slug: "communication",
    },
    {
        tag: "Equipment",
        weight: 21,
        percent: 2.68,
        size: 56.28,
        slug: "equipment",
    },
    { tag: "Parking", weight: 21, percent: 2.68, size: 56.28, slug: "parking" },
    {
        tag: "Scheduling",
        weight: 21,
        percent: 2.68,
        size: 56.28,
        slug: "scheduling",
    },
    {
        tag: "Customer",
        weight: 19,
        percent: 2.41,
        size: 45.79,
        slug: "customer",
    },
    {
        tag: "Generating",
        weight: 19,
        percent: 2.41,
        size: 45.79,
        slug: "generating",
    },
    { tag: "LMDP", weight: 19, percent: 2.41, size: 45.79, slug: "lmdp" },
    { tag: "Metrics", weight: 19, percent: 2.41, size: 45.79, slug: "metrics" },
    {
        tag: "Assigning",
        weight: 16,
        percent: 2.14,
        size: 34.24,
        slug: "assigning",
    },
    {
        tag: "Attendance Policy",
        weight: 16,
        percent: 2.14,
        size: 34.24,
        slug: "attendance-policy",
    },
    { tag: "Cost", weight: 16, percent: 2.14, size: 34.24, slug: "cost" },
    { tag: "Hiring", weight: 16, percent: 2.14, size: 34.24, slug: "hiring" },
    {
        tag: "Management",
        weight: 16,
        percent: 2.14,
        size: 34.24,
        slug: "management",
    },
    { tag: "Tools", weight: 16, percent: 2.14, size: 34.24, slug: "tools" },
    {
        tag: "Turnover",
        weight: 16,
        percent: 2.14,
        size: 34.24,
        slug: "turnover",
    },
    {
        tag: "Optimization Algorithm",
        weight: 14,
        percent: 1.88,
        size: 26.32,
        slug: "optimization-algorithm",
    },
    {
        tag: "Tracking",
        weight: 14,
        percent: 1.88,
        size: 26.32,
        slug: "tracking",
    },
    {
        tag: "Voluntary Time Off (VTO)",
        weight: 14,
        percent: 1.88,
        size: 26.32,
        slug: "voluntary-time-off-vto",
    },
    {
        tag: "Communicating",
        weight: 12,
        percent: 1.61,
        size: 19.32,
        slug: "communicating",
    },
    {
        tag: "Data Analytics",
        weight: 12,
        percent: 1.61,
        size: 19.32,
        slug: "data-analytics",
    },
];

const OUTLOOK_VIDEO = {
    title: "Outlook",
    src: "https://clientblob1.blob.core.windows.net/websitecontent/Outlook.mp4?sv=2025-05-05&se=2026-02-16T07:06:47Z&sr=b&sp=r&sig=6Eer2mhSv61NbmjwEydaKDP2qH7TzQjw3w2kx4MRkOA%3D",
};

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

export default function OutlookPage() {
    const [showPopup, setShowPopup] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<am5.Root | null>(null);

    // Initialize word cloud
    useEffect(() => {
        if (!chartRef.current || rootRef.current) return;

        const root = am5.Root.new(chartRef.current);
        rootRef.current = root;

        function computeFontSizes() {
            const w = root.container.width();
            const minSize = Math.max(w * 0.15, 20);
            const maxSize = Math.max(w * 0.55, 60);
            return { minSize, maxSize };
        }
        const sizes = computeFontSizes();

        const series = root.container.children.push(
            am5wc.WordCloud.new(root, {
                categoryField: "tag",
                valueField: "size",
                minFontSize: sizes.minSize,
                maxFontSize: sizes.maxSize,
                fill: am5.color("#1D2C4F"),
                angles: [0],
            }),
        );

        series.labels.template.setAll({
            interactive: true,
            fontWeight: "bold",
            lineHeight: 0.8,
            cursorOverStyle: "pointer",
        });

        series.set("randomness", 0);
        series.set("animationDuration", 0);

        // Click handler
        series.labels.template.events.on("click", (ev) => {
            const ctx = ev?.target?.dataItem?.dataContext as
                | { slug?: string }
                | undefined;
            if (ctx?.slug) {
                window.location.href = `https://thelastmilenyc.com/category/${ctx.slug}/`;
            }
        });

        series.data.setAll(WORD_CLOUD_DATA);

        // Hover states
        series.labels.template.states.create("active", {
            fill: am5.color("#007A5E"),
        });
        series.labels.template.states.create("hover", {
            fill: am5.color("#007A5E"),
        });
        series.labels.template.states.create("hoverActive", {
            fill: am5.color("#007A5E"),
        });

        // Handle resize
        root.container.events.on("boundschanged", () => {
            const s = computeFontSizes();
            series.set("minFontSize", s.minSize);
            series.set("maxFontSize", s.maxSize);
        });

        series.appear(0, 0);

        return () => {
            root.dispose();
            rootRef.current = null;
        };
    }, []);

    return (
        <div className="outlook-page">
            <div className="outlook-background" />

            <div className="outlook-container">
                <Header />

                <div className="outlook-content">
                    {/* Outlook header image */}
                    <div className="outlook-header-wrapper">
                        <button
                            className="outlook-header-button"
                            onClick={() => setShowPopup(true)}
                            aria-label="Play Outlook video"
                        >
                            <Image
                                src="/images/Frame-1618873757.png"
                                alt="What is Outlook"
                                width={280}
                                height={120}
                                className="outlook-header-image"
                                priority
                            />
                        </button>
                    </div>

                    {/* Word cloud with cloud background */}
                    <div className="wordcloud-container">
                        <div className="cloud-bg">
                            <div ref={chartRef} className="chart-wrapper" />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showPopup && (
                    <VideoPopup
                        title={OUTLOOK_VIDEO.title}
                        videoSrc={OUTLOOK_VIDEO.src}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </AnimatePresence>

            <style jsx>{`
                .outlook-page {
                    min-height: 100vh;
                    background-color: #000;
                    position: relative;
                    overflow: hidden;
                }

                .outlook-background {
                    position: absolute;
                    inset: 0;
                    background-image: url(/images/home-new-1-1.png);
                    background-size: cover;
                    background-position: center;
                    opacity: 0.35;
                    pointer-events: none;
                }

                .outlook-container {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    min-height: 100vh;
                    padding: 28px 28px 24px 28px;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .outlook-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: 0;
                    background: url(/images/outlook-secbg.png);
                    background-size: cover;
                    background-position: center;
                    border-radius: 20px;
                    padding: 20px;
                    position: relative;
                    overflow: hidden;
                    min-height: 0;
                }

                .outlook-header-wrapper {
                    position: absolute;
                    z-index: 5;
                    margin-bottom: -20px;
                    top: 12%;
                    left: 08%;
                    transform: translate(-50%, -50%);
                    scale: 0.8;
                }

                .outlook-header-button {
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }

                .outlook-header-button:hover {
                    transform: scale(1.02);
                }

                .outlook-header-image {
                    height: auto;
                    display: block;
                    cursor: pointer;
                }

                .wordcloud-container {
                    width: 100%;
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }

                .cloud-bg {
                    width: 100%;
                    height: 100%;
                    max-width: 1200px;
                    max-height: 600px;
                    background: center/contain no-repeat url(/images/cloud.png);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .chart-wrapper {
                    width: 75%;
                    height: 70%;
                }

                :global(.popup-overlay) {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    z-index: 10000;
                    backdrop-filter: blur(8px);
                }

                :global(.popup-content) {
                    background: #1a1a2e;
                    border-radius: 16px;
                    padding: 24px;
                    max-width: 800px;
                    width: 100%;
                    position: relative;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                }

                :global(.popup-close) {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }

                :global(.popup-close:hover) {
                    background: rgba(255, 255, 255, 0.2);
                }

                :global(.popup-title) {
                    color: white;
                    margin: 0 0 16px 0;
                    font-size: 20px;
                    font-weight: 600;
                }

                :global(.popup-video) {
                    width: 100%;
                    border-radius: 8px;
                    display: block;
                }

                @media (max-width: 1920px) {
                    .cloud-bg {
                        height: 620px;
                        max-width: 1200px;
                    }
                }

                @media (max-width: 1600px) {
                    .cloud-bg {
                        height: 558px;
                        max-width: 1080px;
                    }
                }

                @media (max-width: 1400px) {
                    .cloud-bg {
                        height: 560px;
                        max-width: 1080px;
                    }
                }

                @media (max-width: 1280px) {
                    .cloud-bg {
                        height: 500px;
                        max-width: 970px;
                    }
                }

                @media (max-width: 1080px) {
                    .cloud-bg {
                        height: 500px;
                        max-width: 960px;
                    }
                    .chart-wrapper {
                        height: 90%;
                        margin: 15px auto 5px auto;
                    }
                }

                @media (max-width: 992px) {
                    .cloud-bg {
                        height: 400px;
                        width: 100%;
                        align-items: center;
                    }
                }

                @media (max-width: 768px) {
                    .outlook-container {
                        padding: 20px 16px;
                    }
                    .cloud-bg {
                        height: 300px;
                        width: 100%;
                    }
                    .cloud-image {
                        max-width: 280px;
                    }
                }

                @media (max-width: 560px) {
                    .cloud-bg {
                        height: 260px;
                    }
                }

                @media (max-width: 440px) {
                    .cloud-bg {
                        height: 200px;
                    }
                }

                @media (max-width: 375px) {
                    .cloud-bg {
                        height: 145px;
                    }
                }
            `}</style>
        </div>
    );
}
