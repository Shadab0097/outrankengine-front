import React, { useEffect, useMemo, useState } from 'react'
import { FiFileText, FiLink, FiSearch, FiSettings, FiTarget, FiTool, FiTrendingUp, FiZap } from 'react-icons/fi';

const Loader = ({ loading }) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);


    const processingSteps = useMemo(
        () => [
            { icon: FiSearch, text: "Fetching page and scraping visible content" },
            { icon: FiTool, text: "Parsing HTML, meta tags, and structured data" },
            { icon: FiTarget, text: "Extracting target keywords and intent" },
            { icon: FiLink, text: "Analyzing backlinks and referring domains" },
            { icon: FiSettings, text: "Checking technical SEO and Core Web Vitals" },
            { icon: FiFileText, text: "Evaluating content depth and gaps" },
            { icon: FiTrendingUp, text: "Building strategy insights and roadmap" }
        ],
        []
    );
    useEffect(() => {
        if (!loading) {
            setActiveStepIndex(0);
            return;
        }
        let i = 0;
        setActiveStepIndex(0);
        const interval = setInterval(() => {
            i = (i + 1) % processingSteps.length;
            setActiveStepIndex(i);
        }, 1400);
        return () => clearInterval(interval);
    }, [loading, processingSteps.length]);

    if (!loading) return null


    return (
        <>
            {loading && (
                <div className="max-w-4xl mx-auto px-4 mt-6">
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4">
                        <p className="text-white font-semibold mb-3 flex items-center gap-2">
                            <FiZap className="text-yellow-300" />
                            Working on it...
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {processingSteps.map((step, idx) => {
                                const isActive = idx === activeStepIndex;
                                const Icon = step.icon;
                                return (
                                    <span
                                        key={idx}
                                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm transition-all ${isActive ? "bg-yellow-300 text-black shadow" : "bg-white/10 text-white/80 border border-white/20"
                                            }`}
                                    >
                                        <Icon className={isActive ? "text-black" : "text-white/80"} />
                                        {step.text}
                                        {isActive && <span className="ml-1 animate-pulse">...</span>}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-300 transition-all duration-500"
                                style={{ width: `${((activeStepIndex + 1) / processingSteps.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loader