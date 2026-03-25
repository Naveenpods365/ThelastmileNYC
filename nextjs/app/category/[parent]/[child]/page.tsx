import ChildTopicView from "@/components/ChildTopicView";
import { notFound } from "next/navigation";

const OUTLOOK_API_URL =
    process.env.API_OUTLOOK_URL ||
    "https://schedalign.rohans.uno/api/GetWebSiteContent";

// Module-level cache for build-time data sharing across routes
let cachedData: Array<{ parent: string; child: string }> | null = null;
let pendingRequest: Promise<Array<{ parent: string; child: string }>> | null =
    null;
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

type CategoryDetailPageProps = {
    params: Promise<{
        parent: string;
        child: string;
    }>;
};

async function fetchCategoryPairsWithCache(): Promise<
    Array<{ parent: string; child: string }>
> {
    const now = Date.now();

    // Return cached data if valid
    if (cachedData && now - cacheTimestamp < CACHE_TTL_MS) {
        return cachedData;
    }

    // Return pending request if exists (deduplication)
    if (pendingRequest) {
        return pendingRequest;
    }

    // Create new request
    pendingRequest = fetchCategoryPairs();

    try {
        const result = await pendingRequest;
        cachedData = result;
        cacheTimestamp = now;
        return result;
    } finally {
        pendingRequest = null;
    }
}

async function fetchCategoryPairs(): Promise<
    Array<{ parent: string; child: string }>
> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(OUTLOOK_API_URL, {
            cache: "force-cache",
            signal: controller.signal,
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as ApiResponse;

        // Optimized data processing using flatMap
        const pairs = (payload.data ?? []).flatMap((item) =>
            (item.categories ?? []).flatMap((category) => {
                const parentSlug = category.slug;
                if (!parentSlug) return [];
                return (category.children ?? [])
                    .filter((child): child is ApiCategory & { slug: string } =>
                        Boolean(child.slug),
                    )
                    .map((child) => ({
                        parent: parentSlug,
                        child: child.slug,
                    }));
            }),
        );

        return pairs;
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("Failed to fetch category pairs:", error);
        return [];
    }
}

export default async function CategoryDetailPage({
    params,
}: CategoryDetailPageProps) {
    const { parent, child } = await params;

    // Validate if parent/child pair exists in our static params
    const validParams = await fetchCategoryPairsWithCache();
    if (!validParams.some((p) => p.parent === parent && p.child === child)) {
        notFound();
    }

    return <ChildTopicView parentSlug={parent} childSlug={child} />;
}

export async function generateStaticParams() {
    return fetchCategoryPairsWithCache();
}
