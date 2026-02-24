import Header from "@/components/Header";

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
    return (
        <div className="outlook-page">
            <div className="outlook-background" />
            <div className="outlook-container">
                <Header />
                <div className="outlook-content">
                    <div
                        style={{
                            marginTop: "80px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                background: "rgba(255,255,255,0.95)",
                                borderRadius: "999px",
                                padding: "10px 24px",
                                fontWeight: 700,
                                color: "#1d2c4f",
                                boxShadow:
                                    "0 12px 28px rgba(0, 0, 0, 0.18)",
                                fontSize: "16px",
                            }}
                        >
                            {parent} / {child}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
