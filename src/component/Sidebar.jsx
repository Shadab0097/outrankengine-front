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
    FiLogOut
} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeUSer } from '../utils/userSlice';


const Sidebar = ({ isOpen, onClose, history, setHistory, setUrl, scrollToTopSmooth }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(store => store.user)
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
            const res = await axios.post(BASE_URL + 'logout', {}, { withCredentials: true })
            if (res.status === 200) {
                console.log('logout Succefull')
                navigate('/login')
                dispatch(removeUSer())


            }
        } catch (err) {
            console.log(err.message)
        }

    }

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed z-50 top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 flex flex-col
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <FiGlobe className="text-blue-600" />
                        <span className="font-semibold">SEO Analyzer</span>
                    </div>
                    <button className="p-2 rounded hover:bg-gray-100" onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                {/* History Section */}
                <div className="p-4 flex-1 overflow-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-gray-700">
                            <FiTime className="text-yellow-600" />
                            <span className="font-semibold">History</span>
                        </div>
                        {history.length > 0 && (
                            <button onClick={clearHistory} className="text-xs text-red-600 hover:underline flex items-center gap-1">
                                <FiTrash2 className="text-red-600" /> Clear
                            </button>
                        )}
                    </div>
                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <p className="text-sm text-gray-500">No history yet. Analyze a URL to see it here.</p>
                        ) : (
                            history.map((h) => (
                                <div key={h.id} className="border rounded-md p-3 hover:bg-gray-50 group">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate" title={h.url || h.competitorUrl}>
                                                {h.url || h.competitorUrl}
                                            </p>
                                            <p className="text-xs text-gray-500">{new Date(h.date).toLocaleString()}</p>
                                        </div>
                                        <button className="opacity-60 hover:opacity-100" onClick={() => removeHistoryItem(h.id)} title="Remove">
                                            <FiTrash2 className="text-gray-500" />
                                        </button>
                                    </div>
                                    {h.summary && <p className="text-xs text-gray-600 mt-2 line-clamp-2">{h.summary}</p>}
                                    <div className="mt-2">
                                        <button
                                            className="text-xs text-blue-600 hover:underline"
                                            onClick={() => {
                                                setUrl(h.url);
                                                onClose();
                                                scrollToTopSmooth();
                                            }}
                                        >
                                            Use this URL
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Account Section */}
                <div className="p-4 border-t space-y-3 flex-shrink-0">
                    <div className="flex items-center gap-2 text-gray-700">
                        <FiUser className="text-indigo-600" />
                        <span className="font-semibold">{loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName + '-' + 'Token' + ' ' + loggedInUser.token : 'Account'}</span>
                    </div>
                    <div className="flex gap-2">
                        {!loggedInUser &&
                            <>
                                <Link to="/login" > <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm">
                                    <FiLogIn /> Login
                                </button> </Link>
                                <Link to='/login'>  <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm">
                                    <FiUserPlus /> Sign Up
                                </button></Link>
                            </>}
                        {loggedInUser && <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm" onClick={handleLogOut}>
                            <FiLogOut /> Log Out
                        </button>}
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm">
                        <FiCreditCard /> Membership
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
