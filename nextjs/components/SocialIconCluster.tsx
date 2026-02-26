"use client";

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
    arrow: "left" | "right";
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
        arrow: "right",
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
        arrow: "right",
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
            return;
        } catch {
            // fall back to opening link
        }
    }
    window.open(url, "_blank", "noopener,noreferrer");
};

export default function SocialIconCluster({
    links,
    showTooltips = false,
    shareTitle,
}: SocialIconClusterProps) {
    return (
        <div className="child-topic-socials">
            {ICONS.map((icon) => {
                const url = links?.[icon.id];
                const hasLink = Boolean(url);
                return (
                    <div
                        key={icon.id}
                        className={`social-icon ${icon.className} ${
                            hasLink ? "is-active" : "is-disabled"
                        }`}
                    >
                        {hasLink ? (
                            <a
                                className="social-icon__button"
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={icon.label}
                            >
                                <img
                                    src={icon.src}
                                    alt={icon.label}
                                    className="social-icon__img"
                                />
                            </a>
                        ) : (
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
                        )}

                        {showTooltips && hasLink ? (
                            <div className="social-tooltip">
                                <button
                                    type="button"
                                    className="social-tooltip__btn"
                                    onClick={() =>
                                        openShare(url as string, shareTitle)
                                    }
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
                            </div>
                        ) : null}

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
                    </div>
                );
            })}
        </div>
    );
}
