import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function AboutUs() {
    const loggedInUser = useSelector(store => store.user)

    return (
        <>
            {!loggedInUser && <Navbar />}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-10 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-6 text-center">

                    <h1 className="text-3xl font-bold text-indigo-600">About Us</h1>

                    <p className="text-gray-700 text-lg">
                        At <span className="font-semibold text-indigo-500">SEO Analyzer</span>, we are dedicated to empowering businesses and individuals to achieve greater online visibility.
                        Our mission is to simplify SEO with data-driven insights and advanced tools that help you stay ahead of the competition.
                    </p>

                    <p className="text-gray-700 text-lg">
                        Whether you're a startup, entrepreneur, or digital marketer, our platform provides user-friendly solutions for optimizing your website and reaching your audience more effectively.
                        We believe that SEO should be accessible, efficient, and impactful—and that’s what we strive to deliver every day.
                    </p>

                    <p className="text-gray-700 text-lg">
                        Built with passion and powered by technology, we combine expertise, innovation, and customer support to help you grow your online presence confidently and sustainably.
                    </p>

                    <div className="mt-6">
                        <a
                            href="mailto:shadabkhan2910@gmail.com"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Contact us
                        </a>
                        <span className="text-gray-500 ml-2">for more information or partnership opportunities.</span>
                    </div>
                </div>
            </div>
        </>
    );
}
