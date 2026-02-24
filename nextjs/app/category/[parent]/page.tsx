import OutlookView from "@/components/OutlookView";

const OUTLOOK_API_URL = "https://schedalign.rohans.uno/api/GetWebSiteContent";

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

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { parent } = await params;
    return <OutlookView initialCategorySlug={parent} />;
}

export async function generateStaticParams() {
    try {
        const response = await fetch(OUTLOOK_API_URL, { cache: "force-cache" });
        if (!response.ok) {
            return FALLBACK_SLUGS.map((parent) => ({ parent }));
        }
        const payload = (await response.json()) as ApiResponse;
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
    } catch {
        return FALLBACK_SLUGS.map((parent) => ({ parent }));
    }
}
