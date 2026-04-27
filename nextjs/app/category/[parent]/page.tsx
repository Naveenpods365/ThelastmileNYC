import OutlookView from "@/components/OutlookView";
import { notFound } from "next/navigation";

const OUTLOOK_API_URL =
    process.env.LOCAL_API_OUTLOOK_URL;

const FALLBACK_SLUGS = [
    "process",
    "technology",
    "employees",
    "accountability",
    "last-mile",
    "culture",
    "attendance",
    "communication",
    "equipment",
    "parking",
    "scheduling",
    "customer",
    "generating",
    "lmdp",
    "metrics",
    "assigning",
    "attendance-policy",
    "cost",
    "hiring",
    "management",
    "tools",
    "turnover",
    "optimization-algorithm",
    "tracking",
    "voluntary-time-off-vto",
    "communicating",
    "data-analytics",
];

// Module-level cache for build-time data sharing
let cachedSlugs: Array<{ parent: string }> | null = null;
let pendingRequest: Promise<Array<{ parent: string }>> | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let cacheTimestamp = 0;

type ApiCategory = {
    slug?: string;
    children?: ApiCategory[];
};

type ApiItem = {
    categories?: ApiCategory[];
};

type ApiResponse = {
    data?: ApiItem[];
};

type CategoryPageProps = {
    params: Promise<{
        parent: string;
    }>;
};

async function fetchParentSlugsWithCache(): Promise<Array<{ parent: string }>> {
    const now = Date.now();

    // Return cached data if valid
    if (cachedSlugs && now - cacheTimestamp < CACHE_TTL_MS) {
        return cachedSlugs;
    }

    // Return pending request if exists (deduplication)
    if (pendingRequest) {
        return pendingRequest;
    }

    // Create new request
    pendingRequest = fetchParentSlugs();

    try {
        const result = await pendingRequest;
        cachedSlugs = result;
        cacheTimestamp = now;
        return result;
    } finally {
        pendingRequest = null;
    }
}

async function fetchParentSlugs(): Promise<Array<{ parent: string }>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    if (!OUTLOOK_API_URL) {
        throw new Error("LOCAL_API_OUTLOOK_URL is not defined");
    }

    try {
        const response = await fetch(OUTLOOK_API_URL, {
            cache: "force-cache",
            signal: controller.signal,
            next: { revalidate: 3600 },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as ApiResponse;

        // Optimized data processing using flatMap and Set
        const slugs = new Set<string>();
        (payload.data ?? []).forEach((item) => {
            (item.categories ?? []).forEach((category) => {
                if (category.slug) slugs.add(category.slug);
            });
        });

        const result = Array.from(slugs);
        if (result.length === 0) {
            return FALLBACK_SLUGS.map((parent) => ({ parent }));
        }

        return result.map((parent) => ({ parent }));
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("Failed to fetch parent slugs:", error);
        return FALLBACK_SLUGS.map((parent) => ({ parent }));
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { parent } = await params;

    // Validate if parent exists in our static params to avoid build errors for unknown routes
    const validParams = await fetchParentSlugsWithCache();
    if (!validParams.some((p) => p.parent === parent)) {
        notFound();
    }

    return <OutlookView initialCategorySlug={parent} />;
}

export async function generateStaticParams() {
    return fetchParentSlugsWithCache();
}
