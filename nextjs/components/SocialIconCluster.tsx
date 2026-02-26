"use client";

import { useEffect, useRef, useState } from "react";

type SocialLinks = {
    apple?: string;
    blog?: string;
    instagram?: string;
    spotify?: string;
    x?: string;
    youtube?: string;
};

type SocialIconClusterProps = {
    links?: SocialLinks;
    showTooltips?: boolean;
    shareTitle?: string;
};

type IconConfig = {
    id: keyof SocialLinks;
    label: string;
    src: string;
    className: string;
    side: "left" | "right";
    arrow?: "left" | "right";
};

const ICONS: IconConfig[] = [
    {
        id: "blog",
        label: "Blog",
        src: "/images/outlook-blog.png",
        className: "social-icon--blog",
        side: "left",
        arrow: "left",
    },
    {
        id: "x",
        label: "X",
        src: "/images/outlook-x.svg",
        className: "social-icon--x",
        side: "left",
        arrow: "left",
    },
    {
        id: "spotify",
        label: "Spotify",
        src: "/images/outlook-spotify.svg",
        className: "social-icon--spotify",
        side: "right",
        arrow: undefined,
    },
    {
        id: "apple",
        label: "Apple Podcasts",
        src: "/images/outlook-apple.png",
        className: "social-icon--podcast",
        side: "right",
        arrow: "right",
    },
    {
        id: "youtube",
        label: "YouTube",
        src: "/images/outlook-youtube.svg",
        className: "social-icon--youtube",
        side: "right",
        arrow: undefined,
    },
    {
        id: "instagram",
        label: "Instagram",
        src: "/images/outlook-instagram.png",
        className: "social-icon--instagram",
        side: "right",
        arrow: "right",
    },
];

const ShareGlyph = () => (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path
            d="M10.7 2.2l5.2 4.6-5.2 4.6V8.6c-3.6 0-6 1.5-7.7 4.8.5-4.4 2.9-7 7.7-7V2.2z"
            fill="currentColor"
        />
    </svg>
);

const ViewGlyph = () => (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path
            d="M10 4C5.5 4 2.3 7.4 1 10c1.3 2.6 4.5 6 9 6s7.7-3.4 9-6c-1.3-2.6-4.5-6-9-6zm0 9.5A3.5 3.5 0 1 1 10 6.5a3.5 3.5 0 0 1 0 7z"
            fill="currentColor"
        />
    </svg>
);

const openShare = async (url: string, title?: string) => {
    if (typeof navigator !== "undefined" && navigator.share) {
        try {
            await navigator.share({ url, title });
        } catch {
            // user dismissed share sheet
        }
        return;
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // ignore clipboard errors
        }
    }
};

export default function SocialIconCluster({
    links,
    showTooltips = false,
    shareTitle,
}: SocialIconClusterProps) {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const hideTimerRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (hideTimerRef.current) {
                window.clearTimeout(hideTimerRef.current);
            }
        };
    }, []);

    const handleEnter = (id: string) => {
        if (!showTooltips) return;
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
        }
        setActiveTooltip(id);
    };

    const handleLeave = (id: string) => {
        if (!showTooltips) return;
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = window.setTimeout(() => {
            setActiveTooltip((current) => (current === id ? null : current));
        }, 1000);
    };

    return (
        <div className="child-topic-socials">
            {ICONS.map((icon) => {
                const url = links?.[icon.id];
                const hasLink = Boolean(url);
                const showTooltip = activeTooltip === icon.id;
                return (
                    <div
                        key={icon.id}
                        className={`social-icon ${icon.className} ${
                            showTooltip ? "is-tooltip-visible" : ""
                        }`}
                        onMouseEnter={() => handleEnter(icon.id)}
                        onMouseLeave={() => handleLeave(icon.id)}
                    >
                        <div
                            className="social-icon__button"
                            aria-label={icon.label}
                        >
                            <img
                                src={icon.src}
                                alt={icon.label}
                                className="social-icon__img"
                            />
                        </div>

                        {showTooltips && showTooltip ? (
                            <div className="social-tooltip">
                                {hasLink ? (
                                    <>
                                        <button
                                            type="button"
                                            className="social-tooltip__btn"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                openShare(
                                                    url as string,
                                                    shareTitle,
                                                );
                                            }}
                                        >
                                            <img
                                                src="/images/share-outlook.svg"
                                                alt=""
                                                className="social-tooltip__icon"
                                            />
                                            Share
                                        </button>
                                        <span className="social-tooltip__divider" />
                                        <a
                                            className="social-tooltip__btn"
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src="/images/view-outlook.svg"
                                                alt=""
                                                className="social-tooltip__icon"
                                            />
                                            View
                                        </a>
                                    </>
                                ) : (
                                    <span className="social-tooltip__message">
                                        This will be coming soon.
                                    </span>
                                )}
                            </div>
                        ) : null}

                        {icon.arrow ? (
                            <span
                                className={`social-icon__arrow social-icon__arrow--${
                                    icon.side
                                }`}
                                aria-hidden="true"
                            >
                                <img
                                    src={
                                        icon.arrow === "left"
                                            ? "/images/arrow-left.png"
                                            : "/images/arrow-right.png"
                                    }
                                    alt=""
                                />
                            </span>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
