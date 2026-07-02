import { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
    title: "The Ultimate Guide to Last Mile Delivery Hiring: What Actually Works in 2025 - Last Mile Workforce Management Software and Solutions",
    description:
        "In today's tech-saturated delivery driver hiring landscape, the performance of every frontline worker is quantified down to the minute. Last-mile delivery is",
    alternates: {
        canonical: "https://thelastmilenyc.com/last-mile-delivery-hiring/",
    },
    openGraph: {
        locale: "en_US",
        type: "article",
        title: "The Ultimate Guide to Last Mile Delivery Hiring: What Actually Works in 2025 - Last Mile Workforce Management Software and Solutions",
        description:
            "In today's tech-saturated delivery driver hiring landscape, the performance of every frontline worker is quantified down to the minute. Last-mile delivery is",
        url: "https://thelastmilenyc.com/last-mile-delivery-hiring/",
        siteName: "LastMile NYC",
        images: [
            {
                url: "https://thelastmilenyc.umananda.in/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-1.15.18-PM.png",
                width: 1448,
                height: 814,
                alt: "last mile delivery hiring",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Ultimate Guide to Last Mile Delivery Hiring: What Actually Works in 2025",
        description:
            "In today's tech-saturated delivery driver hiring landscape, the performance of every frontline worker is quantified down to the minute.",
        images: [
            "https://thelastmilenyc.umananda.in/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-1.15.18-PM.png",
        ],
    },
};

const WP_BASE = "https://thelastmilenyc.umananda.in/wp-content/uploads";

export default function BlogArticle() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div className="wp-blog">
                {/* ─── Mobile-only sticky podcast bar ─── */}
                <div className="wp-mobile-podcast-bar">
                    <Link
                        href="https://open.spotify.com/episode/1CIR8zshPGRmHYw1rN3DKu?si=XNx4M-zITG2vV-sNPij--w"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wp-mobile-podcast-btn"
                    >
                        <span className="wp-podcast-icon wp-podcast-icon--spotify">
                            <svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#1ED760"
                                    d="M105 0h302c57.928.155 104.845 47.072 105 104.996V407c-.155 57.926-47.072 104.844-104.996 104.998L105 512C47.074 511.844.156 464.926.002 407.003L0 105C.156 47.072 47.074.155 104.997 0H105z"
                                />
                                <path
                                    fill="#fff"
                                    fillRule="nonzero"
                                    d="M256 71.498c-101.898 0-184.506 82.605-184.506 184.503 0 101.901 82.608 184.503 184.506 184.503 101.909 0 184.509-82.6 184.509-184.503 0-101.893-82.6-184.495-184.512-184.495l.003-.011v.003zm84.614 266.109c-3.304 5.418-10.398 7.14-15.819 3.811-43.319-26.462-97.855-32.453-162.08-17.78-6.189 1.409-12.358-2.468-13.769-8.659-1.418-6.192 2.446-12.36 8.651-13.769 70.284-16.058 130.571-9.144 179.206 20.577 5.422 3.327 7.141 10.398 3.811 15.82zm22.584-50.238c-4.166 6.767-13.022 8.903-19.786 4.741-49.596-30.485-125.193-39.314-183.856-21.504-7.608 2.296-15.642-1.99-17.95-9.585-2.292-7.608 1.998-15.626 9.592-17.939 67.007-20.331 150.31-10.484 207.265 24.515 6.763 4.166 8.9 13.022 4.738 19.778v-.003l-.003-.003zm1.94-52.314c-59.468-35.32-157.577-38.566-214.352-21.335-9.117 2.765-18.759-2.38-21.521-11.5-2.762-9.121 2.38-18.755 11.502-21.526 65.175-19.786 173.519-15.964 241.984 24.682 8.217 4.868 10.907 15.457 6.037 23.646-4.85 8.201-15.469 10.904-23.641 6.033h-.009z"
                                />
                            </svg>
                        </span>
                        <span className="wp-podcast-label">Ep 5 : Hiring</span>
                    </Link>
                    <Link
                        href="https://podcasts.apple.com/us/podcast/ep-5-hiring/id1832728546?i=1000725667310"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wp-mobile-podcast-btn"
                    >
                        <span className="wp-podcast-icon wp-podcast-icon--apple">
                            <svg
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <span className="wp-podcast-label">Ep 5 : Hiring</span>
                    </Link>
                </div>

                {/* ─── Two-column wrapper ─── */}
                <div className="wp-layout-row">
                    {/* ─── Article content column (70%) ─── */}
                    <div className="wp-boxed-col">
                        <h1 className="wp-post-title">
                            The Ultimate Guide to Last Mile Delivery Hiring:
                            What Actually Works in 2025
                        </h1>

                        {/* Meta row */}
                        <div className="wp-meta-row">
                            <div className="wp-author">
                                <img
                                    src={`${WP_BASE}/2025/09/1730877940198-1.jpeg`}
                                    alt="Jim Royce"
                                    className="wp-author-img"
                                />
                                <span className="wp-author-name">
                                    Jim Royce
                                </span>
                            </div>
                            <div className="wp-post-info">
                                <span className="wp-info-item">
                                    <svg
                                        viewBox="0 0 512 512"
                                        className="wp-icon"
                                    >
                                        <path
                                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    11:39 am
                                </span>
                                <span className="wp-info-item">
                                    <svg
                                        viewBox="0 0 448 512"
                                        className="wp-icon"
                                    >
                                        <path
                                            d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    October 9, 2025
                                </span>
                            </div>
                            {/* Share buttons */}
                            <div className="wp-share-btns">
                                <a
                                    href="#"
                                    className="wp-share-btn wp-share-fb"
                                    aria-label="Share on Facebook"
                                >
                                    <svg viewBox="0 0 512 512">
                                        <path
                                            d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="wp-share-btn wp-share-tw"
                                    aria-label="Share on Twitter"
                                >
                                    <svg viewBox="0 0 512 512">
                                        <path
                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="wp-share-btn wp-share-li"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg viewBox="0 0 448 512">
                                        <path
                                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="wp-share-btn wp-share-wa"
                                    aria-label="Share on WhatsApp"
                                >
                                    <svg viewBox="0 0 448 512">
                                        <path
                                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Featured image */}
                        <img
                            src={`${WP_BASE}/2025/10/Screenshot-2025-10-21-at-1.15.18-PM.png`}
                            alt="Last Mile Delivery Hiring"
                            className="wp-featured-img"
                        />

                        {/* ─── Intro text ─── */}
                        <div className="wp-content">
                            <p>
                                <span style={{ fontWeight: 400 }}>In today&apos;s tech-saturated </span>
                                <b>delivery driver hiring landscape,</b>
                                <span style={{ fontWeight: 400 }}> the performance of every frontline worker is quantified down to the minute. Last-mile delivery is an exercise in repeatability — <i>scan, load, deliver, repeat</i>. However, reducing work to metrics alone devalues the very qualities that actually drive performance under pressure: judgment, composure, and adaptability.</span>
                            </p>
                            <p>
                                <span style={{ fontWeight: 400 }}>As e-commerce and on-demand services continue to grow, the demand for </span>
                                <b>skilled last mile delivery professionals</b>
                                <span style={{ fontWeight: 400 }}> has never been higher. Yet, hiring the right delivery personnel isn&apos;t just about finding someone who can drive a vehicle or deliver packages. Instead, it requires a blend of technical know-how, logistical insight, and exceptional soft skills. In urban areas, entry-level positions typically offer hourly rates ranging from $17 to $22 , while mid-level professionals can expect $22 to $28 per hour as of 2024.</span>
                            </p>
                            <p>
                                <span style={{ fontWeight: 400 }}>I&apos;ve spent years in the trenches of last-mile operations, and one thing has become crystal clear: <i>traditional hiring approaches are failing us</i>. The industry&apos;s tendency to reduce complex work to simple metrics has created a dangerous blind spot in how we recruit and retain talent. </span>
                            </p>
                            <p>
                                <span style={{ fontWeight: 400 }}>In this guide, I&apos;ll show you what actually works when building a </span>
                                <b>delivery team</b>
                                <span style={{ fontWeight: 400 }}> that can perform under pressure, adapt to challenges, and deliver consistent results.</span>
                            </p>

                            <h2>
                                <br />
                                <b>Content Overview</b>
                            </h2>
                            <p>
                                <span style={{ fontWeight: 400 }}>Looking ahead to what we&apos;ll cover, this guide breaks down the practical steps to build an effective delivery driver hiring system that actually works in today&apos;s competitive landscape. Each section tackles a specific challenge I&apos;ve faced when building successful last mile delivery teams.</span>
                            </p>

                            {/* Content overview icon-boxes */}
                            {[
                                {
                                    num: 1,
                                    href: "#section1",
                                    title: "1. Why traditional hiring fails in last mile delivery",
                                    desc: "Traditional hiring methods focusing primarily on driving experience and resume screening often miss what truly matters. We'll examine why conventional approaches lead to high turnover rates and why simple metrics-based evaluation fails to identify candidates who can truly excel under pressure.",
                                },
                                {
                                    num: 2,
                                    href: "#section2",
                                    title: "2. What traits actually matter in a delivery driver",
                                    desc: "Beyond driving skills, successful delivery drivers share specific personality traits and capabilities. From adaptability to problem-solving, we'll explore the often-overlooked qualities that separate high-performing drivers from those who quickly burn out or underperform.",
                                },
                                {
                                    num: 3,
                                    href: "#section3",
                                    title: "3. How to build a hiring funnel that works",
                                    desc: "A thoughtfully designed hiring funnel can dramatically improve your candidate quality. This section outlines a step-by-step process for creating friction points that filter out unmotivated applicants while identifying those with genuine commitment and potential.",
                                },
                                {
                                    num: 4,
                                    href: "#section4",
                                    title: "4. Avoiding short-term thinking in recruitment",
                                    desc: "Many last mile operations fall into the trap of quick fixes—poaching drivers from competitors or cutting corners during busy seasons. We'll discuss the hidden costs of these approaches and offer alternatives that build lasting value for your operation.",
                                },
                                {
                                    num: 5,
                                    href: "#section5",
                                    title: "5. Building a system that scales with quality",
                                    desc: "Finally, we'll explore how to develop a hiring system that maintains quality as your operation grows. From aligning recruitment with company values to implementing feedback loops, you'll learn how to create a sustainable talent pipeline that supports business growth.",
                                },
                            ].map((box) => (
                                <div key={box.num} className="wp-icon-box">
                                    <div className="wp-icon-box-content">
                                        <h3 className="wp-icon-box-title">
                                            <a href={box.href}>{box.title}</a>
                                        </h3>
                                        <p className="wp-icon-box-desc">
                                            {box.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <p>
                                <span style={{ fontWeight: 400 }}>Throughout this guide, I&apos;ll share practical examples from my years managing last mile operations, offering insights that go beyond theory. My goal is simple: to help you build a hiring process that consistently identifies drivers who will excel in the unique challenges of last mile delivery.</span>
                            </p>

                            {/* ─── Section 1 ─── */}
                            <div id="section1" className="wp-section">
                                <h2>Why Traditional Hiring Doesn&apos;t Work Anymore</h2>
                                <img
                                    fetchPriority="high"
                                    decoding="async"
                                    src={`${WP_BASE}/2025/10/Screenshot-2025-10-21-at-1.21.59-PM-1024x683.png`}
                                    alt=""
                                    className="wp-featured-img"
                                />
                                <p>
                                    <b>Traditional hiring methods</b>
                                    <span style={{ fontWeight: 400 }}> are rapidly becoming outdated in the fast-paced world of last mile delivery. The approaches that worked a decade ago simply don&apos;t cut it anymore, especially as consumer expectations and delivery demands continue to evolve.</span>
                                </p>
                                <h3><b>The problem with resume-based filtering</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Resumes tell an incomplete story when it comes to delivery driver potential. They focus primarily on driving history and past employment but fail to capture the qualities that truly matter in day-to-day delivery operations. Furthermore, resume filtering often eliminates potentially excellent candidates who may lack the “right” keywords or previous delivery experience but possess the crucial soft skills needed for success.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Many </span>
                                    <b>delivery operations managers</b>
                                    <span style={{ fontWeight: 400 }}>, including those at major companies like <i>Amazon</i> and <i>FedEx</i>, have found that candidates with perfect resumes often struggle with the actual demands of the job. This disconnect occurs because paper qualifications rarely translate to real-world performance in the unpredictable environment of last mile delivery.</span>
                                </p>
                                <h3><b>High churn and low commitment in last mile hiring</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The revolving door of delivery driver employment remains one of the industry&apos;s biggest challenges. Traditional hiring approaches frequently result in placing people who view the position as merely transitional rather than a career path. Consequently, these drivers leave as soon as something seemingly better comes along.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>This churn creates a vicious cycle: operations managers, desperate to fill routes, lower their standards and rush the </span>
                                    <b>hiring process</b>
                                    <span style={{ fontWeight: 400 }}>, bringing in less committed drivers who then exit quickly, perpetuating the problem. The real cost isn&apos;t just in recruitment—it&apos;s in the constant training, reduced customer satisfaction, and operational disruptions that accompany high turnover rates.</span>
                                </p>
                                <h3><b>Why metrics-first hiring leads to poor results</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Perhaps the most damaging aspect of traditional hiring is its overemphasis on quantifiable metrics like:</span>
                                </p>
                                <ul>
                                    <li><span style={{ fontWeight: 400 }}>Driving record scores</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Package handling speed</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Route completion times</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Vehicle operation skills</span></li>
                                </ul>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Although these measurements seem logical, they miss the </span>
                                    <b>human element</b>
                                    <span style={{ fontWeight: 400 }}> that distinguishes exceptional delivery professionals. A driver might excel at speed metrics in controlled settings yet crumble under the pressure of real-world variables like </span>
                                    <b>traffic congestion, difficult customers, or building access challenges.</b>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Metrics-first approaches also neglect to assess critical qualities such as problem-solving ability, customer service orientation, and adaptability—traits that ultimately determine whether a driver succeeds or fails in the field.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>By focusing exclusively on what can be easily measured rather than what truly matters, traditional hiring methods create teams that look good on paper but underperform in practice. This disconnect explains why so many delivery operations struggle despite seemingly rigorous hiring standards.</span>
                                </p>
                            </div>

                            {/* ─── Section 2 ─── */}
                            <div id="section2" className="wp-section">
                                <h2>What Actually Makes a Great Delivery Driver</h2>
                                <img
                                    decoding="async"
                                    src={`${WP_BASE}/2025/10/Screenshot-2025-10-21-at-1.23.30-PM-1024x678.png`}
                                    alt=""
                                    className="wp-featured-img"
                                />
                                <p>
                                    <span style={{ fontWeight: 400 }}>Looking beyond basic driving abilities, the most successful delivery teams are built by identifying candidates with specific personality traits and capabilities that traditional hiring processes often miss. My experience shows that focusing on these four key areas yields drivers who not only perform well but stay with your company longer.</span>
                                </p>
                                <h3><b>Orderliness and following instructions</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Exceptional delivery drivers exhibit meticulous </span>
                                    <b>organization</b> <b>skills</b>
                                    <span style={{ fontWeight: 400 }}> that directly impact performance. They keep their vehicles organized for quick access to packages, which significantly increases both speed and accuracy. This orderliness extends to paperwork management, record keeping, and the ability to prioritize tasks effectively.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The best drivers are those who can juggle </span>
                                    <b>multiple</b> <b>responsibilities</b>
                                    <span style={{ fontWeight: 400 }}> simultaneously without becoming overwhelmed. They understand the importance of following established protocols and can maintain focus on details without sacrificing efficiency. This balanced approach to organization separates top performers from those who either spend too much time organizing (slowing deliveries) or too little (creating errors).</span>
                                </p>
                                <h3><b>Adaptability in unpredictable situations</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Delivery routes present constant challenges that require quick thinking and flexibility. Superior drivers demonstrate the ability to:</span>
                                </p>
                                <ul>
                                    <li><span style={{ fontWeight: 400 }}>Adapt to changing weather conditions, traffic delays, and schedule alterations</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Think on their feet when faced with unexpected obstacles</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Remain calm under pressure, especially when dealing with time constraints</span></li>
                                </ul>
                                <p>
                                    <span style={{ fontWeight: 400 }}>This adaptability isn&apos;t just about handling problems—it&apos;s about maintaining </span>
                                    <b>consistent</b> <b>performance</b>
                                    <span style={{ fontWeight: 400 }}> regardless of circumstances. As one industry expert noted, “<i>Challenges are inevitable, be it unexpected traffic snarls or adverse weather conditions, your commitment to overcoming them and adaptability will be the key aspect setting you apart as a delivery driver</i>“.</span>
                                </p>
                                <h3><b>Customer service and communication</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Since delivery drivers often serve as the public face of your company, their customer service skills directly impact brand perception. According to <i>American Express</i>, <i>86% of consumers are willing to pay more for better customer experiences. </i>Therefore, prioritizing candidates with strong communication abilities is essential.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Effective drivers can clearly communicate with customers, colleagues, and dispatch personnel. They understand the importance of friendly interactions, keeping customers informed about delivery status, and resolving issues promptly. Additionally, they recognize opportunities to build relationships with regular customers, enhancing loyalty and satisfaction.</span>
                                </p>
                                <h3><b>Cultural fit and long-term mindset</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Drivers who align with your company&apos;s values and see the position as more than just a temporary job ultimately deliver better results. They take pride in representing your brand professionally and understand how their performance affects the business as a whole.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The ideal candidates demonstrate </span>
                                    <b>accountability</b>
                                    <span style={{ fontWeight: 400 }}>, viewing themselves as integral team members rather than independent contractors. They maintain a positive attitude even during challenging situations and show commitment to continuous improvement. Notably, drivers feel greater responsibility when they have a solid relationship with management, highlighting the importance of building a supportive culture that encourages retention.</span>
                                </p>
                            </div>

                            {/* ─── Section 3 ─── */}
                            <div id="section3" className="wp-section">
                                <h2>Designing a Hiring Funnel That Filters for Quality</h2>
                                <img
                                    decoding="async"
                                    src={`${WP_BASE}/2025/10/Screenshot-2025-10-21-at-1.24.44-PM-1024x675.png`}
                                    alt=""
                                    className="wp-featured-img"
                                />
                                <p>
                                    <span style={{ fontWeight: 400 }}>Creating an effective system for screening delivery driver candidates requires a thoughtfully designed </span>
                                    <b>hiring funnel</b>
                                    <span style={{ fontWeight: 400 }}>. Unlike traditional methods that simply collect resumes, a quality-focused funnel actively filters out unmotivated applicants before they waste your time.</span>
                                </p>
                                <h3><b>Writing a clear and purpose-driven job ad</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The foundation of any successful hiring process begins with a well-crafted job description. Your </span>
                                    <b>delivery driver job ad</b>
                                    <span style={{ fontWeight: 400 }}> should clearly outline specific responsibilities, qualifications, and what makes the position attractive. Include details about the nature of goods being delivered, vehicle requirements, expected working hours, and licensing needs to attract suitable candidates.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Begin by introducing your </span>
                                    <b>company</b> <b>culture</b>
                                    <span style={{ fontWeight: 400 }}> and working environment in the first few sentences to differentiate yourself from competitors. Moreover, highlight unique benefits like flexible schedules or competitive pay that make your opportunity stand out.</span>
                                </p>
                                <h3><b>Adding friction to test intent</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Counterintuitively, making your application process slightly more challenging can yield better results. <i>According to a research, 49% of candidates have rejected job offers due to poor hiring experiences, proving that quality matters more than convenience.</i></span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Instead of streamlining everything, strategically add small hurdles that test candidate commitment:</span>
                                </p>
                                <ul>
                                    <li><span style={{ fontWeight: 400 }}>Request specific information that requires careful reading</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Ask for thoughtful responses to job-related scenarios</span></li>
                                    <li><span style={{ fontWeight: 400 }}>Require completion of brief pre-screening questions</span></li>
                                </ul>
                                <p>
                                    <span style={{ fontWeight: 400 }}>These friction points weed out applicants who aren&apos;t genuinely interested while allowing serious candidates to demonstrate their attention to detail.</span>
                                </p>
                                <h3><b>Using video questions to screen for effort</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Video screening questions have become an invaluable tool for assessing delivery driver candidates before in-person interviews. This approach reveals </span>
                                    <b>communication skills</b>
                                    <span style={{ fontWeight: 400 }}>, </span>
                                    <b>professionalism</b>
                                    <span style={{ fontWeight: 400 }}>, and </span>
                                    <b>technological adaptability</b>
                                    <span style={{ fontWeight: 400 }}>—all crucial qualities for modern delivery professionals.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>When implementing video questions, provide clear instructions and technical support. Indeed, candidates who struggle with simple video submissions often struggle with the digital aspects of delivery work, such as using navigation apps or completing electronic delivery records.</span>
                                </p>
                                <h3><b>Only inviting serious candidates to interviews</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The final step is selective interview invitations. Essentially, your goal is maintaining communication with preferred applicants who demonstrate genuine interest and qualification for the position. This approach creates a positive impression with candidates, making them feel noticed and valued.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>For </span>
                                    <b>in-person interviews</b>
                                    <span style={{ fontWeight: 400 }}>, provide complete details including address, floor number, parking information, and any access codes needed. This level of organization signals your professionalism while setting expectations for the same from your candidates.</span>
                                </p>
                            </div>

                            {/* ─── Section 4 ─── */}
                            <div id="section4" className="wp-section">
                                <h2>Avoiding the Pitfalls of Poaching and Shortcuts</h2>
                                <img
                                    loading="lazy"
                                    decoding="async"
                                    src={`${WP_BASE}/2025/10/Screenshot-2025-10-21-at-1.25.55-PM-1024x682.png`}
                                    alt=""
                                    className="wp-featured-img"
                                />
                                <p>
                                    <span style={{ fontWeight: 400 }}>In the competitive landscape of </span>
                                    <b>last mile delivery</b>
                                    <span style={{ fontWeight: 400 }}>, many companies resort to shortcuts when facing driver shortages. With an industry labor shortfall reaching up to 80,000 drivers , the temptation to poach talent from competitors becomes increasingly common. Nevertheless, these quick-fix approaches often backfire in unexpected ways.</span>
                                </p>
                                <h3><b>Why poaching damages your reputation</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Poaching delivery drivers from competitors might seem like an efficient solution, yet this practice creates serious reputational issues. Though technically legal, poaching creates industry-wide tension and establishes your company as an opportunistic player rather than a respected employer. The practice creates what industry experts call “<i>a vicious cycle</i>” where companies simultaneously complain about losing drivers while attempting to lure away others. Furthermore, aggressive recruitment tactics can damage relationships with other companies in your service area, limiting future collaboration opportunities.</span>
                                </p>
                                <h3><b>How to build your own talent pipeline</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Conversely, developing a </span>
                                    <b>sustainable talent pipeline </b>
                                    <span style={{ fontWeight: 400 }}>proves far more effective for long-term success in delivery driver hiring. This approach involves systematically finding, nurturing, and preparing potential candidates for upcoming roles. Building this pipeline requires three essential steps: </span>
                                    <b>identifying promising candidates, engaging them consistently, and supporting them throughout the hiring process.</b>
                                    <span style={{ fontWeight: 400 }}> Effective talent pipelines allow you to access high-quality candidates quickly without resorting to poaching, ultimately reducing recruitment expenses and minimizing delays in filling critical positions.</span>
                                </p>
                                <h3><b>The long-term cost of transactional hiring</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Ultimately, the transactional approach to driver hiring—viewing drivers as interchangeable parts rather than valuable team members—creates significant hidden costs. Companies focused merely on “</span>
                                    <b>chasing a quick dollar</b>
                                    <span style={{ fontWeight: 400 }}>” through cheap labor perpetuate a cycle of poor retention and increased expenses. Without establishing genuine connections to your workforce, you inadvertently worsen labor retention issues. The most successful delivery organizations, meanwhile, offer clear career progression paths, reliable scheduling, health benefits, and opportunities for growth—elements that demonstrate commitment to drivers&apos; long-term success rather than viewing them as disposable resources.</span>
                                </p>
                            </div>

                            {/* ─── Section 5 ─── */}
                            <div id="section5" className="wp-section">
                                <h2>Building a Scalable, Ethical Hiring System</h2>
                                <img
                                    loading="lazy"
                                    decoding="async"
                                    src={`${WP_BASE}/2025/10/Screenshot-2025-10-21-at-1.28.26-PM-1024x684.png`}
                                    alt=""
                                    className="wp-featured-img"
                                />
                                <p>
                                    <span style={{ fontWeight: 400 }}>Creating lasting success in delivery driver hiring requires more than just filling positions—it demands building systems that reflect your organization&apos;s core principles and long-term vision.</span>
                                </p>
                                <h3><b>Aligning hiring with company values</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Values-based hiring forms the foundation of ethical recruitment in the last mile sector. <i>Fair Chance Employment</i>, which gives people with conviction records opportunities based on skills rather than past mistakes, opens doors to a third of the U.S. adult population. In essence, aligning recruitment with company principles creates better cultural fit, making values visible in everyday workplace interactions.</span>
                                </p>
                                <h3><b>Training and shaping raw talent</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Raw talent needs nurturing through comprehensive onboarding that gives new drivers confidence from day one. Providing clear professionalism standards, coupled with ongoing development opportunities, transforms good hires into great team members. Furthermore, supporting drivers through unexpected challenges builds loyalty and demonstrates your commitment to their success.</span>
                                </p>
                                <h3><b>Retention strategies for long-term success</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Effective retention begins with acknowledging driver contributions through recognition programs and milestones. Work-life balance remains critical—it&apos;s among the primary reasons drivers leave. Accordingly, respecting personal time while creating a positive “family culture” through yearly events builds traditions that encourage longevity.</span>
                                </p>
                                <h3><b>Using feedback to improve your hiring process</b></h3>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Regular feedback mechanisms like “</span>
                                    <b>stay interviews</b>
                                    <span style={{ fontWeight: 400 }}>” provide insights before issues lead to turnover. These one-on-one discussions identify what keeps drivers satisfied while building trust between management and staff. Exit interviews likewise offer valuable data, with replacement costs ranging between $6,000-$12,000 per driver —making feedback systems vital investments.</span>
                                </p>
                            </div>

                            {/* ─── Conclusion ─── */}
                            <div className="wp-section">
                                <h2>Conclusion</h2>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The landscape of </span>
                                    <b>last mile delivery</b>
                                    <span style={{ fontWeight: 400 }}> continues to evolve rapidly, yet one truth remains constant: <i>people make or break</i> your <i>operation. </i>Throughout this guide, we&apos;ve seen how traditional hiring approaches focusing solely on driving experience and metrics often miss what truly matters—<i>the human qualities that determine success under pressure.</i></span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Success in delivery driver hiring starts with looking beyond resumes. Exceptional drivers demonstrate </span>
                                    <b>orderliness</b>
                                    <span style={{ fontWeight: 400 }}>, </span>
                                    <b>adaptability</b>
                                    <span style={{ fontWeight: 400 }}>, </span>
                                    <b>strong customer service skills</b>
                                    <span style={{ fontWeight: 400 }}>, and </span>
                                    <b>cultural alignment</b>
                                    <span style={{ fontWeight: 400 }}> with your company values. These traits simply cannot be measured through conventional screening methods.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Your </span>
                                    <b>hiring funnel</b>
                                    <span style={{ fontWeight: 400 }}> needs strategic friction points that filter out unmotivated candidates while identifying those with genuine commitment. This approach might seem counterintuitive at first, but it dramatically improves your candidate quality and reduces costly turnover down the road.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Shortcuts like poaching drivers from competitors might provide temporary relief, but they damage your reputation and perpetuate industry-wide issues. Building your own </span>
                                    <b>talent pipeline</b>
                                    <span style={{ fontWeight: 400 }}> takes more effort initially, though it yields far better results over time—creating stability where others experience constant churn.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Last but not least, a truly effective hiring system aligns with your company values and invests in driver growth and retention. The best delivery operations recognize drivers as valuable team members rather than interchangeable parts, offering clear career paths and genuine support.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>The delivery landscape will undoubtedly continue changing through 2025 and beyond. Technology, consumer expectations, and market demands will shift, but the fundamental need for quality drivers who can think on their feet will remain. Companies that master ethical, effective hiring practices now will find themselves with a significant competitive advantage—not just in filling routes, but in building loyal teams that deliver exceptional results day after day.</span>
                                </p>
                                <p>
                                    <span style={{ fontWeight: 400 }}>Remember, your delivery drivers represent your brand at every doorstep. Their performance directly impacts customer satisfaction and ultimately your bottom line. The time and resources you invest in thoughtful </span>
                                    <b>hiring practices</b>
                                    <span style={{ fontWeight: 400 }}> today will pay dividends through reduced turnover, improved service quality, and a stronger company culture tomorrow.</span>
                                </p>
                                <p>
                                    <b>Explore more content at : </b>
                                    <a href="https://thelastmilenyc.com/outlook/"><b>https://thelastmilenyc.com/outlook/</b></a>
                                </p>
                            </div>

                            {/* ─── Key Takeaways ─── */}
                            <h2>
                                <br />
                                <b>Key Takeaways</b>
                            </h2>
                            <p>
                                <span style={{ fontWeight: 400 }}>Here are the essential insights for building a successful delivery driver hiring system that actually works in today&apos;s competitive market:</span>
                            </p>
                            <ul className="wp-takeaways">
                                <li>
                                    <span style={{ fontWeight: 400 }}> <strong>Focus on character over credentials</strong> – Prioritize orderliness, adaptability, and customer service skills rather than just driving experience and resume qualifications.</span>
                                </li>
                                <li>
                                    <span style={{ fontWeight: 400 }}> <strong>Design strategic friction in your hiring funnel</strong> – Add purposeful hurdles like video questions and detailed applications to filter out unmotivated candidates while identifying committed ones.</span>
                                </li>
                                <li>
                                    <span style={{ fontWeight: 400 }}> <strong>Avoid poaching shortcuts that damage reputation</strong> – Build your own talent pipeline instead of stealing drivers from competitors, which creates industry tension and perpetuates turnover cycles.</span>
                                </li>
                                <li>
                                    <span style={{ fontWeight: 400 }}> <strong>Align hiring with company values for retention</strong> – Treat drivers as valuable team members with growth opportunities rather than interchangeable parts to reduce the $6,000-$12,000 replacement cost per driver.</span>
                                </li>
                                <li>
                                    <span style={{ fontWeight: 400 }}> <strong>Use feedback loops to continuously improve</strong> – Implement stay interviews and exit feedback to refine your hiring process and address retention issues before they lead to costly turnover.</span>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontWeight: 400 }}>The most </span>
                                <b>successful delivery operations</b>
                                <span style={{ fontWeight: 400 }}> recognize that traditional metrics-first hiring fails to identify drivers who can truly excel under pressure. By focusing on human qualities like </span>
                                <b>problem-solving ability</b>
                                <span style={{ fontWeight: 400 }}> and </span>
                                <b>cultural fit</b>
                                <span style={{ fontWeight: 400 }}>, companies can build teams that deliver consistent results while maintaining lower turnover rates and higher customer satisfaction.</span>
                            </p>

                            {/* ─── FAQ ─── */}
                            <div className="wp-section">
                                <h2><strong>FAQ</strong></h2>
                                <FaqAccordion
                                    items={[
                                        {
                                            title: "Q1. What qualities should companies look for when hiring delivery drivers?",
                                            content: "Companies should prioritize traits like orderliness, adaptability, strong customer service skills, and cultural fit over just driving experience. These qualities are crucial for success in the unpredictable environment of last-mile delivery.",
                                        },
                                        {
                                            title: "Q2. How can businesses improve their delivery driver hiring process?",
                                            content: "Businesses can improve their hiring process by designing a strategic funnel with purposeful friction points, such as video questions and detailed applications. This helps filter out unmotivated candidates while identifying those who are genuinely committed to the role.",
                                        },
                                        {
                                            title: "Q3. Is poaching drivers from competitors a good strategy for filling positions?",
                                            content: "No, poaching drivers from competitors is not recommended. It damages your company's reputation and perpetuates industry-wide issues. Instead, focus on building your own talent pipeline for long-term success and stability.",
                                        },
                                        {
                                            title: "Q4. How can companies retain their delivery drivers?",
                                            content: 'To retain drivers, companies should offer clear career progression paths, provide work-life balance, implement recognition programs, and create a positive company culture. Regular feedback mechanisms like "stay interviews" can also help address issues before they lead to turnover.',
                                        },
                                        {
                                            title: "Q5. What is the cost of replacing a delivery driver?",
                                            content: "The cost of replacing a delivery driver can range from $6,000 to $12,000. This high replacement cost emphasizes the importance of effective hiring practices and retention strategies in the delivery industry.",
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* ─── Newsletter / subscribe ─── */}
                        <div className="wp-newsletter">
                            <h2 className="wp-newsletter-title">
                                Get Jim Royce&apos;s stories in your inbox
                            </h2>
                            <p className="wp-newsletter-sub">
                                Join Medium for free to get updates from this
                                writer.
                            </p>
                            <div className="wp-newsletter-form-container">
                                <div className="wp-newsletter-input-group">
                                    <label className="wp-newsletter-input-label">
                                        Email
                                    </label>
                                    <div className="wp-newsletter-row">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="wp-newsletter-input"
                                        />
                                        <button
                                            type="button"
                                            className="wp-newsletter-btn"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── Author bio ─── */}
                        <div className="wp-author-bio">
                            <div className="wp-author-bio-inner">
                                <div className="wp-author-img-ring">
                                    <img
                                        src={`${WP_BASE}/2025/09/1730877940198-1.jpeg`}
                                        alt="Jim Royce"
                                        className="wp-author-bio-img"
                                    />
                                </div>
                                <div className="wp-author-bio-content">
                                    <h2 className="wp-author-bio-label">
                                        About the Author
                                    </h2>
                                    <p className="wp-author-bio-desc">
                                        Jim Royce is the founder of The Last
                                        Mile NYC and a 25-year veteran of last
                                        mile logistics. He&apos;s built and
                                        optimized operations in the most
                                        competitive delivery markets in the
                                        U.S., and now helps DSPs and independent
                                        contractors streamline communication,
                                        boost accountability, and increase
                                        profitability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Sticky podcast sidebar ─── */}
                    <aside className="wp-podcast-sidebar">
                        <div className="wp-podcast-sidebar-inner">
                            <h2 className="wp-sidebar-title">
                                Check out our fifth episode of Mastering The
                                Last Mile
                            </h2>
                            <img
                                src={`${WP_BASE}/2025/10/600x600bb.webp`}
                                alt="Mastering The Last Mile Episode 5"
                                className="wp-sidebar-podcast-img"
                            />
                            <div className="wp-sidebar-btns">
                                <Link
                                    href="https://open.spotify.com/episode/1CIR8zshPGRmHYw1rN3DKu?si=XNx4M-zITG2vV-sNPij--w"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="wp-sidebar-btn"
                                >
                                    <span className="wp-podcast-icon wp-podcast-icon--spotify">
                                        <svg
                                            viewBox="0 0 512 512"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="#1ED760"
                                                d="M105 0h302c57.928.155 104.845 47.072 105 104.996V407c-.155 57.926-47.072 104.844-104.996 104.998L105 512C47.074 511.844.156 464.926.002 407.003L0 105C.156 47.072 47.074.155 104.997 0H105z"
                                            />
                                            <path
                                                fill="#fff"
                                                fillRule="nonzero"
                                                d="M256 71.498c-101.898 0-184.506 82.605-184.506 184.503 0 101.901 82.608 184.503 184.506 184.503 101.909 0 184.509-82.6 184.509-184.503 0-101.893-82.6-184.495-184.512-184.495l.003-.011v.003zm84.614 266.109c-3.304 5.418-10.398 7.14-15.819 3.811-43.319-26.462-97.855-32.453-162.08-17.78-6.189 1.409-12.358-2.468-13.769-8.659-1.418-6.192 2.446-12.36 8.651-13.769 70.284-16.058 130.571-9.144 179.206 20.577 5.422 3.327 7.141 10.398 3.811 15.82zm22.584-50.238c-4.166 6.767-13.022 8.903-19.786 4.741-49.596-30.485-125.193-39.314-183.856-21.504-7.608 2.296-15.642-1.99-17.95-9.585-2.292-7.608 1.998-15.626 9.592-17.939 67.007-20.331 150.31-10.484 207.265 24.515 6.763 4.166 8.9 13.022 4.738 19.778v-.003l-.003-.003zm1.94-52.314c-59.468-35.32-157.577-38.566-214.352-21.335-9.117 2.765-18.759-2.38-21.521-11.5-2.762-9.121 2.38-18.755 11.502-21.526 65.175-19.786 173.519-15.964 241.984 24.682 8.217 4.868 10.907 15.457 6.037 23.646-4.85 8.201-15.469 10.904-23.641 6.033h-.009z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="wp-podcast-label">
                                        Ep 5 : Hiring
                                    </span>
                                </Link>
                                <Link
                                    href="https://podcasts.apple.com/us/podcast/ep-5-hiring/id1832728546?i=1000725667310"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="wp-sidebar-btn"
                                >
                                    <span className="wp-podcast-icon wp-podcast-icon--apple">
                                        <svg
                                            viewBox="0 0 448 512"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                    <span className="wp-podcast-label">
                                        Ep 5 : Hiring
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* ─── Close two-column wrapper ─── */}
                </div>

                {/* ─── Related posts (More from Jim Royce) ─── */}
            </div>
        </>
    );
}

const CSS = `
/* ── Global overrides for blog page ── */
.wp-blog *, .wp-blog *::before, .wp-blog *::after { box-sizing: border-box; margin: 0; padding: 0; }
.wp-blog {
    background: #ffffff;
    color: #2d2d2d;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.75;
    -webkit-user-select: text;
    -moz-user-select: text;
    user-select: text;
    overflow: visible;
}
.wp-blog a { color: #3A80C0; text-decoration: none; }
.wp-blog a:hover { text-decoration: underline; }

/* ── Two-column layout ── */
.wp-layout-row {
    display: flex;
    align-items: stretch;
    gap: 0;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
    overflow: visible;
}

/* Content column */
.wp-layout-row > .wp-boxed-col {
    flex: 0 0 70%;
    max-width: 70%;
    min-width: 0;
}

/* ── Sticky podcast sidebar ── */
.wp-podcast-sidebar {
    flex: 0 0 25%;
    max-width: 25%;
    min-width: 200px;
    margin-left: auto;
    padding: 24px 0 24px 16px;
    position: relative;
}
.wp-podcast-sidebar-inner {
    background: linear-gradient(135deg, #1565c0 0%, #1976d2 60%, #1e88e5 100%);
    border-radius: 20px;
    padding: 24px;
    color: #fff;
    position: sticky;
    top: 30px;
    box-shadow: 0 10px 30px rgba(21,101,192,0.25);
}
.wp-sidebar-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
   
    line-height: 1.3;
}
.wp-sidebar-podcast-img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    margin-bottom: 20px;
    object-fit: cover;
}
.wp-sidebar-btns {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.wp-sidebar-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    padding: 12px 16px;
    color: #fff;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
    background: rgba(255,255,255,0.05);
}
.wp-sidebar-btn:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.1); text-decoration: none; }

/* ── Title ── */
.wp-post-title {
    font-size: 32px;
    font-weight: 800;
    line-height: 1.2;
     margin-top: 30px;
    color: #111;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
}

/* ── Meta row ── */
.wp-meta-row {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}
.wp-author { display: flex; align-items: center; gap: 10px; }
.wp-author-img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.wp-author-name { font-weight: 600; font-size: 15px; color: #111; }
.wp-post-info { display: flex; align-items: center; gap: 16px; }
.wp-info-item { display: flex; align-items: center; gap: 6px; color: #666; font-size: 14px; }
.wp-icon { width: 14px; height: 14px; }

/* Share buttons */
.wp-share-btns { display: flex; gap: 10px; margin-left: auto; }
.wp-share-btn { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity 0.2s; }
.wp-share-fb { background: #1877F2; }
.wp-share-tw { background: #1DA1F2; }
.wp-share-li { background: #0A66C2; }
.wp-share-wa { background: #25D366; }
.wp-share-btn:hover { opacity: 0.8; }
.wp-share-btn svg { width: 16px; height: 16px; }

/* ── Featured image ── */
.wp-featured-img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 40px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

/* ── Content ── */
.wp-content { font-size: 17px; line-height: 1.8; color: #333; }
.wp-content p { margin-bottom: 24px; }
.wp-content h2 { font-size: 26px; font-weight: 800; margin: 48px 0 24px; color: #111; }
.wp-content h3 { font-size: 20px; font-weight: 700; margin: 32px 0 16px; color: #111; }
.wp-content ul { margin-bottom: 24px; padding-left: 24px; }
.wp-content li { margin-bottom: 12px; }
.wp-content strong { color: #111; font-weight: 600; }
.wp-content a { color: #3A80C0; text-decoration: none; }
.wp-content a:hover { text-decoration: underline; }

/* Icon boxes */
.wp-icon-box {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
    border: 1px solid #e9ecef;
}
.wp-icon-box:last-child { margin-bottom: 0; }
.wp-icon-box-title { margin: 0 0 8px 0 !important; font-size: 17px !important; }
.wp-icon-box-title a { color: #111; font-weight: 700; }
.wp-icon-box-title a:hover { color: #3A80C0; }
.wp-icon-box-desc { font-size: 15px; color: #555; margin: 0; line-height: 1.6; }

/* Sections */
.wp-section { margin: 40px 0 0; }
.wp-section-img { width: 100%; border-radius: 8px; margin: 20px 0; display: block; }

/* Takeaways */
.wp-takeaways { background: #fffdf0; border-left: 4px solid #f9d949; padding: 24px 24px 24px 32px !important; border-radius: 0 8px 8px 0; list-style-type: none; }
.wp-takeaways li { font-weight: 400; font-size: 15px; margin-bottom: 16px !important; }
.wp-takeaways li:last-child { margin-bottom: 0 !important; }

/* ── FAQ ── */
.faq-wrap { margin: 16px 0 0; }
.faq-item {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    background: #f8f8f8;
}
.faq-title {
    width: 100%;
    background: none;
    border: none;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    color: #111;
    text-align: left;
    font-family: inherit;
    transition: background 0.15s;
}
.faq-title:hover { background: #f0f0f0; }
.faq-icon { flex-shrink: 0; font-size: 11px; color: #666; }
.faq-body { padding: 0 20px 16px; animation: faqIn 0.18s ease; }
.faq-body p { font-size: 14px; color: #444; line-height: 1.7; margin: 0; }
@keyframes faqIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }

/* Podcast icon styles */
.wp-podcast-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.wp-podcast-icon--spotify { background: #000; }
.wp-podcast-icon--apple {
    background: linear-gradient(145deg, #c86dd7 0%, #9b30d0 40%, #7027b8 100%);
}
.wp-podcast-icon--apple svg {
    width: 22px !important;
    height: 22px !important;
    color: #fff;
    fill: #fff;
}
.wp-podcast-icon svg { width: 40px; height: 40px; }
.wp-podcast-icon--spotify svg { width: 40px !important; height: 40px !important; }
.wp-podcast-label {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
}

/* ── Newsletter ── */
.wp-newsletter {
    background: #000;
    border-radius: 12px;
    margin: 48px 24px 0;
    padding: 60px 40px;
    text-align: center;
    color: #fff;
}
.wp-newsletter-title {
    font-family: "Source Serif 4", Georgia, serif;
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 24px;
    line-height: 1.2;
}
.wp-newsletter-sub {
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    opacity: 0.9;
}
.wp-newsletter-form-container {
    display: flex;
    justify-content: center;
}
.wp-newsletter-input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 500px;
}
.wp-newsletter-input-label {
    font-size: 14px;
    color: #777;
    margin-bottom: 8px;
    font-weight: 500;
}
.wp-newsletter-row {
    display: flex;
    width: 100%;
    gap: 0;
}
.wp-newsletter-input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
    color: #333;
    background: #fff;
    height: 52px;
}
.wp-newsletter-btn {
    padding: 0 32px;
    border: none;
    border-radius: 0 8px 8px 0;
    background: #1a91ff;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    height: 52px;
}
.wp-newsletter-btn:hover { background: #0077e6; }

/* ── Author bio ── */
.wp-author-bio {
    margin: 60px 24px 80px;
    padding-top: 40px;
}
.wp-author-bio-inner {
    display: flex;
    gap: 40px;
    align-items: center;
}
.wp-author-img-ring {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    padding: 8px;
    background: #fff;
    border: 3.5px solid #3A80C0;
    box-shadow: 0 0 0 10px rgba(58, 128, 192, 0.04);
    flex-shrink: 0;
}
.wp-author-bio-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: top center;
    border: 1px solid #ddd;
}
.wp-author-bio-label {
    font-size: 32px;
    font-weight: 700;
    color: #333;
    margin-bottom: 16px;
}
.wp-author-bio-desc { 
    font-size: 18px; 
    color: #111; 
    line-height: 1.6; 
}

/* ── Related posts ── */
.wp-more { background: #f5f5f5; border-top: 1px solid #e8e8e8; margin-top: 60px; }
.wp-more-title { font-size: 24px; font-weight: 800; color: #111; margin-bottom: 32px; }
.wp-posts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.wp-post-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; }
.wp-post-card:hover { transform: translateY(-5px); }
.wp-post-thumb { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.wp-post-card-body { padding: 24px; }
.wp-post-card-date { font-size: 13px; color: #888; margin-bottom: 10px; }
.wp-post-card-title { font-size: 18px; font-weight: 700; line-height: 1.4; margin-bottom: 12px; }
.wp-post-card-title a { color: #111; text-decoration: none; }
.wp-post-card-title a:hover { color: #3A80C0; }
.wp-post-read-more { font-size: 15px; color: #3A80C0; font-weight: 600; text-decoration: none; }
.wp-see-all-btn { display: inline-block; padding: 12px 32px; border-radius: 30px; background: #3A80C0; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; transition: background 0.2s; }
.wp-see-all-btn:hover { background: #2a6faf; text-decoration: none; }

/* ── Mobile sticky podcast bar (mobile-only) ── */
.wp-mobile-podcast-bar {
    display: none;
}

/* ── Mobile ── */
@media (max-width: 900px) {
    .wp-mobile-podcast-bar {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: linear-gradient(135deg, #1565c0 0%, #1976d2 60%, #1e88e5 100%);
        padding: 10px 12px;
        gap: 10px;
        align-items: center;
        box-shadow: 0 4px 16px rgba(21,101,192,0.35);
    }
    .wp-mobile-podcast-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        background: rgba(255,255,255,0.15);
        border: 1.5px solid rgba(255,255,255,0.25);
        border-radius: 10px;
        padding: 10px 12px;
        color: #fff;
        text-decoration: none;
        transition: background 0.2s;
    }
    .wp-mobile-podcast-btn:hover { background: rgba(255,255,255,0.28); text-decoration: none; }
    .wp-podcast-sidebar { display: none; }
    .wp-layout-row { flex-direction: column; padding: 0; }
    .wp-layout-row > .wp-boxed-col { flex: 0 0 100%; max-width: 100%; }
    .wp-blog { padding-top: 66px; }
}
@media (max-width: 640px) {
    .wp-post-title { font-size: 22px; }
    .wp-boxed { padding: 20px 16px; }
    .wp-boxed-col { padding: 20px 16px; }
    .wp-content h2 { font-size: 20px; }
    .wp-content h3 { font-size: 16px; }
    .wp-share-btns { margin-left: 0; }
    .wp-meta-row { gap: 10px; }
    .wp-posts-grid { grid-template-columns: 1fr; }
    .wp-author-bio-inner { flex-direction: column; }
    .wp-newsletter-form { flex-direction: column; }
    .wp-newsletter-input { min-width: 0; }
    .wp-mobile-podcast-btn { padding: 8px 10px; }
    .wp-podcast-label { font-size: 12px; }
}
`;
