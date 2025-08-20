import React from 'react';
import { ExternalLink, Clock, DollarSign, BarChart3, TrendingUp, Zap } from 'lucide-react';

const AnalysisHeader = ({ data }) => {
    return (
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-xl mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center mb-3">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-3 mr-4">
                                <BarChart3 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    SEO Intelligence Dashboard
                                </h1>
                                <div className="flex items-center mt-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                    <span className="text-sm text-gray-500 font-medium">Live Analysis</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4 lg:mb-0 text-lg">
                            Comprehensive competitive intelligence and strategic recommendations
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">Analysis Type</p>
                                    <p className="text-2xl font-bold text-indigo-900 capitalize">{data.analysisType}</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-indigo-600" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Processing Cost</p>
                                    <p className="text-2xl font-bold text-emerald-900">{data.tokensCost} tokens</p>
                                </div>
                                <Zap className="w-8 h-8 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* URLs Being Analyzed */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200/50">
                        <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-3">Competitor Analysis</h3>
                        <a
                            href={data?.analyzedUrls?.competitor}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center text-red-600 hover:text-red-800 transition-all duration-300"
                        >
                            <span className="truncate mr-3 font-medium">{data?.analyzedUrls?.competitor}</span>
                            <ExternalLink className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50">
                        <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-3">Your Website</h3>
                        <a
                            href={data?.analyzedUrls?.our}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center text-emerald-600 hover:text-emerald-800 transition-all duration-300"
                        >
                            <span className="truncate mr-3 font-medium">{data?.analyzedUrls?.our}</span>
                            <ExternalLink className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisHeader;