"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Initial load
        const timer = setTimeout(() => {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1200);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Show preloader on route change
        setIsLoading(true);
        setIsAnimatingOut(false);

        const timer = setTimeout(() => {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1200);
        }, 800);

        return () => clearTimeout(timer);
    }, [pathname]);

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
            <div className="preloader-content">
                <Image
                    src="/images/logo-2-1.png"
                    alt="The Last Mile NYC"
                    width={200}
                    height={80}
                    priority
                    className="preloader-logo"
                />
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

                .preloader-content {
                    position: relative;
                    z-index: 2;
                    opacity: 1;
                    transform: scale(1);
                    transition:
                        opacity 0.4s ease,
                        transform 0.4s ease;
                }

                .animate-out .preloader-content {
                    opacity: 0;
                    transform: scale(0.9);
                }

                .preloader-logo {
                    width: 200px;
                    height: auto;
                    object-fit: contain;
                }
            `}</style>
        </div>
    );
}
