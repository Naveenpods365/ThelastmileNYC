"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface VideoPopupProps {
    title: string;
    videoSrc: string;
    onClose: () => void;
}

export function VideoPopup({ title, videoSrc, onClose }: VideoPopupProps) {
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
