import dynamic from "next/dynamic";
import { Suspense } from "react";

const ExecutionInteractive = dynamic(
    () =>
        import("./components/ExecutionInteractive").then((mod) => ({
            default: mod.ExecutionInteractive,
        })),
    {
        loading: () => <ExecutionSkeleton />,
    },
);

function ExecutionSkeleton() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f2f6fb",
                backgroundImage: "url(/images/execution-bg.webp)",
                backgroundSize: "cover",
            }}
        >
            <div style={{ padding: "26px 32px" }} />
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        border: "3px solid rgba(44, 113, 185, 0.3)",
                        borderTopColor: "#2c71b9",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default function ExecutionPage() {
    return (
        <Suspense fallback={<ExecutionSkeleton />}>
            <ExecutionInteractive />
        </Suspense>
    );
}
