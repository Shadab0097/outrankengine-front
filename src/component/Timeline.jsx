import React from 'react';
import { FiClock } from 'react-icons/fi';

const Timeline = ({ timelines = [] }) => (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-full flex flex-col">
        <div className="flex items-center mb-4 flex-shrink-0">
            <FiClock className="text-indigo-500 mr-3 text-lg sm:text-xl flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">Implementation Timeline</h3>
        </div>
        <div className="flex-grow overflow-hidden">
            {timelines.length > 0 ? (
                <div className="space-y-4">
                    {timelines.map((phase, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-4 h-4 bg-indigo-500 rounded-full flex-shrink-0 mt-1"></div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight break-words">{phase.phase || "Phase"}</h4>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">{phase.duration || phase.action}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm italic">No timeline data available</p>
            )}
        </div>
    </div>
);

export default Timeline;
