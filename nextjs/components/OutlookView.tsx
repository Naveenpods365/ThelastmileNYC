"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";

const OUTLOOK_API_URL = "https://schedalign.rohans.uno/api/GetWebSiteContent";

type ApiCategoryMeta = {
    categoryWeight?: number;
    categoryPercent?: number;
};

type ApiCategory = {
    name?: string;
    slug?: string;
    meta?: ApiCategoryMeta;
    children?: ApiCategory[];
};

type ApiItem = {
    categories?: ApiCategory[];
};

type ApiResponse = {
    data?: ApiItem[];
    statusCode?: number;
    message?: string;
};

type WordCloudDatum = {
    tag: string;
    weight: number;
    percent: number;
    size: number;
    slug: string;
    parentSlug?: string;
};

// Word cloud data fallback from the original HTML
const DEFAULT_WORD_CLOUD_DATA: WordCloudDatum[] = [
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
    src: "https://clientblob1.blob.core.windows.net/websitecontent/Outlook.mp4",
};

const getPercent = (meta?: ApiCategoryMeta) =>
    typeof meta?.categoryPercent === "number" ? meta.categoryPercent : 0;

const buildWordCloudData = (
    categories: ApiCategory[],
    parentSlug?: string,
): WordCloudDatum[] => {
    const safeCategories = categories.filter(
        (category) => category?.slug && category?.name,
    );
    const maxPercent = safeCategories.reduce(
        (max, category) => Math.max(max, getPercent(category.meta)),
        0,
    );
    return safeCategories
        .map((category) => {
            const percent = getPercent(category.meta);
            const weight = maxPercent
                ? Math.round((percent / maxPercent) * 100)
                : 0;
            const size = Number((weight * percent).toFixed(2));
            return {
                tag: category.name as string,
                weight,
                percent,
                size,
                slug: category.slug as string,
                parentSlug,
            };
        })
        .sort((a, b) => b.percent - a.percent);
};

const buildCategoryUrl = (slug: string) =>
    `/category/${encodeURIComponent(slug)}/`;

const buildChildCategoryUrl = (parentSlug: string, childSlug: string) =>
    `/category/${encodeURIComponent(parentSlug)}/${encodeURIComponent(childSlug)}/`;

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
                    playsInline
                    preload="metadata"
                />
            </motion.div>
        </motion.div>
    );
}

type OutlookViewProps = {
    initialCategorySlug?: string | null;
};

export default function OutlookView({
    initialCategorySlug = null,
}: OutlookViewProps) {
    const [showPopup, setShowPopup] = useState(false);
    const [rootWordCloudData, setRootWordCloudData] = useState<
        WordCloudDatum[]
    >(DEFAULT_WORD_CLOUD_DATA);
    const [childWordCloudMap, setChildWordCloudMap] = useState<
        Record<string, WordCloudDatum[]>
    >({});
    const [activeCategory, setActiveCategory] = useState<string | null>(
        initialCategorySlug,
    );
    const [wordCloudData, setWordCloudData] = useState<WordCloudDatum[]>(
        DEFAULT_WORD_CLOUD_DATA,
    );
    const chartRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<am5.Root | null>(null);
    const seriesRef = useRef<am5wc.WordCloud | null>(null);
    const childWordCloudMapRef = useRef(childWordCloudMap);
    const basePathRef = useRef<string>("/outlook");

    useEffect(() => {
        childWordCloudMapRef.current = childWordCloudMap;
    }, [childWordCloudMap]);

    useEffect(() => {
        if (!initialCategorySlug) return;
        setActiveCategory(initialCategorySlug);
        updateTopicUrl(initialCategorySlug);
    }, [initialCategorySlug]);

    const updateTopicUrl = (slug: string | null) => {
        if (typeof window === "undefined") return;
        const basePath = basePathRef.current || "/outlook";
        if (!slug) {
            window.history.pushState({}, "", basePath);
            return;
        }
        window.history.pushState({}, "", `/category/${slug}/`);
    };

    const handleResetTopic = () => {
        setActiveCategory(null);
        updateTopicUrl(null);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const loadWordCloud = async () => {
            try {
                const response = await fetch(OUTLOOK_API_URL, {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(
                        `Outlook API error: ${response.status} ${response.statusText}`,
                    );
                }
                const payload = (await response.json()) as ApiResponse;
                if (!isMounted || payload.statusCode !== 200) return;
                const items = Array.isArray(payload.data) ? payload.data : [];

                const categoryMap = new Map<string, ApiCategory>();
                const childMap = new Map<string, Map<string, ApiCategory>>();

                items.forEach((item) => {
                    (item.categories ?? []).forEach((category) => {
                        const slug = category.slug;
                        if (!slug) return;

                        const existing = categoryMap.get(slug);
                        if (!existing) {
                            categoryMap.set(slug, {
                                ...category,
                                children: [],
                            });
                        } else if (
                            getPercent(category.meta) >
                            getPercent(existing.meta)
                        ) {
                            existing.meta = category.meta;
                        }

                        const childBucket =
                            childMap.get(slug) ?? new Map<string, ApiCategory>();
                        (category.children ?? []).forEach((child) => {
                            const childSlug = child.slug;
                            if (!childSlug) return;
                            const existingChild = childBucket.get(childSlug);
                            if (!existingChild) {
                                childBucket.set(childSlug, {
                                    ...child,
                                    children: [],
                                });
                            } else if (
                                getPercent(child.meta) >
                                getPercent(existingChild.meta)
                            ) {
                                existingChild.meta = child.meta;
                            }
                        });
                        childMap.set(slug, childBucket);
                    });
                });

                const mergedCategories = Array.from(categoryMap.values()).map(
                    (category) => ({
                        ...category,
                        children: Array.from(
                            childMap.get(category.slug as string)?.values() ??
                                [],
                        ),
                    }),
                );

                const nextRootData = buildWordCloudData(mergedCategories);
                const nextChildMap: Record<string, WordCloudDatum[]> = {};
                mergedCategories.forEach((category) => {
                    if (!category.slug) return;
                    const children = category.children ?? [];
                    if (children.length === 0) return;
                    nextChildMap[category.slug] = buildWordCloudData(
                        children,
                        category.slug,
                    );
                });

                if (isMounted && nextRootData.length > 0) {
                    setRootWordCloudData(nextRootData);
                    setChildWordCloudMap(nextChildMap);
                }
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }
                console.error("Failed to load outlook data", error);
            }
        };

        loadWordCloud();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const childSlugs = Object.values(childWordCloudMap).flat();
        const validSlugs = new Set(
            [...rootWordCloudData, ...childSlugs].map((item) => item.slug),
        );

        if (activeCategory) {
            if (validSlugs.size > 0 && !validSlugs.has(activeCategory)) {
                setActiveCategory(null);
                updateTopicUrl(null);
                return;
            }
            setWordCloudData(
                childWordCloudMap[activeCategory] ?? rootWordCloudData,
            );
            return;
        }
        setWordCloudData(rootWordCloudData);
    }, [activeCategory, rootWordCloudData, childWordCloudMap]);

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
        seriesRef.current = series;

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
                | WordCloudDatum
                | undefined;
            if (!ctx?.slug) return;
            if (ctx.parentSlug) {
                window.location.href = buildChildCategoryUrl(
                    ctx.parentSlug,
                    ctx.slug,
                );
                return;
            }
            const childData = childWordCloudMapRef.current[ctx.slug];
            if (childData && childData.length > 0) {
                setActiveCategory(ctx.slug);
                updateTopicUrl(ctx.slug);
                return;
            }
            window.location.href = buildCategoryUrl(ctx.slug);
        });

        series.data.setAll(wordCloudData);

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

    useEffect(() => {
        if (!seriesRef.current) return;
        seriesRef.current.data.setAll(wordCloudData);
    }, [wordCloudData]);

    const activeCategoryLabel = activeCategory
        ? rootWordCloudData.find((item) => item.slug === activeCategory)?.tag ??
          activeCategory
        : null;

    return (
        <div className="outlook-page">
            <div className="outlook-background" />

            <div className="outlook-container">
                <Header />

                <div className="outlook-content">
                    {/* Outlook header image */}
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

                    {/* Word cloud with cloud background */}
                    <div className="wordcloud-container">
                        {activeCategory && (
                            <div className="wordcloud-toolbar">
                                <span className="wordcloud-title">
                                    {activeCategoryLabel}
                                </span>
                                <button
                                    className="wordcloud-newtopic"
                                    onClick={handleResetTopic}
                                >
                                    New Topic
                                </button>
                            </div>
                        )}
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
                    background: #ffffff;
                    border-radius: 16px;
                    padding: 24px;
                    max-width: 900px;
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
                    background: rgba(0, 0, 0, 0.1);
                    color: #333;
                    font-size: 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }

                :global(.popup-close:hover) {
                    background: rgba(0, 0, 0, 0.2);
                }

                :global(.popup-title) {
                    color: #333;
                    margin: 0 0 16px 0;
                    font-size: 20px;
                    font-weight: 600;
                }

                :global(.popup-video) {
                    width: 100%;
                    border-radius: 8px;
                    display: block;
                }
            `}</style>
        </div>
    );
}
