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
    FiSearch
} from 'react-icons/fi';



const ContentCreation = ({ data }) => {
    console.log(data)
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
            return <p className="text-gray-400 italic text-sm">No data available</p>;
        }
        return (
            <ul className={`space-y-2 ${className}`}>
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="break-words">{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

    // Helper function to render keywords as tags
    const renderKeywordTags = (keywords) => {
        if (!Array.isArray(keywords) || keywords.length === 0) return null;
        return (
            <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, idx) => (
                    <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                        <FiTag className="w-3 h-3 mr-1" />
                        {keyword}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur rounded-xl border border-white/20 shadow-lg">
                        <FiEdit3 className="text-blue-600 text-xl" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Content Creation Strategy</h1>
                    </div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Comprehensive SEO-optimized content strategy to outrank your competitors
                    </p>
                </div>

                {/* H1 Tags Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FiTarget className="text-green-600 text-xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">SEO Optimized H1 Tags</h2>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            {h1Tags.length} Tags
                        </span>
                    </div>

                    {h1Tags.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
                            <FiTarget className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No H1 tag data available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {h1Tags.map((h1, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-600 font-bold text-sm">H1</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 break-words leading-tight">
                                                {h1.tag || h1.title || 'Untitled H1 Tag'}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {h1.searchIntent && (
                                                    <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs mr-2">
                                                        {h1.searchIntent}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3">
                                        <strong>Purpose:</strong> {h1.purpose || h1.competitorWeaknessExploited || h1.description || 'No description available'}
                                    </p>
                                    {renderKeywordTags(h1.targetKeywords)}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* H2 Tags Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FiHash className="text-purple-600 text-xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Keyword Optimized H2 Tags</h2>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {h2Tags.length} Tags
                        </span>
                    </div>

                    {h2Tags.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
                            <FiHash className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No H2 tag data available</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {h2Tags.map((h2, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-600 font-bold text-sm">H2</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 break-words mb-2">
                                                {h2.h2Tag || 'Untitled H2 Tag'}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Parent H1:</span>
                                                    <p className="text-gray-700 font-medium">{h2.parentH1 || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Keyword Focus:</span>
                                                    <p className="text-gray-700 font-medium">{h2.keywordDensity || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Gap Filled:</span>
                                                    <p className="text-gray-700 font-medium">{h2.contentGapFilled || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Pillar Content Strategy */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FiFileText className="text-indigo-600 text-xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Pillar Content Strategy</h2>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-indigo-100">
                        <div className="mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 break-words">
                                {pillarStrategy.title || 'Pillar Page Strategy'}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div className="bg-white rounded-lg p-4">
                                    <span className="text-gray-500">Target Keyword</span>
                                    <p className="font-semibold text-gray-800">{pillarStrategy.targetKeyword || 'N/A'}</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <span className="text-gray-500">Word Count</span>
                                    <p className="font-semibold text-gray-800">{pillarStrategy.wordCount || 'N/A'}</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <span className="text-gray-500">Focus Keyphrase</span>
                                    <p className="font-semibold text-gray-800">{pillarStrategy.seoFeatures?.focusKeyphrase || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {pillarStrategy.h1Tag && (
                            <div className="bg-white rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-gray-700 mb-2">H1 Tag:</h4>
                                <p className="text-gray-800 break-words">{pillarStrategy.h1Tag}</p>
                            </div>
                        )}

                        {Array.isArray(pillarStrategy.h2Structure) && pillarStrategy.h2Structure.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-700">Content Structure:</h4>
                                {pillarStrategy.h2Structure.map((section, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-4">
                                        <h5 className="font-semibold text-gray-800 mb-2">{section.h2 || 'Untitled Section'}</h5>
                                        {renderList(section.h3Subsections)}
                                        {renderKeywordTags(section.keywords)}
                                    </div>
                                ))}
                            </div>
                        )}

                        {pillarStrategy.seoFeatures && (
                            <div className="mt-6 bg-white rounded-lg p-4">
                                <h4 className="font-semibold text-gray-700 mb-3">SEO Features:</h4>
                                <div className="space-y-2 text-sm">
                                    {pillarStrategy.seoFeatures.metaDescription && (
                                        <div>
                                            <span className="text-gray-500">Meta Description:</span>
                                            <p className="text-gray-800">{pillarStrategy.seoFeatures.metaDescription}</p>
                                        </div>
                                    )}
                                    {renderKeywordTags(pillarStrategy.seoFeatures.relatedKeywords)}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Blog Posts Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FiTrendingUp className="text-orange-600 text-xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">High Conversion Blog Posts</h2>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            {blogPosts.length} Posts
                        </span>
                    </div>

                    {blogPosts.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
                            <FiTrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No blog posts data available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {blogPosts.map((post, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FiFileText className="text-orange-600 w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 break-words mb-2">
                                                {post.postTitle || post.title || 'Untitled Post'}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Target: <span className="font-medium">{post.targetKeyword || 'N/A'}</span>
                                            </p>
                                            {post.metaDescription && (
                                                <p className="text-sm text-gray-700 mb-3">{post.metaDescription}</p>
                                            )}
                                        </div>
                                    </div>

                                    {Array.isArray(post.h2Outline) && post.h2Outline.length > 0 && (
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">Content Outline:</h4>
                                            {renderList(post.h2Outline)}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs text-gray-500">
                                        <span>Type: {post.contentType || 'N/A'}</span>
                                        <span>Words: {post.estimatedWordCount || 'N/A'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Social Media Posts */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FiShare2 className="text-pink-600 text-xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Social Media SEO Posts</h2>
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                            {socialPosts.length} Posts
                        </span>
                    </div>

                    {socialPosts.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
                            <FiShare2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No social media posts data available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {socialPosts.map((post, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                            <FiUsers className="text-pink-600 w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{post.platform || 'Social Platform'}</h3>
                                            <p className="text-xs text-gray-500">{post.objective || post.seoObjective || 'Engagement'}</p>
                                        </div>
                                    </div>

                                    {post.postContent && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-700 break-words">{post.postContent}</p>
                                        </div>
                                    )}

                                    {renderKeywordTags(post.hashtags)}

                                    {post.linkToContent && (
                                        <div className="mt-4 pt-4 border-t">
                                            <div className="flex items-center gap-2 text-sm text-blue-600">
                                                <FiExternalLink className="w-4 h-4" />
                                                <span className="truncate">{post.linkToContent}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Technical SEO Recommendations */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FiSettings className="text-gray-600 text-xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Technical SEO Recommendations</h2>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiExternalLink className="w-4 h-4 text-blue-600" />
                                    URL Structure
                                </h4>
                                {renderList(techSEO.urlStructure)}
                            </div>

                            <div className="bg-white rounded-lg p-6">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiTag className="w-4 h-4 text-green-600" />
                                    Schema Markup
                                </h4>
                                {renderList(techSEO.schemaMarkup)}
                            </div>

                            <div className="bg-white rounded-lg p-6">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiSearch className="w-4 h-4 text-purple-600" />
                                    Featured Snippets
                                </h4>
                                {Array.isArray(techSEO.featuredSnippetTargets) && techSEO.featuredSnippetTargets.length > 0 ? (
                                    <div className="space-y-3">
                                        {techSEO.featuredSnippetTargets.map((snippet, idx) => (
                                            <div key={idx} className="border border-gray-200 rounded-lg p-3">
                                                <p className="text-sm font-medium text-gray-800 mb-1">
                                                    {snippet.question || 'Question not available'}
                                                </p>
                                                <p className="text-xs text-gray-600 mb-2">
                                                    {snippet.answer || 'Answer not available'}
                                                </p>
                                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                    {snippet.targetPage || 'No target page'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 italic text-sm">No featured snippet targets available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContentCreation;
