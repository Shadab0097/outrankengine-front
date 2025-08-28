import React from 'react';
import {
    FiTarget,
    FiFileText,
    FiHash,
    FiShare2,
    FiSettings,
    FiTrendingUp,
    FiEdit3,
    FiExternalLink,
    FiTag,
    FiUsers,
    FiSearch,
    FiCheckCircle,
    FiBarChart2,
    FiGlobe
} from 'react-icons/fi';

const ContentCreation = ({ data }) => {
    // Safe data extraction with fallbacks
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
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="italic">No data available</span>
                </div>
            );
        }
        return (
            <div className={`space-y-3 ${className}`}>
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                        <span className="text-sm text-gray-700 leading-relaxed break-words group-hover:text-gray-900 transition-colors duration-200">{item}</span>
                    </div>
                ))}
            </div>
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
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 hover:scale-105"
                    >
                        <FiTag className="w-3 h-3 mr-1.5" />
                        {keyword}
                    </span>
                ))}
            </div>
        );
    };

    // Section Header Component
    const SectionHeader = ({ icon: Icon, title, count, color }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${color} shadow-lg flex items-center justify-center`}>
                    <Icon className="text-white text-xl" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
                    <p className="text-gray-500 text-sm mt-1">Optimized for maximum impact</p>
                </div>
            </div>
            {count !== undefined && (
                <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${color} bg-opacity-10 border border-opacity-20`}>
                    <span className="font-bold text-lg">{count}</span>
                    <span className="text-sm text-gray-600 ml-1">items</span>
                </div>
            )}
        </div>
    );

    // Card Component
    const Card = ({ children, className = "", hover = true }) => (
        <div className={`
            bg-white rounded-2xl p-6 shadow-sm border border-gray-100
            ${hover ? 'hover:shadow-xl hover:border-blue-200 hover:-translate-y-1' : ''}
            transition-all duration-300 backdrop-blur-sm
            ${className}
        `}>
            {children}
        </div>
    );

    // Empty State Component
    const EmptyState = ({ icon: Icon, title, description }) => (
        <Card hover={false} className="text-center py-12">
            <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/90 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                            <FiEdit3 className="text-white text-xl" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Content Creation Strategy
                            </h1>
                            <p className="text-gray-600 text-sm">AI-Powered SEO Optimization</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        Comprehensive SEO-optimized content strategy designed to outrank competitors and drive organic growth
                    </p>
                </div>

                <div className="space-y-20">
                    {/* H1 Tags Section */}
                    <section>
                        <SectionHeader
                            icon={FiTarget}
                            title="SEO Optimized H1 Tags"
                            count={h1Tags.length}
                            color="from-emerald-500 to-green-600"
                        />

                        {h1Tags.length === 0 ? (
                            <EmptyState
                                icon={FiTarget}
                                title="No H1 Tags Available"
                                description="H1 tag optimization data will appear here once generated"
                            />
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {h1Tags.map((h1, idx) => (
                                    <Card key={idx}>
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-200">
                                                <span className="text-emerald-700 font-bold text-sm">H1</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-gray-900 break-words leading-tight mb-2">
                                                    {h1.tag || h1.title || 'Untitled H1 Tag'}
                                                </h3>
                                                {h1.searchIntent && (
                                                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-200">
                                                        <FiBarChart2 className="w-3 h-3 mr-1" />
                                                        {h1.searchIntent}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
                                            <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                                                <FiCheckCircle className="w-4 h-4 text-green-600" />
                                                Purpose & Strategy
                                            </h4>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {h1.purpose || h1.competitorWeaknessExploited || h1.description || 'No description available'}
                                            </p>
                                        </div>

                                        {renderKeywordTags(h1.targetKeywords)}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* H2 Tags Section */}
                    <section>
                        <SectionHeader
                            icon={FiHash}
                            title="Keyword Optimized H2 Tags"
                            count={h2Tags.length}
                            color="from-purple-500 to-violet-600"
                        />

                        {h2Tags.length === 0 ? (
                            <EmptyState
                                icon={FiHash}
                                title="No H2 Tags Available"
                                description="H2 tag optimization data will appear here once generated"
                            />
                        ) : (
                            <div className="space-y-6">
                                {h2Tags.map((h2, idx) => (
                                    <Card key={idx}>
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-200">
                                                <span className="text-purple-700 font-bold text-sm">H2</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-gray-900 break-words mb-4">
                                                    {h2.h2Tag || 'Untitled H2 Tag'}
                                                </h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Parent H1</span>
                                                        <p className="text-sm text-gray-800 font-semibold mt-1">{h2.parentH1 || 'N/A'}</p>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Keyword Focus</span>
                                                        <p className="text-sm text-gray-800 font-semibold mt-1">{h2.keywordDensity || 'N/A'}</p>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Gap Filled</span>
                                                        <p className="text-sm text-gray-800 font-semibold mt-1">{h2.contentGapFilled || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Pillar Content Strategy */}
                    <section>
                        <SectionHeader
                            icon={FiFileText}
                            title="Pillar Content Strategy"
                            color="from-indigo-500 to-blue-600"
                        />

                        <Card className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-indigo-200">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {pillarStrategy.title || 'Pillar Page Strategy'}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiTarget className="text-blue-600 w-5 h-5" />
                                            <span className="text-sm text-gray-600 font-medium">Target Keyword</span>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{pillarStrategy.targetKeyword || 'N/A'}</p>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiBarChart3 className="text-green-600 w-5 h-5" />
                                            <span className="text-sm text-gray-600 font-medium">Word Count</span>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{pillarStrategy.wordCount || 'N/A'}</p>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiSearch className="text-purple-600 w-5 h-5" />
                                            <span className="text-sm text-gray-600 font-medium">Focus Keyphrase</span>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{pillarStrategy.seoFeatures?.focusKeyphrase || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {pillarStrategy.h1Tag && (
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/50">
                                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <FiTarget className="w-5 h-5 text-indigo-600" />
                                        H1 Tag Strategy
                                    </h4>
                                    <p className="text-gray-800 text-lg leading-relaxed">{pillarStrategy.h1Tag}</p>
                                </div>
                            )}

                            {Array.isArray(pillarStrategy.h2Structure) && pillarStrategy.h2Structure.length > 0 && (
                                <div className="space-y-6 mb-8">
                                    <h4 className="font-bold text-gray-800 text-xl flex items-center gap-2">
                                        <FiFileText className="w-6 h-6 text-indigo-600" />
                                        Content Structure
                                    </h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {pillarStrategy.h2Structure.map((section, idx) => (
                                            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                                                <h5 className="font-bold text-gray-900 mb-4 text-lg">
                                                    {section.h2 || 'Untitled Section'}
                                                </h5>
                                                {renderList(section.h3Subsections)}
                                                {renderKeywordTags(section.keywords)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pillarStrategy.seoFeatures && (
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FiSettings className="w-5 h-5 text-indigo-600" />
                                        SEO Features
                                    </h4>
                                    <div className="space-y-4">
                                        {pillarStrategy.seoFeatures.metaDescription && (
                                            <div>
                                                <span className="text-sm text-gray-600 font-medium">Meta Description:</span>
                                                <p className="text-gray-800 mt-1 leading-relaxed">{pillarStrategy.seoFeatures.metaDescription}</p>
                                            </div>
                                        )}
                                        {renderKeywordTags(pillarStrategy.seoFeatures.relatedKeywords)}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </section>

                    {/* Blog Posts Section */}
                    <section>
                        <SectionHeader
                            icon={FiTrendingUp}
                            title="High Conversion Blog Posts"
                            count={blogPosts.length}
                            color="from-orange-500 to-red-500"
                        />

                        {blogPosts.length === 0 ? (
                            <EmptyState
                                icon={FiTrendingUp}
                                title="No Blog Posts Available"
                                description="High-conversion blog post strategies will appear here once generated"
                            />
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {blogPosts.map((post, idx) => (
                                    <Card key={idx}>
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-orange-200">
                                                <FiFileText className="text-orange-600 w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-gray-900 break-words mb-3">
                                                    {post.postTitle || post.title || 'Untitled Post'}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <FiTarget className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm text-gray-600">Target:</span>
                                                    <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
                                                        {post.targetKeyword || 'N/A'}
                                                    </span>
                                                </div>
                                                {post.metaDescription && (
                                                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">
                                                        {post.metaDescription}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {Array.isArray(post.h2Outline) && post.h2Outline.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                    <FiHash className="w-4 h-4 text-orange-600" />
                                                    Content Outline
                                                </h4>
                                                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                                                    {renderList(post.h2Outline)}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <FiTag className="w-3 h-3" />
                                                    <span>Type: {post.contentType || 'Article'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FiBarChart3 className="w-3 h-3" />
                                                    <span>Words: {post.estimatedWordCount || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Social Media Posts */}
                    <section>
                        <SectionHeader
                            icon={FiShare2}
                            title="Social Media SEO Posts"
                            count={socialPosts.length}
                            color="from-pink-500 to-rose-500"
                        />

                        {socialPosts.length === 0 ? (
                            <EmptyState
                                icon={FiShare2}
                                title="No Social Posts Available"
                                description="Social media SEO posts will appear here once generated"
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {socialPosts.map((post, idx) => (
                                    <Card key={idx} className="h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl flex items-center justify-center border border-pink-200">
                                                <FiUsers className="text-pink-600 w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{post.platform || 'Social Platform'}</h3>
                                                <p className="text-xs text-gray-500 font-medium">{post.objective || post.seoObjective || 'Engagement'}</p>
                                            </div>
                                        </div>

                                        {post.postContent && (
                                            <div className="mb-6">
                                                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4">
                                                    <p className="text-sm text-gray-700 break-words leading-relaxed">
                                                        {post.postContent}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {renderKeywordTags(post.hashtags)}

                                        {post.linkToContent && (
                                            <div className="mt-6 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                    <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate font-medium">{post.linkToContent}</span>
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Technical SEO Recommendations */}
                    <section>
                        <SectionHeader
                            icon={FiSettings}
                            title="Technical SEO Recommendations"
                            color="from-gray-600 to-slate-700"
                        />

                        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-200">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* URL Structure */}
                                <Card className="h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center border border-blue-200">
                                            <FiGlobe className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">URL Structure</h4>
                                    </div>
                                    {renderList(techSEO.urlStructure)}
                                </Card>

                                {/* Schema Markup */}
                                <Card className="h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center border border-green-200">
                                            <FiTag className="w-5 h-5 text-green-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Schema Markup</h4>
                                    </div>
                                    {renderList(techSEO.schemaMarkup)}
                                </Card>

                                {/* Featured Snippets */}
                                <Card className="h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl flex items-center justify-center border border-purple-200">
                                            <FiSearch className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Featured Snippets</h4>
                                    </div>
                                    {Array.isArray(techSEO.featuredSnippetTargets) && techSEO.featuredSnippetTargets.length > 0 ? (
                                        <div className="space-y-4">
                                            {techSEO.featuredSnippetTargets.map((snippet, idx) => (
                                                <div key={idx} className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                                                    <p className="text-sm font-semibold text-gray-900 mb-2">
                                                        {snippet.question || 'Question not available'}
                                                    </p>
                                                    <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                                                        {snippet.answer || 'Answer not available'}
                                                    </p>
                                                    <span className="inline-flex items-center text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-lg border border-purple-200">
                                                        <FiExternalLink className="w-3 h-3 mr-1" />
                                                        {snippet.targetPage || 'No target page'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                            <span className="italic">No featured snippet targets available</span>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                        <FiCheckCircle className="text-green-600 w-5 h-5" />
                        <span className="text-gray-700 font-medium">Content Strategy Generated Successfully</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentCreation;