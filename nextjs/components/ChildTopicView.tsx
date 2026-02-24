"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

const CONTENT_LIST_API_URL =
    "https://schedalign.rohans.uno/api/GetWebSiteContentList";

type ApiCategoryMeta = {
    categoryType?: string;
    categoryWeight?: number;
    categoryPercent?: number;
};

type ApiCategory = {
    name?: string;
    slug?: string;
    meta?: ApiCategoryMeta;
    children?: ApiCategory[];
};

type ApiItemMeta = {
    appleSharingLink?: string;
    instagramSharingLink?: string;
    youtubeSharingLink?: string;
    xSharingLink?: string;
    mediumLink?: string;
    spotifySharingLink?: string;
};

type ApiItem = {
    title?: string;
    content?: string;
    status?: string;
    backgroundImage?: string;
    categories?: ApiCategory[];
    meta?: ApiItemMeta;
    publicationDate?: string;
};

type ApiResponse = {
    data?: ApiItem[];
};

type ChildTopicViewProps = {
    parentSlug: string;
    childSlug: string;
};

type MatchResult = {
    item: ApiItem | null;
    parent: ApiCategory | null;
    child: ApiCategory | null;
};

const formatSlug = (value: string) =>
    value
        .replace(/\(.*?\)/g, "")
        .split("-")
        .map((word) =>
            word.length ? `${word[0].toUpperCase()}${word.slice(1)}` : word,
        )
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

const cleanText = (value?: string) =>
    value ? value.replace(/\s+/g, " ").trim() : "";

const formatDateTime = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const dateText = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
    const timeText = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
    return `${dateText} | ${timeText}`;
};

const YouTubeGlyph = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="social-icon__svg"
    >
        <path
            d="M9.5 8.25L16 12l-6.5 3.75V8.25z"
            fill="currentColor"
        />
    </svg>
);

const InstagramGlyph = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="social-icon__svg"
    >
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" ry="4" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" />
        <circle cx="16.5" cy="7.5" r="1" />
    </svg>
);

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

export default function ChildTopicView({
    parentSlug,
    childSlug,
}: ChildTopicViewProps) {
    const [items, setItems] = useState<ApiItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const load = async () => {
            try {
                setLoading(true);
                const response = await fetch(CONTENT_LIST_API_URL, {
                    cache: "no-store",
                });
                if (!response.ok) {
                    throw new Error("Failed to load content");
                }
                const payload = (await response.json()) as ApiResponse;
                if (isActive) {
                    setItems(payload.data ?? []);
                    setError(null);
                }
            } catch (err) {
                if (isActive) {
                    setError("Unable to load content.");
                }
            } finally {
                if (isActive) setLoading(false);
            }
        };

        load();

        return () => {
            isActive = false;
        };
    }, []);

    const match = useMemo<MatchResult>(() => {
        for (const item of items) {
            for (const category of item.categories ?? []) {
                if (category.slug !== parentSlug) continue;
                for (const child of category.children ?? []) {
                    if (child.slug !== childSlug) continue;
                    return { item, parent: category, child };
                }
            }
        }
        return { item: null, parent: null, child: null };
    }, [items, parentSlug, childSlug]);

    const parentLabel = match.parent?.name ?? formatSlug(parentSlug);
    const childLabel = match.child?.name ?? formatSlug(childSlug);
    const meta = match.item?.meta;
    const cardImage = match.item?.backgroundImage;
    const cardTitle = match.item?.title ?? "";
    const cardContent = cleanText(match.item?.content);
    const dateText = formatDateTime(match.item?.publicationDate);

    const socialItems = useMemo(
        () => [
            {
                id: "blog",
                label: "Medium",
                url: meta?.mediumLink,
                className: "social-icon--blog",
                glyph: <span className="social-icon__letter">M</span>,
            },
            {
                id: "x",
                label: "X",
                url: meta?.xSharingLink,
                className: "social-icon--x",
                glyph: <span className="social-icon__letter">X</span>,
            },
            {
                id: "spotify",
                label: "Spotify",
                url: meta?.spotifySharingLink,
                className: "social-icon--spotify",
                glyph: <span className="social-icon__letter">S</span>,
            },
            {
                id: "podcast",
                label: "Apple Podcasts",
                url: meta?.appleSharingLink,
                className: "social-icon--podcast",
                glyph: <span className="social-icon__letter">P</span>,
            },
            {
                id: "youtube",
                label: "YouTube",
                url: meta?.youtubeSharingLink,
                className: "social-icon--youtube",
                glyph: <YouTubeGlyph />,
            },
            {
                id: "instagram",
                label: "Instagram",
                url: meta?.instagramSharingLink,
                className: "social-icon--instagram",
                glyph: <InstagramGlyph />,
            },
        ],
        [meta],
    );

    const handleShare = async (url: string, title: string) => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ url, title });
                return;
            } catch {
                // fall back to opening the link
            }
        }
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="outlook-page">
            <div className="outlook-background" />

            <div className="outlook-container">
                <Header />

                <div className="outlook-content">
                    <div className="outlook-header-wrapper">
                        <Image
                            src="/images/Frame-1618873757.png"
                            alt="What is Outlook"
                            width={280}
                            height={120}
                            className="outlook-header-image"
                            priority
                        />
                    </div>

                    <div className="child-topic-stage">
                        <div className="child-topic-toolbar">
                            <div className="child-topic-pill">
                                <span className="child-topic-pill__text">
                                    {parentLabel}
                                </span>
                                <span className="child-topic-pill__badge">
                                    New Topic
                                </span>
                            </div>
                            <div className="child-topic-pill">
                                <span className="child-topic-pill__text">
                                    {childLabel}
                                </span>
                                <span className="child-topic-pill__badge child-topic-pill__badge--alt">
                                    New Keyword
                                </span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="child-topic-loading">Loading…</div>
                        ) : error ? (
                            <div className="child-topic-loading">{error}</div>
                        ) : !match.item ? (
                            <div className="child-topic-loading">
                                No content found.
                            </div>
                        ) : (
                            <>
                                <div className="child-topic-card">
                                    <div className="child-topic-card__image">
                                        {cardImage ? (
                                            <img
                                                src={cardImage}
                                                alt={cardTitle}
                                            />
                                        ) : (
                                            <div className="child-topic-card__placeholder" />
                                        )}
                                    </div>
                                    <div className="child-topic-card__body">
                                        <div className="child-topic-card__meta">
                                            <span className="child-topic-card__dot" />
                                            {dateText || "Published"}
                                        </div>
                                        <h3 className="child-topic-card__title">
                                            {cardTitle}
                                        </h3>
                                        <p className="child-topic-card__text">
                                            {cardContent}
                                        </p>
                                    </div>
                                </div>

                                <div className="child-topic-socials">
                                    {socialItems.map((item) =>
                                        item.url ? (
                                            <div
                                                key={item.id}
                                                className={`social-icon ${item.className}`}
                                            >
                                                <a
                                                    className="social-icon__button"
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={item.label}
                                                >
                                                    {item.glyph}
                                                </a>
                                                <div className="social-tooltip">
                                                    <button
                                                        type="button"
                                                        className="social-tooltip__btn"
                                                        onClick={() =>
                                                            handleShare(
                                                                item.url,
                                                                cardTitle,
                                                            )
                                                        }
                                                    >
                                                        <ShareGlyph />
                                                        Share
                                                    </button>
                                                    <span className="social-tooltip__divider" />
                                                    <a
                                                        className="social-tooltip__btn"
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ViewGlyph />
                                                        View
                                                    </a>
                                                </div>
                                            </div>
                                        ) : null,
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
