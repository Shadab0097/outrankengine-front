import React from 'react';
import {
    FiGlobe,
    FiX,
    FiUser,
    FiLogIn,
    FiUserPlus,
    FiCreditCard,
    FiTrash2,
    FiClock as FiTime,
    FiLogOut,
    FiShield,
    FiHeart,
    FiMail,
    FiExternalLink,
    FiCalendar,
    FiStar
} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeUSer } from '../utils/userSlice';

const Sidebar = ({ isOpen, onClose, history, setHistory, setUrl, scrollToTopSmooth }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(store => store.user);

    const removeHistoryItem = (id) => {
        const updated = history.filter((h) => h.id !== id);
        setHistory(updated);
        try {
            localStorage.setItem("seoAnalyzerHistory", JSON.stringify(updated));
        } catch { }
    };

    const clearHistory = () => {
        setHistory([]);
        try {
            localStorage.removeItem("seoAnalyzerHistory");
        } catch { }
    };

    const handleLogOut = async () => {
        try {
            const res = await axios.post(BASE_URL + 'logout', {}, { withCredentials: true });
            if (res.status === 200) {
                console.log('logout Successful');
                navigate('/login');
                dispatch(removeUSer());
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed z-50 top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl border-r border-gray-200 transform transition-all duration-300 ease-in-out flex flex-col
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 text-white">
                    <div className="flex items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                                <FiGlobe className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">OutRank Engine</h1>
                                <p className="text-blue-100 text-xs">Professional SEO Insights</p>
                            </div>
                        </div>
                        <button
                            className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
                            onClick={onClose}
                        >
                            <FiX className="text-xl" />
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                </div>

                {/* User Section */}
                {loggedInUser && (
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-3">
                                <FiUser className="text-white text-lg" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">
                                    {loggedInUser.firstName} {loggedInUser.lastName}
                                </h3>
                                <div className="flex items-center gap-1 mt-1">
                                    <FiStar className="text-yellow-500 text-xs" />
                                    <span className="text-xs text-gray-600">
                                        {loggedInUser.token} tokens remaining
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* History Section */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="bg-amber-100 rounded-lg p-2">
                                    <FiTime className="text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Analysis History</h3>
                                    <p className="text-xs text-gray-500">{history.length} analyses</p>
                                </div>
                            </div>
                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1"
                                >
                                    <FiTrash2 className="text-xs" />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {history.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <FiGlobe className="text-gray-400 text-2xl" />
                                </div>
                                <p className="text-sm text-gray-500 font-medium">No history yet</p>
                                <p className="text-xs text-gray-400 mt-1">Analyze a URL to see it here</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {history.map((h) => (
                                    <div key={h.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="bg-blue-100 rounded-md p-1">
                                                        <FiGlobe className="text-blue-600 text-xs" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900 truncate" title={h.url || h.competitorUrl}>
                                                        {h.url || h.competitorUrl}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                                    <FiCalendar className="text-xs" />
                                                    <span>{new Date(h.date).toLocaleDateString()}</span>
                                                    <span className="text-gray-300">•</span>
                                                    <span>{new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                {h.summary && (
                                                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{h.summary}</p>
                                                )}
                                                <button
                                                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                                                    onClick={() => {
                                                        setUrl(h.url);
                                                        onClose();
                                                        scrollToTopSmooth();
                                                    }}
                                                >
                                                    <FiExternalLink className="text-xs" />
                                                    Analyze Again
                                                </button>
                                            </div>
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200"
                                                onClick={() => removeHistoryItem(h.id)}
                                                title="Remove from history"
                                            >
                                                <FiTrash2 className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    {!loggedInUser ? (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700 text-center">Get started with SEO analysis</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Link to="/login">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition-colors duration-200">
                                        <FiLogIn className="text-sm" />
                                        Login
                                    </button>
                                </Link>
                                <Link to='/signup'>
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors duration-200">
                                        <FiUserPlus className="text-sm" />
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <button
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 text-sm font-medium transition-all duration-200 shadow-md"
                            >
                                <FiCreditCard className="text-sm" />
                                Upgrade Membership
                            </button>
                            <button
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors duration-200"
                                onClick={handleLogOut}
                            >
                                <FiLogOut className="text-sm" />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-900 text-gray-300">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <FiShield className="text-green-400" />
                                <span>Secure & Private</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiHeart className="text-red-400" />
                                <span>Made with care</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs border-t border-gray-700 pt-3">
                            <div>
                                <p className="text-gray-400">© 2025 SEO Analyzer</p>
                                <p className="text-gray-500">v2.1.0</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="hover:text-blue-400 transition-colors duration-200" title="Support">
                                    <FiMail className="text-sm" />
                                </button>
                                <button className="hover:text-blue-400 transition-colors duration-200" title="Help">
                                    <FiShield className="text-sm" />
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <p>
                                Contact for more information:{" "}
                                <a
                                    href="mailto:shadabkhan2910@gmail.com"
                                    className="text-blue-400 hover:underline"
                                >
                                    shadabkhan2910@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
