import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { getColorClasses, safeRender } from '../utils/helper';

const ListSection = ({ title, items = [], icon: Icon, color = "blue" }) => {
    const colors = getColorClasses(color);

    return (
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center mb-4 flex-shrink-0">
                <Icon className={`${colors.text} mr-3 text-lg sm:text-xl flex-shrink-0`} />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{title}</h3>
            </div>
            <div className="flex-grow overflow-hidden">
                {items.length > 0 ? (
                    <ul className="space-y-3">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <FiCheckCircle className="text-green-500 flex-shrink-0 text-sm mt-0.5" />
                                <span className="text-gray-700 text-sm sm:text-base leading-relaxed break-words flex-1">{safeRender(item)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm italic">No data available</p>
                )}
            </div>
        </div>
    );
};

export default ListSection;
