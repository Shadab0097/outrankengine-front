import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Shield, Target, Award } from 'lucide-react';

const AnalysisOverview = ({ data }) => {
    const competitorData = data?.comparison?.competitorInsights?.analysisSummary;
    const ourData = data?.comparison?.ourInsights?.analysisSummary;

    return (
        <div className="space-y-8">
            {/* Executive Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50">
                    <div className="flex items-center justify-between mb-4">
                        <Target className="w-8 h-8 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wide">
                            Opportunity
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Market Position</h3>
                    <p className="text-blue-700 text-sm leading-relaxed">
                        Significant opportunity to outrank competitor through strategic content development and technical optimization.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200/50">
                    <div className="flex items-center justify-between mb-4">
                        <Award className="w-8 h-8 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wide">
                            Advantage
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">Content Depth</h3>
                    <p className="text-emerald-700 text-sm leading-relaxed">
                        Multi-page architecture and comprehensive content strategy will provide substantial competitive advantage.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200/50">
                    <div className="flex items-center justify-between mb-4">
                        <Shield className="w-8 h-8 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wide">
                            Authority
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">E-E-A-T Signals</h3>
                    <p className="text-purple-700 text-sm leading-relaxed">
                        Focus on expertise, experience, authoritativeness, and trustworthiness will establish market leadership.
                    </p>
                </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Competitor Analysis */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3 mr-4">
                            <TrendingDown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Competitor Analysis</h2>
                            <p className="text-sm text-gray-500">Market positioning assessment</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200/50">
                            <h3 className="font-bold text-emerald-800 mb-3 flex items-center">
                                <CheckCircle className="w-5 h-5 mr-3" />
                                Strengths
                            </h3>
                            <p className="text-sm text-emerald-700 leading-relaxed">{competitorData?.competitorStrengths}</p>
                        </div>

                        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5 border border-red-200/50">
                            <h3 className="font-bold text-red-800 mb-3 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-3" />
                                Weaknesses
                            </h3>
                            <p className="text-sm text-red-700 leading-relaxed">{competitorData?.competitorWeaknesses}</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200/50">
                            <h3 className="font-bold text-blue-800 mb-3">Strategic Assessment</h3>
                            <p className="text-sm text-blue-700 leading-relaxed">{competitorData?.overallAssessment}</p>
                        </div>
                    </div>
                </div>

                {/* Our Analysis */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Your Website Analysis</h2>
                            <p className="text-sm text-gray-500">Current performance evaluation</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200/50">
                            <h3 className="font-bold text-emerald-800 mb-3 flex items-center">
                                <CheckCircle className="w-5 h-5 mr-3" />
                                Strengths
                            </h3>
                            <p className="text-sm text-emerald-700 leading-relaxed">{ourData?.competitorStrengths}</p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200/50">
                            <h3 className="font-bold text-amber-800 mb-3 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-3" />
                                Areas for Improvement
                            </h3>
                            <p className="text-sm text-amber-700 leading-relaxed">{ourData?.competitorWeaknesses}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ranking Factors & Content Gaps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ranking Factors */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Key Ranking Factors</h3>
                    <ul className="space-y-3">
                        {competitorData?.rankingFactors?.map((factor, index) => (
                            <li key={index} className="flex items-start">
                                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full p-2 mr-4 mt-1">
                                    <CheckCircle className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-700 leading-relaxed">{factor}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Gaps */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Content Gap Opportunities</h3>
                    <ul className="space-y-3">
                        {competitorData?.contentGaps?.map((gap, index) => (
                            <li key={index} className="flex items-start">
                                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-full p-2 mr-4 mt-1">
                                    <Target className="w-4 h-4 text-orange-600" />
                                </div>
                                <span className="text-sm text-gray-700 leading-relaxed">{gap}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnalysisOverview;