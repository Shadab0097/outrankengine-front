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
  FiUsers
} from "react-icons/fi";
import { BASE_URL } from "../utils/constant";
import Sidebar from "../component/Sidebar";
import KeywordSection from "../component/KeywordSection";
import AnalysisCard from "../component/AnalysisCard";
import ListSection from "../component/ListSection";
import PriorityMatrix from "../component/PriorityMatrix";
import Timeline from "../component/Timeline";
import AnalysisDashboard from "../compareComponent/AnalysisDashboard";

// const data = {
//   "remainingTokens": 2870,
//   "analysisType": "comparison",
//   "tokensCost": 40,
//   "analyzedUrls": {
//     "competitor": "https://www.jamiakhadijatulkubratrust.com/",
//     "our": "https://www.anjumaneislahtrust.com/"
//   },
//   "comparison": {
//     "competitorInsights": {
//       "analysisSummary": {
//         "competitorStrengths": "The competitor has a clear brand identity and a single, focused homepage that communicates their mission. Their primary strength is the implementation of a detailed 'EducationalOrganization' schema, which clearly defines them as an entity to Google and aids in local SEO and Knowledge Panel presence. The site also has clear calls-to-action for donations.",
//         "competitorWeaknesses": "The website's most critical weakness is its single-page architecture. It uses anchor links for navigation, which prevents them from building topical authority on specific services (Education, Healthcare, etc.) or ranking for a wide range of non-branded keywords. Other weaknesses include a non-optimized title tag ('Home - ...'), outdated use of meta keywords, generic alt text on some images, and a lack of deep, informational content.",
//         "rankingFactors": [
//           "Strong local entity signals via schema.org markup (name, address, phone)",
//           "Clear branding and domain name",
//           "Mobile-friendly design",
//           "Secure site (HTTPS)"
//         ],
//         "contentGaps": [
//           "Dedicated pages for each service (Education Support, Healthcare, Shelter Programs).",
//           "An 'About Us' page with history, mission, and detailed profiles of trustees/staff.",
//           "A blog or news section for sharing updates, impact stories, and targeting informational keywords.",
//           "Specific landing pages for different donation campaigns (e.g., 'Sponsor a Student', 'Zakat Fund').",
//           "An FAQ page addressing common donor questions.",
//           "Transparent financial reports or impact statements."
//         ],
//         "overallAssessment": "The competitor likely ranks for their brand name and highly localized queries due to strong entity signals. However, their single-page structure presents a massive opportunity. A multi-page website with dedicated, in-depth content for each of their services and target keywords can easily outrank them on a wide range of valuable terms and establish superior topical authority."
//       },
//       "targetKeywords": {
//         "primaryKeywords": [
//           "Islamic educational institution in Haryana",
//           "Islamic welfare trust India",
//           "Madrasa in Nuh Mewat",
//           "Donate for Islamic education",
//           "Zakat donation for charity"
//         ],
//         "longTailKeywords": [
//           "support underprivileged students Islamic school",
//           "healthcare services for rural communities in Haryana",
//           "how to donate to a madrasa in India",
//           "best Islamic trust for social work",
//           "construction donation for mosque or school"
//         ],
//         "questionBasedKeywords": [
//           "Where can I donate for Islamic education in India?",
//           "How do Islamic welfare trusts work?",
//           "What is the importance of Quran and Hadith education?",
//           "How can I help build an Islamic school?"
//         ],
//         "semanticKeywords": [
//           "non-profit organization",
//           "charitable trust",
//           "sadaqah jariyah",
//           "community development",
//           "orphan support",
//           "spiritual guidance",
//           "humanitarian aid"
//         ],
//         "lowCompetitionOpportunities": [
//           "Islamic community center Punhana",
//           "food distribution charity Nuh Mewat",
//           "sponsor an orphan education in Haryana",
//           "charity for healthcare in rural Haryana"
//         ],
//         "keywordDifficulty": [
//           {
//             "keyword": "Jamia Khadijatul Kubra",
//             "difficulty": "Low"
//           },
//           {
//             "keyword": "Madrasa in Nuh Mewat",
//             "difficulty": "Low-Medium"
//           },
//           {
//             "keyword": "Islamic education India",
//             "difficulty": "Medium-High"
//           },
//           {
//             "keyword": "Donate zakat online",
//             "difficulty": "High"
//           }
//         ]
//       },
//       "contentStrategy": {
//         "contentTypes": [
//           "In-depth Service Pages (Pillar Pages)",
//           "Blog Posts and Articles",
//           "Impact Reports and Case Studies (student success stories)",
//           "Video Testimonials and Project Updates",
//           "Donation Campaign Landing Pages",
//           "Team/Trustee Biography Pages"
//         ],
//         "contentFormat": [
//           "Long-form articles (2000+ words) for pillar pages",
//           "Infographics showing donation impact",
//           "Photo galleries of events and students",
//           "Downloadable annual reports (PDF)",
//           "Short video documentaries"
//         ],
//         "contentDepth": "Create comprehensive pillar pages for each core service (e.g., 'Our Educational Programs'). These pages should cover curriculum, student life, impact, and how to support, acting as a central hub for that topic. Supporting blog posts should target long-tail keywords related to each pillar.",
//         "uniqueAngles": [
//           "A Day in the Life of a Student at Our Madrasa",
//           "From Foundation to Future: A Visual Journey of Our Construction Project",
//           "How Your ₹1500 Donation Provides a Month of Healthcare",
//           "Interviews with our teachers on preserving traditional Islamic values"
//         ],
//         "expertiseSignals": [
//           "Detailed biographies of founders, trustees, and senior teachers with their qualifications.",
//           "Publishing detailed, data-driven annual impact reports.",
//           "Featuring testimonials from students, parents, and community leaders.",
//           "Showcasing affiliations with other respected organizations."
//         ],
//         "userIntentAlignment": [
//           {
//             "intent": "Informational",
//             "content": "Blog posts answering questions about Islamic charity, education, and community issues."
//           },
//           {
//             "intent": "Transactional",
//             "content": "Dedicated, easy-to-use donation pages for specific campaigns (Zakat, School Building, etc.)."
//           },
//           {
//             "intent": "Navigational",
//             "content": "A clear, well-structured website that allows users to easily find the homepage and contact information."
//           },
//           {
//             "intent": "Commercial Investigation",
//             "content": "Detailed service pages and impact reports for users comparing different charities to support."
//           }
//         ],
//         "contentClusterStrategy": [
//           {
//             "pillarPage": "/education",
//             "clusterContent": [
//               "/blog/importance-of-hadith-studies",
//               "/blog/student-sponsorship-impact",
//               "/our-curriculum"
//             ]
//           },
//           {
//             "pillarPage": "/community-welfare",
//             "clusterContent": [
//               "/healthcare-initiatives",
//               "/food-distribution-program",
//               "/shelter-programs",
//               "/blog/the-role-of-charity-in-community-building"
//             ]
//           }
//         ]
//       },
//       "onPageSEOSuggestions": {
//         "titleTagOptimization": [
//           "Homepage: Islamic Education & Welfare Trust in Haryana | [Your Org Name]",
//           "Service Page: Quality Islamic Education for Children | [Your Org Name]",
//           "Blog Post: How to Calculate Your Zakat for Education | [Your Org Name]"
//         ],
//         "metaDescriptions": [
//           "Support our mission to provide quality Islamic education and vital community services in Nuh, Haryana. Learn how your donation can empower futures. Donate today.",
//           "Discover our comprehensive Quran and Hadith programs. We offer scholarships and support to over 500 students annually. See our impact and get involved."
//         ],
//         "headerStructure": [
//           "Use one unique H1 tag per page that targets the primary keyword (e.g., H1: 'Our Community Healthcare Initiatives').",
//           "Use H2 and H3 tags to structure content logically, targeting secondary and long-tail keywords (e.g., H2: 'Free Medical Camps', H3: 'Dental Check-ups')."
//         ],
//         "internalLinking": [
//           "Create a silo structure. Link from pillar pages down to specific blog posts and vice-versa using descriptive anchor text.",
//           "Link contextually within body copy, e.g., when mentioning 'healthcare' in a blog post, link to the main healthcare service page."
//         ],
//         "schemaMarkup": [
//           "Use 'EducationalOrganization' and 'LocalBusiness' on the homepage/contact page.",
//           "Use 'Article' schema for all blog posts.",
//           "Use 'FAQPage' schema on relevant pages to capture question-based queries.",
//           "Use 'Event' schema for fundraising dinners or community events."
//         ],
//         "urlStructure": [
//           "Use short, descriptive, keyword-rich URLs.",
//           "Example: yoursite.com/islamic-education-programs/",
//           "Example: yoursite.com/donate/zakat-fund/"
//         ],
//         "imageOptimization": [
//           "Use original, high-quality photos instead of stock images to build E-E-A-T.",
//           "Compress all images to improve page speed.",
//           "Use descriptive filenames (e.g., 'students-in-classroom-nuh-haryana.jpg').",
//           "Write detailed, descriptive alt text for all images."
//         ],
//         "contentStructure": [
//           "Break up long text with headings, short paragraphs, bullet points, and blockquotes.",
//           "Use tables to display data, such as donation tiers and their impact.",
//           "Embed relevant videos and image galleries to increase engagement."
//         ]
//       },
//       "backlinkStrategy": {
//         "highAuthorityTargets": [
//           "Local news websites (e.g., The Tribune India, Haryana-specific news portals)",
//           "Islamic scholarship and educational websites",
//           "Reputable non-profit directories (e.g., GuideStar India)",
//           "Blogs focused on charity, non-profits, and Islamic finance"
//         ],
//         "linkBuildingTactics": [
//           "Digital PR: Pitch stories to local media about construction milestones, student achievements, or community events.",
//           "Guest Posting: Write articles for relevant blogs on topics like 'The Importance of Sadaqah Jariyah'.",
//           "Resource Link Building: Create a valuable resource (e.g., 'A Guide to Islamic Charities in North India') and promote it.",
//           "Unlinked Brand Mentions: Find where your organization is mentioned online and request a link."
//         ],
//         "contentForLinkEarning": [
//           "An annual, data-rich 'State of Education in Mewat' report.",
//           "A powerful video documentary showcasing a student's success story.",
//           "High-quality infographics detailing how donations are utilized.",
//           "A comprehensive guide on 'Zakat: Calculation and Distribution'."
//         ],
//         "digitalPROpportunities": [
//           "Announce the launch of a new program (e.g., a new wing for girls' education).",
//           "Publish a press release about a successful fundraising campaign.",
//           "Partner with a local business for a CSR initiative and co-promote.",
//           "Host a significant community event and invite local media."
//         ],
//         "competitorBacklinkGaps": "The competitor likely has very few high-authority, editorially-given backlinks due to their lack of link-worthy content. Focus on acquiring links from national-level non-profit and educational domains, an area they are almost certainly neglecting."
//       },
//       "technicalSEO": {
//         "coreWebVitals": [
//           "Optimize images (compress, use next-gen formats like WebP).",
//           "Defer non-critical JavaScript and CSS.",
//           "Enable browser caching and use a Content Delivery Network (CDN).",
//           "Aim for LCP < 2.5s, INP < 200ms, CLS < 0.1."
//         ],
//         "mobileOptimization": [
//           "Ensure a responsive design with large, easy-to-tap buttons, especially for donation forms.",
//           "Test the user journey on various mobile devices to ensure a seamless experience.",
//           "Prioritize mobile page speed."
//         ],
//         "siteSpeed": [
//           "Choose a reliable, fast hosting provider.",
//           "Minimize HTTP requests by combining files.",
//           "Use server-side caching."
//         ],
//         "crawlability": [
//           "Create and submit an XML sitemap to Google Search Console.",
//           "Implement a logical breadcrumb navigation.",
//           "Ensure the robots.txt file is not blocking any important resources."
//         ],
//         "indexingOptimization": [
//           "Use canonical tags correctly on all pages to avoid duplicate content issues.",
//           "Use Google Search Console's URL Inspection tool to check indexing status.",
//           "Ensure a clean site architecture that's easy for Googlebot to follow."
//         ],
//         "structuredData": [
//           "Implement a wider range of schema beyond 'EducationalOrganization', including 'LocalBusiness', 'Article', 'FAQPage', and 'BreadcrumbList' to provide more context to search engines."
//         ],
//         "securityEnhancements": [
//           "Implement strong security headers (CSP, HSTS).",
//           "Ensure the donation payment gateway is secure and trusted.",
//           "Regularly update all software and plugins."
//         ]
//       },
//       "additionalOpportunities": {
//         "eatSignals": [
//           "Create a dedicated 'Our Team' page with detailed bios and photos of trustees, founders, and key staff.",
//           "Prominently display testimonials and success stories.",
//           "Showcase any media mentions, awards, or certifications.",
//           "Be transparent about the organization's history and funding on the 'About Us' page."
//         ],
//         "localSEOTactics": [
//           "Create and fully optimize a Google Business Profile (GBP) for the physical address.",
//           "Encourage reviews on GBP from community members and supporters.",
//           "Build local citations by getting listed in local online directories.",
//           "Embed a Google Map on the contact page."
//         ],
//         "socialSignals": [
//           "Maintain active profiles on relevant social media platforms (e.g., Facebook, Instagram).",
//           "Regularly share updates, photos, and videos of your work to build a community and drive traffic.",
//           "Run targeted social media ads for fundraising campaigns."
//         ],
//         "aiContentOptimization": [
//           "Use AI tools for keyword research, topic ideation, and creating content outlines.",
//           "CRITICAL: Ensure all content is written or heavily edited by a human expert to reflect genuine Experience, Expertise, and Trustworthiness. Avoid publishing generic, unverified AI-generated text."
//         ],
//         "featuredSnippetTargets": [
//           "Create 'How-to' and 'What-is' blog posts.",
//           "Use Q&A formatting within content and use FAQ schema.",
//           "Provide clear, concise, list-based or table-based answers to common questions at the top of relevant pages."
//         ],
//         "voiceSearchOptimization": [
//           "Focus on long-tail, conversational keywords and questions.",
//           "Ensure the Google Business Profile information (address, phone, hours) is accurate.",
//           "Structure content to provide direct answers to questions."
//         ],
//         "competitiveAdvantages": [
//           "Develop superior topical authority with a multi-page, content-rich website.",
//           "Build stronger E-E-A-T signals through transparency, team bios, and impact reporting.",
//           "Target a much broader set of informational and long-tail keywords that the competitor cannot.",
//           "Create diverse, link-worthy content to build a stronger backlink profile."
//         ]
//       },
//       "implementationPlan": {
//         "quickWins": [
//           "Set up Google Analytics and Search Console.",
//           "Create and optimize a Google Business Profile.",
//           "Develop a 5-page starter website (Home, About, Services Hub, Donate, Contact).",
//           "Perform basic on-page SEO for these initial pages."
//         ],
//         "mediumTermGoals": [
//           "Publish 2-3 in-depth pillar pages for core services.",
//           "Write and publish 8-10 supporting blog posts targeting long-tail keywords.",
//           "Implement advanced schema markup (FAQ, Article, etc.).",
//           "Begin local citation building and outreach to 'low-hanging fruit' backlink targets."
//         ],
//         "longTermStrategy": [
//           "Continuously publish high-quality content based on a content calendar.",
//           "Launch a proactive Digital PR campaign to earn high-authority links.",
//           "Create and promote an annual impact report to build trust and earn links.",
//           "Analyze performance data quarterly to refine the strategy."
//         ],
//         "priorityMatrix": [
//           {
//             "task": "Website Architecture & Core Pages",
//             "impact": "High",
//             "effort": "High"
//           },
//           {
//             "task": "Google Business Profile Optimization",
//             "impact": "High",
//             "effort": "Low"
//           },
//           {
//             "task": "Pillar Content Creation",
//             "impact": "High",
//             "effort": "High"
//           },
//           {
//             "task": "Ongoing Blog Content",
//             "impact": "Medium",
//             "effort": "Medium"
//           },
//           {
//             "task": "High-Authority Link Building",
//             "impact": "High",
//             "effort": "High"
//           },
//           {
//             "task": "Local Citation Building",
//             "impact": "Medium",
//             "effort": "Low"
//           }
//         ],
//         "estimatedTimeline": [
//           "Months 1-2: Foundational setup, keyword research, and core site development.",
//           "Months 3-6: Aggressive content creation (pillar and cluster pages), on-page optimization, and initial outreach.",
//           "Months 7-12: Scale link-building efforts, analyze rankings, and expand content based on performance."
//         ],
//         "requiredResources": [
//           "SEO Strategist/Consultant",
//           "Web Developer",
//           "Content Writer (with subject matter expertise)",
//           "Digital PR/Outreach Specialist"
//         ]
//       }
//     },
//     "ourInsights": {
//       "analysisSummary": {
//         "competitorStrengths": "The competitor has a clear, branded domain name and a simple, likely fast-loading single-page design. The core mission is stated upfront, and images utilize alt text. The primary strength is its offline brand identity, not its online SEO execution.",
//         "competitorWeaknesses": "The website architecture is a single page, which severely limits its ability to rank for diverse keywords. It has no meta description, a non-keyword-optimized title tag, and lacks any structured data. All internal links are anchor links to the same page, preventing the flow of link equity and the development of topical authority. The content is very thin, lacks depth, and relies on generic stock photos, which diminishes E-E-A-T signals.",
//         "rankingFactors": [
//           "Branded Search Presence: Ranks primarily for its own name, 'Anjuman-e-Islah'.",
//           "Simplicity/Page Speed: The single-page design might contribute to good Core Web Vitals scores.",
//           "Clear Thematic Focus: The page is clearly about being an 'educational and welfare trust for underprivileged children'."
//         ],
//         "contentGaps": [
//           "Dedicated Program/Service Pages: No in-depth pages for 'Education Programs', 'Healthcare Support', or 'Community Development'.",
//           "Blog/News Section: Lacks articles, success stories, impact reports, or updates on their work.",
//           "Trust-Building Content: No detailed 'About Us' with team bios, financial transparency reports, or testimonials.",
//           "FAQ Section: No page addressing common questions from donors, volunteers, or beneficiaries."
//         ],
//         "overallAssessment": "The competitor's SEO profile is extremely weak and highly vulnerable. It functions as a digital brochure, ranking only for its brand name. There is a massive opportunity to outrank them on virtually all non-branded keywords by creating a content-rich, multi-page website built on fundamental SEO principles and strong E-E-A-T signals. They are not actively competing in the SEO space."
//       },
//       "targetKeywords": {
//         "primaryKeywords": [
//           "educational charity [City]",
//           "underprivileged children education",
//           "donate for child education",
//           "child education NGO [City]",
//           "welfare trust for education"
//         ],
//         "longTailKeywords": [
//           "how to sponsor a child's education in [City]",
//           "best charity to donate for education",
//           "non-profit organizations for underprivileged students",
//           "support education for poor children",
//           "local NGO for community development"
//         ],
//         "questionBasedKeywords": [
//           "Where can I donate for children's education?",
//           "How can I help unprivileged students?",
//           "What is the impact of sponsoring a child?",
//           "Which NGOs are working for education in [City]?"
//         ],
//         "semanticKeywords": [
//           "non-profit",
//           "social welfare",
//           "community support",
//           "student sponsorship",
//           "charitable trust",
//           "empowerment",
//           "philanthropy"
//         ],
//         "lowCompetitionOpportunities": [
//           "volunteer for education NGO [City]",
//           "corporate sponsorship for local schools",
//           "donate school supplies charity [City]",
//           "local healthcare support charity"
//         ],
//         "keywordDifficulty": [
//           {
//             "keyword": "educational charity [City]",
//             "difficulty": "Low"
//           },
//           {
//             "keyword": "underprivileged children education",
//             "difficulty": "Low-Medium"
//           },
//           {
//             "keyword": "donate for child education",
//             "difficulty": "Medium"
//           }
//         ]
//       },
//       "contentStrategy": {
//         "contentTypes": [
//           "In-depth Program Pages",
//           "Blog Posts with Success Stories",
//           "Annual Impact Reports (Web & PDF)",
//           "Video Testimonials",
//           "Infographics on Donation Impact",
//           "Comprehensive FAQ Page"
//         ],
//         "contentFormat": [
//           "Long-form articles (>1200 words)",
//           "Case studies",
//           "Photo galleries (using real photos)",
//           "Short-form video",
//           "How-to guides for donors/volunteers"
//         ],
//         "contentDepth": "Create dedicated pages for each program and service, going into detail about the methodology, impact, and how people can get involved. Each page should be a comprehensive resource, far exceeding the competitor's one-sentence descriptions.",
//         "uniqueAngles": [
//           "Transparency Hub: A section dedicated to financial reports and donation impact tracking.",
//           "A Day in the Life: Follow a student or teacher to showcase the real-world impact.",
//           "Expert Q&A: Feature interviews with board members or educators on key issues.",
//           "Community Spotlight: Highlight local businesses or volunteers who support the cause."
//         ],
//         "expertiseSignals": [
//           "Detailed 'About Us' page with history, mission, and photos/bios of founders and board members.",
//           "Publish official registration numbers and tax-exemption certificates.",
//           "Feature testimonials from beneficiaries, donors, and community leaders.",
//           "Author bylines on blog posts from staff members."
//         ],
//         "userIntentAlignment": [
//           {
//             "intent": "Informational",
//             "content": "Blog posts, impact reports, and detailed program pages explaining the cause and the organization's work."
//           },
//           {
//             "intent": "Transactional",
//             "content": "A clear, secure, and multi-option 'Donate' page. 'Sponsor a Child' and 'Volunteer' application forms."
//           },
//           {
//             "intent": "Navigational",
//             "content": "Clear 'Contact Us' page with map and address, 'About Us', and an easy-to-navigate site structure for users searching for the brand."
//           }
//         ],
//         "contentClusterStrategy": [
//           {
//             "pillarPage": "The Ultimate Guide to Supporting Child Education in [City]",
//             "clusterContent": [
//               "Blog: The Impact of a Single Donation on a Child's Future",
//               "Blog: How We Ensure Your Donation Reaches the Right Child",
//               "Success Story: From Underprivileged Student to University Scholar",
//               "Program Page: Our Academic Sponsorship Program"
//             ]
//           }
//         ]
//       },
//       "onPageSEOSuggestions": {
//         "titleTagOptimization": [
//           "Format: [Primary Keyword] | [Brand Name]",
//           "Example Homepage: 'Support Child Education in [City] | Your Trust Name'",
//           "Example Program Page: 'Our Healthcare Support Programs | Your Trust Name'"
//         ],
//         "metaDescriptions": [
//           "Craft unique, compelling descriptions (150-160 characters) for each page.",
//           "Include a primary keyword and a strong call-to-action (e.g., 'Learn how you can change a life today.')"
//         ],
//         "headerStructure": [
//           "Use one unique H1 per page, containing the main keyword.",
//           "Structure content logically with H2s for main sections and H3s for sub-sections.",
//           "Example H2s: 'Our Mission in Action', 'How Your Donation Helps', 'Meet Our Students'"
//         ],
//         "internalLinking": [
//           "Develop a multi-page site structure to allow for contextual internal linking.",
//           "Link from blog posts to relevant program and donation pages.",
//           "Link program pages to related success stories."
//         ],
//         "schemaMarkup": [
//           "Implement `Organization` or `NGO` schema on the homepage.",
//           "Use `Article` schema for blog posts.",
//           "Use `FAQPage` schema on the FAQ page.",
//           "Use `Event` schema for fundraising events."
//         ],
//         "urlStructure": [
//           "Use clean, descriptive, keyword-rich URLs.",
//           "Example: `yourdomain.com/our-programs/education-sponsorship`"
//         ],
//         "imageOptimization": [
//           "Use authentic photos of your work, not stock images.",
//           "Use descriptive alt text for all images (e.g., 'A sponsored student receiving new textbooks from our trust').",
//           "Compress images to ensure fast page load times.",
//           "Use keyword-rich file names (e.g., 'child-education-ngo-city.jpg')."
//         ],
//         "contentStructure": [
//           "Break up text with short paragraphs, bullet points, and numbered lists.",
//           "Use bold and italics to emphasize key points.",
//           "Embed relevant images and videos to increase engagement.",
//           "Include clear Call-to-Action buttons throughout the content."
//         ]
//       },
//       "backlinkStrategy": {
//         "highAuthorityTargets": [
//           "Local news media websites (for PR outreach).",
//           "Reputable charity and non-profit directories (e.g., GuideStar, CharityNavigator).",
//           "Local university websites (e.g., social work or education departments).",
//           "Blogs focused on education, parenting, and social good."
//         ],
//         "linkBuildingTactics": [
//           "Digital PR: Pitch success stories and impact data to local journalists.",
//           "Guest Posting: Write articles for relevant blogs on topics like 'The Importance of Community Support for Education'.",
//           "Resource Link Building: Create a valuable resource page (e.g., 'Free Educational Resources for Low-Income Families') and promote it.",
//           "Local Sponsorships: Sponsor local school or community events to get brand mentions and links."
//         ],
//         "contentForLinkEarning": [
//           "An annual 'State of Education for Underprivileged Children in [Region]' report with original data.",
//           "A compelling infographic visualizing the 'journey of a donation'.",
//           "A free scholarship or grant program that educational institutions will link to."
//         ],
//         "digitalPROpportunities": [
//           "Partner with local businesses for a co-branded fundraising campaign.",
//           "Issue press releases for major milestones (e.g., '1000th Student Sponsored').",
//           "Host a community event and invite local media to cover it."
//         ],
//         "competitorBacklinkGaps": "The competitor likely has a very weak backlink profile, possibly limited to a few local directory listings. A proactive strategy focused on acquiring even a handful of high-quality, relevant links will create a significant competitive advantage."
//       },
//       "technicalSEO": {
//         "coreWebVitals": [
//           "Choose a modern, lightweight CMS and theme.",
//           "Optimize images and leverage lazy loading.",
//           "Minimize render-blocking JavaScript and CSS.",
//           "Aim for LCP below 2.5s, INP below 200ms, and CLS below 0.1."
//         ],
//         "mobileOptimization": [
//           "Implement a responsive design that provides an excellent user experience on all screen sizes.",
//           "Ensure tap targets are large enough and content is readable without zooming."
//         ],
//         "siteSpeed": [
//           "Utilize a content delivery network (CDN).",
//           "Enable browser caching and Gzip compression.",
//           "Select a reliable, fast hosting provider."
//         ],
//         "crawlability": [
//           "Create and submit an XML sitemap to Google Search Console.",
//           "Use a logical `robots.txt` file that doesn't block important resources.",
//           "Ensure a clean, flat site architecture."
//         ],
//         "indexingOptimization": [
//           "Regularly check Google Search Console for crawl errors or indexing issues.",
//           "Use canonical tags correctly to avoid duplicate content.",
//           "Ensure all key pages are set to 'index, follow'."
//         ],
//         "structuredData": [
//           "Implement comprehensive schema markup (NGO, Article, FAQ, Event) to enhance SERP visibility and provide context to search engines."
//         ],
//         "securityEnhancements": [
//           "Implement HTTPS across the entire site with a valid SSL certificate.",
//           "Keep all platform software and plugins updated."
//         ]
//       },
//       "additionalOpportunities": {
//         "eatSignals": [
//           "Experience: Use real photos and videos of your work. Feature first-hand stories from beneficiaries.",
//           "Expertise: Showcase the qualifications of your leadership team and program managers.",
//           "Authoritativeness: Actively seek media mentions, awards, and partnerships with established institutions.",
//           "Trustworthiness: Be transparent. Clearly display contact information, address, registration details, and financial reports. Have a clear privacy policy."
//         ],
//         "localSEOTactics": [
//           "Create and fully optimize a Google Business Profile for your physical address.",
//           "Encourage reviews from volunteers and donors.",
//           "Get listed in local directories and community websites.",
//           "Mention specific neighborhoods or areas you serve in your content."
//         ],
//         "socialSignals": [
//           "Maintain active, engaging profiles on platforms like Facebook and Instagram.",
//           "Share impact stories, event updates, and volunteer spotlights, and drive traffic back to the website."
//         ],
//         "aiContentOptimization": [
//           "Use AI for brainstorming blog topics and creating initial content outlines.",
//           "CRITICAL: All content must be heavily edited and infused with human experience, real stories, and authentic photos to build trust. Avoid publishing generic, unedited AI content."
//         ],
//         "featuredSnippetTargets": [
//           "Create dedicated content blocks that directly answer common questions (e.g., 'How can I sponsor a child?').",
//           "Use question-based H2/H3 headings followed by a concise paragraph, bulleted list, or numbered list."
//         ],
//         "voiceSearchOptimization": [
//           "Optimize FAQ pages with full-sentence questions and conversational answers.",
//           "Focus on long-tail, question-based keywords."
//         ],
//         "competitiveAdvantages": [
//           "Superior Content Depth & Quality: Move beyond a single page to become a true resource.",
//           "Strong E-E-A-T: Build trust through transparency and authenticity, which the competitor lacks.",
//           "Proactive Off-Page SEO: A targeted backlink and digital PR strategy will build authority the competitor does not have.",
//           "Technical Excellence: A modern, mobile-first, and technically sound website will outperform the competitor's basic site."
//         ]
//       },
//       "implementationPlan": {
//         "quickWins": [
//           {
//             "task": "Set up Google Analytics and Google Search Console.",
//             "priority": "High",
//             "impact": "High"
//           },
//           {
//             "task": "Create and optimize a Google Business Profile.",
//             "priority": "High",
//             "impact": "High"
//           },
//           {
//             "task": "Plan the new multi-page website architecture and content strategy.",
//             "priority": "High",
//             "impact": "High"
//           }
//         ],
//         "mediumTermGoals": [
//           {
//             "task": "Build and launch the new multi-page, mobile-responsive website.",
//             "priority": "High",
//             "impact": "High"
//           },
//           {
//             "task": "Write and publish the first 5-10 pieces of core content (program pages, about us, success stories).",
//             "priority": "High",
//             "impact": "High"
//           },
//           {
//             "task": "Begin local citation building and directory submissions.",
//             "priority": "Medium",
//             "impact": "Medium"
//           }
//         ],
//         "longTermStrategy": [
//           {
//             "task": "Consistently publish 2-4 new blog posts/success stories per month.",
//             "priority": "Medium",
//             "impact": "High"
//           },
//           {
//             "task": "Implement an ongoing digital PR and link-building campaign.",
//             "priority": "High",
//             "impact": "High"
//           },
//           {
//             "task": "Publish an annual impact report and promote it heavily.",
//             "priority": "Medium",
//             "impact": "High"
//           }
//         ],
//         "priorityMatrix": [
//           {
//             "quadrant": "High Impact / Low Effort",
//             "actions": [
//               "Google Business Profile setup",
//               "On-page SEO for existing (new) pages",
//               "GSC/GA setup"
//             ]
//           },
//           {
//             "quadrant": "High Impact / High Effort",
//             "actions": [
//               "New website development",
//               "Consistent content creation",
//               "Link building/Digital PR"
//             ]
//           }
//         ],
//         "estimatedTimeline": [
//           {
//             "phase": "Phase 1: Foundation & Planning (Months 1-2)",
//             "activities": [
//               "Strategy, keyword research, site architecture, initial content writing."
//             ]
//           },
//           {
//             "phase": "Phase 2: Build & Launch (Months 3-4)",
//             "activities": [
//               "Website development, publishing core content, technical SEO implementation."
//             ]
//           },
//           {
//             "phase": "Phase 3: Growth & Authority (Months 5+)",
//             "activities": [
//               "Ongoing content creation, link building, social media promotion, performance analysis."
//             ]
//           }
//         ],
//         "requiredResources": [
//           "SEO Strategist",
//           "Web Developer",
//           "Content Writer/Manager",
//           "Digital PR/Outreach Specialist (optional but recommended)"
//         ]
//       }
//     }
//   }
// }





// const data = {
//   "remainingTokens": 3500,
//   "analysisType": "comparison",
//   "tokensCost": 4000,
//   "analyzedUrls": {
//     "competitor": "https://www.anjumaneislahtrust.com/",
//     "our": "https://www.jamiakhadijatulkubratrust.com/"
//   },
//   "comparison": {
//     "competitorInsights": {
//       "analysisSummary": {
//         "competitorStrengths": "The competitor has a clear, emotionally resonant mission statement ('Empowering Dreams Through Education') and a simple, single-page design that is easy for a user to scan quickly. Their primary strength is likely offline brand recognition within a specific community, driving direct and branded traffic.",
//         "competitorWeaknesses": "The website is extremely weak from an SEO perspective. It is a single-page site, which severely limits its ability to rank for a variety of keywords. It lacks fundamental on-page SEO elements like a meta description, keyword-optimized titles and headings, and structured data. There is no blog or resource center, creating a massive content void.",
//         "rankingFactors": [
//           "Branded Search Volume: Likely ranks for its own name, 'Anjuman-e-Islah'.",
//           "Domain Name: The domain name matches the brand, which helps with brand recall and search.",
//           "Simplicity: The user experience is straightforward for the single goal of introducing the organization, though it fails to address diverse user intents."
//         ],
//         "contentGaps": [
//           "Dedicated Program Pages: No in-depth pages explaining their Education, Healthcare, or Community programs.",
//           "Blog/Resource Center: Complete absence of articles, guides, or news to attract informational search traffic.",
//           "Impact/Transparency Reports: No annual reports, financial disclosures, or detailed impact studies to build trust and attract links.",
//           "Success Stories/Testimonials: While 'Impact Stories' is a section, it lacks depth. Individual, detailed case study pages are missing.",
//           "Volunteer/Donor Information: No dedicated content hubs for potential volunteers or detailed guides for corporate donors."
//         ],
//         "overallAssessment": "The competitor's website is a digital brochure, not an SEO asset. It is highly vulnerable and can be easily outranked for any non-branded keyword with a moderately sophisticated content and technical SEO strategy. The barrier to entry for outranking them is very low."
//       },
//       "targetKeywords": {
//         "primaryKeywords": [
//           "educational trust for underprivileged",
//           "charity for children's education",
//           "sponsor a child's education",
//           "donate for education",
//           "non-profit for poor children"
//         ],
//         "longTailKeywords": [
//           "how to help fund a child's education in India",
//           "best educational welfare trust for donations",
//           "support programs for underprivileged students",
//           "ways to contribute to community education",
//           "get tax deduction for education donation"
//         ],
//         "questionBasedKeywords": [
//           "How can I sponsor a child's education?",
//           "What is the impact of donating to educational charities?",
//           "Where does my donation for education go?",
//           "How do educational trusts help communities?",
//           "Which charity is best for child education?"
//         ],
//         "semanticKeywords": [
//           "child welfare",
//           "poverty alleviation",
//           "community development",
//           "social impact",
//           "skill development",
//           "educational sponsorship",
//           "non-governmental organization (NGO)"
//         ],
//         "lowCompetitionOpportunities": [
//           "educational trust in [specific city/region]",
//           "support for girls' education in [specific city]",
//           "funding for school supplies for poor students",
//           "volunteer opportunities education NGO [city]"
//         ],
//         "keywordDifficulty": [
//           {
//             "keywordGroup": "Primary Keywords",
//             "estimatedDifficulty": "Medium"
//           },
//           {
//             "keywordGroup": "Long-Tail & Question-Based",
//             "estimatedDifficulty": "Low to Medium"
//           },
//           {
//             "keywordGroup": "Low Competition (Local)",
//             "estimatedDifficulty": "Low"
//           }
//         ]
//       },
//       "contentStrategy": {
//         "contentTypes": [
//           "In-depth 'Pillar' Pages for core topics (e.g., 'Child Sponsorship Programs')",
//           "Supporting Blog Posts for long-tail keywords",
//           "Detailed Case Studies/Success Stories (text and video)",
//           "Annual Impact Reports (interactive web page and downloadable PDF)",
//           "FAQ pages for donors and volunteers",
//           "Infographics showing donation impact"
//         ],
//         "contentFormat": [
//           "Long-form articles (1500+ words)",
//           "Video testimonials from beneficiaries and staff",
//           "Photo galleries with optimized images and captions",
//           "Interactive data visualizations for impact reports",
//           "Downloadable guides for corporate partners"
//         ],
//         "contentDepth": "Move from a single-page overview to a multi-page, in-depth architecture. Each program (Education, Healthcare) must have its own dedicated parent page with child pages detailing specific initiatives. Content should be comprehensive, answering all potential user questions on a topic, establishing topical authority.",
//         "uniqueAngles": [
//           "'A Day in the Life' stories of sponsored children.",
//           "'From Classroom to Career': Follow-up stories on past beneficiaries.",
//           "'The Ripple Effect': Content showing how educating one child impacts their family and community.",
//           "Transparent 'Donation Tracker' showing exactly how funds are used."
//         ],
//         "expertiseSignals": [
//           "Detailed author bios for blog posts, featuring staff and experts.",
//           "Showcase credentials, awards, and certifications of the organization.",
//           "Publish original research or data from your programs.",
//           "Feature testimonials from community leaders, teachers, and corporate partners."
//         ],
//         "userIntentAlignment": [
//           {
//             "intent": "Informational",
//             "content": "Blog posts answering 'how-to' and 'what-is' questions about poverty, education, and development."
//           },
//           {
//             "intent": "Transactional",
//             "content": "Clear, multi-option donation pages (one-time, monthly, sponsor-a-child) with secure payment gateways."
//           },
//           {
//             "intent": "Commercial Investigation",
//             "content": "Comparison pages (e.g., 'How We Compare to Other Charities'), detailed program pages, and transparent impact reports."
//           }
//         ],
//         "contentClusterStrategy": [
//           {
//             "pillarPage": "The Ultimate Guide to Sponsoring a Child's Education",
//             "clusterContent": [
//               "How Much Does It Cost to Sponsor a Child?",
//               "What Do Sponsored Children Receive?",
//               "Writing Letters to Your Sponsored Child",
//               "The Long-Term Impact of Child Sponsorship"
//             ]
//           }
//         ]
//       },
//       "onPageSEOSuggestions": {
//         "titleTagOptimization": [
//           "Home: 'Educate Underprivileged Children | [Your Trust Name] | Donate Today'",
//           "Program Page: 'Child Education Programs That Make a Difference | [Your Trust Name]'",
//           "Blog Post: '10 Ways to Support Student Learning | [Your Trust Name] Blog'"
//         ],
//         "metaDescriptions": [
//           "Create unique, compelling meta descriptions (155-160 characters) for each page.",
//           "Include a primary keyword and a strong call-to-action (e.g., 'Learn more', 'Donate now', 'Get involved')."
//         ],
//         "headerStructure": [
//           "Use one unique H1 tag per page that targets the main keyword.",
//           "Break down content logically with keyword-rich H2s and H3s.",
//           "Example Structure: H1: Our Education Support Program -> H2: Primary School Sponsorship -> H2: High School Scholarships -> H2: Academic Resources Provided."
//         ],
//         "internalLinking": [
//           "Link from blog posts to relevant program pages and donation pages.",
//           "Create contextual anchor text (e.g., 'learn more about our education support programs' instead of 'click here').",
//           "Link pillar pages to their cluster content and vice-versa to build topical authority."
//         ],
//         "schemaMarkup": [
//           "Implement `NGO` or `Organization` schema on the homepage.",
//           "Use `Article` schema for all blog posts and news.",
//           "Use `FAQPage` schema on pages with question-and-answer sections.",
//           "Use `Person` schema on 'About Us' page for board members and key staff."
//         ],
//         "urlStructure": [
//           "Create clean, simple, keyword-rich URLs.",
//           "Example: `yourdomain.com/our-work/education-programs` instead of `yourdomain.com/page-id-2`."
//         ],
//         "imageOptimization": [
//           "Compress all images to ensure fast page load times.",
//           "Use descriptive, keyword-relevant file names (e.g., `student-receives-school-supplies.jpg`).",
//           "Write descriptive ALT text for all images for accessibility and SEO."
//         ],
//         "contentStructure": [
//           "Use short paragraphs, bulleted lists, and blockquotes to improve readability.",
//           "Incorporate a Table of Contents with jump links for long-form content.",
//           "Embed relevant videos and images to increase engagement."
//         ]
//       },
//       "backlinkStrategy": {
//         "highAuthorityTargets": [
//           "Local news websites (for features on your work)",
//           "Reputable non-profit directories (GuideStar, Charity Navigator)",
//           "Educational institution websites (.edu links from university resource pages)",
//           "Blogs in the philanthropy, education, and social impact niches",
//           "Corporate partner websites (via their CSR pages)"
//         ],
//         "linkBuildingTactics": [
//           "Digital PR: Pitch unique stories and data from your impact reports to journalists.",
//           "Guest Posting: Write articles for relevant blogs on topics you are an expert in.",
//           "Resource Page Link Building: Create definitive guides and ask other sites to link to them.",
//           "Unlinked Brand Mentions: Find where your organization is mentioned online and request a link."
//         ],
//         "contentForLinkEarning": [
//           "A comprehensive annual impact report with original data and infographics.",
//           "An interactive map showcasing project locations and success stories.",
//           "A free, high-value resource, like a 'Guide to Corporate Social Responsibility for Small Businesses'.",
//           "A scholarship program page that educational institutions can link to."
//         ],
//         "digitalPROpportunities": [
//           "Launch seasonal campaigns (e.g., 'Back-to-School Drive') and create a media kit.",
//           "Partner with local businesses or influencers for fundraising events.",
//           "Release statements or data related to current events in education or social welfare."
//         ],
//         "competitorBacklinkGaps": "The competitor likely has a very weak backlink profile, possibly limited to a few local directories. The entire landscape is a gap. We can analyze the backlink profiles of larger, national-level education charities for proven link-building strategies and targets."
//       },
//       "technicalSEO": {
//         "coreWebVitals": [
//           "Optimize images (compress, use next-gen formats like WebP).",
//           "Minimize render-blocking resources (CSS, JS).",
//           "Ensure a stable layout to avoid Cumulative Layout Shift (CLS)."
//         ],
//         "mobileOptimization": [
//           "Implement a responsive design that works flawlessly on all devices.",
//           "Ensure text is readable and tap targets are appropriately sized for mobile users.",
//           "Prioritize mobile page speed."
//         ],
//         "siteSpeed": [
//           "Use a content delivery network (CDN) to serve assets quickly.",
//           "Enable browser caching and Gzip compression.",
//           "Choose a high-quality, reliable web host."
//         ],
//         "crawlability": [
//           "Create and submit an XML sitemap to Google Search Console.",
//           "Ensure a logical site structure that is easy for search engine bots to follow.",
//           "Check for and fix any crawl errors reported in Google Search Console."
//         ],
//         "indexingOptimization": [
//           "Use canonical tags to prevent duplicate content issues.",
//           "Ensure no important pages are blocked by `robots.txt` or have a `noindex` tag.",
//           "Use a clear internal linking structure to help Google find all your important pages."
//         ],
//         "structuredData": [
//           "Re-emphasize implementation of `NGO`, `Article`, `FAQPage`, and `Person` schema to gain rich snippets and enhance search visibility."
//         ],
//         "securityEnhancements": [
//           "Implement HTTPS across the entire site by installing an SSL certificate to protect user data and build trust."
//         ]
//       },
//       "additionalOpportunities": {
//         "eatSignals": [
//           "Create a comprehensive 'About Us' page with the organization's history, mission, and photos/bios of the leadership team.",
//           "Prominently display charity registration numbers, physical address, and phone number.",
//           "Create an 'In the Media' or 'Press' page to showcase mentions and awards.",
//           "Get testimonials from beneficiaries, donors, and partners."
//         ],
//         "localSEOTactics": [
//           "Create and fully optimize a Google Business Profile for your physical location.",
//           "Generate positive reviews from volunteers and local donors.",
//           "Build citations in local online directories.",
//           "Create location-specific pages or content if you serve multiple areas."
//         ],
//         "socialSignals": [
//           "Maintain active, engaging profiles on platforms like Facebook, Instagram, and LinkedIn.",
//           "Share success stories, event updates, and links to your new content to drive traffic and social proof."
//         ],
//         "aiContentOptimization": [
//           "Use AI tools for keyword research, topic ideation, and creating initial content outlines.",
//           "CRITICAL: Ensure all AI-generated drafts are heavily edited and enhanced by a human subject matter expert to add unique insights, personal stories, and factual accuracy to align with E-E-A-T principles."
//         ],
//         "featuredSnippetTargets": [
//           "Structure content to directly answer common questions.",
//           "Use Q&A formats, bulleted lists, and tables which are often pulled for featured snippets.",
//           "Target keywords like 'How to...', 'What is...', 'Why...'"
//         ],
//         "voiceSearchOptimization": [
//           "Focus on creating content that answers conversational, long-tail questions.",
//           "Utilize FAQ pages and ensure answers are concise and direct."
//         ],
//         "competitiveAdvantages": [
//           "Become the go-to informational resource, not just a donation portal.",
//           "Leverage superior content depth and quality to build topical authority.",
//           "Build trust through radical transparency (detailed reports, financials).",
//           "Utilize technical SEO and schema to dominate search features the competitor is ignoring."
//         ]
//       },
//       "implementationPlan": {
//         "quickWins": [
//           {
//             "task": "Build foundational 5-page website (Home, About, Programs, Donate, Contact).",
//             "timeline": "Month 1",
//             "impact": "High"
//           },
//           {
//             "task": "Implement basic on-page SEO (titles, metas) for all core pages.",
//             "timeline": "Month 1",
//             "impact": "High"
//           },
//           {
//             "task": "Set up and optimize Google Business Profile and Google Search Console.",
//             "timeline": "Month 1",
//             "impact": "Medium"
//           }
//         ],
//         "mediumTermGoals": [
//           {
//             "task": "Develop and publish 3 pillar pages and 9 supporting blog posts.",
//             "timeline": "Months 2-6",
//             "impact": "High"
//           },
//           {
//             "task": "Implement comprehensive schema markup (NGO, Article, FAQ).",
//             "timeline": "Month 3",
//             "impact": "Medium"
//           },
//           {
//             "task": "Begin digital PR outreach, aiming for 5-10 quality backlinks.",
//             "timeline": "Months 4-6",
//             "impact": "High"
//           }
//         ],
//         "longTermStrategy": [
//           {
//             "task": "Publish 2-4 new content pieces (blogs, case studies) per month.",
//             "timeline": "Ongoing from Month 7",
//             "impact": "High"
//           },
//           {
//             "task": "Create and promote an annual interactive impact report.",
//             "timeline": "Annually",
//             "impact": "High"
//           },
//           {
//             "task": "Continuously build backlinks and partnerships.",
//             "timeline": "Ongoing",
//             "impact": "High"
//           }
//         ],
//         "priorityMatrix": [
//           {
//             "priority": "P1 (Urgent)",
//             "tasks": "Website build, Core page on-page SEO, Technical SEO setup (Sitemap, HTTPS)."
//           },
//           {
//             "priority": "P2 (High)",
//             "tasks": "Pillar content creation, Schema implementation, Google Business Profile."
//           },
//           {
//             "priority": "P3 (Medium)",
//             "tasks": "Ongoing blogging, Backlink outreach, Social media content sharing."
//           }
//         ],
//         "estimatedTimeline": [
//           "Months 1-3: Foundational setup and initial content development.",
//           "Months 4-6: Expect to see initial rankings for long-tail keywords and an increase in organic traffic.",
//           "Months 7-12: Aim for page 1 rankings for primary keywords and significant growth in non-branded organic traffic and conversions (donations/inquiries)."
//         ],
//         "requiredResources": [
//           "Web Developer (for initial build and technical fixes)",
//           "SEO Strategist / Manager",
//           "Content Writer with experience in the non-profit sector",
//           "Digital PR / Outreach Specialist",
//           "Analytics tools (Google Analytics, Google Search Console, Ahrefs/SEMrush)"
//         ]
//       }
//     },
//     "ourInsights": {
//       "analysisSummary": {
//         "competitorStrengths": "The competitor has a clear brand identity and a simple, focused call-to-action for donations. Their strongest SEO asset is the use of 'EducationalOrganization' schema.org structured data, which helps Google understand their entity and likely boosts their visibility in local and branded searches.",
//         "competitorWeaknesses": "The website's architecture is its most critical weakness; it is a single-page site using hash links for navigation. This severely limits content depth, prevents ranking for a diverse range of keywords, and offers no internal linking value. They also use generic stock photos, which harms E-E-A-T signals.",
//         "rankingFactors": [
//           "Branded search authority ('Jamia Khadijatul Kubra')",
//           "Implementation of 'EducationalOrganization' schema with local address details",
//           "Clear, albeit shallow, content defining their purpose (education, welfare)",
//           "Simple, mobile-friendly single-page design (though poor for SEO)"
//         ],
//         "contentGaps": [
//           "No dedicated pages for specific programs (e.g., Quran memorization, Hadith studies, secular subjects).",
//           "Absence of a blog or resource center to capture informational queries.",
//           "No detailed 'About Us' page with history, mission, and trustee/teacher bios.",
//           "Lack of student testimonials, success stories, or detailed impact reports.",
//           "No FAQ section to address common donor or parent questions."
//         ],
//         "overallAssessment": "The competitor's website is fundamentally weak from an SEO perspective due to its single-page structure. It likely ranks only for its brand name and a few highly specific local queries. There is a massive opportunity to outrank them across the board by building a proper multi-page website with in-depth content and a strategic internal linking structure."
//       },
//       "targetKeywords": {
//         "primaryKeywords": [
//           "islamic school for girls",
//           "madrasa in haryana",
//           "islamic educational trust",
//           "donate for muslim education",
//           "girls madrasa in mewat"
//         ],
//         "longTailKeywords": [
//           "support education for underprivileged muslim girls",
//           "how to donate zakat for madrasa students",
//           "quran memorization course for girls in india",
//           "islamic boarding school near nuh haryana",
//           "best alimah course for girls"
//         ],
//         "questionBasedKeywords": [
//           "How can I support an Islamic school?",
//           "What is taught in a girls' madrasa?",
//           "Where can I donate for building a madrasa?",
//           "Is my donation to a welfare trust tax-deductible?",
//           "What are the benefits of Islamic education?"
//         ],
//         "semanticKeywords": [
//           "Quranic studies",
//           "Hifz program",
//           "Alimiyyah course",
//           "Islamic charity",
//           "Zakat eligibility",
//           "Sadaqah Jariyah",
//           "community welfare",
//           "spiritual guidance"
//         ],
//         "lowCompetitionOpportunities": [
//           "islamic school punhana",
//           "donate to madrasa in nuh mewat",
//           "welfare trust shamshabad khurd",
//           "healthcare programs for muslim community haryana"
//         ],
//         "keywordDifficulty": [
//           {
//             "keywordGroup": "Branded/Local",
//             "difficulty": "Low",
//             "rationale": "Competitor's strength is localized. A better local presence will be effective."
//           },
//           {
//             "keywordGroup": "Informational/Long-Tail",
//             "difficulty": "Low-Medium",
//             "rationale": "Competitor has zero content for these. A content-rich site can easily capture this traffic."
//           },
//           {
//             "keywordGroup": "Transactional/Broad",
//             "difficulty": "Medium",
//             "rationale": "More competition from larger national/international charities."
//           }
//         ]
//       },
//       "contentStrategy": {
//         "contentTypes": [
//           "In-depth Program Pages (Hifz, Alimiyyah, etc.)",
//           "Blog Articles answering user questions",
//           "Video Testimonials from students and parents",
//           "Impact Reports (PDFs and web pages)",
//           "Faculty & Trustee Biography Pages",
//           "Donation Campaign Landing Pages",
//           "Photo & Video Galleries (using real media)"
//         ],
//         "contentFormat": [
//           "Long-form articles (1500+ words) for core pages and blog posts",
//           "High-quality, original photography and videography",
//           "Infographics to visualize donation impact",
//           "Structured FAQ sections on relevant pages",
//           "A multi-page website architecture instead of a single-page site"
//         ],
//         "contentDepth": "Each core program (e.g., Hifz) should have its own dedicated page detailing the curriculum, daily schedule, learning outcomes, and faculty expertise. Blog posts should comprehensively answer a single user query, going beyond what competitors offer.",
//         "uniqueAngles": [
//           "Focus on the 'Impact of a Donation' with specific examples (e.g., 'How ₹1500 Provides a Student's Meals for a Month').",
//           "Spotlight student success stories: 'From Our Classroom to [University/Career]'.",
//           "Highlight the blend of 'Traditional Islamic Values with Modern Educational Needs'.",
//           "Create content around the experience of being a student, not just the curriculum."
//         ],
//         "expertiseSignals": [
//           "Create a 'Faculty' page with detailed biographies, qualifications, and photos of all teachers and scholars.",
//           "Publish articles or commentaries on a blog authored by your institution's scholars.",
//           "Showcase any accreditations, affiliations, or awards received by the institution.",
//           "Feature testimonials from recognized community leaders or scholars."
//         ],
//         "userIntentAlignment": [
//           {
//             "intent": "Informational",
//             "content": "Create blog posts and FAQ pages answering questions like 'What is an Alimiyyah course?'"
//           },
//           {
//             "intent": "Commercial Investigation",
//             "content": "Develop detailed program pages comparing your offerings and showcasing your unique value."
//           },
//           {
//             "intent": "Transactional",
//             "content": "Build clear, trustworthy, and easy-to-use donation pages with multiple payment options."
//           },
//           {
//             "intent": "Navigational",
//             "content": "Ensure brand name is prominent and create clear contact/location pages for users searching for you."
//           }
//         ],
//         "contentClusterStrategy": [
//           {
//             "pillarPage": "A Guide to Islamic Education for Girls",
//             "clusterContent": [
//               "What is a Hifz Program?",
//               "Our Alimiyyah Course Curriculum",
//               "The Importance of Hadith Studies",
//               "A Day in the Life of Our Student",
//               "Balancing Deen and Duniya: Our Approach"
//             ]
//           }
//         ]
//       },
//       "onPageSEOSuggestions": {
//         "titleTagOptimization": [
//           "Create unique titles for every page.",
//           "Format: Primary Keyword | Secondary Keyword | Brand Name",
//           "Example: 'Hifz Program for Girls in Haryana | Quran Memorization | Our Brand'"
//         ],
//         "metaDescriptions": [
//           "Write unique, compelling meta descriptions (150-160 characters) for each page.",
//           "Include the primary keyword and a clear call-to-action (e.g., 'Learn More' or 'Donate Now')."
//         ],
//         "headerStructure": [
//           "Use one unique H1 tag per page that targets the main keyword.",
//           "Use H2s and H3s to structure content logically, targeting secondary and long-tail keywords.",
//           "Example H1 for Hifz Page: 'Complete Hifz-ul-Quran Program for Girls'"
//         ],
//         "internalLinking": [
//           "Develop a logical site architecture with a clear navigation menu.",
//           "Link from the homepage to all primary program and 'About' pages.",
//           "Contextually link from blog posts to relevant program or donation pages.",
//           "Add a 'Related Programs' section on service pages."
//         ],
//         "schemaMarkup": [
//           "Expand on `EducationalOrganization` schema with more details (e.g., `alumni`, `founder`).",
//           "Use `FAQPage` schema for all FAQ sections.",
//           "Use `Article` schema for blog posts.",
//           "Use `VideoObject` schema for embedded video testimonials."
//         ],
//         "urlStructure": [
//           "Use short, descriptive, keyword-rich URLs.",
//           "Example: `ourdomain.com/programs/hifz-for-girls`",
//           "Avoid dates or generic terms in URLs."
//         ],
//         "imageOptimization": [
//           "Replace all stock photos with high-quality, original images.",
//           "Use descriptive alt text for all images (e.g., 'Students reciting the Quran in our classroom in Mewat').",
//           "Compress images and use modern formats like WebP to improve page speed."
//         ],
//         "contentStructure": [
//           "Use short paragraphs, bullet points, and numbered lists for readability.",
//           "Incorporate blockquotes for testimonials or key statements.",
//           "Use clear headings and subheadings to break up text."
//         ]
//       },
//       "backlinkStrategy": {
//         "highAuthorityTargets": [
//           "Local news outlets in Haryana (e.g., The Tribune, Dainik Bhaskar).",
//           "National and international Islamic news portals.",
//           "Reputable non-profit and charity directories (e.g., GuideStar India).",
//           "Educational institution listing websites."
//         ],
//         "linkBuildingTactics": [
//           "Digital PR: Pitch student success stories or community impact news to journalists.",
//           "Guest Posting: Write articles for respected Islamic or educational blogs.",
//           "Local SEO Citations: Build consistent listings in local directories.",
//           "Resource Link Building: Create a valuable resource (e.g., a guide to Zakat) and promote it."
//         ],
//         "contentForLinkEarning": [
//           "An annual 'Impact Report' infographic showing how donations were used.",
//           "A comprehensive guide: 'A Parent's Guide to Choosing a Madrasa'.",
//           "Original research or a survey on the state of girls' education in the local area.",
//           "A free, high-quality Islamic calendar resource for download."
//         ],
//         "digitalPROpportunities": [
//           "Announce construction milestones or the launch of a new facility.",
//           "Celebrate graduation ceremonies with a press release.",
//           "Launch a new community-focused program (e.g., food drive, health clinic) and invite local media.",
//           "Partner with other local organizations for a joint charity event."
//         ],
//         "competitorBacklinkGaps": "The competitor likely has a very sparse backlink profile consisting of low-quality directory links. There is a huge opportunity to build high-quality, relevant links to our in-depth content pages, something the competitor cannot do with their single-page site."
//       },
//       "technicalSEO": {
//         "coreWebVitals": [
//           "Optimize images to improve Largest Contentful Paint (LCP).",
//           "Minimize render-blocking JavaScript and CSS to improve First Input Delay (FID/INP).",
//           "Ensure web fonts load efficiently and reserve space for images to prevent Cumulative Layout Shift (CLS)."
//         ],
//         "mobileOptimization": [
//           "Implement a responsive, mobile-first design.",
//           "Ensure tap targets are large enough and navigation is easy on touch screens.",
//           "Test the website on various mobile devices before launch."
//         ],
//         "siteSpeed": [
//           "Utilize browser caching and a Content Delivery Network (CDN).",
//           "Enable Gzip compression on the server.",
//           "Minify HTML, CSS, and JavaScript files."
//         ],
//         "crawlability": [
//           "Create and submit an XML sitemap to Google Search Console.",
//           "Implement a logical internal linking structure so crawlers can discover all pages.",
//           "Ensure the `robots.txt` file is not blocking important resources."
//         ],
//         "indexingOptimization": [
//           "Ensure all key pages are set to 'index, follow'.",
//           "Use canonical tags correctly to avoid duplicate content issues.",
//           "Monitor indexing status in Google Search Console."
//         ],
//         "structuredData": [
//           "Implement a comprehensive schema strategy beyond what the competitor has, as detailed in the On-Page section.",
//           "Validate all structured data using Google's Rich Results Test tool."
//         ],
//         "securityEnhancements": [
//           "Ensure the entire site uses HTTPS by installing an SSL certificate.",
//           "Keep all software (CMS, plugins) up to date.",
//           "Use secure and trusted payment gateways for donations."
//         ]
//       },
//       "additionalOpportunities": {
//         "eatSignals": [
//           "Create a comprehensive 'About Us' page with the institution's full history and mission.",
//           "Develop a 'Meet the Faculty' page with detailed bios, credentials, and photos.",
//           "Display the full physical address and phone number prominently in the website footer.",
//           "Showcase media mentions, awards, and accreditations in a dedicated 'Trust Signals' section."
//         ],
//         "localSEOTactics": [
//           "Create and fully optimize a Google Business Profile for the institution.",
//           "Actively solicit reviews from parents, donors, and community members.",
//           "Ensure Name, Address, Phone (NAP) consistency across all online directories.",
//           "Create location-specific content (e.g., 'Community Programs in Nuh, Mewat')."
//         ],
//         "socialSignals": [
//           "Maintain active profiles on platforms like Facebook and Instagram to share updates, photos, and student life.",
//           "Use social media to promote new blog content and donation campaigns.",
//           "Engage with the community by responding to comments and messages."
//         ],

//         "aiContentOptimization": "Use AI tools for keyword research, topic ideation, and generating content outlines. However, all final content must be written, edited, and fact-checked by human subject-matter experts (your scholars) to ensure accuracy and maintain high E-E-A-T, which is critical for this niche.",


//         "featuredSnippetTargets": [
//           "Structure content with clear, question-based H2/H3 headings.",
//           "Provide concise, direct answers immediately following the heading.",
//           "Use bulleted and numbered lists to summarize processes or benefits.",
//           "Create a dedicated FAQ page targeting common questions."
//         ],

//         "voiceSearchOptimization": "Focus on creating conversational, question-based content. The FAQ page and blog posts targeting 'who, what, where, why, how' queries will be crucial for capturing voice search traffic.",


//         "competitiveAdvantages": [
//           "Superior site architecture and content depth will be our primary advantage.",
//           "Showcasing genuine E-E-A-T with real photos, faculty bios, and student stories will build more trust than the competitor's generic site.",
//           "A strategic content marketing and link-building plan will attract a much wider audience beyond local/branded search."
//         ]
//       },
//       "implementationPlan": {
//         "quickWins": [
//           "Set up Google Analytics and Google Search Console.",
//           "Create and fully optimize a Google Business Profile.",
//           "Perform detailed keyword research and map keywords to a new site architecture plan.",
//           "Register relevant social media profiles."
//         ],
//         "mediumTermGoals": [
//           "Build and launch the new multi-page, mobile-first website.",
//           "Write and publish all core pages (Home, About, Programs, Donate, Contact).",
//           "Begin publishing 1-2 blog posts per month.",
//           "Start building foundational local citations and directory listings."
//         ],
//         "longTermStrategy": [
//           "Execute a consistent content creation plan based on the content cluster strategy.",
//           "Implement an ongoing digital PR and link-building campaign.",
//           "Regularly update the website with new testimonials, impact reports, and news.",
//           "Analyze performance data and refine the strategy quarterly."
//         ],
//         "priorityMatrix": [
//           {
//             "task": "Google Business Profile Optimization",
//             "impact": "High",
//             "effort": "Low"
//           },
//           {
//             "task": "New Multi-Page Website Development",
//             "impact": "High",
//             "effort": "High"
//           },
//           {
//             "task": "Core Pages & Blog Content Creation",
//             "impact": "High",
//             "effort": "High"
//           },
//           {
//             "task": "Ongoing Link Building & Digital PR",
//             "impact": "High",
//             "effort": "Medium (Ongoing)"
//           }
//         ],
//         "estimatedTimeline": [
//           {
//             "phase": "1: Foundation & Planning",
//             "duration": "1 Month"
//           },
//           {
//             "phase": "2: Website Build & Launch",
//             "duration": "2-3 Months"
//           },
//           {
//             "phase": "3: Content Marketing & SEO Growth",
//             "duration": "Ongoing (Months 4-12+)"
//           }
//         ],
//         "requiredResources": [
//           "SEO Strategist",
//           "Web Developer",
//           "Content Writer (with niche knowledge)",
//           "Photographer/Videographer",
//           "Digital PR/Outreach Specialist"
//         ]
//       }
//     }
//   }
// }

function URLAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isComparable, setIsComparable] = useState(false)
  const [analysisType, setAnalysisType] = useState("seo");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [yourUrl, setYourUrl] = useState("");
  const [comparedData, setCompareData] = useState(null)



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


  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("seoAnalyzerHistory") || "[]");
      setHistory(Array.isArray(saved) ? saved : []);
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

  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    setError("");
    setAnalysisData(null);
    scrollToTopSmooth();
    setCompareData(null)

    try {
      const response = await axios.post(BASE_URL + "analyze", { competitorUrl: url }, { withCredentials: true });
      setAnalysisData(response.data.aiInsights);
      saveToHistory(url, response.data.aiInsights);
    } catch (err) {
      if (err.response?.data?.error) {

        setError("Error" + ' ' + err.response?.data?.error);
      } else {
        setError("Failed To Analysze URL! Please Try Again Later");

      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisType = (e) => {
    setAnalysisType(e.target.value)

    if (e.target.value === "comapare") {
      setIsComparable(true)
    } else {
      setIsComparable(false)

    }

  }
  const handleCompareSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    setError("");
    setAnalysisData(null);
    scrollToTopSmooth();
    setCompareData(null)




    try {
      const response = await axios.post(BASE_URL + "compare", { competitorUrl: competitorUrl, ourUrl: yourUrl }, { withCredentials: true });
      // setAnalysisData(response.data.aiInsights);
      console.log(response?.data)
      setCompareData(response?.data)
      saveToHistory(competitorUrl, response?.data?.comparison?.
        competitorInsights?.analysisSummary?.competitorStrengths);
    } catch (err) {
      if (err.response?.data?.error) {

        setError("Error" + ' ' + err.response?.data?.error);
      } else {
        setError("Failed To Analysze URL! Please Try Again Later");

      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }




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
              isComparable ? handleCompareSubmit() : handleSubmit()
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
                  <option value="comapare">Compare</option>

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

        {/* Analysis Results */}


        {analysisData && (
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
