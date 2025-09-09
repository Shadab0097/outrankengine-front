import React from 'react';
import {
    Target,
    FileText,
    Hash,
    Share2,
    Settings,
    TrendingUp,
    Edit3,
    ExternalLink,
    Tag,
    Users,
    Search,
    BarChart3,
    CheckCircle,
    Clock,
    Eye
} from 'lucide-react';

const ContentCreation = ({ data }) => {
    const h1Tags = data?.seoOptimizedH1Tags || data?.h1TagStrategy || [];
    const h2Tags = data?.keywordOptimizedH2Tags || [];
    const pillarStrategy = data?.pillarContentStrategy?.mainPillarPage || {};
    const blogPosts = data?.highConversionBlogPosts || [];
    const socialPosts = data?.socialMediaSEOPosts || data?.socialMediaPosts || [];
    const techSEO = data?.technicalSEORecommendations || {};

    // Helper function to render arrays safely
    const renderList = (items, className = "") => {
        if (!Array.isArray(items) || items.length === 0) {
            return (
                <div className="flex items-center justify-center py-8 text-gray-400">
                    <div className="text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm italic">No data available</p>
                    </div>
                </div>
            );
        }
        return (
            <ul className={`space-y-3 ${className}`}>
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    // Helper function to render keywords as tags
    const renderKeywordTags = (keywords) => {
        if (!Array.isArray(keywords) || keywords.length === 0) return null;
        return (
            <div className="flex flex-wrap gap-2 mt-4">
                {keywords.map((keyword, idx) => (
                    <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                    >
                        <Tag className="w-3 h-3 mr-1.5" />
                        {keyword}
                    </span>
                ))}
            </div>
        );
    };

    // Stats component
    const StatsCard = ({ icon, title, count, color }) => (
        <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-1">{count}</p>
                </div>
                <div className="text-white/70 text-2xl">
                    {icon}
                </div>
            </div>
        </div>
    );

    // Section wrapper component
    const Section = ({ icon, title, count, children, gradient }) => (
        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-600 text-sm mt-1">Optimized for maximum impact</p>
                    </div>
                </div>
                {count !== undefined && (
                    <div className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-full font-semibold text-sm shadow-md`}>
                        {count} {count === 1 ? 'Item' : 'Items'}
                    </div>
                )}
            </div>
            {children}
        </section>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-16">
                {/* Header */}
                <div className="text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl px-8 py-12 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Edit3 className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Content Creation
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Strategy</span>
                        </h1>
                        <p className="text-gray-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                            Comprehensive SEO-optimized content strategy designed to outrank competitors and drive meaningful engagement
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        icon={<Target />}
                        title="H1 Tags"
                        count={h1Tags.length}
                        color="from-green-500 to-emerald-600"
                    />
                    <StatsCard
                        icon={<Hash />}
                        title="H2 Tags"
                        count={h2Tags.length}
                        color="from-purple-500 to-violet-600"
                    />
                    <StatsCard
                        icon={<TrendingUp />}
                        title="Blog Posts"
                        count={blogPosts.length}
                        color="from-orange-500 to-red-500"
                    />
                    <StatsCard
                        icon={<Share2 />}
                        title="Social Posts"
                        count={socialPosts.length}
                        color="from-pink-500 to-rose-600"
                    />
                </div>

                {/* H1 Tags Section */}
                <Section
                    icon={<Target className="w-6 h-6" />}
                    title="SEO Optimized H1 Tags"
                    count={h1Tags.length}
                    gradient="from-green-500 to-emerald-600"
                >
                    {h1Tags.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 shadow-sm border text-center">
                            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No H1 tag data available</p>
                            <p className="text-gray-400 text-sm mt-2">Content will appear here once data is loaded</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {h1Tags.map((h1, idx) => (
                                <div key={idx} className="group">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 h-full">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <span className="text-green-600 font-bold text-sm">H1</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3">
                                                    {h1.tag || h1.title || 'Untitled H1 Tag'}
                                                </h3>
                                                {h1.searchIntent && (
                                                    <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                                                        <Eye className="w-3 h-3 mr-1" />
                                                        {h1.searchIntent}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <BarChart3 className="w-4 h-4" />
                                                Purpose & Strategy
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                {h1.purpose || h1.competitorWeaknessExploited || h1.description || 'No description available'}
                                            </p>
                                        </div>
                                        {renderKeywordTags(h1.targetKeywords)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* H2 Tags Section */}
                <Section
                    icon={<Hash className="w-6 h-6" />}
                    title="Keyword Optimized H2 Tags"
                    count={h2Tags.length}
                    gradient="from-purple-500 to-violet-600"
                >
                    {h2Tags.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 shadow-sm border text-center">
                            <Hash className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No H2 tag data available</p>
                            <p className="text-gray-400 text-sm mt-2">Content will appear here once data is loaded</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {h2Tags.map((h2, idx) => (
                                <div key={idx} className="group">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <span className="text-purple-600 font-bold text-sm">H2</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-xl mb-6">
                                                    {h2.h2Tag || 'Untitled H2 Tag'}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Target className="w-4 h-4 text-gray-600" />
                                                            <span className="text-gray-600 font-medium text-sm">Parent H1</span>
                                                        </div>
                                                        <p className="text-gray-800 font-semibold">{h2.parentH1 || 'N/A'}</p>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Search className="w-4 h-4 text-blue-600" />
                                                            <span className="text-blue-600 font-medium text-sm">Keyword Focus</span>
                                                        </div>
                                                        <p className="text-blue-800 font-semibold">{h2.keywordDensity || 'N/A'}</p>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                            <span className="text-green-600 font-medium text-sm">Gap Filled</span>
                                                        </div>
                                                        <p className="text-green-800 font-semibold">{h2.contentGapFilled || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* Pillar Content Strategy */}
                <Section
                    icon={<FileText className="w-6 h-6" />}
                    title="Pillar Content Strategy"
                    gradient="from-indigo-500 to-blue-600"
                >
                    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-3xl p-8 lg:p-12 border border-indigo-100 shadow-lg">
                        <div className="mb-8">
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                {pillarStrategy.title || 'Pillar Page Strategy'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Target className="w-5 h-5 text-indigo-600" />
                                        <span className="text-gray-600 font-medium">Target Keyword</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-lg">{pillarStrategy.targetKeyword || 'N/A'}</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                        <span className="text-gray-600 font-medium">Word Count</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-lg">{pillarStrategy.wordCount || 'N/A'}</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Search className="w-5 h-5 text-indigo-600" />
                                        <span className="text-gray-600 font-medium">Focus Keyphrase</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-lg">{pillarStrategy.seoFeatures?.focusKeyphrase || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {pillarStrategy.h1Tag && (
                            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <Hash className="w-5 h-5 text-indigo-600" />
                                    H1 Tag
                                </h4>
                                <p className="text-gray-800 text-lg leading-relaxed">{pillarStrategy.h1Tag}</p>
                            </div>
                        )}

                        {Array.isArray(pillarStrategy.h2Structure) && pillarStrategy.h2Structure.length > 0 && (
                            <div className="space-y-6">
                                <h4 className="font-bold text-gray-800 text-xl flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-indigo-600" />
                                    Content Structure
                                </h4>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {pillarStrategy.h2Structure.map((section, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <h5 className="font-bold text-gray-900 text-lg mb-4">{section.h2 || 'Untitled Section'}</h5>
                                            {renderList(section.h3Subsections)}
                                            {renderKeywordTags(section.keywords)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pillarStrategy.seoFeatures && (
                            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-indigo-600" />
                                    SEO Features
                                </h4>
                                <div className="space-y-4">
                                    {pillarStrategy.seoFeatures.metaDescription && (
                                        <div>
                                            <span className="text-gray-600 font-medium text-sm block mb-2">Meta Description:</span>
                                            <p className="text-gray-800 leading-relaxed bg-gray-50 rounded-lg p-4">{pillarStrategy.seoFeatures.metaDescription}</p>
                                        </div>
                                    )}
                                    {renderKeywordTags(pillarStrategy.seoFeatures.relatedKeywords)}
                                </div>
                            </div>
                        )}
                    </div>
                </Section>

                {/* Blog Posts Section */}
                <Section
                    icon={<TrendingUp className="w-6 h-6" />}
                    title="High Conversion Blog Posts"
                    count={blogPosts.length}
                    gradient="from-orange-500 to-red-500"
                >
                    {blogPosts.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 shadow-sm border text-center">
                            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No blog posts data available</p>
                            <p className="text-gray-400 text-sm mt-2">Content will appear here once data is loaded</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {blogPosts.map((post, idx) => (
                                <div key={idx} className="group">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 h-full">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <FileText className="text-orange-600 w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3">
                                                    {post.postTitle || post.title || 'Untitled Post'}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Target className="w-4 h-4 text-orange-600" />
                                                    <span className="text-sm text-gray-600">Target:</span>
                                                    <span className="font-semibold text-orange-600">{post.targetKeyword || 'N/A'}</span>
                                                </div>
                                                {post.metaDescription && (
                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed bg-gray-50 rounded-lg p-3">
                                                        {post.metaDescription}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {Array.isArray(post.h2Outline) && post.h2Outline.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    Content Outline
                                                </h4>
                                                {renderList(post.h2Outline)}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Tag className="w-4 h-4" />
                                                    <span>{post.contentType || 'Article'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FileText className="w-4 h-4" />
                                                    <span>{post.estimatedWordCount || 'N/A'} words</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* Social Media Posts */}
                <Section
                    icon={<Share2 className="w-6 h-6" />}
                    title="Social Media SEO Posts"
                    count={socialPosts.length}
                    gradient="from-pink-500 to-rose-600"
                >
                    {socialPosts.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 shadow-sm border text-center">
                            <Share2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No social media posts data available</p>
                            <p className="text-gray-400 text-sm mt-2">Content will appear here once data is loaded</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {socialPosts.map((post, idx) => (
                                <div key={idx} className="group">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Users className="text-pink-600 w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{post.platform || 'Social Platform'}</h3>
                                                <p className="text-sm text-gray-600">{post.objective || post.seoObjective || 'Engagement'}</p>
                                            </div>
                                        </div>

                                        {post.postContent && (
                                            <div className="mb-6">
                                                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-2xl p-4 text-sm">
                                                    {post.postContent}
                                                </p>
                                            </div>
                                        )}

                                        {renderKeywordTags(post.hashtags)}

                                        {post.linkToContent && (
                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 rounded-xl p-3 hover:bg-blue-100 transition-colors">
                                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate font-medium">{post.linkToContent}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* Technical SEO Recommendations */}
                <Section
                    icon={<Settings className="w-6 h-6" />}
                    title="Technical SEO Recommendations"
                    gradient="from-gray-500 to-gray-700"
                >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                                    <ExternalLink className="w-6 h-6 text-blue-600" />
                                    URL Structure
                                </h4>
                                {renderList(techSEO.urlStructure)}
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                                    <Tag className="w-6 h-6 text-green-600" />
                                    Schema Markup
                                </h4>
                                {renderList(techSEO.schemaMarkup)}
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                                    <Search className="w-6 h-6 text-purple-600" />
                                    Featured Snippets
                                </h4>
                                {Array.isArray(techSEO.featuredSnippetTargets) && techSEO.featuredSnippetTargets.length > 0 ? (
                                    <div className="space-y-4">
                                        {techSEO.featuredSnippetTargets.map((snippet, idx) => (
                                            <div key={idx} className="border border-gray-200 rounded-2xl p-4 hover:border-purple-200 transition-colors">
                                                <p className="font-semibold text-gray-900 mb-2 text-sm">
                                                    {snippet.question || 'Question not available'}
                                                </p>
                                                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                                    {snippet.answer || 'Answer not available'}
                                                </p>
                                                <span className="inline-flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
                                                    <ExternalLink className="w-3 h-3" />
                                                    {snippet.targetPage || 'No target page'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center py-8 text-gray-400">
                                        <div className="text-center">
                                            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                            <p className="text-sm italic">No featured snippet targets available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default ContentCreation;