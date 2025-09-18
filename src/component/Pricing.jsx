import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function Pricing() {
    const loggedInUser = useSelector(store => store.user)

    return (
        <>
            {!loggedInUser && <Navbar />}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-10 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-7xl mx-auto text-center space-y-8">

                    <h1 className="text-4xl font-bold text-indigo-600">Our Pricing Plans</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that best suits your needs. All plans are designed to help you boost your SEO and grow your business effectively.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">

                        {/* Basic Plan */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Basic</h2>
                            <p className="text-gray-500 mb-6">Essential tools for startups and small projects.</p>
                            <div className="text-3xl font-bold text-gray-900 mb-6">$19<span className="text-base font-normal text-gray-500">/month</span></div>
                            <ul className="space-y-4 text-gray-600 mb-6">
                                <li>✔ URL Scraping & Data Extraction</li>
                                <li>✔ Basic SEO reports</li>
                                <li>✔ Weekly updates</li>
                            </ul>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                                Get Started
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border-2 border-indigo-600">
                            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Pro</h2>
                            <p className="text-gray-500 mb-6">Advanced features for growing businesses.</p>
                            <div className="text-3xl font-bold text-gray-900 mb-6">$49<span className="text-base font-normal text-gray-500">/month</span></div>
                            <ul className="space-y-4 text-gray-600 mb-6">
                                <li>✔ Everything in Basic</li>
                                <li>✔ Competitor analysis with Gemini-Pro</li>
                                <li>✔ Custom SEO strategies</li>
                            </ul>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                                Upgrade Now
                            </button>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Premium</h2>
                            <p className="text-gray-500 mb-6">Complete SEO optimization for enterprise-level solutions.</p>
                            <div className="text-3xl font-bold text-gray-900 mb-6">$99<span className="text-base font-normal text-gray-500">/month</span></div>
                            <ul className="space-y-4 text-gray-600 mb-6">
                                <li>✔ Everything in Pro</li>
                                <li>✔ SEO content generation</li>
                                <li>✔ Nano Banana image optimization</li>
                            </ul>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                                Get Premium
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
