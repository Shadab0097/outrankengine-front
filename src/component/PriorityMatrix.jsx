import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import { safeRender } from '../utils/helper';

const PriorityMatrix = ({ priorities = [] }) => (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-full flex flex-col">
        <div className="flex items-center mb-4 flex-shrink-0">
            <FiBarChart2 className="text-purple-500 mr-3 text-lg sm:text-xl flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">Priority Matrix</h3>
        </div>
        <div className="flex-grow overflow-hidden">
            {priorities.length > 0 ? (
                <div className="space-y-3">
                    {priorities.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 ${item.impact === "Low" ? "bg-red-500" : item.impact === "Medium" ? "bg-orange-500" : item.impact === "High" ? "bg-yellow-500" : "bg-green-500"
                                    }`}
                            >
                                {item.priority}
                            </span>
                            <span className="text-gray-700 text-sm sm:text-base leading-relaxed break-words flex-1">{safeRender(item)}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm italic">No priority data available</p>
            )}
        </div>
    </div>
);

export default PriorityMatrix;
