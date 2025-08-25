import React, { useState, useEffect } from 'react';

const ContentLoader = ({ isLoading }) => {
    const [currentStage, setCurrentStage] = useState(0);

    const stages = [
        { text: "Fetching data", icon: "📊" },
        { text: "Creating H1", icon: "📝" },
        { text: "Creating H2", icon: "✏️" },
        { text: "Creating post content", icon: "📄" }
    ];

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setCurrentStage(prev => (prev + 1) % stages.length);
        }, 1500); // Change stage every 1.5 seconds

        return () => clearInterval(interval);
    }, [isLoading, stages.length]);

    useEffect(() => {
        // Reset to first stage when loading starts
        if (isLoading) {
            setCurrentStage(0);
        }
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="flex flex-col items-center justify-center mt-8 p-6">
            {/* Animated dots */}
            <div className="flex space-x-1 mb-4">
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 bg-blue-400 rounded-full animate-bounce`}
                        style={{
                            animationDelay: `${index * 0.2}s`,
                            animationDuration: '1s'
                        }}
                    />
                ))}
            </div>

            {/* Current stage display */}
            <div className="text-center">
                <div className="text-3xl mb-2 animate-pulse">
                    {stages[currentStage].icon}
                </div>
                <p className="text-white/90 text-lg font-medium mb-2">
                    {stages[currentStage].text}
                </p>
                <div className="flex space-x-1">
                    {stages.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentStage ? 'bg-blue-400' : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/20 rounded-full mt-4 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1500 ease-in-out"
                    style={{
                        width: `${((currentStage + 1) / stages.length) * 100}%`
                    }}
                />
            </div>
        </div>
    );
};

export default ContentLoader;
