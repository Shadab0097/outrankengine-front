import React from 'react';
import { getColorClasses, safeRender } from '../utils/helper';

const KeywordSection = ({ title, keywords = [], icon: Icon, color = "blue" }) => {
    const colors = getColorClasses(color);

    return (
        <div className={`bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 ${colors.border}`}>
            <div className="flex items-center mb-3">
                <Icon className={`${colors.text} mr-2 text-base sm:text-lg flex-shrink-0`} />
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, idx) => (
                    <span key={idx} className={`px-2 sm:px-3 py-1 ${colors.bg} ${colors.textBg} rounded-full text-xs sm:text-sm font-medium`}>
                        {safeRender(keyword)}
                    </span>
                ))}
                {keywords.length === 0 && <span className="text-gray-500 text-sm italic">No data available</span>}
            </div>
        </div>
    );
};

export default KeywordSection;
