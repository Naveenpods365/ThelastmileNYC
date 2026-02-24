import ChildTopicView from "@/components/ChildTopicView";

const OUTLOOK_API_URL = "https://schedalign.rohans.uno/api/GetWebSiteContent";

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

export default async function CategoryDetailPage({
    params,
}: CategoryDetailPageProps) {
    const { parent, child } = await params;
    return <ChildTopicView parentSlug={parent} childSlug={child} />;
}

export async function generateStaticParams() {
    try {
        const response = await fetch(OUTLOOK_API_URL, { cache: "force-cache" });
        if (!response.ok) return [];
        const payload = (await response.json()) as ApiResponse;
        const pairs: Array<{ parent: string; child: string }> = [];
        (payload.data ?? []).forEach((item) => {
            (item.categories ?? []).forEach((category) => {
                const parentSlug = category.slug;
                if (!parentSlug) return;
                (category.children ?? []).forEach((child) => {
                    if (!child.slug) return;
                    pairs.push({ parent: parentSlug, child: child.slug });
                });
            });
        });
        return pairs;
    } catch {
        return [];
    }
}
