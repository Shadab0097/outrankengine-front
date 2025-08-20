import React, { useState } from 'react';
import { BarChart3, Target, TrendingUp, Globe, Search, Users, BookOpen, Zap, Activity, Settings, Link, Shield } from 'lucide-react';
import AnalysisHeader from './AnalysisHeader';
import AnalysisOverview from './AnalysisOverview';
import KeywordAnalysis from './KeywordAnalysis';
import ContentStrategy from './ContentStrategy';
import ImplementationPlan from './ImplementationPlan';
import OnPageSEO from './OnPageSeo';
import BacklinkStrategy from './BacklinkStrategy';
import TechnicalSEO from './TechnicalSEO';
import AdditionalOpportunities from './AdditionalOpportunities';

const AnalysisDashboard = ({ data }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', name: 'Executive Summary', icon: BarChart3, description: 'Competitive landscape overview' },
        { id: 'keywords', name: 'Keyword Intelligence', icon: Search, description: 'Search opportunity analysis' },
        { id: 'content', name: 'Content Strategy', icon: BookOpen, description: 'Content recommendations' },
        { id: 'onpage', name: 'On-Page SEO', icon: Settings, description: 'Technical optimization' },
        { id: 'backlinks', name: 'Link Building', icon: Link, description: 'Authority building strategy' },
        { id: 'technical', name: 'Technical SEO', icon: Shield, description: 'Performance optimization' },
        { id: 'opportunities', name: 'Opportunities', icon: Target, description: 'Additional growth areas' },
        { id: 'implementation', name: 'Action Plan', icon: Zap, description: 'Implementation roadmap' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <AnalysisOverview data={data} />;
            case 'keywords':
                return <KeywordAnalysis data={data} />;
            case 'content':
                return <ContentStrategy data={data} />;
            case 'onpage':
                return <OnPageSEO data={data} />;
            case 'backlinks':
                return <BacklinkStrategy data={data} />;
            case 'technical':
                return <TechnicalSEO data={data} />;
            case 'opportunities':
                return <AdditionalOpportunities data={data} />;
            case 'implementation':
                return <ImplementationPlan data={data} />;
            default:
                return <AnalysisOverview data={data} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
            <AnalysisHeader data={data} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 mb-8 p-3">
                    <nav className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group flex flex-col items-center justify-center px-4 py-4 rounded-xl text-xs font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 mb-2 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
                                        }`} />
                                    <div className="text-center">
                                        <div className="font-semibold text-xs leading-tight">{tab.name}</div>
                                        <div className={`text-xs mt-1 leading-tight ${activeTab === tab.id ? 'text-indigo-100' : 'text-gray-400 group-hover:text-indigo-400'
                                            } hidden lg:block`}>
                                            {tab.description}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="animate-fadeIn transition-all duration-500">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default AnalysisDashboard;