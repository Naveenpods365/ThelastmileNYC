import ChildTopicView from "@/components/ChildTopicView";
import { notFound } from "next/navigation";
import { getResultPage } from "@/lib/results";

const OUTLOOK_API_URLS = Array.from(
    new Set(
        [
            process.env.LOCAL_API_OUTLOOK_URL,
            process.env.NEXT_PUBLIC_OUTLOOK_API_URL,
            "https://schedalignaz.rohans.uno/node/scheduler/api/GetWebSiteContent"
        ].filter(Boolean) as string[],
    ),
);

// Module-level cache for build-time data sharing across routes
let cachedData: Array<{ parent: string; child: string }> | null = null;
let pendingRequest: Promise<Array<{ parent: string; child: string }>> | null =
    null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let cacheTimestamp = 0;

type ApiCategory = {
    slug?: string;
    Slug?: string;
    children?: ApiCategory[];
    Children?: ApiCategory[];
};

type ApiItem = {
    categories?: ApiCategory[];
    Categories?: ApiCategory[];
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
        let payload: ApiResponse | null = null;
        let lastError: unknown = null;

        for (const url of OUTLOOK_API_URLS) {
            try {
                const response = await fetch(url, {
                    cache: "force-cache",
                    signal: controller.signal,
                    next: { revalidate: 3600 }, // Revalidate every hour
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                payload = (await response.json()) as ApiResponse;
                break;
            } catch (error) {
                lastError = error;
            }
        }

        clearTimeout(timeoutId);

        if (!payload) {
            throw lastError ?? new Error("Unable to fetch category pairs");
        }

        // Optimized data processing using flatMap
        const pairs = (payload.data ?? []).flatMap((item) => {
            const categories = item.categories ?? item.Categories ?? [];
            return categories.flatMap((category) => {
                const parentSlug = category.slug ?? category.Slug;
                if (!parentSlug) return [];
                const children = category.children ?? category.Children ?? [];
                return children
                    .filter((child): child is ApiCategory & { slug?: string; Slug?: string } =>
                        Boolean(child.slug ?? child.Slug),
                    )
                    .map((child) => ({
                        parent: parentSlug,
                        child: (child.slug ?? child.Slug) as string,
                    }));
            });
        });

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

    const resultPage = await getResultPage(child);

    return <ChildTopicView parentSlug={parent} childSlug={child} links={resultPage?.links} />;
}

export async function generateStaticParams() {
    return fetchCategoryPairsWithCache();
}
