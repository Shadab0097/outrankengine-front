import React, { useState } from 'react';
import { ExternalLink, Search, FileText, Image, Link, Code, Hash, Eye, Globe, Share2, ChevronRight, ChevronDown } from 'lucide-react';

function ScrapedData({ scrapedContent }) {
    const [expandedSections, setExpandedSections] = useState({
        structured: false,
        images: false,
        links: false
    });

    // Explanations for each field
    const FIELD_EXPLANATIONS = {
        url: "This is the main website address. Clicking it opens the site.",
        title: "This is the page title. It's what shows at the top of browser tabs and in Google search results. An important SEO factor!",
        metaDescription: "A short summary of what this page is about. Google shows it below the title in search results. It should be inviting and relevant.",
        metaKeywords: "A list of keywords for this page. Most search engines ignore these nowadays.",
        canonical: "The 'main' version of this page's URL. This helps prevent duplicate content issues, telling Google which version to prioritize.",
        ogTitle: "Title shown when this page is shared on social networks like Facebook or WhatsApp. Sometimes same as the main title, sometimes customized.",
        ogDescription: "Description shown with the ogTitle during sharing. Usually a summary or catchy line for social media.",
        ogImage: "Image that appears as a preview when this page is shared. Helps make your shared links more attractive and clickable.",
        h1s: "Main topic headline. Every good page usually has one H1 to tell Google and people the top-level focus.",
        h2s: "Section titles. Like book chapters, these organize content into manageable sections for humans and search engines.",
        h3s: "Subsection titles. These break down H2 sections into even more detail for clarity and better SEO.",
        bodyTextPreview: "A preview snippet of the page's main text, giving a quick overview of what readers will find.",
        internalLinks: "Links to other parts of this website. Helps users navigate and search engines discover more pages.",
        images: "Images found on this page – including product photos, banners, and logos.",
        structuredData: "Special hidden information just for search engines. It helps them understand what the page and business are about for better rankings and richer search results.",
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const InfoCard = ({ icon: Icon, title, children, className = "", gradient = "from-blue-50 to-indigo-50" }) => (
        <div className={`group bg-gradient-to-br ${gradient} border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );

    const ExplanationText = ({ field }) => (
        <p className="text-sm text-gray-600 mb-3 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-100">
            💡 {FIELD_EXPLANATIONS[field]}
        </p>
    );

    const CollapsibleSection = ({ title, icon: Icon, children, sectionKey, gradient = "from-gray-50 to-slate-50" }) => (
        <div className={`bg-gradient-to-br ${gradient} border border-gray-200 rounded-xl shadow-sm overflow-hidden`}>
            <button
                onClick={() => toggleSection(sectionKey)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                {expandedSections[sectionKey] ?
                    <ChevronDown className="w-5 h-5 text-gray-500" /> :
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                }
            </button>
            {expandedSections[sectionKey] && (
                <div className="px-6 pb-6 border-t border-gray-200/50">
                    {children}
                </div>
            )}
        </div>
    );

    const HeadingsList = ({ headings, level, gradient }) => (
        headings && headings.length > 0 && (
            <InfoCard
                icon={Hash}
                title={`H${level} Headings`}
                gradient={gradient}
            >
                <ExplanationText field={`h${level}s`} />
                <div className="space-y-2">
                    {headings.map((heading, idx) => (
                        <div
                            key={idx}
                            className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100 hover:border-gray-200 transition-colors"
                        >
                            <span className="text-gray-800 font-medium">{heading}</span>
                        </div>
                    ))}
                </div>
            </InfoCard>
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 mb-4">
                        <Globe className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">SEO Analysis Report</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Website Analysis</h1>
                    <p className="text-xl text-gray-600">Comprehensive SEO and content breakdown</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8">
                    {/* Website URL */}
                    <InfoCard icon={Globe} title="Website URL" gradient="from-emerald-50 to-teal-50">
                        <ExplanationText field="url" />
                        <a
                            href={scrapedContent.url}
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Visit Website</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <div className="mt-3 text-sm text-gray-600 font-mono bg-white/70 rounded-lg px-3 py-2 break-all">
                            {scrapedContent.url}
                        </div>
                    </InfoCard>

                    {/* SEO Fundamentals Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoCard icon={FileText} title="Page Title" gradient="from-purple-50 to-pink-50">
                            <ExplanationText field="title" />
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">{scrapedContent.title}</h2>
                            </div>
                        </InfoCard>

                        <InfoCard icon={Search} title="Meta Description" gradient="from-orange-50 to-red-50">
                            <ExplanationText field="metaDescription" />
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100">
                                <p className="text-gray-800 leading-relaxed">{scrapedContent.metaDescription}</p>
                            </div>
                        </InfoCard>
                    </div>

                    {/* Technical SEO Row */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <InfoCard icon={Hash} title="Meta Keywords" gradient="from-yellow-50 to-amber-50">
                            <ExplanationText field="metaKeywords" />
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100">
                                <span className="text-gray-800">
                                    {scrapedContent.metaKeywords || <span className="text-gray-400 italic">Not Set</span>}
                                </span>
                            </div>
                        </InfoCard>

                        <InfoCard icon={Link} title="Canonical URL" gradient="from-cyan-50 to-blue-50">
                            <ExplanationText field="canonical" />
                            <a
                                href={scrapedContent.canonical}
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="truncate">View Canonical</span>
                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </a>
                        </InfoCard>

                        <InfoCard icon={Share2} title="Social Sharing" gradient="from-green-50 to-emerald-50">
                            <ExplanationText field="ogTitle" />
                            <div className="space-y-3">
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-100">
                                    <div className="text-xs font-medium text-gray-500 mb-1">OG Title</div>
                                    <div className="text-sm text-gray-800">{scrapedContent.ogTitle}</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-100">
                                    <div className="text-xs font-medium text-gray-500 mb-1">OG Description</div>
                                    <div className="text-sm text-gray-800">{scrapedContent.ogDescription}</div>
                                </div>
                                {scrapedContent.ogImage && (
                                    <img
                                        src={scrapedContent.ogImage}
                                        alt={scrapedContent.ogTitle || "Site image"}
                                        className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        </InfoCard>
                    </div>

                    {/* Content Structure */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {HeadingsList({
                            headings: scrapedContent.h1s,
                            level: 1,
                            gradient: "from-red-50 to-pink-50"
                        })}
                        {HeadingsList({
                            headings: scrapedContent.h2s,
                            level: 2,
                            gradient: "from-blue-50 to-cyan-50"
                        })}
                        {HeadingsList({
                            headings: scrapedContent.h3s,
                            level: 3,
                            gradient: "from-green-50 to-lime-50"
                        })}
                    </div>

                    {/* Body Text Preview */}
                    {scrapedContent.bodyTextPreview && (
                        <InfoCard icon={Eye} title="Body Text Preview" gradient="from-indigo-50 to-purple-50">
                            <ExplanationText field="bodyTextPreview" />
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-indigo-200/50 shadow-sm">
                                <p className="text-gray-800 leading-relaxed">{scrapedContent.bodyTextPreview}</p>
                            </div>
                        </InfoCard>
                    )}

                    {/* Collapsible Sections */}
                    <div className="space-y-6">
                        {/* Images */}
                        {scrapedContent.images && scrapedContent.images.length > 0 && (
                            <CollapsibleSection
                                title={`Images (${scrapedContent.images.length})`}
                                icon={Image}
                                sectionKey="images"
                                gradient="from-rose-50 to-pink-50"
                            >
                                <ExplanationText field="images" />
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                    {scrapedContent.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="group bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.alt || "Image"}
                                                className="w-full h-24 object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                            {img.alt && (
                                                <div className="text-xs text-gray-500 mt-2 truncate" title={img.alt}>
                                                    {img.alt}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CollapsibleSection>
                        )}

                        {/* Internal Links */}
                        {scrapedContent.internalLinks && scrapedContent.internalLinks.length > 0 && (
                            <CollapsibleSection
                                title={`Internal Links (${scrapedContent.internalLinks.length})`}
                                icon={Link}
                                sectionKey="links"
                                gradient="from-teal-50 to-cyan-50"
                            >
                                <ExplanationText field="internalLinks" />
                                <div className="grid gap-3 mt-4">
                                    {scrapedContent.internalLinks.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link}
                                            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all group"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-teal-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-700 group-hover:text-teal-800 break-all">{link}</span>
                                        </a>
                                    ))}
                                </div>
                            </CollapsibleSection>
                        )}

                        {/* Structured Data */}
                        {scrapedContent.structuredData && scrapedContent.structuredData.length > 0 && (
                            <CollapsibleSection
                                title="Structured Data"
                                icon={Code}
                                sectionKey="structured"
                                gradient="from-slate-50 to-gray-50"
                            >
                                <ExplanationText field="structuredData" />
                                <div className="bg-gray-900 rounded-xl p-4 mt-4 overflow-auto">
                                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                                        {scrapedContent.structuredData.map((sd) =>
                                            typeof sd === "string" ? sd : JSON.stringify(sd, null, 2)
                                        ).join("\n\n---\n\n")}
                                    </pre>
                                </div>
                            </CollapsibleSection>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16 py-8 border-t border-gray-200">
                    <p className="text-gray-600">Analysis completed • Built with ❤️ for better SEO</p>
                </div>
            </div>
        </div>
    );
}

export default ScrapedData;