import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function ContactUs() {
    const loggedInUser = useSelector(store => store.user)

    return (
        <>
            {!loggedInUser && <Navbar />}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-10 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center">

                    <h1 className="text-3xl font-bold text-indigo-600 mb-6">Contact Us</h1>

                    <p className="text-gray-700 mb-4">
                        If you have any questions or need assistance, feel free to reach out to us via email:
                    </p>

                    <a
                        href="mailto:shadabkhan2910@gmail.com"
                        className="inline-block text-indigo-600 font-semibold hover:underline text-lg break-all"
                    >
                        shadabkhan2910@gmail.com
                    </a>

                    <p className="text-gray-500 text-sm mt-6">
                        We’re here to help and will respond as soon as possible.
                    </p>
                </div>
            </div>
        </>
    );
}
