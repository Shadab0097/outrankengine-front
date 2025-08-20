import React from 'react';
import { Shield, Zap, Smartphone, Search, Globe, Lock, Code, Activity } from 'lucide-react';

const TechnicalSEO = ({ data }) => {
    const competitorTechnical = data?.comparison?.competitorInsights?.technicalSEO;
    const ourTechnical = data?.comparison?.ourInsights?.technicalSEO;

    const TechnicalSection = ({ title, items, icon: Icon, bgColor, textColor }) => (
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
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-2 mr-3 mt-1">
                                <Activity className="w-4 h-4 text-green-600" />
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
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Technical SEO Optimization
                        </h2>
                        <p className="text-gray-600 text-lg mt-2">Performance, security, and crawlability improvements</p>
                    </div>
                </div>
            </div>

            {/* Competitor Technical SEO */}
            {competitorTechnical && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200/50">
                        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3 mr-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            Competitor Technical SEO Analysis
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TechnicalSection
                            title="Core Web Vitals"
                            items={competitorTechnical?.coreWebVitals}
                            icon={Zap}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                        <TechnicalSection
                            title="Mobile Optimization"
                            items={competitorTechnical?.mobileOptimization}
                            icon={Smartphone}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TechnicalSection
                            title="Site Speed"
                            items={competitorTechnical?.siteSpeed}
                            icon={Activity}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <TechnicalSection
                            title="Crawlability"
                            items={competitorTechnical?.crawlability}
                            icon={Search}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TechnicalSection
                            title="Indexing Optimization"
                            items={competitorTechnical?.indexingOptimization}
                            icon={Globe}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                        <TechnicalSection
                            title="Structured Data"
                            items={competitorTechnical?.structuredData}
                            icon={Code}
                            bgColor="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200"
                            textColor="text-pink-800"
                        />
                    </div>

                    {competitorTechnical.securityEnhancements && (
                        <TechnicalSection
                            title="Security Enhancements"
                            items={competitorTechnical?.securityEnhancements}
                            icon={Lock}
                            bgColor="bg-gradient-to-br from-red-50 to-pink-100 border-red-200"
                            textColor="text-red-800"
                        />
                    )}
                </div>
            )}

            {/* Our Technical SEO */}
            {ourTechnical && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50">
                        <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3 mr-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            Your Website Technical SEO Recommendations
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TechnicalSection
                            title="Core Web Vitals"
                            items={ourTechnical?.coreWebVitals}
                            icon={Zap}
                            bgColor="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
                            textColor="text-blue-800"
                        />
                        <TechnicalSection
                            title="Mobile Optimization"
                            items={ourTechnical?.mobileOptimization}
                            icon={Smartphone}
                            bgColor="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"
                            textColor="text-emerald-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TechnicalSection
                            title="Site Speed"
                            items={ourTechnical?.siteSpeed}
                            icon={Activity}
                            bgColor="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                            textColor="text-purple-800"
                        />
                        <TechnicalSection
                            title="Crawlability"
                            items={ourTechnical?.crawlability}
                            icon={Search}
                            bgColor="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200"
                            textColor="text-amber-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TechnicalSection
                            title="Indexing Optimization"
                            items={ourTechnical?.indexingOptimization}
                            icon={Globe}
                            bgColor="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200"
                            textColor="text-teal-800"
                        />
                        <TechnicalSection
                            title="Structured Data"
                            items={ourTechnical?.structuredData}
                            icon={Code}
                            bgColor="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200"
                            textColor="text-pink-800"
                        />
                    </div>

                    {ourTechnical?.securityEnhancements && (
                        <TechnicalSection
                            title="Security Enhancements"
                            items={ourTechnical?.securityEnhancements}
                            icon={Lock}
                            bgColor="bg-gradient-to-br from-red-50 to-pink-100 border-red-200"
                            textColor="text-red-800"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TechnicalSEO;