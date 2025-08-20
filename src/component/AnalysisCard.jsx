import React from 'react';
import { getColorClasses } from '../utils/helper';

const AnalysisCard = ({ title, content, icon: Icon, color = "gray" }) => {
    const colors = getColorClasses(color);

    return (
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-full">
            <div className="flex items-center mb-3 sm:mb-4">
                <Icon className={`${colors.text} mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0`} />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="text-gray-600 leading-relaxed text-sm sm:text-base">{content || "No information available"}</div>
        </div>
    );
};

export default AnalysisCard;
