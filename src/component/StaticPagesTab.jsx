// import React, { useState, useEffect } from 'react';
// import { FiInfo, FiMail, FiDollarSign, FiHome, FiMenu } from 'react-icons/fi';
// import AboutUs from './AboutUs';
// import ContactUs from './ContactUs';
// import Pricing from './Pricing';
// import URLAnalyzer from './URLAnalyzer';
// import Sidebar from '../component/Sidebar';

// const StaticPagesTab = () => {
//     const [activeTab, setActiveTab] = useState('home');
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [history, setHistory] = useState([]);
//     const [url, setUrl] = useState('');

//     const tabs = [
//         { id: 'home', label: 'Home', icon: FiHome },
//         { id: 'about', label: 'About Us', icon: FiInfo },
//         { id: 'contact', label: 'Contact Us', icon: FiMail },
//         { id: 'pricing', label: 'Pricing', icon: FiDollarSign }
//     ];

//     // Load history from localStorage on component mount
//     useEffect(() => {
//         try {
//             const saved = JSON.parse(localStorage.getItem('seoAnalyzerHistory'));
//             setHistory(Array.isArray(saved) ? saved : []);
//         } catch {
//             setHistory([]);
//         }
//     }, []);

//     // Smooth scroll function for sidebar
//     const scrollToTopSmooth = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const TabNavigation = () => (
//         <div className="sticky top-0 z-30 backdrop-blur bg-white border-b border-white/10 text-white">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

//                 {/* Left side - Logo and Brand */}
//                 <div className="flex items-center gap-3">
//                     <button
//                         className="p-2 rounded bg-gray-700 hover:text-indigo-600 transition-colors"
//                         onClick={() => setSidebarOpen(true)}
//                     >
//                         <FiMenu />
//                     </button>
//                     <img className="w-12 h-12" src="outranklogo.png" alt="OutRank Engine" />
//                     <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
//                         OutRank Engine
//                     </span>
//                 </div>

//                 {/* Center - Tab Navigation */}
//                 <div className="space-x-6 hidden md:flex">
//                     {tabs.map(tab => {
//                         const Icon = tab.icon;
//                         return (
//                             <button
//                                 key={tab.id}
//                                 onClick={() => setActiveTab(tab.id)}
//                                 className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${activeTab === tab.id
//                                         ? 'text-indigo-600 border-b-2 border-indigo-600'
//                                         : 'text-gray-800 hover:text-indigo-600'
//                                     }`}
//                             >
//                                 <Icon className="text-base" />
//                                 {tab.label}
//                             </button>
//                         );
//                     })}
//                 </div>

//                 {/* Mobile Tab Menu */}
//                 <div className="md:hidden">
//                     <select
//                         value={activeTab}
//                         onChange={(e) => setActiveTab(e.target.value)}
//                         className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm"
//                     >
//                         {tabs.map(tab => (
//                             <option key={tab.id} value={tab.id}>
//                                 {tab.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Right side - IST Time */}
//                 <div className="hidden sm:flex items-center gap-6 text-sm text-gray-900">
//                     <span className="opacity-80">
//                         IST: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
//                     </span>
//                 </div>

//             </div>
//         </div>
//     );

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case 'home':
//                 return (
//                     <URLAnalyzer
//                         // Pass sidebar props to URLAnalyzer but don't let it manage sidebar state
//                         sidebarOpen={sidebarOpen}
//                         setSidebarOpen={setSidebarOpen}
//                         history={history}
//                         setHistory={setHistory}
//                         url={url}
//                         setUrl={setUrl}
//                         scrollToTopSmooth={scrollToTopSmooth}
//                         // Add flag to tell URLAnalyzer not to render its own sidebar
//                         hideSidebar={true}
//                     />
//                 );
//             case 'about':
//                 return <AboutUs />;
//             case 'contact':
//                 return <ContactUs />;
//             case 'pricing':
//                 return <Pricing />;
//             default:
//                 return (
//                     <URLAnalyzer
//                         sidebarOpen={sidebarOpen}
//                         setSidebarOpen={setSidebarOpen}
//                         history={history}
//                         setHistory={setHistory}
//                         url={url}
//                         setUrl={setUrl}
//                         scrollToTopSmooth={scrollToTopSmooth}
//                         hideSidebar={true}
//                     />
//                 );
//         }
//     };

//     return (
//         <div className="min-h-screen relative">
//             {/* Background matching your existing design */}
//             <div className="absolute inset-0 -z-10">
//                 <div className="h-full w-full bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900"></div>
//                 <div className="absolute inset-0 opacity-30" style={{
//                     backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 30%), 
//                            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 0%, transparent 30%), 
//                            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0%, transparent 30%)`
//                 }}></div>
//             </div>

//             {/* Tab Navigation */}
//             <TabNavigation />

//             {/* Tab Content */}
//             {renderTabContent()}

//             {/* Sidebar - Now managed from StaticPagesTab */}
//             <Sidebar
//                 isOpen={sidebarOpen}
//                 onClose={() => setSidebarOpen(false)}
//                 history={history}
//                 setHistory={setHistory}
//                 setUrl={setUrl}
//                 scrollToTopSmooth={scrollToTopSmooth}
//             />
//         </div>
//     );
// };

// export default StaticPagesTab;




// -------------------------------



import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiInfo, FiMail, FiDollarSign, FiHome, FiMenu, FiSearch, FiTool, FiTarget, FiLink, FiSettings, FiFileText, FiTrendingUp, FiLock, FiMeh } from 'react-icons/fi';
import axios from 'axios';
// import { BASEURL } from '../utils/constant';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Pricing from './Pricing';
import URLAnalyzer from './URLAnalyzer';
import Sidebar from '../component/Sidebar';
import { BASE_URL } from '../utils/constant';
import PrivacyPolicy from './PrivacyPolicy';
import { BeakerIcon, MenuIcon, SidebarOpenIcon } from 'lucide-react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { PiTabs } from 'react-icons/pi';

const StaticPagesTab = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [url, setUrl] = useState('');

    // 🎯 ALL URLAnalyzer state lifted up to prevent data loss
    const [loading, setLoading] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState('');
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [isComparable, setIsComparable] = useState(false);
    const [analysisType, setAnalysisType] = useState('seo');
    const [competitorUrl, setCompetitorUrl] = useState('');
    const [yourUrl, setYourUrl] = useState('');
    const [comparedData, setCompareData] = useState(null);
    const [analysisActiveTab, setAnalysisActiveTab] = useState('gemini'); // Renamed to avoid confusion
    const [contentCreation, setContentCreation] = useState(null);
    const [loading1, setLoading1] = useState(false);
    const [scrapedContent, setScrapedContent] = useState(null);
    const [images, setImages] = useState(null);
    const [loading3, setLoading3] = useState(true);
    const controllerRef = useRef(null);

    // Processing steps for URLAnalyzer
    // const processingSteps = useMemo(() => [
    //     { icon: FiSearch, text: 'Fetching page and scraping visible content' },
    //     { icon: FiTool, text: 'Parsing HTML, meta tags, and structured data' },
    //     { icon: FiTarget, text: 'Extracting target keywords and intent' },
    //     { icon: FiLink, text: 'Analyzing backlinks and referring domains' },
    //     { icon: FiSettings, text: 'Checking technical SEO and Core Web Vitals' },
    //     { icon: FiFileText, text: 'Evaluating content depth and gaps' },
    //     { icon: FiTrendingUp, text: 'Building strategy insights and roadmap' }
    // ], []);


    const tabs = [
        { id: 'home', label: 'Home', icon: FiHome },
        { id: 'about', label: 'About Us', icon: FiInfo },
        { id: 'contact', label: 'Contact Us', icon: FiMail },
        { id: 'pricing', label: 'Pricing', icon: FiDollarSign },
        { id: 'privacy', label: 'Privacy Policy', icon: FiLock }

    ];

    // Load history from localStorage on component mount
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('seoAnalyzerHistory'));
            setHistory(Array.isArray(saved) ? saved : []);
        } catch {
            setHistory([]);
        }
    }, []);

    // Processing steps animation effect
    // useEffect(() => {
    //     if (!loading) {
    //         setActiveStepIndex(0);
    //         return;
    //     }

    //     let i = 0;
    //     setActiveStepIndex(0);
    //     const interval = setInterval(() => {
    //         i = (i + 1) % processingSteps.length;
    //         setActiveStepIndex(i);
    //     }, 1400);

    //     return () => clearInterval(interval);
    // }, [loading, processingSteps.length]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (controllerRef.current) {
                console.log('Component unmounting, cancelling active request.');
                controllerRef.current.abort();
            }
        };
    }, []);

    // 🎯 All URLAnalyzer functions moved here
    const saveToHistory = (urlValue, responseSample) => {
        const entry = {
            id: Date.now(),
            url: urlValue,
            date: new Date().toISOString(),
            summary: responseSample?.analysisSummary?.overallAssessment ||
                (typeof responseSample?.analysisSummary?.competitorStrengths === 'string'
                    ? responseSample.analysisSummary.competitorStrengths.slice(0, 120) + '...'
                    : 'Analysis completed')
        };

        const updated = [entry, ...history.slice(0, 50)];
        setHistory(updated);

        try {
            localStorage.setItem('seoAnalyzerHistory', JSON.stringify(updated));
        } catch (err) {
            console.error('Failed to save history:', err);
        }
    };

    const scrollToTopSmooth = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const imageGeneration = async (imageData, controller) => {

        // setLoading3(true)
        // setLoading3(true);
        // Return the promise so the chain can wait for it to complete
        return axios.post(BASE_URL + 'imageGeneration', { data: imageData }, { withCredentials: true, signal: controller?.signal })
            .then(res => {
                if (res.status === 200) {
                    setImages(res);
                }
                // Don't need to return anything here, this is the end of the success chain
            })
            // No .catch() block needed, we want errors to "bubble up" to handleSubmit's catch block
            .finally(() => {
                setLoading3(false); // Always turn off its own loader
            });

    }


    const deepSeekContentCreation = async (contentCreationData, controller) => {


        const prompt = `You are Link highly experienced SEO content strategist with over 20 years of expertise in creating keyword-optimized and competitor-beating content strategies.

  Here is the competitor analysis data in JSON format:
  ${JSON.stringify(contentCreationData, null, 2)}

  Your task is to generate Link detailed and comprehensive SEO content strategy designed to outrank competitors by leveraging every keyword opportunity, exploiting competitor weaknesses, and fulfilling user search intent.

  Please respond ONLY with Link valid JSON object matching this exact structure and naming conventions:

  {
    "seoOptimizedH1Tags": [
      {
        "tag": "Primary keyword-rich H1 tag",
        "targetKeywords": ["keyword1", "keyword2"],
        "competitorWeaknessExploited": "Specific competitor weakness addressed",
        "searchIntent": "informational|transactional|navigational"
      }
    ],
    "keywordOptimizedH2Tags": [
      {
        "h2Tag": "Long-tail keyword focused H2 tag",
        "parentH1": "Parent H1 tag this belongs to",
        "keywordDensity": "Targeted primary keyword phrase",
        "contentGapFilled": "Gap in competitor content addressed"
      }
    ],
    "pillarContentStrategy": {
      "mainPillarPage": {
        "title": "SEO-optimized pillar page title with primary keyword",
        "targetKeyword": "Main targeted keyword",
        "wordCount": "3000+",
        "h1Tag": "SEO optimized H1 tag",
        "h2Structure": [
          {
            "h2": "Section targeting competitor content gap",
            "keywords": ["semantic keyword1", "semantic keyword2"],
            "h3Subsections": ["Subsection 1", "Subsection 2"]
          }
        ],
        "seoFeatures": {
          "metaDescription": "Meta description under 160 characters including target keyword",
          "focusKeyphrase": "Primary keyword phrase",
          "relatedKeywords": ["related keyword 1", "related keyword 2"],
          "internalLinks": ["related-page-1", "related-page-2"],
          "externalAuthorityLinks": ["authoritative-source-url"]
        }
      }
    },
    "highConversionBlogPosts": [
      {
        "postTitle": "Engaging blog post title with long-tail keyword",
        "targetKeyword": "Specific keyword from data",
        "h1Tag": "Blog post H1 tag",
        "h2Outline": [
          "H2 section 1 targeting keywords",
          "H2 section 2 addressing competitor weaknesses"
        ],
        "metaDescription": "SEO meta description for blog post",
        "estimatedWordCount": "2000+",
        "contentType": "informational|comparison|how-to guide",
        "competitorAdvantage": "How this outperforms competitor content"
      }
    ],
    "socialMediaSEOPosts": [
      {
        "platform": "Social media platform (e.g., Twitter, LinkedIn)",
        "postContent": "Keyword rich social media post content",
        "hashtags": ["#keyword1", "#keyword2"],
        "linkToContent": "URL slug to SEO content",
        "seoObjective": "Traffic generation goal"
      }
    ],
    "technicalSEORecommendations": {
      "urlStructure": [
        "/keyword-optimized-url-1",
        "/keyword-optimized-url-2"
      ],
      "schemaMarkup": ["FAQ", "Article", "Organization"],
      "featuredSnippetTargets": [
        {
          "question": "Question formed from keyword data",
          "answer": "Concise, snippet-ready answer",
          "targetPage": "Page URL targeting this snippet"
        }
      ]
    }
  }

  Content Generation Rules:
  - Create 12-15 SEO focused H1 tags targeting all primary and long-tail keywords.
  - Generate 20-25 supporting H2 tags focusing on semantic keyword clusters and content gaps.
  - Design 8-10 blog post concepts addressing specific competitor content weaknesses.
  - Incorporate every keyword opportunity from the competitor data.
  - Match content to user search intent: informational, transactional, or navigational.
  - Optimize for featured snippets, voice search, and mobile-first indexing.
  - Use clear, precise JSON formatting with no explanation or extra text.

  Return only the JSON object with no additional commentary or formatting.`;


        setLoading1(true);
        // Return the entire promise chain
        return axios.post(
            BASE_URL + 'deepseek',
            { message: [{ role: "user", text: prompt }] },
            { withCredentials: true, signal: controller?.signal }
        )
            .then(deepSeekResults => {
                let data = deepSeekResults;
                let parsedData;
                try {
                    const cleanData = typeof data.data === "string"
                        ? data.data.trim().replace(/^```json|```$/g, "")
                        : data.data;
                    parsedData = typeof cleanData === "string" ? JSON.parse(cleanData) : cleanData;
                } catch (err) {
                    console.error("Failed to parse DeepSeek response:", err);
                    // Throwing an error here will cause the main .catch() block in handleSubmit to trigger
                    throw new Error("Failed to parse content creation data.");
                }

                setContentCreation(parsedData);
                setLoading1(false)

                // *** CRITICAL: Call the next function and return its promise ***
                return imageGeneration(parsedData, controller);
            })
            // No .catch() here either, let it bubble up
            .finally(() => {
                setLoading1(false); // Always turn off its own loader
            });
    };

    const handleSubmit = () => { // Removed async
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        // 1. Set all initial loading/error states
        setLoading(true); // This is the main loader for the whole process
        setError("");
        setAnalysisData(null);
        setContentCreation(null);
        setImages(null);
        scrollToTopSmooth();

        // 2. Start the promise chain
        axios.post(
            BASE_URL + "analyze",
            { competitorUrl: url },
            { withCredentials: true, signal: controller.signal }
        )
            .then(response => {
                // 3. First request succeeded. Update the UI immediately.
                console.log("Analysis complete, updating UI...");
                setAnalysisData(response.data.aiInsights);
                setScrapedContent(response?.data?.scrapedContent);
                saveToHistory(url, response.data.aiInsights);
                setLoading(false)
                // 4. Start the next step in the chain and return its promise.
                return deepSeekContentCreation(response.data, controller);
            })
            .catch(err => {
                // 5. This single catch block handles errors from ANY of the chained requests.
                if (axios.isCancel(err) || err.name === 'AbortError') {
                    console.log("Request sequence cancelled by user.");
                    setError("The request was cancelled.");
                } else if (err.response?.data?.error) {
                    setError("Error: " + err.response?.data?.error);
                } else {
                    setError(err.message || "An unknown error occurred. Please try again.");
                }
                console.error("An error occurred in the request chain:", err);
            })
            .finally(() => {
                // 6. This ALWAYS runs after the entire chain is complete (success or failure).
                console.log("Entire process finished.");
                setLoading(false); // Turn off the main loader
                controllerRef.current = null; // Clean up the controller
            });
    };


    const handleCompareSubmit = async () => {
        // 1. Cancel any ongoing request from the previous submission
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        // 2. Create a new AbortController for this specific request
        const controller = new AbortController();
        controllerRef.current = controller;

        // --- Your existing state resets ---
        setLoading(true);
        setError("");
        setAnalysisData(null);
        scrollToTopSmooth();
        setCompareData(null);
        setContentCreation(null);
        setImages(null);

        try {
            const response = await axios.post(
                BASE_URL + "compare",
                { competitorUrl: competitorUrl, ourUrl: yourUrl },
                // 3. Pass the signal to the axios request
                { withCredentials: true, signal: controller.signal }
            );
            // console.log(response)

            if (response.status === 429) {
                setError("Too Many requests! Please slow down");
            }
            setCompareData(response?.data);
            saveToHistory(competitorUrl, response?.data?.comparison?.competitorInsights?.analysisSummary?.competitorStrengths);

        } catch (err) {
            // 4. Specifically handle the cancellation error
            if (axios.isCancel(err) || err.name === 'AbortError') {
                console.log("Compare request cancelled by user.");
                setError("The request was cancelled."); // Provide user-friendly feedback
            } else if (err.response?.data?.error) {
                setError("Error: " + err.response?.data?.error);
            } else {
                setError("Failed To Compare URLs! Please Try Again Later");
            }
            console.error(err);
        } finally {
            setLoading(false);
            // 5. Clean up the controller ref after the request is complete
            controllerRef.current = null;
        }
    };

    useEffect(() => {
        // Cleanup when component unmounts
        return () => {
            if (controllerRef.current) {
                console.log("Component unmounting, cancelling active request.");
                controllerRef.current.abort();
            }
        };
    }, []);

    const handleAnalysisType = (e) => {
        setAnalysisType(e.target.value);

        if (e.target.value === "compare") {
            setIsComparable(true);
        } else {
            setIsComparable(false);
        }
    };

    // const TabNavigation = () => (


    //     <div className="sticky top-0 z-30 backdrop-blur bg-white border-b border-white/10 text-white">
    //         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

    //             {/* Left side - Logo and Brand */}
    //             <div className="flex items-center gap-3">
    //                 <button
    //                     className="p-2 rounded bg-gray-700 hover:text-indigo-600 transition-colors"
    //                     onClick={() => setSidebarOpen(true)}
    //                 >
    //                     <FiMenu />
    //                 </button>
    //                 <img className="w-12 h-12" src="outranklogo.png" alt="OutRank Engine" />
    //                 <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
    //                     OutRank Engine
    //                 </span>
    //             </div>

    //             {/* Center - Tab Navigation */}
    //             <div className="space-x-6 hidden md:flex">
    //                 {tabs.map(tab => {
    //                     const Icon = tab.icon;
    //                     return (
    //                         <button
    //                             key={tab.id}
    //                             onClick={() => setActiveTab(tab.id)}
    //                             className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${activeTab === tab.id
    //                                 ? 'text-indigo-600 border-b-2 border-indigo-600'
    //                                 : 'text-gray-800 hover:text-indigo-600'
    //                                 }`}
    //                         >
    //                             <Icon className="text-base" />
    //                             {tab.label}
    //                         </button>
    //                     );
    //                 })}
    //             </div>

    //             {/* Mobile Tab Menu */}
    //             <div className="md:hidden">
    //                 <select
    //                     value={activeTab}
    //                     onChange={(e) => setActiveTab(e.target.value)}
    //                     className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm"
    //                 >
    //                     {tabs.map(tab => (
    //                         <option key={tab.id} value={tab.id}>
    //                             {tab.label}
    //                         </option>
    //                     ))}
    //                 </select>
    //             </div>

    //             {/* Right side - IST Time */}
    //             <div className="hidden sm:flex items-center gap-6 text-sm text-gray-900">
    //                 <span className="opacity-80">
    //                     IST: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    //                 </span>
    //             </div>

    //         </div>
    //     </div>
    // );
    const TabNavigation = () => {
        const [showMobileTabMenu, setShowMobileTabMenu] = useState(false);

        return (
            <div className="sticky top-0 z-30 backdrop-blur bg-white border-b border-white/10 text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                    {/* Left side - Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <button
                            className="p-2 rounded bg-gray-700 hover:text-indigo-600 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <SidebarOpenIcon />

                        </button>
                        <img className="w-12 h-12" src="outranklogo.png" alt="OutRank Engine" />
                        <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
                            OutRank Engine
                        </span>
                    </div>

                    {/* Center - Tab Navigation (Desktop) */}
                    <div className="space-x-6 hidden md:flex">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${activeTab === tab.id
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-800 hover:text-indigo-600'
                                        }`}
                                >
                                    <Icon className="text-base" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side - IST Time and Mobile Tab Menu */}
                    <div className="flex items-center gap-3">
                        {/* IST Time */}
                        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-900">
                            <span className="opacity-80">
                                IST: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                            </span>
                        </div>

                        {/* Mobile Tab Hamburger Menu */}
                        <div className="md:hidden relative">
                            <button
                                className="p-2 rounded bg-gray-700 hover:text-indigo-600 transition-colors"
                                onClick={() => setShowMobileTabMenu(!showMobileTabMenu)}
                            >
                                <MenuIcon />
                            </button>

                            {/* Mobile Tab Dropdown */}
                            {showMobileTabMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    {tabs.map(tab => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => {
                                                    setActiveTab(tab.id);
                                                    setShowMobileTabMenu(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50 ${activeTab === tab.id
                                                    ? 'text-indigo-600 bg-indigo-50 border-r-2 border-indigo-600'
                                                    : 'text-gray-800'
                                                    }`}
                                            >
                                                <Icon className="text-base" />
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Click outside to close mobile menu */}
                {showMobileTabMenu && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMobileTabMenu(false)}
                    />
                )}
            </div>
        );
    };



    const renderTabContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <URLAnalyzer
                        // Pass all state as props
                        url={url}
                        setUrl={setUrl}
                        loading={loading}
                        setLoading={setLoading}
                        analysisData={analysisData}
                        setAnalysisData={setAnalysisData}
                        error={error}
                        setError={setError}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        history={history}
                        setHistory={setHistory}
                        activeStepIndex={activeStepIndex}
                        setActiveStepIndex={setActiveStepIndex}
                        isComparable={isComparable}
                        setIsComparable={setIsComparable}
                        analysisType={analysisType}
                        setAnalysisType={setAnalysisType}
                        competitorUrl={competitorUrl}
                        setCompetitorUrl={setCompetitorUrl}
                        yourUrl={yourUrl}
                        setYourUrl={setYourUrl}
                        comparedData={comparedData}
                        setCompareData={setCompareData}
                        analysisActiveTab={analysisActiveTab}
                        setAnalysisActiveTab={setAnalysisActiveTab}
                        contentCreation={contentCreation}
                        setContentCreation={setContentCreation}
                        loading1={loading1}
                        setLoading1={setLoading1}
                        scrapedContent={scrapedContent}
                        setScrapedContent={setScrapedContent}
                        images={images}
                        setImages={setImages}
                        loading3={loading3}
                        setLoading3={setLoading3}
                        controllerRef={controllerRef}
                        // processingSteps={processingSteps}
                        scrollToTopSmooth={scrollToTopSmooth}
                        handleSubmit={handleSubmit}
                        handleCompareSubmit={handleCompareSubmit}
                        handleAnalysisType={handleAnalysisType}
                        saveToHistory={saveToHistory}
                        // Flag to tell URLAnalyzer not to render navbar or sidebar
                        hideSidebar={true}
                        hideNavbar={true}
                    />
                );
            case 'about':
                return <AboutUs />;
            case 'contact':
                return <ContactUs />;
            case 'pricing':
                return <Pricing />;
            case 'privacy':
                return <PrivacyPolicy />;
            default:
                return (
                    <URLAnalyzer
                        // Pass all state as props
                        url={url}
                        setUrl={setUrl}
                        loading={loading}
                        setLoading={setLoading}
                        analysisData={analysisData}
                        setAnalysisData={setAnalysisData}
                        error={error}
                        setError={setError}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        history={history}
                        setHistory={setHistory}
                        activeStepIndex={activeStepIndex}
                        setActiveStepIndex={setActiveStepIndex}
                        isComparable={isComparable}
                        setIsComparable={setIsComparable}
                        analysisType={analysisType}
                        setAnalysisType={setAnalysisType}
                        competitorUrl={competitorUrl}
                        setCompetitorUrl={setCompetitorUrl}
                        yourUrl={yourUrl}
                        setYourUrl={setYourUrl}
                        comparedData={comparedData}
                        setCompareData={setCompareData}
                        analysisActiveTab={analysisActiveTab}
                        setAnalysisActiveTab={setAnalysisActiveTab}
                        contentCreation={contentCreation}
                        setContentCreation={setContentCreation}
                        loading1={loading1}
                        setLoading1={setLoading1}
                        scrapedContent={scrapedContent}
                        setScrapedContent={setScrapedContent}
                        images={images}
                        setImages={setImages}
                        loading3={loading3}
                        setLoading3={setLoading3}
                        controllerRef={controllerRef}
                        // processingSteps={processingSteps}
                        scrollToTopSmooth={scrollToTopSmooth}
                        handleSubmit={handleSubmit}
                        handleCompareSubmit={handleCompareSubmit}
                        handleAnalysisType={handleAnalysisType}
                        saveToHistory={saveToHistory}
                        // Flag to tell URLAnalyzer not to render navbar or sidebar
                        hideSidebar={true}
                        hideNavbar={true}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen relative">
            {/* Background matching your existing design */}
            <div className="absolute inset-0 -z-10">
                <div className="h-full w-full bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900"></div>
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 30%), 
                           radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 0%, transparent 30%), 
                           radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0%, transparent 30%)`
                }}></div>
            </div>

            {/* Tab Navigation */}
            <TabNavigation />

            {/* Tab Content */}
            {renderTabContent()}

            {/* Sidebar - Now managed from StaticPagesTab */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                history={history}
                setHistory={setHistory}
                setUrl={setUrl}
                scrollToTopSmooth={scrollToTopSmooth}
            />
        </div>
    );
};

export default StaticPagesTab;
