"use client";
import { useState } from "react";

interface FaqItem {
    title: string;
    content: string;
}

export default function FaqAccordion({ items = [] }: { items?: FaqItem[] }) {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <div className="faq-wrap">
            {items.map((f, i) => (
                <div key={i} className={`faq-item${open === i ? " faq-open" : ""}`}>
                    <button
                        className="faq-title"
                        onClick={() => setOpen(open === i ? null : i)}
                        aria-expanded={open === i}
                    >
                        <span>{f.title}</span>
                        <span className="faq-icon">{open === i ? "▲" : "▼"}</span>
                    </button>
                    {open === i && (
                        <div className="faq-body">
                            <p>{f.content}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
