"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDER_TEXTS = [
    "✨ On the experience tab, we share stories of seminal moments that forged our last-mile strategy",
    "🔥 Our expertise section gives you insights to run your last-mile operation with precision and profit",
    "🚀  On our execution page, see how we turned our last-mile playbook into software that walks the walk",
];
const SLIDER_TIMES = [9000, 10000, 9000];

export function TextSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % SLIDER_TEXTS.length);
        }, SLIDER_TIMES[activeIndex]);
        return () => clearTimeout(timeout);
    }, [activeIndex]);

    return (
        <div className="text-slider-section">
            <div className="text-slider-widget">
                <div
                    className="text-slider"
                    style={{
                        position: "relative",
                        height: "6rem",
                        minHeight: "3rem",
                        overflow: "hidden",
                    }}
                >
                    <AnimatePresence>
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="slide active"
                            style={{ position: "absolute", width: "100%" }}
                        >
                            {SLIDER_TEXTS[activeIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
