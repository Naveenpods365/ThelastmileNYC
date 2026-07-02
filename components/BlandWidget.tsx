"use client";

import { useEffect } from "react";

export function BlandWidget() {
  useEffect(() => {
    // Prevent duplicate script injection
    if ((window as any).blandLoaded) return;

    (window as any).blandSettings = {
      widget_id: "07d1da03-04df-4b4d-b214-690d5f452b30",
    };

    const script = document.createElement("script");
    script.src = "https://widget.bland.ai/loader.js";
    script.defer = true;
    document.body.appendChild(script);
    (window as any).blandLoaded = true;
  }, []);

  return <div id="bland-root" />;
}
