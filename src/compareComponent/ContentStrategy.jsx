import React from 'react';
import { BookOpen, Video, Image, FileText, Users, Target, Lightbulb, Award, TrendingUp } from 'lucide-react';

const ContentStrategy = ({ data }) => {
    const strategy = data?.comparison?.competitorInsights?.contentStrategy;

    const getContentTypeIcon = (type) => {
        if (type.includes('Blog')) return BookOpen;
        if (type.includes('Video')) return Video;
        if (type.includes('Photo') || type.includes('Infographics')) return Image;
        if (type.includes('Reports')) return FileText;
        if (type.includes('Team') || type.includes('Bios')) return Users;
        return Target;
    };

    return (
        <div className="space-y-8">
            {/* Content Types */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Recommended Content Types</h3>
                        <p className="text-sm text-gray-500">Strategic content formats for maximum impact</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {strategy?.contentTypes?.map((type, index) => {
                        const Icon = getContentTypeIcon(type);
                        return (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200/50 hover:shadow-md transition-all duration-200 group">
                                <div className="flex items-center mb-2">
                                    <div className="bg-white/50 rounded-lg p-2 mr-3">
                                        <Icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">{type}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Formats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                        <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Content Formats</h3>
                        <p className="text-sm text-gray-500">Optimal formats for audience engagement</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategy?.contentFormat?.map((format, index) => (
                        <div key={index} className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-5 border border-emerald-200/50 hover:shadow-md transition-all duration-200 group">
                            <div className="flex items-center">
                                <div className="bg-white/50 rounded-lg p-2 mr-3">
                                    <FileText className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-semibold text-gray-800">{format}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Depth Guidelines */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-3 mr-4">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Content Depth Guidelines</h3>
                        <p className="text-sm text-gray-500">Quality standards for comprehensive content</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed">{strategy?.contentDepth}</p>
                </div>
            </div>

            {/* Unique Content Angles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-3 mr-4">
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Unique Content Angles</h3>
                        <p className="text-sm text-gray-500">Distinctive approaches for competitive advantage</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {strategy?.uniqueAngles?.map((angle, index) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-5 border border-purple-200/50 hover:shadow-md transition-all duration-200 group">
                            <div className="flex items-start">
                                <div className="bg-white/50 rounded-lg p-2 mr-3 mt-1">
                                    <Target className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm text-gray-700 leading-relaxed">{angle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Intent Alignment */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">User Intent Alignment</h3>
                        <p className="text-sm text-gray-500">Content mapping to search intent categories</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {strategy?.userIntentAlignment?.map((alignment, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200/50 rounded-xl p-5 hover:shadow-md transition-all duration-200">
                            <div className="flex items-center mb-2">
                                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-xs font-bold border border-blue-200">
                                    {alignment?.intent}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{alignment?.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Cluster Strategy */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-3 mr-4">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Content Cluster Strategy</h3>
                        <p className="text-sm text-gray-500">Topic clusters for topical authority building</p>
                    </div>
                </div>
                <div className="space-y-6">
                    {strategy?.contentClusterStrategy?.map((cluster, index) => (
                        <div key={index} className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gradient-to-br from-yellow-50 to-amber-50">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl p-3 mr-4">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                {cluster?.pillarPage}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {cluster?.clusterContent?.map((content, contentIndex) => (
                                    <div key={contentIndex} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 hover:shadow-md transition-all duration-200">
                                        <span className="text-sm font-medium text-gray-700">{content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expertise Signals */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-3 mr-4">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">E-E-A-T Expertise Signals</h3>
                        <p className="text-sm text-gray-500">Authority and trustworthiness indicators</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategy?.expertiseSignals?.map((signal, index) => (
                        <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-5 border border-green-200/50 hover:shadow-md transition-all duration-200 group">
                            <div className="flex items-start">
                                <div className="bg-white/50 rounded-lg p-2 mr-3 mt-1">
                                    <Users className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm text-gray-700 leading-relaxed">{signal}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentStrategy;