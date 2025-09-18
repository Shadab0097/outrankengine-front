import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function PrivacyPolicy() {
    // const location = useLocation()
    const loggedInUser = useSelector(store => store.user)

    return (
        <>
            {!loggedInUser && <Navbar />}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-10 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-8">

                    <h1 className="text-3xl font-bold text-indigo-600 text-center">Privacy Policy & Terms of Service</h1>

                    {/* Privacy Policy Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Privacy Policy</h2>

                        <p className="text-gray-700 mb-4">
                            At <span className="font-semibold">SEO Analyzer</span>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information while providing you with powerful SEO tools.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">1. Information We Collect</h3>
                        <p className="text-gray-700 mb-4">
                            We collect data such as your website URLs, analytics, and usage patterns to deliver optimized SEO recommendations. We do not collect sensitive personal information unless explicitly provided by you.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">2. How We Use Your Data</h3>
                        <p className="text-gray-700 mb-4">
                            The information you provide helps us analyze your website and offer SEO improvements. We ensure that your data is used solely for enhancing your SEO experience and not shared with third parties.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">3. Data Security</h3>
                        <p className="text-gray-700 mb-4">
                            We implement strict security measures to protect your information. All data is stored securely and access is restricted only to authorized systems necessary for processing your requests.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">4. Your Rights</h3>
                        <p className="text-gray-700 mb-4">
                            You have the right to access, update, or request the deletion of your personal information. Please contact our support team for any privacy-related concerns.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">5. Updates to this Policy</h3>
                        <p className="text-gray-700">
                            We may update this policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically.
                        </p>
                    </div>

                    {/* Terms & Conditions Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Terms and Conditions</h2>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">1. Acceptance of Terms</h3>
                        <p className="text-gray-700 mb-4">
                            By using the SEO Analyzer tool, you agree to abide by these terms and conditions. Please read them carefully before accessing or using our services.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">2. Use of the Service</h3>
                        <p className="text-gray-700 mb-4">
                            Our tool is intended for SEO analysis and optimization purposes only. You are responsible for ensuring that your usage complies with applicable laws and regulations.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">3. Limitation of Liability</h3>
                        <p className="text-gray-700 mb-4">
                            We are not liable for any damages arising from the use or inability to use the service, including lost profits, data loss, or other consequential damages.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">4. Changes to Terms</h3>
                        <p className="text-gray-700 mb-4">
                            We reserve the right to modify these terms at any time. Continued use of the service after changes are posted constitutes acceptance of the updated terms.
                        </p>

                        <h3 className="text-xl font-semibold text-indigo-500 mb-2">5. Contact Information</h3>
                        <p className="text-gray-700">
                            For questions or concerns regarding this policy or terms, please contact our support team. We are committed to assisting you and addressing your concerns.
                        </p>
                    </div>

                    <p className="text-center text-gray-500 text-sm">
                        Last updated: September 2025
                    </p>
                </div>
            </div>
        </>
    );
}
