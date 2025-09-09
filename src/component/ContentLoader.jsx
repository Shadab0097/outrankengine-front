import React, { useState, useEffect } from "react";
import { Database, FileText, Heading, Sparkles } from "lucide-react";

const ContentLoader = ({ isLoading }) => {
    const [currentStage, setCurrentStage] = useState(0);

    const stages = [
        { text: "Fetching data", icon: Database },
        { text: "Creating H1", icon: Heading },
        { text: "Creating H2", icon: FileText },
        { text: "Generating content", icon: Sparkles },
    ];

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setCurrentStage((prev) => (prev + 1) % stages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [isLoading, stages.length]);

    useEffect(() => {
        if (isLoading) setCurrentStage(0);
    }, [isLoading]);

    if (!isLoading) return null;

    const Icon = stages[currentStage].icon;

    return (
        <div className="flex justify-center items-center mt-10 px-4">
            <div className="w-full max-w-md  backdrop-blur-sm rounded-2xl p-6 shadow-xl ">

                {/* Animated Dots */}
                <div className="flex justify-center space-x-2 mb-6">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className="w-3 h-3 bg-gradient-to-r from-white to-purple-600 rounded-full animate-bounce"
                            style={{
                                animationDelay: `${index * 0.25}s`,
                                animationDuration: "1s",
                            }}
                        />
                    ))}
                </div>

                {/* Stage Display */}
                <div className="text-center">
                    <div className="text-4xl mb-3 animate-pulse drop-shadow-lg text-white">
                        <Icon className="w-10 h-10 mx-auto" />
                    </div>
                    <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-white to-purple-600 bg-clip-text text-transparent">
                        {stages[currentStage].text}
                    </p>

                    {/* Stage Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {stages.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentStage
                                    ? "bg-gradient-to-r from-white to-purple-600 shadow-md scale-110"
                                    : "bg-gray-700"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-6 overflow-hidden relative">
                    <div
                        className="h-full bg-gradient-to-r from-white to-purple-600 rounded-full transition-all duration-700 ease-in-out"
                        style={{
                            width: `${((currentStage + 1) / stages.length) * 100}%`,
                        }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[moveBg_2s_linear_infinite]" />
                </div>
            </div>
        </div>
    );
};

export default ContentLoader;