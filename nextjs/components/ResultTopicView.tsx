"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import SocialIconCluster from "@/components/SocialIconCluster";
import type { ResultPageData } from "@/lib/results";

const OUTLOOK_VIDEO = {
    title: "Outlook",
    src: "https://clientblob1.blob.core.windows.net/websitecontent/Outlook.mp4",
};

type ResultTopicViewProps = {
    page: ResultPageData;
};

type PopupProps = {
    title: string;
    videoSrc: string;
    onClose: () => void;
};

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
                <div className="popup-video-wrapper">
                    <video
                        className="popup-video"
                        src={videoSrc}
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ResultTopicView({ page }: ResultTopicViewProps) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="outlook-page result-topic-page">
            <div className="outlook-background" />

            <div className="outlook-container">
                <Header />

                <div className="outlook-content">
                    <button
                        className="outlook-header-wrapper"
                        onClick={() => setShowPopup(true)}
                        type="button"
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

                    <div className="child-topic-stage result-topic-stage">
                        <div className="child-topic-card-wrap result-topic-card-wrap">
                            <div className="child-topic-card">
                                <div
                                    className="child-topic-card__image"
                                    style={{ position: "relative" }}
                                >
                                    <Image
                                        src={page.image}
                                        alt={page.imageAlt}
                                        fill
                                        sizes="(max-width: 768px) 86vw, 520px"
                                        style={{ objectFit: "cover" }}
                                        priority
                                    />
                                </div>
                                <div className="child-topic-card__body">
                                    <div className="child-topic-card__meta">
                                        <span className="child-topic-card__dot" />
                                        {page.publishedAt}
                                    </div>
                                    <h1 className="child-topic-card__title">
                                        {page.title}
                                    </h1>
                                    <p className="child-topic-card__text">
                                        {page.description}
                                    </p>
                                </div>
                            </div>

                            <SocialIconCluster
                                links={page.links}
                                showTooltips
                                shareTitle={page.title}
                            />
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
        </div>
    );
}
