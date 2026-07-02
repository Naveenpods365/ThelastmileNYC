"use client";

import { useEffect, useState } from "react";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        let exitTimer: ReturnType<typeof setTimeout> | null = null;
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        const startExit = () => {
            setIsAnimatingOut(true);
            hideTimer = setTimeout(() => {
                setIsLoading(false);
            }, 1200);
        };

        if (document.readyState === "complete") {
            exitTimer = setTimeout(startExit, 200);
        } else {
            window.addEventListener("load", startExit, { once: true });
        }

        return () => {
            if (exitTimer) clearTimeout(exitTimer);
            if (hideTimer) clearTimeout(hideTimer);
            window.removeEventListener("load", startExit);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className={`preloader ${isAnimatingOut ? "animate-out" : ""}`}>
            <div className="stairs-container">
                <div className="stairs stairs-1" />
                <div className="stairs stairs-2" />
                <div className="stairs stairs-3" />
                <div className="stairs stairs-4" />
                <div className="stairs stairs-5" />
                <div className="stairs stairs-6" />
            </div>
            <style jsx>{`
                .preloader {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stairs-container {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: row;
                    z-index: 1;
                }

                .stairs {
                    flex: 1;
                    background: #0c1118;
                    transform: translateY(0);
                    transition: transform 0.8s ease-out;
                }

                .stairs-1 {
                    transition-delay: 0.5s;
                }
                .stairs-2 {
                    transition-delay: 0.4s;
                }
                .stairs-3 {
                    transition-delay: 0.3s;
                }
                .stairs-4 {
                    transition-delay: 0.2s;
                }
                .stairs-5 {
                    transition-delay: 0.1s;
                }
                .stairs-6 {
                    transition-delay: 0s;
                }

                .animate-out .stairs-1 {
                    transform: translateY(-100%);
                }
                .animate-out .stairs-2 {
                    transform: translateY(-100%);
                }
                .animate-out .stairs-3 {
                    transform: translateY(-100%);
                }
                .animate-out .stairs-4 {
                    transform: translateY(-100%);
                }
                .animate-out .stairs-5 {
                    transform: translateY(-100%);
                }
                .animate-out .stairs-6 {
                    transform: translateY(-100%);
                }

            `}</style>
        </div>
    );
}
