import React, { useState } from 'react';
import { Search, TrendingUp, Target, HelpCircle, Zap, Award, TrendingDown, Info, Tag } from 'lucide-react';

const KeywordAnalysis = ({ data }) => {
    const [activeKeywordTab, setActiveKeywordTab] = useState('competitor');

    const competitorKeywords = data?.comparison?.competitorInsights?.targetKeywords;
    const ourKeywords = data?.comparison?.ourInsights?.targetKeywords;

    const getDifficultyColor = (difficulty) => {
        if (!difficulty) return 'text-gray-600 bg-gray-100 border-gray-200';

        const difficultyLower = difficulty.toString().toLowerCase();
        switch (difficultyLower) {
            case 'low': return 'text-emerald-700 bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200';
            case 'low-medium': return 'text-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200';
            case 'medium': return 'text-amber-700 bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200';
            case 'medium-high': return 'text-orange-700 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200';
            case 'high': return 'text-red-700 bg-gradient-to-r from-red-100 to-pink-100 border-red-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    // Dynamic function to analyze the structure of keyword difficulty data
    const analyzeKeywordStructure = (keywordDifficulty) => {
        if (!keywordDifficulty || !Array.isArray(keywordDifficulty) || keywordDifficulty.length === 0) {
            return { columns: [], hasData: false };
        }

        // Get all unique keys from all objects
        const allKeys = new Set();
        keywordDifficulty.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(key => allKeys.add(key));
            }
        });

        const columns = Array.from(allKeys).map(key => ({
            key,
            header: formatHeaderName(key),
            type: determineColumnType(key, keywordDifficulty)
        }));

        return { columns, hasData: true };
    };

    // Format column header names (camelCase to Title Case)
    const formatHeaderName = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1') // Add space before capitals
            .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
            .trim();
    };

    // Determine the type of column for special rendering
    const determineColumnType = (key, data) => {
        const sampleValues = data
            .map(item => item[key])
            .filter(val => val !== null && val !== undefined)
            .slice(0, 5); // Check first 5 non-null values

        if (key.toLowerCase().includes('difficulty')) return 'difficulty';
        if (key.toLowerCase().includes('rationale') || key.toLowerCase().includes('reason') || key.toLowerCase().includes('description')) return 'text';
        if (key.toLowerCase().includes('keyword') || key.toLowerCase().includes('group') || key.toLowerCase().includes('name')) return 'primary';

        // Check if values look like difficulties
        if (sampleValues.some(val =>
            typeof val === 'string' &&
            /^(low|medium|high|easy|hard)(-\w+)?$/i.test(val.toString())
        )) return 'difficulty';

        return 'default';
    };

    // Render cell content based on column type
    const renderCellContent = (value, columnType, key) => {
        if (value === null || value === undefined) {
            return <span className="text-xs text-gray-400 italic">N/A</span>;
        }

        switch (columnType) {
            case 'difficulty':
                return (
                    <span className={`px-4 py-2 rounded-full text-xs font-bold border ${getDifficultyColor(value)}`}>
                        {value}
                    </span>
                );
            case 'text':
                return (
                    <div className="flex items-start max-w-xs">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">
                            {value.toString().length > 100 ?
                                `${value.toString().substring(0, 100)}...` :
                                value
                            }
                        </span>
                    </div>
                );
            case 'primary':
                return (
                    <div className="flex items-center">
                        <Tag className="w-4 h-4 text-indigo-500 mr-2" />
                        <span className="font-medium text-gray-800">{value}</span>
                    </div>
                );
            default:
                return (
                    <span className="text-gray-700">
                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                    </span>
                );
        }
    };

    const KeywordCard = ({ title, keywords, icon: Icon, bgColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 border border-opacity-50`}>
            <div className="flex items-center mb-3">
                <div className="bg-white/50 rounded-lg p-2 mr-3">
                    <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-800">{title}</h4>
            </div>
            <div className="space-y-2">
                {keywords && keywords.length > 0 ? (
                    keywords.map((keyword, index) => (
                        <span
                            key={index}
                            className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700 mr-2 mb-2 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
                        >
                            {typeof keyword === 'string' ? keyword : keyword?.keyword || keyword?.name || 'Unknown'}
                        </span>
                    ))
                ) : (
                    <div className="text-center py-4">
                        <span className="text-sm text-gray-500 italic">No keywords available</span>
                    </div>
                )}
            </div>
        </div>
    );

    const DynamicKeywordTable = ({ keywordData, title, subtitle }) => {
        const structure = analyzeKeywordStructure(keywordData?.keywordDifficulty);

        if (!structure.hasData) {
            return (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                            <p className="text-sm text-gray-500">{subtitle}</p>
                        </div>
                    </div>
                    <div className="text-center py-8">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No keyword difficulty data available</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr>
                                {structure.columns.map((column, index) => (
                                    <th
                                        key={column.key}
                                        className={`text-left py-4 px-6 font-bold text-gray-800 bg-gray-50 border-b border-gray-200 ${index === 0 ? 'rounded-tl-xl' :
                                                index === structure.columns.length - 1 ? 'rounded-tr-xl' : ''
                                            }`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {keywordData.keywordDifficulty.map((item, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors duration-200">
                                    {structure.columns.map((column) => (
                                        <td
                                            key={`${rowIndex}-${column.key}`}
                                            className="py-4 px-6 border-b border-gray-100"
                                        >
                                            {renderCellContent(item[column.key], column.type, column.key)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Tab Selector */}
            <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50">
                <button
                    onClick={() => setActiveKeywordTab('competitor')}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${activeKeywordTab === 'competitor'
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-[1.02]'
                            : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                        }`}
                >
                    Competitor Keywords
                </button>
                <button
                    onClick={() => setActiveKeywordTab('our')}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${activeKeywordTab === 'our'
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg transform scale-[1.02]'
                            : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                >
                    Your Website Keywords
                </button>
            </div>

            {/* Keyword Content */}
            {activeKeywordTab === 'competitor' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <KeywordCard
                            title="Primary Keywords"
                            keywords={competitorKeywords?.primaryKeywords}
                            icon={Target}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                        />
                        <KeywordCard
                            title="Long-tail Keywords"
                            keywords={competitorKeywords?.longTailKeywords}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <KeywordCard
                            title="Question-based Keywords"
                            keywords={competitorKeywords?.questionBasedKeywords}
                            icon={HelpCircle}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                        />
                        <KeywordCard
                            title="Semantic Keywords"
                            keywords={competitorKeywords?.semanticKeywords}
                            icon={Search}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                        />
                    </div>

                    {/* Dynamic Keyword Difficulty Table */}
                    <DynamicKeywordTable
                        keywordData={competitorKeywords}
                        title="Keyword Difficulty Analysis"
                        subtitle="Competition assessment for target keywords"
                    />
                </div>
            )}

            {activeKeywordTab === 'our' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <KeywordCard
                            title="Primary Keywords"
                            keywords={ourKeywords?.primaryKeywords}
                            icon={Target}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                        />
                        <KeywordCard
                            title="Long-tail Keywords"
                            keywords={ourKeywords?.longTailKeywords}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                        />
                        <KeywordCard
                            title="Low Competition"
                            keywords={ourKeywords?.lowCompetitionOpportunities}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                        />
                        <KeywordCard
                            title="Question Based Keywords"
                            keywords={ourKeywords?.questionBasedKeywords}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                        />
                        <KeywordCard
                            title="Semantic Keywords"
                            keywords={ourKeywords?.semanticKeywords}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                        />
                    </div>

                    {/* Dynamic Keyword Difficulty Table */}
                    <DynamicKeywordTable
                        keywordData={ourKeywords}
                        title="Keyword Difficulty Analysis"
                        subtitle="Our assessment for target keywords"
                    />
                </div>
            )}

            {/* Low Competition Opportunities */}
            {competitorKeywords?.lowCompetitionOpportunities && competitorKeywords.lowCompetitionOpportunities.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Low Competition Opportunities</h3>
                            <p className="text-sm text-gray-500">High-potential keywords with minimal competition</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {competitorKeywords.lowCompetitionOpportunities.map((keyword, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200 group"
                            >
                                <span className="text-sm font-semibold text-emerald-800 group-hover:text-emerald-900">
                                    {typeof keyword === 'string' ? keyword : keyword?.keyword || keyword?.name || 'Unknown'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeywordAnalysis;
