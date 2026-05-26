import ResultTopicView from "@/components/ResultTopicView";
import { getResultPage } from "@/lib/results";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ResultPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: ResultPageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getResultPage(slug);

    if (!page) {
        return {};
    }

    return {
        title: `${page.title} - Last Mile NYC`,
        description: page.description,
        alternates: {
            canonical: `https://thelastmilenyc.com/results/${page.slug}/`,
        },
        openGraph: {
            title: `${page.title} - Last Mile NYC`,
            description: page.description,
            url: `https://thelastmilenyc.com/results/${page.slug}/`,
            siteName: "LastMile NYC",
            images: [
                {
                    url: page.image,
                    alt: page.imageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${page.title} - Last Mile NYC`,
            description: page.description,
            images: [page.image],
        },
    };
}

export default async function ResultPage({ params }: ResultPageProps) {
    const { slug } = await params;
    const page = await getResultPage(slug);

    if (!page) {
        notFound();
    }

    return <ResultTopicView page={page} />;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
