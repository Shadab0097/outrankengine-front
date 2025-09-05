import React, { useState, useEffect } from "react";

const icons = {
    fetch: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
        </svg>
    ),
    h1: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
        </svg>
    ),
    h2: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
        </svg>
    ),
    content: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
        </svg>
    ),
};

const stages = [
    {
        text: "Fetching SEO data",
        subtext: "Analyzing keywords and competition",
        icon: icons.fetch,
        color: "from-blue-500 to-cyan-500"
    },
    {
        text: "Designing H1 SEO image",
        subtext: "Creating primary visual hierarchy",
        icon: icons.h1,
        color: "from-purple-500 to-pink-500"
    },
    {
        text: "Designing H2 SEO image",
        subtext: "Optimizing supporting visuals",
        icon: icons.h2,
        color: "from-orange-500 to-red-500"
    },
    {
        text: "Rendering final content",
        subtext: "Preparing optimized assets",
        icon: icons.content,
        color: "from-green-500 to-emerald-500"
    },
];

const ShimmerUI = ({ isLoading }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setProgress(0);
            return;
        }

        const stageInterval = setInterval(() => {
            setCurrentStage((prev) => (prev + 1) % stages.length);
        }, 3000);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + 1;
            });
        }, 30);

        return () => {
            clearInterval(stageInterval);
            clearInterval(progressInterval);
        };
    }, [isLoading]);

    useEffect(() => {
        if (isLoading) {
            setCurrentStage(0);
            setProgress(0);
        }
    }, [isLoading]);

    if (!isLoading) return null;

    const currentStageData = stages[currentStage];

    return (
        <div className="flex justify-center items-center min-h-[400px] p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentStageData.color} opacity-5 rounded-2xl sm:rounded-3xl animate-pulse`}></div>

                    {/* Content Container */}
                    <div className="relative z-10">
                        {/* Icon Container */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="relative">
                                {/* Outer Ring */}
                                <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                                    <svg className="w-full h-full animate-spin" style={{ animationDuration: '8s' }}>
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="url(#gradient-ring)"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray="5 5"
                                        />
                                        <defs>
                                            <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
                                                <stop offset="50%" className="text-purple-500" stopColor="currentColor" />
                                                <stop offset="100%" className="text-pink-500" stopColor="currentColor" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Inner Circle with Icon */}
                                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br ${currentStageData.color} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-105`}>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white animate-pulse">
                                        {currentStageData.icon}
                                    </div>
                                </div>

                                {/* Orbiting Dots */}
                                <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 animate-spin" style={{ animationDuration: '3s' }}>
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center space-y-2 sm:space-y-3">
                            <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentStageData.color} bg-clip-text text-transparent transition-all duration-500`}>
                                {currentStageData.text}
                            </h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                {currentStageData.subtext}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6 sm:mt-8">
                            <div className="relative h-2 sm:h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${currentStageData.color} rounded-full transition-all duration-300 ease-out`}
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute right-0 top-0 w-full h-full bg-white/30 animate-shimmer"></div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Processing</span>
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Stage Indicators */}
                        <div className="flex justify-center items-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
                            {stages.map((stage, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div
                                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500 ${i === currentStage
                                            ? `bg-gradient-to-r ${stage.color} scale-150 shadow-lg`
                                            : i < currentStage
                                                ? 'bg-gray-400 dark:bg-gray-600'
                                                : 'bg-gray-300 dark:bg-gray-700'
                                            }`}
                                    />
                                    {i === currentStage && (
                                        <div className={`absolute mt-4 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r ${stage.color} rounded-full animate-ping`}></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 sm:mt-8 text-center">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                Optimizing for maximum SEO impact...
                            </p>
                        </div>
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-50"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed opacity-50"></div>
                    <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-50"></div>
                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-green-400 rounded-full animate-float-delayed opacity-50"></div>
                </div>
            </div>
        </div>
    );
};

export default ShimmerUI;

// Inject styles
// if (typeof document !== 'undefined') {
//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = styles;
//     document.head.appendChild(styleSheet);
// }

