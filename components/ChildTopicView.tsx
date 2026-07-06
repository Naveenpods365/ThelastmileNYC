"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import SocialIconCluster from "@/components/SocialIconCluster";

const CONTENT_LIST_API_URL =
    (typeof window === "undefined"
        ? (process.env.API_CONTENT_LIST_URL ||
          process.env.NEXT_PUBLIC_CONTENT_LIST_API_URL)
        : process.env.NEXT_PUBLIC_CONTENT_LIST_API_URL) || "https://schedalignaz.rohans.uno/node/scheduler/api/GetWebSiteContentList";

const OUTLOOK_VIDEO = {
    title: "Outlook",
    src: "https://clientblob1.blob.core.windows.net/websitecontent/Outlook.mp4",
};

type ApiCategoryMeta = {
    categoryType?: string;
    categoryWeight?: number;
    categoryPercent?: number;
};

type ApiCategory = {
    name?: string;
    Name?: string;
    slug?: string;
    Slug?: string;
    meta?: ApiCategoryMeta;
    Meta?: ApiCategoryMeta;
    children?: ApiCategory[];
    Children?: ApiCategory[];
};

type ApiItemMeta = {
    appleSharingLink?: string;
    AppleSharingLink?: string;
    instagramSharingLink?: string;
    InstagramSharingLink?: string;
    youtubeSharingLink?: string;
    YoutubeSharingLink?: string;
    xSharingLink?: string;
    XSharingLink?: string;
    mediumLink?: string;
    MediumLink?: string;
    spotifySharingLink?: string;
    SpotifySharingLink?: string;
};

type ApiItemLinks = {
    Spotify?: string | null;
    Apple?: string | null;
    YouTube?: string | null;
    X?: string | null;
    LinkedIn?: string | null;
    Instagram?: string | null;
    Medium?: string | null;
    Blog?: string | null;
    spotify?: string | null;
    apple?: string | null;
    youtube?: string | null;
    x?: string | null;
    linkedIn?: string | null;
    instagram?: string | null;
    medium?: string | null;
    blog?: string | null;
};

type ApiItem = {
    title?: string;
    Title?: string;
    content?: string;
    Content?: string;
    status?: string;
    Status?: string;
    backgroundImage?: string;
    BackgroundImage?: string;
    categories?: ApiCategory[];
    Categories?: ApiCategory[];
    meta?: ApiItemMeta;
    Meta?: ApiItemMeta;
    links?: ApiItemLinks;
    Links?: ApiItemLinks;
    publicationDate?: string;
    PublicationDate?: string;
    appleSharingLink?: string;
    AppleSharingLink?: string;
    instagramSharingLink?: string;
    InstagramSharingLink?: string;
    youtubeSharingLink?: string;
    YoutubeSharingLink?: string;
    xSharingLink?: string;
    XSharingLink?: string;
    mediumLink?: string;
    MediumLink?: string;
    spotifySharingLink?: string;
    SpotifySharingLink?: string;
};

type ApiResponse = {
    data?: ApiItem[];
};

type SocialLinks = {
    apple?: string;
    blog?: string;
    instagram?: string;
    spotify?: string;
    x?: string;
    youtube?: string;
};

type ChildTopicViewProps = {
    parentSlug: string;
    childSlug: string;
    links?: SocialLinks;
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

export default function ChildTopicView({
    parentSlug,
    childSlug,
    links: externalLinks,
}: ChildTopicViewProps) {
    const [items, setItems] = useState<ApiItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

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
            const categories = item.categories ?? item.Categories ?? [];
            for (const category of categories) {
                const catSlug = category.slug ?? category.Slug;
                if (catSlug !== parentSlug) continue;
                const children = category.children ?? category.Children ?? [];
                for (const child of children) {
                    const childSlugValue = child.slug ?? child.Slug;
                    if (childSlugValue !== childSlug) continue;
                    return { item, parent: category, child };
                }
            }
        }
        return { item: null, parent: null, child: null };
    }, [items, parentSlug, childSlug]);

    const parentLabel = match.parent?.name ?? match.parent?.Name ?? formatSlug(parentSlug);
    const childLabel = match.child?.name ?? match.child?.Name ?? formatSlug(childSlug);
    const meta = match.item?.meta ?? match.item?.Meta;
    const cardImage = match.item?.backgroundImage ?? match.item?.BackgroundImage;
    const cardTitle = match.item?.title ?? match.item?.Title ?? "";
    const cardContent = cleanText(match.item?.content ?? match.item?.Content);
    const dateText = formatDateTime(match.item?.publicationDate ?? match.item?.PublicationDate);

    const apiLinks = match.item?.Links ?? match.item?.links;

    const socialLinks = useMemo(
        () => externalLinks ?? ({
            apple: apiLinks?.Apple ?? apiLinks?.apple ?? meta?.appleSharingLink ?? meta?.AppleSharingLink ?? match.item?.appleSharingLink ?? match.item?.AppleSharingLink,
            blog: apiLinks?.Blog ?? apiLinks?.blog ?? apiLinks?.Medium ?? apiLinks?.medium ?? meta?.mediumLink ?? meta?.MediumLink ?? match.item?.mediumLink ?? match.item?.MediumLink,
            instagram: apiLinks?.Instagram ?? apiLinks?.instagram ?? meta?.instagramSharingLink ?? meta?.InstagramSharingLink ?? match.item?.instagramSharingLink ?? match.item?.InstagramSharingLink,
            spotify: apiLinks?.Spotify ?? apiLinks?.spotify ?? meta?.spotifySharingLink ?? meta?.SpotifySharingLink ?? match.item?.spotifySharingLink ?? match.item?.SpotifySharingLink,
            x: apiLinks?.X ?? apiLinks?.x ?? meta?.xSharingLink ?? meta?.XSharingLink ?? match.item?.xSharingLink ?? match.item?.XSharingLink,
            youtube: apiLinks?.YouTube ?? apiLinks?.youtube ?? meta?.youtubeSharingLink ?? meta?.YoutubeSharingLink ?? match.item?.youtubeSharingLink ?? match.item?.YoutubeSharingLink,
        }),
        [meta, match.item, externalLinks, apiLinks],
    );

    return (
        <div className={`outlook-page ${loading ? "is-loading" : ""}`}>
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

                    {/* navigation arrows removed per design */}

                    <div className="child-topic-stage">
                        <div className="child-topic-toolbar">
                            <div className="child-topic-pill">
                                <span className="child-topic-pill__text">
                                    {parentLabel}
                                </span>
                                <a
                                    className="child-topic-pill__badge"
                                    href="/outlook"
                                >
                                    New Topic
                                </a>
                            </div>
                            <div className="child-topic-pill">
                                <span className="child-topic-pill__text">
                                    {childLabel}
                                </span>
                                <a
                                    className="child-topic-pill__badge child-topic-pill__badge--alt"
                                    href={`/category/${encodeURIComponent(parentSlug)}/`}
                                >
                                    New Keyword
                                </a>
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
                                <div className="child-topic-card-wrap">
                                    <div className="child-topic-card">
                                        <div
                                            className="child-topic-card__image"
                                            style={{ position: "relative" }}
                                        >
                                            {cardImage ? (
                                                <Image
                                                    src={cardImage}
                                                    alt={cardTitle}
                                                    fill
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
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

                                    <SocialIconCluster
                                        links={socialLinks}
                                        showTooltips
                                        shareTitle={cardTitle}
                                    />
                                </div>
                            </>
                        )}
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
