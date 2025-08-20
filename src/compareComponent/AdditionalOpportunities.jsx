import React from 'react';
import { Target, Award, MapPin, Share2, Mic, Star, TrendingUp, Users } from 'lucide-react';

const AdditionalOpportunities = ({ data }) => {
    const competitorOpportunities = data?.comparison?.competitorInsights?.additionalOpportunities;
    const ourOpportunities = data?.comparison?.ourInsights?.additionalOpportunities;

    const OpportunitySection = ({ title, items, icon: Icon, bgColor, textColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 border border-opacity-50 shadow-lg`}>
            <div className="flex items-center mb-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 mr-4 shadow-md">
                    <Icon className={`w-6 h-6 ${textColor}`} />
                </div>
                <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
            </div>
            <div className="space-y-3">
                {(items || []).map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start">
                            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-2 mr-3 mt-1">
                                <Star className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed font-medium">{item}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const AdvantageSection = ({ title, items, bgColor, textColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 border border-opacity-50 shadow-lg`}>
            <div className="flex items-center mb-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 mr-4 shadow-md">
                    <TrendingUp className={`w-6 h-6 ${textColor}`} />
                </div>
                <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
            </div>
            <div className="space-y-3">
                {(items || []).map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start">
                            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-full p-2 mr-3 mt-1">
                                <Award className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed font-medium">{item}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Additional Growth Opportunities
                        </h2>
                        <p className="text-gray-600 text-lg mt-2">Advanced strategies for competitive advantage</p>
                    </div>
                </div>
            </div>

            {/* Competitor Additional Opportunities */}
            {competitorOpportunities && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200/50">
                        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3 mr-4">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            Competitor Growth Opportunities Analysis
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <OpportunitySection
                            title="E-A-T Signals"
                            items={competitorOpportunities.eatSignals}
                            icon={Award}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <OpportunitySection
                            title="Local SEO Tactics"
                            items={competitorOpportunities.localSEOTactics}
                            icon={MapPin}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <OpportunitySection
                            title="Social Signals"
                            items={competitorOpportunities.socialSignals}
                            icon={Share2}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                        <OpportunitySection
                            title="AI Content Optimization"
                            items={competitorOpportunities.aiContentOptimization}
                            icon={Users}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <OpportunitySection
                            title="Featured Snippet Targets"
                            items={competitorOpportunities.featuredSnippetTargets}
                            icon={Star}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                        <OpportunitySection
                            title="Voice Search Optimization"
                            items={competitorOpportunities.voiceSearchOptimization}
                            icon={Mic}
                            bgColor="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200"
                            textColor="text-pink-800"
                        />
                    </div>

                    {competitorOpportunities.competitiveAdvantages && (
                        <AdvantageSection
                            title="Competitive Advantages"
                            items={competitorOpportunities.competitiveAdvantages}
                            bgColor="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200"
                            textColor="text-indigo-800"
                        />
                    )}
                </div>
            )}

            {/* Our Additional Opportunities */}
            {ourOpportunities && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50">
                        <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            Your Website Growth Opportunities
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <OpportunitySection
                            title="E-A-T Signals"
                            items={ourOpportunities.eatSignals}
                            icon={Award}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <OpportunitySection
                            title="Local SEO Tactics"
                            items={ourOpportunities.localSEOTactics}
                            icon={MapPin}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <OpportunitySection
                            title="Social Signals"
                            items={ourOpportunities.socialSignals}
                            icon={Share2}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                        <OpportunitySection
                            title="AI Content Optimization"
                            items={ourOpportunities.aiContentOptimization}
                            icon={Users}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <OpportunitySection
                            title="Featured Snippet Targets"
                            items={ourOpportunities.featuredSnippetTargets}
                            icon={Star}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                        <OpportunitySection
                            title="Voice Search Optimization"
                            items={ourOpportunities.voiceSearchOptimization}
                            icon={Mic}
                            bgColor="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200"
                            textColor="text-pink-800"
                        />
                    </div>

                    {ourOpportunities.competitiveAdvantages && (
                        <AdvantageSection
                            title="Competitive Advantages"
                            items={ourOpportunities.competitiveAdvantages}
                            bgColor="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200"
                            textColor="text-indigo-800"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AdditionalOpportunities;