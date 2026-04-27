'use client';

import { useState } from 'react';

interface FaqItem {
    title: string;
    content: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-wrap">
            {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div key={idx} className="faq-item">
                        <button
                            className="faq-title"
                            onClick={() => toggle(idx)}
                            aria-expanded={isOpen}
                        >
                            <span>{item.title}</span>
                            <span className="faq-icon">{isOpen ? '▲' : '▼'}</span>
                        </button>
                        {isOpen && (
                            <div className="faq-body">
                                <p>{item.content}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
