"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import SocialIconCluster from "@/components/SocialIconCluster";

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

    const socialLinks = useMemo(
        () => ({
            apple: meta?.appleSharingLink,
            blog: meta?.mediumLink,
            instagram: meta?.instagramSharingLink,
            spotify: meta?.spotifySharingLink,
            x: meta?.xSharingLink,
            youtube: meta?.youtubeSharingLink,
        }),
        [meta],
    );

    const siblingSlugs = useMemo(() => {
        const list: string[] = [];
        for (const item of items) {
            for (const category of item.categories ?? []) {
                if (category.slug !== parentSlug) continue;
                for (const child of category.children ?? []) {
                    if (child.slug) list.push(child.slug);
                }
            }
        }
        return Array.from(new Set(list));
    }, [items, parentSlug]);

    const activeIndex = siblingSlugs.indexOf(childSlug);
    const prevSlug =
        activeIndex > 0 ? siblingSlugs[activeIndex - 1] : null;
    const nextSlug =
        activeIndex >= 0 && activeIndex < siblingSlugs.length - 1
            ? siblingSlugs[activeIndex + 1]
            : null;

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

                                <SocialIconCluster
                                    links={socialLinks}
                                    showTooltips
                                    shareTitle={cardTitle}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
