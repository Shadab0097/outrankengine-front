// import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiGlobe,
  FiSearch,
  FiZap,
  FiAlertCircle,
  FiEye,
  FiTarget,
  FiFileText,
  FiSettings,
  FiLink,
  FiTool,
  FiAward,
  FiCheckCircle,
  FiMenu,
  FiTrendingUp,
  FiStar,
  FiBarChart2,
  FiUsers,
  FiImage,
  FiDatabase
} from "react-icons/fi";
import { BASE_URL } from "../utils/constant";
import Sidebar from "../component/Sidebar";
import KeywordSection from "../component/KeywordSection";
import AnalysisCard from "../component/AnalysisCard";
import ListSection from "../component/ListSection";
import PriorityMatrix from "../component/PriorityMatrix";
import Timeline from "../component/Timeline";
import AnalysisDashboard from "../compareComponent/AnalysisDashboard";
import ContentCreation from "./ContentCreation ";
import ContentLoader from "./ContentLoader";
import ScrapedData from "./ScrapedData";
import ImageGeneration from "./ImageGeneration";
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";


// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab, hasData }) => {
  if (!hasData) return null;

  return (
    <div className="container mx-auto px-4 pt-6">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-white/10 backdrop-blur rounded-xl p-2 border border-white/20 w-full sm:max-w-2xl mx-auto">

        <button
          onClick={() => setActiveTab("gemini")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "gemini"
            ? "bg-white text-blue-700 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
        >
          <FiZap className="text-base" />
          Analysis
        </button>

        <button
          onClick={() => setActiveTab("scraped")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "scraped"
            ? "bg-white text-blue-700 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
        >
          <FiTarget className="text-base" />
          Data
        </button>

        <button
          onClick={() => setActiveTab("deepseek")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "deepseek"
            ? "bg-white text-blue-700 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
        >
          <FiDatabase className="text-base" />
          Content
        </button>



        <button
          onClick={() => setActiveTab("images")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "images"
            ? "bg-white text-blue-700 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
        >
          <FiImage className="text-base" />
          Images
        </button>
      </div>
    </div>
  );
};


function URLAnalyzer({
  // All state passed as props
  url, setUrl,
  loading, setLoading,
  analysisData, setAnalysisData,
  error, setError,
  sidebarOpen, setSidebarOpen,
  history, setHistory,
  activeStepIndex, setActiveStepIndex,
  isComparable, setIsComparable,
  analysisType, setAnalysisType,
  competitorUrl, setCompetitorUrl,
  yourUrl, setYourUrl,
  comparedData, setCompareData,
  analysisActiveTab, setAnalysisActiveTab,
  contentCreation, setContentCreation,
  loading1, setLoading1,
  scrapedContent, setScrapedContent,
  images, setImages,
  loading3, setLoading3,
  controllerRef,
  processingSteps,
  scrollToTopSmooth,
  handleSubmit,
  handleCompareSubmit,
  handleAnalysisType,
  saveToHistory,
  retryContent, setRetryContent,
  hideSidebar = false,
  hideNavbar = false
}) {

  const [activeTab, setActiveTab] = useState("gemini"); // New state for tab navigation



  return (
    <div className="min-h-screen relative">
      {/* Elegant background */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, transparent 30%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 0, transparent 30%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0, transparent 30%)"
          }}
        />
      </div>





      {/* Main content area */}
      <div className="max-w-7xl mx-auto">
        {/* Hero with centered input */}
        <div className="text-white">
          <div className="px-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              isComparable ? handleCompareSubmit() : handleSubmit();
            }} className="max-w-4xl mx-auto">
              <div className="pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Analyze Any Competitor URL</h1>
                <p className="text-white/80 text-sm sm:text-base">
                  Get keyword strategy, ranking factors, backlink opportunities, and Link step-by-step implementation plan to Outrank the Competitor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white/10 backdrop-blur rounded-2xl p-2 border border-white/20">
                <select
                  value={analysisType}
                  onChange={handleAnalysisType}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white text-blue-700 hover:bg-gray-100 font-semibold rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-center"
                >
                  <option value="seo">SEO Analysis</option>
                  <option value="compare">Compare</option>
                </select>
                {!isComparable && <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter competitor URL (e.g. https://example.com)"
                  className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 text-sm sm:text-base"
                  required
                />}
                {isComparable &&
                  <>
                    <input
                      type="url"
                      value={competitorUrl}
                      onChange={(e) => setCompetitorUrl(e.target.value)}
                      placeholder="Enter competitor URL (e.g. https://example.com)"
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 text-sm sm:text-base"
                      required
                    />

                    <input
                      type="url"
                      value={yourUrl}
                      onChange={(e) => setYourUrl(e.target.value)}
                      placeholder="Enter Your URL (e.g. https://example.com)"
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 text-sm sm:text-base"
                      required
                    />
                  </>
                }

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white text-blue-700 hover:bg-gray-100 font-semibold rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-blue-700"></div>
                      <span className="hidden sm:inline">Analyzing...</span>
                      <span className="sm:hidden">Loading...</span>
                    </>
                  ) : (
                    <>
                      <FiSearch className="text-sm sm:text-base" />
                      {isComparable ? "Compare" : "Analyze"}
                    </>
                  )}
                </button>
              </div>
            </form>


            <Loader loading={loading} />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <FiAlertCircle className="mr-2 flex-shrink-0" />
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasData={analysisData}
        />

        {/* Analysis Results - Gemini Tab */}
        {activeTab === "gemini" && analysisData && (
          <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
            {/* Analysis Summary */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiEye className="mr-2 sm:mr-3 text-blue-500 text-lg sm:text-xl flex-shrink-0" />
                Competitor Analysis Summary
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                <AnalysisCard title="Competitor Strengths" content={analysisData.analysisSummary?.competitorStrengths} icon={FiTrendingUp} color="green" />
                <AnalysisCard title="Competitor Weaknesses" content={analysisData.analysisSummary?.competitorWeaknesses} icon={FiAlertCircle} color="red" />
                <AnalysisCard title="Overall Assessment" content={analysisData.analysisSummary?.overallAssessment} icon={FiAward} color="purple" />
              </div>
            </section>

            {/* Ranking Factors & Content Gaps */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ListSection title="Key Ranking Factors" items={analysisData.analysisSummary?.rankingFactors} icon={FiStar} color="yellow" />
              <ListSection title="Content Gaps to Exploit" items={analysisData.analysisSummary?.contentGaps} icon={FiTarget} color="orange" />
            </section>

            {/* Target Keywords */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiTarget className="mr-2 sm:mr-3 text-green-500 text-lg sm:text-xl flex-shrink-0" />
                Target Keywords Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <KeywordSection title="Primary Keywords" keywords={analysisData.targetKeywords?.primaryKeywords} icon={FiStar} color="red" />
                <KeywordSection title="Long-tail Keywords" keywords={analysisData.targetKeywords?.longTailKeywords} icon={FiTarget} color="blue" />
                <KeywordSection title="Question-based Keywords" keywords={analysisData.targetKeywords?.questionBasedKeywords} icon={FiSearch} color="green" />
                <KeywordSection title="Semantic Keywords" keywords={analysisData.targetKeywords?.semanticKeywords} icon={FiLink} color="purple" />
                <KeywordSection title="Low Competition Opportunities" keywords={analysisData.targetKeywords?.lowCompetitionOpportunities} icon={FiZap} color="yellow" />
                <KeywordSection title="Keyword Difficulty" keywords={analysisData.targetKeywords?.keywordDifficulty} icon={FiBarChart2} color="indigo" />
              </div>
            </section>

            {/* Content Strategy */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiFileText className="mr-2 sm:mr-3 text-purple-500 text-lg sm:text-xl flex-shrink-0" />
                Content Strategy
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <ListSection title="Content Types" items={analysisData.contentStrategy?.contentTypes} icon={FiFileText} color="purple" />
                <ListSection title="Content Formats" items={analysisData.contentStrategy?.contentFormat} icon={FiEye} color="blue" />
                <ListSection title="Unique Angles" items={analysisData.contentStrategy?.uniqueAngles} icon={FiStar} color="green" />
              </div>
              <div className="mt-4 sm:mt-6">
                <AnalysisCard title="Content Depth Strategy" content={analysisData.contentStrategy?.contentDepth} icon={FiTarget} color="indigo" />
              </div>
            </section>

            {/* On-Page SEO */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiSettings className="mr-2 sm:mr-3 text-blue-500 text-lg sm:text-xl flex-shrink-0" />
                On-Page SEO Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                <ListSection title="Title Tag Optimization" items={analysisData.onPageSEOSuggestions?.titleTagOptimization} icon={FiTarget} color="blue" />
                <ListSection title="Meta Descriptions" items={analysisData.onPageSEOSuggestions?.metaDescriptions} icon={FiFileText} color="green" />
                <ListSection title="Header Structure" items={analysisData.onPageSEOSuggestions?.headerStructure} icon={FiBarChart2} color="purple" />
                <ListSection title="Internal Linking" items={analysisData.onPageSEOSuggestions?.internalLinking} icon={FiLink} color="orange" />
                <ListSection title="Schema Markup" items={analysisData.onPageSEOSuggestions?.schemaMarkup} icon={FiTool} color="indigo" />
                <ListSection title="Image Optimization" items={analysisData.onPageSEOSuggestions?.imageOptimization} icon={FiEye} color="red" />
              </div>
            </section>

            {/* Backlink Strategy */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiLink className="mr-2 sm:mr-3 text-green-500 text-lg sm:text-xl flex-shrink-0" />
                Backlink Strategy
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <ListSection title="High Authority Targets" items={analysisData.backlinkStrategy?.highAuthorityTargets} icon={FiStar} color="green" />
                <ListSection title="Link Building Tactics" items={analysisData.backlinkStrategy?.linkBuildingTactics} icon={FiTrendingUp} color="blue" />
                <ListSection title="Content for Link Earning" items={analysisData.backlinkStrategy?.contentForLinkEarning} icon={FiFileText} color="purple" />
                <ListSection title="Digital PR Opportunities" items={analysisData.backlinkStrategy?.digitalPROpportunities} icon={FiUsers} color="orange" />
              </div>
            </section>

            {/* Technical SEO */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiTool className="mr-2 sm:mr-3 text-indigo-500 text-lg sm:text-xl flex-shrink-0" />
                Technical SEO Improvements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                <ListSection title="Core Web Vitals" items={analysisData.technicalSEO?.coreWebVitals} icon={FiZap} color="red" />
                <ListSection title="Mobile Optimization" items={analysisData.technicalSEO?.mobileOptimization} icon={FiSettings} color="blue" />
                <ListSection title="Site Speed" items={analysisData.technicalSEO?.siteSpeed} icon={FiTrendingUp} color="green" />
                <ListSection title="Crawlability" items={analysisData.technicalSEO?.crawlability} icon={FiSearch} color="purple" />
                <ListSection title="Indexing Optimization" items={analysisData.technicalSEO?.indexingOptimization} icon={FiEye} color="orange" />
                <ListSection title="Structured Data" items={analysisData.technicalSEO?.structuredData} icon={FiBarChart2} color="indigo" />
              </div>
            </section>

            {/* Additional Opportunities */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiAward className="mr-2 sm:mr-3 text-yellow-500 text-lg sm:text-xl flex-shrink-0" />
                Additional Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                <ListSection title="E-A-T Signals" items={analysisData.additionalOpportunities?.eatSignals} icon={FiStar} color="yellow" />
                <ListSection title="Local SEO Tactics" items={analysisData.additionalOpportunities?.localSEOTactics} icon={FiGlobe} color="blue" />
                <ListSection title="Social Signals" items={analysisData.additionalOpportunities?.socialSignals} icon={FiUsers} color="green" />
                <ListSection title="Featured Snippet Targets" items={analysisData.additionalOpportunities?.featuredSnippetTargets} icon={FiTarget} color="purple" />
                <ListSection title="Voice Search Optimization" items={analysisData.additionalOpportunities?.voiceSearchOptimization} icon={FiSearch} color="orange" />
                <ListSection title="Competitive Advantages" items={analysisData.additionalOpportunities?.competitiveAdvantages} icon={FiTrendingUp} color="red" />
              </div>
            </section>

            {/* Implementation Plan */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <FiCheckCircle className="mr-2 sm:mr-3 text-green-500 text-lg sm:text-xl flex-shrink-0" />
                Implementation Roadmap
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="w-full">
                  <PriorityMatrix priorities={analysisData.implementationPlan?.priorityMatrix} />
                </div>
                <div className="w-full">
                  <Timeline timelines={analysisData.implementationPlan?.estimatedTimeline} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <div className="w-full">
                  <ListSection title="Quick Wins (1-4 weeks)" items={analysisData.implementationPlan?.quickWins} icon={FiZap} color="green" />
                </div>
                <div className="w-full">
                  <ListSection title="Medium Term Goals (2-6 months)" items={analysisData.implementationPlan?.mediumTermGoals} icon={FiTarget} color="blue" />
                </div>
                <div className="w-full md:col-span-2 xl:col-span-1">
                  <ListSection title="Long Term Strategy (6+ months)" items={analysisData.implementationPlan?.longTermStrategy} icon={FiTrendingUp} color="purple" />
                </div>
              </div>

              <div className="w-full">
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <FiUsers className="text-indigo-500 mr-3 text-lg sm:text-xl flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">Required Resources</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {analysisData.implementationPlan?.requiredResources?.length > 0 ? (
                      analysisData.implementationPlan.requiredResources.map((resource, idx) => (
                        <span key={idx} className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium text-sm sm:text-base leading-tight break-words max-w-full">
                          {resource}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm sm:text-base italic">No resource data available</span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "scraped" && analysisData && (
          <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <div className="text-center">

              {scrapedContent && <ScrapedData scrapedContent={scrapedContent} />}
            </div>
          </div>
        )}

        {/* Analysis Results - DeepSeek Tab (Empty for now) */}
        {activeTab === "deepseek" && analysisData && (
          <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <div className="text-center">

              {loading1 && <ContentLoader isLoading={loading1} />}
              {retryContent && <h1 className="text-center font-bold text-white"> Retrying...please wait</h1>}
              {contentCreation && <ContentCreation data={contentCreation} />}
            </div>
          </div>
        )}


        {activeTab === "images" && analysisData && (
          <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <div className="text-center">
              {loading1 ? <><p className="text-center font-bold text-3xl bg-gradient-to-r from-white to-purple-600 bg-clip-text text-transparent">
                Waiting for Content Creation!
              </p>
                <p className="text-center text-lg text-gray-600 mt-2">
                  Sit tight while we prepare SEO-optimized visuals and text just for you.
                </p></> : <ShimmerUI isLoading={loading3} />}

              {images && <ImageGeneration data={images} />}
            </div>
          </div>
        )}




        {comparedData && <AnalysisDashboard data={comparedData} />}
      </div>


    </div>
  );
}

export default URLAnalyzer;
