export type ResultPageData = {
    slug: string;
    aliases?: string[];
    eyebrow?: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    publishedAt: string;
    links: {
        apple?: string;
        blog?: string;
        instagram?: string;
        spotify?: string;
        x?: string;
        youtube?: string;
    };
};

const RESULT_CONTENT_API =
    "https://schedalign3.rohans.uno/node/scheduler/api/GetWebSiteContentResult";

export const RESULT_PAGES: ResultPageData[] = [
    {
        slug: "accountability",
        aliases: ["accountabilty"],
        title: "Creating LMDP Accountability",
        description:
            "Accountability from staff is a pre-requisite for success in last-mile contracting. Blaze a trail to accountability by learning what works in our industry, what does not, and why.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/thumbnail_for_the_Accountability.jpg",
        imageAlt: "Accountability illustration",
        publishedAt: "October 31, 2025 | 8:34 am",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-1-lmdp-accountability-the-right-approach/id1832728546?i=1000721672911",
            blog: "http://thelastmilenyc.com/how-to-build-last-mile-accountability-that-actually-works-2025-guide/",
            instagram:
                "https://www.instagram.com/p/DNU81qtyWUl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
            spotify:
                "https://open.spotify.com/episode/4dZFMJw5cDvJzRCapG3T1n?si=kCx7HrZKRDmuLB0vVr7vmQ&nd=1&dlsi=81b00ddd7f174f72",
            x: "https://x.com/JimRoyce147386/status/1955527263371591793",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsOuAs91hA6kKdApRm08Dgz1",
        },
    },
    {
        slug: "hiring",
        title: "Hiring Your LMDPs: Building the Best Delivery Teams",
        description:
            "Predicting LMDP performance based on an interview is a fool's errand. Weed out risky candidates by prioritizing adaptability and orderliness in your hiring process.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/For_the_hiring_podcast.jpg",
        imageAlt: "Hiring illustration",
        publishedAt: "October 31, 2025 | 1:13 pm",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-5-hiring/id1832728546?i=1000725667310",
            blog: "https://thelastmilenyc.com/last-mile-delivery-hiring/",
            instagram:
                "https://www.instagram.com/p/DOXjUPtEk1Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            spotify:
                "https://open.spotify.com/episode/1CIR8zshPGRmHYw1rN3DKu?si=XNx4M-zITG2vV-sNPij--w&nd=1&dlsi=aec457bb1f8840ff",
            x: "https://www.tweetlists.app/list/547155fa-6a3c-4cb2-8a3b-0342da6edab2",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsM29J94vso5XdNbm-btqSRH",
        },
    },
    {
        slug: "process-assessment",
        title: "Process Assessment",
        description:
            "Connect with Us Experience Expertise Execution Share view Share view Share view Share view Share view Share view Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/Your_Current_Software.jpg",
        imageAlt: "Process assessment illustration",
        publishedAt: "October 31, 2025 | 12:22 pm",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-8-part-2-2-process-assessment/id1832728546?i=1000728967184",
            blog: "https://thelastmilenyc.com/last-mile-delivery-process-assessment/",
            spotify:
                "https://open.spotify.com/episode/4JFkzyDZpGQt3LH1jWSBr4?si=MBkxD2R3TVuAPVZfFe712Q",
            x: "https://www.tweetlists.app/list/34c62353-79c0-4e72-a09f-05daa67644a1",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsN3qyYVJwf40aCzNFdPOWmu",
        },
    },
    {
        slug: "technology",
        aliases: ["Technology"],
        title: "Using Technology in Your LMD Operation",
        description:
            "There is no shortage of tech promising to run your last-mile operation more efficiently and profitably. Evaluate your needs, assess the product, and categorize your personal style before tethering yourself to the wrong software. *Bonus content details a framework for measuring technology's value in last-mile contracting.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/Rectangle_40309.jpg",
        imageAlt: "Technology illustration",
        publishedAt: "October 31, 2025 | 12:22 pm",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-7-part-1-2-using-technology-in-last-mile-contracting/id1832728546?i=1000727854900",
            blog: "https://thelastmilenyc.com/essential-guide-to-last-mile-technology/",
            instagram:
                "https://www.instagram.com/p/DO-7hfIkjFb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
            spotify:
                "https://open.spotify.com/episode/6A91CI25ZA4keLyvXKa5Jh?si=Iib5uwO0S_2e2QHVnlVbRA&nd=1&dlsi=a38e73f6824746d0",
            x: "https://www.tweetlists.app/list/9879bf09-7aef-43b8-b695-0d6d5b87e4f8",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsMpjh22lz9HTJIM2fJh4J1m",
        },
    },
    {
        slug: "communication",
        aliases: ["Communication"],
        title: "How to Communicate with your LMDPs",
        description:
            "Your business thrives when you provide employees with what you wish you had from your customer: predictable, reliable, actionable communication. Avoid overwhelming them with thoughtless messages through wrong channels. A well-calibrated messaging process reflects strong leadership, ensuring employees focus on content, not process, and follow without question.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/Communication_thumbnail.png",
        imageAlt: "Communication illustration",
        publishedAt: "October 31, 2025 | 12:22 pm",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-6-communication-in-the-last-mile/id1832728546?i=1000726887734",
            blog: "https://thelastmilenyc.com/essential-guide-to-last-mile-delivery-communication/",
            spotify:
                "https://open.spotify.com/episode/3oC3MReblhnvJLrMeX0rvb?si=0zSu02KlTUKNWUjxsQGpZQ&nd=1&dlsi=ab8709ec6da345d2",
            x: "https://www.tweetlists.app/list/c2b50fc7-8314-45a9-be9f-099282bb73c2",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsO5usVFxSlGvKsv80RFNWhL",
        },
    },
    {
        slug: "attendance",
        aliases: ["Attendance"],
        title: "The Riddle of Attendance",
        description:
            "In last-mile delivery, consistent attendance underpins operational success, yet accountability gaps and low switching costs fuel chronic absences. Overscheduling with voluntary time off patches shifts but heightens legal and cultural risks. This episode dissects the negative flywheel of poor systems, exposing the fragile dynamics that demand a win-win attendance solution.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/For_the_Riddle_of_Attendance.jpg",
        imageAlt: "Attendance illustration",
        publishedAt: "October 31, 2025 | 12:22 pm",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-2-the-riddle-of-attendance/id1832728546?i=1000721835463",
            blog: "https://thelastmilenyc.com/why-last-mile-attendance-is-killing-your-delivery-profits-and-how-to-fix-it/",
            instagram:
                "https://www.instagram.com/p/DNU6935yGeN/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA%3D%3D",
            spotify:
                "https://open.spotify.com/episode/1XLh1UCXdAvpl24AEo5IX8?si=_pj-XTLGRXu4HAxBtvwLNw&nd=1&dlsi=ac479544f98a45a3",
            x: "https://x.com/JimRoyce147386/status/1955677665169682533",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsN-fj97zEeGG3vUXtJIER_S",
        },
    },
    {
        slug: "scheduling",
        aliases: ["Scheduling"],
        title: "Scheduling Is the Way",
        description:
            "Attendance anchors last-mile success yet often falters under weak policies. Scheduling is your frontline sentry: a true scheduler, not a calendar, enforces accountability, optimizes shifts via real-time algorithms, captures field attendance, and fuels analytics and forecasts. This blueprint transforms fragile templates into dynamic, data-driven engines of operational excellence.",
        image: "https://clientblob1.blob.core.windows.net/websitecontent/thumbnail_for_Scheduling.jpg",
        imageAlt: "Scheduling illustration",
        publishedAt: "November 3, 2025 | 7:49 am",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/ep-3-scheduling-is-the-way/id1832728546?i=1000723472332",
            blog: "https://thelastmilenyc.com/last-mile-scheduling-makes-or-breaks-your-delivery-business-2025-guide/",
            instagram:
                "https://www.instagram.com/p/DNyYlgI5Bn-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
            spotify:
                "https://open.spotify.com/episode/6vJHNc6rQLmsyYQ0iAPldo?si=ty4mjVTGQkK_DnJsoQ1nIQ",
            x: "https://www.tweetlists.app/list/64f99283-aefa-4d94-9814-c2b323bcc418",
            youtube:
                "https://www.youtube.com/playlist?list=PLZX5-VbLmgsPEXUSrDKo-JVvYA_-rYCYV",
        },
    },
];

type ResultLinks = ResultPageData["links"];

type ApiResultPage = Partial<Omit<ResultPageData, "links">> & {
    links?: Partial<Record<keyof ResultLinks, unknown>>;
};

function asString(value: unknown, fallback = "") {
    return typeof value === "string" ? value : fallback;
}

function normalizeResultPage(page: ApiResultPage): ResultPageData | null {
    const slug = asString(page.slug).trim();
    const title = asString(page.title).trim();

    if (!slug || !title) {
        return null;
    }

    const links = page.links ?? {};

    return {
        slug,
        aliases: Array.isArray(page.aliases)
            ? page.aliases.filter((alias): alias is string => typeof alias === "string")
            : [],
        eyebrow: asString(page.eyebrow) || undefined,
        title,
        description: asString(page.description).trim(),
        image: asString(page.image).trim(),
        imageAlt: asString(page.imageAlt).trim() || `${title} illustration`,
        publishedAt: asString(page.publishedAt).trim(),
        links: {
            apple: asString(links.apple),
            blog: asString(links.blog),
            instagram: asString(links.instagram),
            spotify: asString(links.spotify),
            x: asString(links.x),
            youtube: asString(links.youtube),
        },
    };
}

function normalizeResultPages(payload: unknown): ResultPageData[] {
    const pages =
        payload &&
            typeof payload === "object" &&
            "data" in payload &&
            payload.data &&
            typeof payload.data === "object" &&
            "data" in payload.data &&
            Array.isArray(payload.data.data)
            ? payload.data.data
            : [];

    return pages
        .map((page) => normalizeResultPage(page as ApiResultPage))
        .filter((page): page is ResultPageData => Boolean(page));
}

export async function getResultPages() {
    try {
        const response = await fetch(RESULT_CONTENT_API, {
            cache: "no-store",
        });

        if (!response.ok) {
            return RESULT_PAGES;
        }

        const pages = normalizeResultPages(await response.json());
        return pages.length > 0 ? pages : RESULT_PAGES;
    } catch {
        return RESULT_PAGES;
    }
}

export async function getResultPage(slug: string) {
    const pages = await getResultPages();
    const normalizedSlug = slug.toLowerCase();

    return pages.find(
        (page) =>
            page.slug.toLowerCase() === normalizedSlug ||
            page.aliases?.some((alias) => alias.toLowerCase() === normalizedSlug),
    );
}

export async function getResultPageParams() {
    const pages = await getResultPages();
    const params = pages.flatMap((page) => [
        { slug: page.slug },
        ...(page.aliases ?? []).map((alias) => ({ slug: alias })),
    ]);

    return Array.from(
        new Map(params.map((param) => [param.slug, param])).values(),
    );
}
