import React, { useState } from 'react';
import { Search, TrendingUp, Target, HelpCircle, Zap, Award, TrendingDown } from 'lucide-react';

const KeywordAnalysis = ({ data }) => {
    const [activeKeywordTab, setActiveKeywordTab] = useState('competitor');

    const competitorKeywords = data?.comparison?.competitorInsights?.targetKeywords;
    const ourKeywords = data?.comparison?.ourInsights?.targetKeywords;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase() || difficulty) {
            case 'low': return 'text-emerald-700 bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200';
            case 'medium': return 'text-amber-700 bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200';
            case 'medium-high': return 'text-orange-700 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200';
            case 'high': return 'text-red-700 bg-gradient-to-r from-red-100 to-pink-100 border-red-200';
            default: return 'text-gray-600 bg-gray-100';
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
                {keywords?.map((keyword, index) => (
                    <span
                        key={index}
                        className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700 mr-2 mb-2 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
                    >
                        {typeof keyword === 'string' ? keyword : keyword?.keyword}
                    </span>
                ))}
            </div>
        </div>
    );

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

                    {/* Keyword Difficulty Table */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Keyword Difficulty Analysis</h3>
                                <p className="text-sm text-gray-500">Competition assessment for target keywords</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th className="text-left py-4 px-6 font-bold text-gray-800 bg-gray-50 rounded-tl-xl border-b border-gray-200">Keyword</th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-800 bg-gray-50 rounded-tr-xl border-b border-gray-200">Difficulty Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {competitorKeywords?.keywordDifficulty?.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-200">
                                            <td className="py-4 px-6 text-gray-800 font-medium border-b border-gray-100">{item?.keyword}</td>
                                            <td className="py-4 px-6 border-b border-gray-100">
                                                <span className={`px-4 py-2 rounded-full text-xs font-bold border ${getDifficultyColor(item?.difficulty)}`}>
                                                    {item?.difficulty}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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

                    {/* Keyword Difficulty Table */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Keyword Difficulty Analysis</h3>
                                <p className="text-sm text-gray-500">Our assessment for target keywords</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th className="text-left py-4 px-6 font-bold text-gray-800 bg-gray-50 rounded-tl-xl border-b border-gray-200">Keyword</th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-800 bg-gray-50 rounded-tr-xl border-b border-gray-200">Difficulty Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ourKeywords?.keywordDifficulty?.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-200">
                                            <td className="py-4 px-6 text-gray-800 font-medium border-b border-gray-100">{item?.keyword}</td>
                                            <td className="py-4 px-6 border-b border-gray-100">
                                                <span className={`px-4 py-2 rounded-full text-xs font-bold border ${getDifficultyColor(item?.difficulty)}`}>
                                                    {item?.difficulty}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Low Competition Opportunities */}
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
                    {competitorKeywords?.lowCompetitionOpportunities?.map((keyword, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200 group"
                        >
                            <span className="text-sm font-semibold text-emerald-800 group-hover:text-emerald-900">{keyword}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KeywordAnalysis;