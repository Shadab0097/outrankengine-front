import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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



function URLAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isComparable, setIsComparable] = useState(false);
  const [analysisType, setAnalysisType] = useState("seo");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [yourUrl, setYourUrl] = useState("");
  const [comparedData, setCompareData] = useState(null);
  const [activeTab, setActiveTab] = useState("gemini"); // New state for tab navigation
  const [contentCreation, setContentCreation] = useState(null)
  const [loading1, setLoading1] = useState(false)
  const [scrapedContent, setScrapedContent] = useState(null)
  const [images, setImages] = useState([]);
  const [loading3, setLoading3] = useState(true)




  const processingSteps = useMemo(
    () => [
      { icon: FiSearch, text: "Fetching page and scraping visible content" },
      { icon: FiTool, text: "Parsing HTML, meta tags, and structured data" },
      { icon: FiTarget, text: "Extracting target keywords and intent" },
      { icon: FiLink, text: "Analyzing backlinks and referring domains" },
      { icon: FiSettings, text: "Checking technical SEO and Core Web Vitals" },
      { icon: FiFileText, text: "Evaluating content depth and gaps" },
      { icon: FiTrendingUp, text: "Building strategy insights and roadmap" }
    ],
    []
  );
  // const analysisData2 = {
  //   "aiInsights": {
  //     "analysisSummary": {
  //       "competitorStrengths": "The competitor has a clear, emotionally resonant headline (H1) and a simple, single-page design that is easy to navigate for a user seeking basic information. The brand name is clear, and they have a prominent 'Donate' call-to-action. Their primary strength lies in branded search for 'Anjuman-e-Islah'.",
  //       "competitorWeaknesses": "The single-page architecture is a critical SEO weakness, preventing them from ranking for diverse, non-branded keywords. There is a complete lack of meta descriptions, structured data, and in-depth content. The site relies on stock imagery from Unsplash, which weakens E-E-A-T signals. All internal links are anchor links, offering no topical authority building. The overall SEO foundation is extremely weak.",
  //       "rankingFactors": [
  //         "Branded Search: Their current ranking is likely driven almost exclusively by users searching for their specific name.",
  //         "Domain Name: The domain matches their brand name, reinforcing branded search strength.",
  //         "Simplicity: The site is fast-loading due to its simple structure, which is a minor positive signal."
  //       ],
  //       "contentGaps": [
  //         "Dedicated Program Pages: No in-depth pages for 'Education Programs', 'Healthcare Support', etc.",
  //         "Impact/Transparency Reports: Lacks detailed reports on fund allocation, program outcomes, or annual financial statements.",
  //         "Beneficiary Stories: 'Impact Stories' section is just a photo carousel. Individual, detailed case studies are a huge missed opportunity.",
  //         "FAQ Section: No page addressing common donor questions about tax benefits, donation process, or the organization's history.",
  //         "Volunteer Information: No content on how people can get involved beyond donating."
  //       ],
  //       "overallAssessment": "The competitor's website is a digital brochure, not an SEO-optimized asset. It is highly vulnerable and can be easily outranked by a competitor who implements a foundational, multi-page content strategy focused on topical authority, E-E-A-T signals, and basic technical SEO. Their reliance on a single page for all information is their most significant, exploitable flaw."
  //     },
  //     "targetKeywords": {
  //       "primaryKeywords": [
  //         "educational trust for underprivileged children",
  //         "donate for child education in India",
  //         "welfare trust for education",
  //         "NGO for poor students",
  //         "sponsor a child's education"
  //       ],
  //       "longTailKeywords": [
  //         "how to get tax exemption for education donation",
  //         "best charity to donate for education in [City/Region]",
  //         "support programs for underprivileged students",
  //         "non-profit organizations providing academic resources"
  //       ],
  //       "questionBasedKeywords": [
  //         "How can I help a poor child with education?",
  //         "Where does my donation for education go?",
  //         "What is the impact of sponsoring a child?",
  //         "Are education donations tax deductible?"
  //       ],
  //       "semanticKeywords": [
  //         "non-profit organization",
  //         "charitable giving",
  //         "community development",
  //         "social welfare",
  //         "empowerment",
  //         "sponsorship",
  //         "philanthropy"
  //       ],
  //       "lowCompetitionOpportunities": [
  //         "education charity in [specific local area]",
  //         "volunteer teaching opportunities near me",
  //         "local NGO for community support",
  //         "healthcare support for students in [City]"
  //       ],
  //       "keywordDifficulty": [
  //         {
  //           "keywordGroup": "Primary & Transactional Keywords",
  //           "difficulty": "Medium",
  //           "rationale": "Competition exists from established national and international NGOs."
  //         },
  //         {
  //           "keywordGroup": "Long-Tail & Question-Based Keywords",
  //           "difficulty": "Low-to-Medium",
  //           "rationale": "High potential for ranking with in-depth, helpful content."
  //         },
  //         {
  //           "keywordGroup": "Local & Low Competition Keywords",
  //           "difficulty": "Low",
  //           "rationale": "Targeting a specific geographic area significantly reduces competition."
  //         }
  //       ]
  //     },
  //     "contentStrategy": {
  //       "contentTypes": [
  //         "In-depth Program Pages (Pillar Pages)",
  //         "Blog Posts (Success Stories, Impact Analyses, News)",
  //         "Video Testimonials (from beneficiaries, staff, donors)",
  //         "Infographics (visualizing donation impact)",
  //         "Downloadable Annual/Transparency Reports (PDF)",
  //         "Comprehensive FAQ Page"
  //       ],
  //       "contentFormat": [
  //         "Long-form written articles (>1500 words)",
  //         "High-quality, original photography and video",
  //         "Data visualizations and charts",
  //         "Structured Q&A format for FAQs"
  //       ],
  //       "contentDepth": "Shift from a single-page overview to a multi-page, topic cluster model. Each program (Education, Healthcare, Community) should be a pillar page with 1,500+ words, covering the what, why, how, and impact, supported by cluster content like specific project updates and case studies.",
  //       "uniqueAngles": [
  //         "Transparency Hub: A dedicated section with detailed financial breakdowns and impact metrics.",
  //         "'Follow the Rupee': An interactive feature showing how a donation is allocated across different programs.",
  //         "Staff & Volunteer Spotlight: Introduce the team to build human connection and trust.",
  //         "Resource Guides for the Community: Content that helps the community you serve, establishing authority beyond just asking for donations."
  //       ],
  //       "expertiseSignals": [
  //         "Author bios for blog posts detailing their experience in the non-profit sector.",
  //         "Publishing detailed, data-backed impact reports.",
  //         "Featuring endorsements or partnerships with other reputable organizations.",
  //         "Showcasing media mentions, awards, or certifications."
  //       ],
  //       "userIntentAlignment": [
  //         {
  //           "intent": "Informational",
  //           "content": "Create blog posts and guides answering questions like 'How to help poor students'."
  //         },
  //         {
  //           "intent": "Transactional",
  //           "content": "Develop clear, secure, and multi-option donation pages for specific campaigns ('Donate for school supplies')."
  //         },
  //         {
  //           "intent": "Investigation",
  //           "content": "Build detailed 'About Us', 'Our Team', and 'Financials' pages to build trust with potential donors comparing organizations."
  //         }
  //       ],
  //       "contentClusterStrategy": [
  //         {
  //           "pillarPage": "/education-programs",
  //           "clusterContent": [
  //             "/blog/success-story-rahul",
  //             "/blog/new-academic-resource-center",
  //             "/blog/impact-of-sponsorship-on-literacy-rates"
  //           ]
  //         },
  //         {
  //           "pillarPage": "/our-impact",
  //           "clusterContent": [
  //             "/reports/2024-annual-report",
  //             "/blog/community-development-project-update",
  //             "/testimonials"
  //           ]
  //         }
  //       ]
  //     },
  //     "onPageSEOSuggestions": {
  //       "titleTagOptimization": [
  //         "Homepage: Educational & Welfare Trust for Children | [Our Org Name]",
  //         "Donation Page: Donate to Support Underprivileged Children | [Our Org Name]",
  //         "Program Page: Child Education Programs in [City] | [Our Org Name]"
  //       ],
  //       "metaDescriptions": [
  //         "Create unique, compelling meta descriptions for each page, including a call-to-action. E.g., 'Join [Our Org Name] in transforming lives through education. We provide books, healthcare, and support to 300+ children. See our impact and donate today.'"
  //       ],
  //       "headerStructure": [
  //         "Use one unique H1 per page that targets the main keyword. Use H2s for main sections and H3s for sub-points. Avoid generic H2s like 'About Us' on the about page; instead use 'Our Mission to Empower Through Education'."
  //       ],
  //       "internalLinking": [
  //         "Develop a strong internal linking structure. Link from blog posts to relevant program pages and the donation page. Link from program pages to specific success stories. This distributes authority and improves user navigation."
  //       ],
  //       "schemaMarkup": [
  //         "Implement `NGO` or `Organization` schema on the homepage.",
  //         "Use `Article` schema for all blog posts and reports.",
  //         "Use `FAQPage` schema on the FAQ page to capture SERP real estate.",
  //         "Use `Event` schema for fundraising or community events."
  //       ],
  //       "urlStructure": [
  //         "Create a clean, logical, and keyword-inclusive URL structure. E.g., `our-domain.org/our-work/education-programs` instead of `our-domain.org/page-id-123`."
  //       ],
  //       "imageOptimization": [
  //         "Replace all stock photos with original photography. Compress all images, use descriptive filenames (e.g., `children-learning-in-classroom.jpg`), and write specific, descriptive alt text for accessibility and SEO."
  //       ],
  //       "contentStructure": [
  //         "Break up text with short paragraphs, bullet points, numbered lists, and blockquotes. Use bolding and italics to emphasize key points. Embed relevant images and videos to increase engagement."
  //       ]
  //     },
  //     "backlinkStrategy": {
  //       "highAuthorityTargets": [
  //         "Local news media websites (e.g., [City] Times)",
  //         "Reputable national charity directories (e.g., GuideStar, Charity Navigator)",
  //         "Websites of corporate sponsors or partners",
  //         "Education-focused blogs and online publications",
  //         ".edu domains from local universities with community outreach programs"
  //       ],
  //       "linkBuildingTactics": [
  //         "Digital PR: Pitch compelling data from your impact reports and human-interest stories to journalists.",
  //         "Local SEO citations: Get listed in local business and non-profit directories.",
  //         "Guest Posting: Write articles for relevant blogs on topics like 'The Importance of Community Support in Education'.",
  //         "Unlinked Brand Mentions: Find where your organization is mentioned online and request a link."
  //       ],
  //       "contentForLinkEarning": [
  //         "An annual 'State of Education for Underprivileged Children in [Region]' report with original data.",
  //         "A high-quality documentary-style video about a beneficiary's journey.",
  //         "An interactive map showcasing all project locations and their impact.",
  //         "Scholarship or resource guides for low-income families."
  //       ],
  //       "digitalPROpportunities": [
  //         "Launch a time-sensitive fundraising campaign around a specific need (e.g., 'Winter Clothing Drive') and promote it to local media.",
  //         "Partner with a local influencer or celebrity for a fundraising event.",
  //         "Publish an open letter or op-ed in a local newspaper about a relevant social issue."
  //       ],
  //       "competitorBacklinkGaps": "The competitor likely has a very weak backlink profile, consisting of a few low-quality directory links at best. The opportunity is vast. Earning even a handful of high-quality links from news media or educational sites will create a significant competitive advantage."
  //     },
  //     "technicalSEO": {
  //       "coreWebVitals": [
  //         "Optimize images (compress, use next-gen formats like WebP).",
  //         "Defer or lazy-load non-critical JavaScript and CSS.",
  //         "Ensure server response time is fast.",
  //         "Avoid layout shifts by specifying dimensions for images and ads."
  //       ],
  //       "mobileOptimization": [
  //         "Implement a responsive design that provides an excellent user experience on all devices.",
  //         "Ensure navigation menus, buttons, and forms are easy to use on a small touchscreen."
  //       ],
  //       "siteSpeed": [
  //         "Utilize browser caching and a Content Delivery Network (CDN).",
  //         "Minify HTML, CSS, and JavaScript files.",
  //         "Aim for a Largest Contentful Paint (LCP) of under 2.5 seconds."
  //       ],
  //       "crawlability": [
  //         "Create and submit an XML sitemap to Google Search Console.",
  //         "Ensure a logical site structure that is easy for search engine bots to follow.",
  //         "Check `robots.txt` to ensure no important pages are being blocked."
  //       ],
  //       "indexingOptimization": [
  //         "Moving from a single-page to a multi-page site is the most critical step for proper indexing of different topics.",
  //         "Use canonical tags correctly to avoid duplicate content issues if content is syndicated."
  //       ],
  //       "structuredData": [
  //         "Implement `NGO`, `FAQPage`, `Article`, and `Event` schema as a priority. This helps Google understand your content and can result in rich snippets in the SERPs."
  //       ],
  //       "securityEnhancements": [
  //         "Ensure the entire site uses HTTPS (SSL certificate).",
  //         "Use a secure, trusted payment gateway for donations and display trust seals prominently."
  //       ]
  //     },
  //     "additionalOpportunities": {
  //       "eatSignals": [
  //         "Create a comprehensive 'About Us' page with the organization's history, mission, and photos/bios of key staff.",
  //         "Display physical address and phone number clearly.",
  //         "Use original photos and videos of your work, not stock images.",
  //         "Showcase testimonials, media mentions, and awards."
  //       ],
  //       "localSEOTactics": [
  //         "Create and fully optimize a Google Business Profile for your organization's physical location.",
  //         "Encourage reviews from volunteers and local partners.",
  //         "Embed a Google Map on your contact page.",
  //         "Create content that specifically mentions the local areas you serve."
  //       ],
  //       "socialSignals": [
  //         "Maintain active social media profiles (Facebook, Instagram, LinkedIn) to share updates, stories, and drive traffic back to the website.",
  //         "Run targeted social media ad campaigns for fundraising drives."
  //       ],
  //       "aiContentOptimization": [
  //         "Use AI for brainstorming content ideas, generating outlines, and creating initial drafts for non-sensitive content.",
  //         "CRITICAL: All content, especially stories and impact claims, must be heavily edited and verified by a human to ensure authenticity, empathy, and accuracy. Avoid generic, soulless AI content."
  //       ],
  //       "featuredSnippetTargets": [
  //         "Create an FAQ page with clear questions and concise, direct answers (e.g., 'Q: Is my donation tax deductible? A: Yes, [Our Org Name] is a registered...').",
  //         "Use 'how-to' and 'what-is' formats in blog post titles and headers."
  //       ],
  //       "voiceSearchOptimization": [
  //         "Optimize for long-tail, conversational keywords and questions that people would speak rather than type.",
  //         "Ensure your Google Business Profile information (address, hours, phone) is accurate."
  //       ],
  //       "competitiveAdvantages": [
  //         "Superior Content: Be the primary source of information by creating in-depth, high-quality content the competitor lacks.",
  //         "Radical Transparency: Publish detailed financial and impact reports to build unparalleled trust.",
  //         "Community Focus: Create hyper-local content that establishes you as the leading authority in your specific geographic area."
  //       ]
  //     },
  //     "implementationPlan": {
  //       "quickWins": [
  //         "Set up and optimize Google Business Profile.",
  //         "Write and implement a unique, keyword-optimized title tag and meta description for the current homepage.",
  //         "Compress all existing images and add descriptive alt text."
  //       ],
  //       "mediumTermGoals": [
  //         "Plan and execute the migration from a single-page to a multi-page website architecture.",
  //         "Write and publish cornerstone content for 3-5 main programs/services.",
  //         "Implement all recommended schema markup (`NGO`, `FAQ`, etc.).",
  //         "Launch a blog with the first 5 success stories."
  //       ],
  //       "longTermStrategy": [
  //         "Establish a consistent content calendar (e.g., 2 blog posts/month, 1 quarterly report).",
  //         "Develop and execute an ongoing digital PR and link-building campaign.",
  //         "Build an engaged community on one or two key social media platforms.",
  //         "Continuously monitor keyword rankings and SEO performance, adapting the strategy as needed."
  //       ],
  //       "priorityMatrix": [
  //         {
  //           "task": "Website Architecture Rework (Multi-page)",
  //           "impact": "Very High",
  //           "effort": "High"
  //         },
  //         {
  //           "task": "Cornerstone Content Creation",
  //           "impact": "Very High",
  //           "effort": "High"
  //         },
  //         {
  //           "task": "Google Business Profile Optimization",
  //           "impact": "High",
  //           "effort": "Low"
  //         },
  //         {
  //           "task": "On-Page SEO Basics (Titles/Metas/Schema)",
  //           "impact": "High",
  //           "effort": "Medium"
  //         },
  //         {
  //           "task": "Backlink & PR Campaign",
  //           "impact": "Very High",
  //           "effort": "Very High"
  //         }
  //       ],
  //       "estimatedTimeline": [
  //         {
  //           "phase": "Phase 1 (Months 1-2): Foundational Setup",
  //           "activities": "Quick wins, website architecture planning, keyword research, content strategy finalization."
  //         },
  //         {
  //           "phase": "Phase 2 (Months 3-6): Build & Launch",
  //           "activities": "New website development, cornerstone content creation, launch of the new site and blog."
  //         },
  //         {
  //           "phase": "Phase 3 (Months 6-12+): Grow & Scale",
  //           "activities": "Consistent content production, link building outreach, performance analysis and optimization."
  //         }
  //       ],
  //       "requiredResources": [
  //         "SEO Strategist / Manager",
  //         "Web Developer (for site rebuild)",
  //         "Content Writer / Storyteller",
  //         "PR / Outreach Specialist",
  //         "Budget for web development, tools, and potentially photography/video."
  //       ]
  //     }
  //   }
  // } //////commentt

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("seoAnalyzerHistory") || "[]");
      setHistory(Array.isArray(saved) ? saved : []);


      // setAnalysisData(analysisData2);/////commmenttt

    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      setActiveStepIndex(0);
      return;
    }
    let i = 0;
    setActiveStepIndex(0);
    const interval = setInterval(() => {
      i = (i + 1) % processingSteps.length;
      setActiveStepIndex(i);
    }, 1400);
    return () => clearInterval(interval);
  }, [loading, processingSteps.length]);

  const saveToHistory = (urlValue, responseSample) => {
    const entry = {
      id: Date.now(),
      url: urlValue,
      date: new Date().toISOString(),
      summary:
        responseSample?.analysisSummary?.overallAssessment ||
        (typeof responseSample?.analysisSummary?.competitorStrengths === "string"
          ? responseSample.analysisSummary.competitorStrengths.slice(0, 120)
          : "") ||
        "Analysis completed"
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    try {
      localStorage.setItem("seoAnalyzerHistory", JSON.stringify(updated));
    } catch { }
  };

  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  const imageGeneration = async (imageData) => {
    // setLoading3(true)
    try {
      const res = await axios.post(BASE_URL + 'imageGeneration', { data: imageData }, { withCredentials: true });
      if (res.status === 200) {

        setImages(res);
        // console.log(res)
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading3(false);
    }

  }


  const deepSeekContentCreation = async (contentCreationData) => {

    const prompt = `You are a highly experienced SEO content strategist with over 20 years of expertise in creating keyword-optimized and competitor-beating content strategies.

Here is the competitor analysis data in JSON format:
${JSON.stringify(contentCreationData, null, 2)}

Your task is to generate a detailed and comprehensive SEO content strategy designed to outrank competitors by leveraging every keyword opportunity, exploiting competitor weaknesses, and fulfilling user search intent.

Please respond ONLY with a valid JSON object matching this exact structure and naming conventions:

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


    setLoading1(true)
    // setLoading3(true)



    try {
      const deepSeekResults = await axios.post(
        BASE_URL + 'deepseek',
        {
          message: [{ role: "user", text: prompt }]
          // model: "gemini-2.0-flash"
        },
        { withCredentials: true }
      );

      let data = deepSeekResults;
      let parsedData;
      try {
        const cleanData = typeof data.data === "string"
          ? data.data.trim().replace(/^```json|```$/g, "")
          : data.data;
        parsedData = typeof cleanData === "string" ? JSON.parse(cleanData) : cleanData;
      } catch (err) {
        console.error("Failed to parse Gemini response:", err);
        parsedData = {};
      }

      // console.log("Gemini Content:", parsedData);
      setContentCreation(parsedData);
      imageGeneration(parsedData)
    } catch (error) {
      console.error("Gemini-content API Error:", error);
      throw error;
    } finally {
      setLoading1(false);
      // setLoading3(false)

    }
  };


  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setAnalysisData(null);
    scrollToTopSmooth();
    setCompareData(null);
    setContentCreation(null);
    setImages(null)



    try {
      const response = await axios.post(BASE_URL + "analyze", { competitorUrl: url }, { withCredentials: true });
      if (response.status === 429) {
        setError("Too Many requests! PLease slow down");
      }

      setAnalysisData(response.data.aiInsights);
      // setContentCreation(response?.data)
      setScrapedContent(response?.data?.scrapedContent)
      saveToHistory(url, response.data.aiInsights);
      if (response.status === 200) {
        deepSeekContentCreation(response?.data)

      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError("Error" + ' ' + err.response?.data?.error);
      } else {
        setError("Failed To Analyze URL! Please Try Again Later");
      }
      console.error(err);
    } finally {
      setLoading(false);

    }
  };

  const handleAnalysisType = (e) => {
    setAnalysisType(e.target.value);

    if (e.target.value === "compare") {
      setIsComparable(true);
    } else {
      setIsComparable(false);
    }
  };

  const handleCompareSubmit = async () => {
    setLoading(true);
    setError("");
    setAnalysisData(null);
    scrollToTopSmooth();
    setCompareData(null);
    setContentCreation(null);
    setImages(null)




    try {
      const response = await axios.post(BASE_URL + "compare", { competitorUrl: competitorUrl, ourUrl: yourUrl }, { withCredentials: true });
      // console.log(response?.data);
      if (response.status === 429) {
        setError("Too Many requests! PLease slow down");
      }
      setCompareData(response?.data);
      saveToHistory(competitorUrl, response?.data?.comparison?.competitorInsights?.analysisSummary?.competitorStrengths);
    } catch (err) {
      if (err.response?.data?.error) {
        setError("Error" + ' ' + err.response?.data?.error);
      } else {
        setError("Failed To Analyze URL! Please Try Again Later");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Elegant background */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, transparent 30%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 0, transparent 30%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0, transparent 30%)"
          }}
        />
      </div>

      {/* Top bar with menu */}
      <div className="sticky top-0 z-30 backdrop-blur bg-white/10 border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>
            <div className="flex items-center gap-2">
              <FiGlobe className="text-white" />
              <span className="font-semibold">SEO Competitor Analyzer</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <span className="opacity-80">IST: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
          </div>
        </div>
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
                  Get keyword strategy, ranking factors, backlink opportunities, and a step-by-step implementation plan to Outrank the Competitor.
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

            {/* Processing steps banner when loading */}
            {loading && (
              <div className="max-w-4xl mx-auto px-4 mt-6">
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4">
                  <p className="text-white font-semibold mb-3 flex items-center gap-2">
                    <FiZap className="text-yellow-300" />
                    Working on it...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {processingSteps.map((step, idx) => {
                      const isActive = idx === activeStepIndex;
                      const Icon = step.icon;
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm transition-all ${isActive ? "bg-yellow-300 text-black shadow" : "bg-white/10 text-white/80 border border-white/20"
                            }`}
                        >
                          <Icon className={isActive ? "text-black" : "text-white/80"} />
                          {step.text}
                          {isActive && <span className="ml-1 animate-pulse">...</span>}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-300 transition-all duration-500"
                      style={{ width: `${((activeStepIndex + 1) / processingSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
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

      {/* Sidebar */}
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
}

export default URLAnalyzer;
