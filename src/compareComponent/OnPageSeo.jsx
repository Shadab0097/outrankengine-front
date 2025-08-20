import React from 'react';
import { Settings, FileText, Link2, Image, Code, Search, Globe, CheckCircle } from 'lucide-react';

const OnPageSEO = ({ data }) => {
    const competitorSEO = data?.comparison?.competitorInsights?.onPageSEOSuggestions;
    const ourSEO = data?.comparison?.ourInsights?.onPageSEOSuggestions;

    const SEOSection = ({ title, items, icon: Icon, bgColor, textColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 border border-opacity-50 shadow-lg`}>
            <div className="flex items-center mb-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 mr-4 shadow-md">
                    <Icon className={`w-6 h-6 ${textColor}`} />
                </div>
                <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
            </div>
            <div className="space-y-3">
                {(items || [])?.map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                        <div className="flex items-start">
                            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-full p-2 mr-3 mt-1">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
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
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Settings className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            On-Page SEO Optimization
                        </h2>
                        <p className="text-gray-600 text-lg mt-2">Technical and content optimization recommendations</p>
                    </div>
                </div>
            </div>

            {/* Competitor On-Page SEO */}
            {competitorSEO && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200/50">
                        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3 mr-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            Competitor On-Page SEO Analysis
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Title Tag Optimization"
                            items={competitorSEO?.titleTagOptimization}
                            icon={FileText}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                        <SEOSection
                            title="Meta Descriptions"
                            items={competitorSEO?.metaDescriptions}
                            icon={Search}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Header Structure"
                            items={competitorSEO?.headerStructure}
                            icon={Code}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <SEOSection
                            title="Internal Linking"
                            items={competitorSEO?.internalLinking}
                            icon={Link2}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Schema Markup"
                            items={competitorSEO?.schemaMarkup}
                            icon={Code}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                        <SEOSection
                            title="URL Structure"
                            items={competitorSEO?.urlStructure}
                            icon={Link2}
                            bgColor="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200"
                            textColor="text-pink-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Image Optimization"
                            items={competitorSEO?.imageOptimization}
                            icon={Image}
                            bgColor="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200"
                            textColor="text-indigo-800"
                        />
                        <SEOSection
                            title="Content Structure"
                            items={competitorSEO?.contentStructure}
                            icon={FileText}
                            bgColor="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200"
                            textColor="text-green-800"
                        />
                    </div>
                </div>
            )}

            {/* Our On-Page SEO */}
            {ourSEO && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50">
                        <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            Your Website On-Page SEO Recommendations
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Title Tag Optimization"
                            items={ourSEO?.titleTagOptimization}
                            icon={FileText}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                        <SEOSection
                            title="Meta Descriptions"
                            items={ourSEO?.metaDescriptions}
                            icon={Search}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Header Structure"
                            items={ourSEO?.headerStructure}
                            icon={Code}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <SEOSection
                            title="Internal Linking"
                            items={ourSEO?.internalLinking}
                            icon={Link2}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Schema Markup"
                            items={ourSEO?.schemaMarkup}
                            icon={Code}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                        <SEOSection
                            title="URL Structure"
                            items={ourSEO?.urlStructure}
                            icon={Link2}
                            bgColor="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200"
                            textColor="text-pink-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SEOSection
                            title="Image Optimization"
                            items={ourSEO?.imageOptimization}
                            icon={Image}
                            bgColor="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200"
                            textColor="text-indigo-800"
                        />
                        <SEOSection
                            title="Content Structure"
                            items={ourSEO?.contentStructure}
                            icon={FileText}
                            bgColor="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200"
                            textColor="text-green-800"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnPageSEO;