import React from 'react';
import { Link, Target, TrendingUp, Users, Globe, Zap, Award, ExternalLink } from 'lucide-react';

const BacklinkStrategy = ({ data }) => {
    const competitorBacklinks = data?.comparison?.competitorInsights?.backlinkStrategy;
    const ourBacklinks = data?.comparison?.ourInsights?.backlinkStrategy;

    const StrategySection = ({ title, items, icon: Icon, bgColor, textColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 border border-opacity-50 shadow-lg`}>
            <div className="flex items-center mb-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 mr-4 shadow-md">
                    <Icon className={`w-6 h-6 ${textColor}`} />
                </div>
                <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
            </div>
            <div className="space-y-3">
                {(items || [])?.map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start">
                            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full p-2 mr-3 mt-1">
                                <ExternalLink className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed font-medium">{item}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const GapAnalysis = ({ content, title, bgColor, textColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 border border-opacity-50 shadow-lg`}>
            <div className="flex items-center mb-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 mr-4 shadow-md">
                    <Target className={`w-6 h-6 ${textColor}`} />
                </div>
                <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/30">
                <p className="text-gray-700 leading-relaxed">{content}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Link className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Backlink & Authority Building Strategy
                        </h2>
                        <p className="text-gray-600 text-lg mt-2">Link building tactics and digital PR opportunities</p>
                    </div>
                </div>
            </div>

            {/* Competitor Backlink Strategy */}
            {competitorBacklinks && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200/50">
                        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3 mr-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            Competitor Link Building Analysis
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StrategySection
                            title="High Authority Targets"
                            items={competitorBacklinks?.highAuthorityTargets}
                            icon={Award}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <StrategySection
                            title="Link Building Tactics"
                            items={competitorBacklinks?.linkBuildingTactics}
                            icon={Target}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StrategySection
                            title="Content for Link Earning"
                            items={competitorBacklinks?.contentForLinkEarning}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                        <StrategySection
                            title="Digital PR Opportunities"
                            items={competitorBacklinks?.digitalPROpportunities}
                            icon={Zap}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    {competitorBacklinks?.competitorBacklinkGaps && (
                        <GapAnalysis
                            title="Competitor Backlink Gaps"
                            content={competitorBacklinks?.competitorBacklinkGaps}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                    )}
                </div>
            )}

            {/* Our Backlink Strategy */}
            {ourBacklinks && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50">
                        <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            Your Website Link Building Strategy
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StrategySection
                            title="High Authority Targets"
                            items={ourBacklinks?.highAuthorityTargets}
                            icon={Award}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <StrategySection
                            title="Link Building Tactics"
                            items={ourBacklinks?.linkBuildingTactics}
                            icon={Target}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StrategySection
                            title="Content for Link Earning"
                            items={ourBacklinks?.contentForLinkEarning}
                            icon={TrendingUp}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                        <StrategySection
                            title="Digital PR Opportunities"
                            items={ourBacklinks?.digitalPROpportunities}
                            icon={Zap}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    {ourBacklinks?.competitorBacklinkGaps && (
                        <GapAnalysis
                            title="Competitive Backlink Opportunities"
                            content={Array.isArray(ourBacklinks?.competitorBacklinkGaps) ? ourBacklinks?.competitorBacklinkGaps.join(' ') : ourBacklinks?.competitorBacklinkGaps}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default BacklinkStrategy;