import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";

const Toast = ({ type = "success", message, onClose, duration = 3500 }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => onClose?.(), duration);
        return () => clearTimeout(timerRef.current);
    }, [duration, onClose]);

    const styles = useMemo(() => {
        const base = "pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5";
        if (type === "success")
            return {
                box: `${base} bg-emerald-50`,
                bar: "bg-emerald-500",
                text: "text-emerald-900",
                icon: <CheckCircleIcon className="h-6 w-6 text-emerald-600" />,
            };
        return {
            box: `${base} bg-rose-50`,
            bar: "bg-rose-500",
            text: "text-rose-900",
            icon: <ExclamationCircleIcon className="h-6 w-6 text-rose-600" />,
        };
    }, [type]);

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-end p-4 sm:p-6">
            <div className={styles.box} role="status" aria-live="polite">
                <div className={`h-1 ${styles.bar}`} />
                <div className="p-4 flex gap-3 items-start">
                    <div className="mt-0.5">{styles.icon}</div>
                    <div className={`flex-1 text-sm ${styles.text}`}>{message}</div>
                    <button
                        aria-label="Close"
                        className="rounded-md p-1 hover:bg-black/5 transition"
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-5 w-5 text-black/50" />
                    </button>
                </div>
            </div>
        </div>
    );
};



const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPw, setShowPw] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        otp: "",

    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOtp, setIsOtp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const [fEmailId, setFEmailId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [fOtp, setFOtp] = useState('');
    const [isVerifyOtp, setIsVerifyOtp] = useState(false);
    const [hideForgotPassword, setHideForgotPassword] = useState(false);







    const validate = () => {
        const errors = {};
        if (!formData.emailId?.trim()) {
            errors.emailId = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            errors.emailId = "Enter a valid email";
        }

        if (!formData.password?.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!isLogin) {
            if (!formData.firstName?.trim()) errors.firstName = "First name is required";
            if (!formData.lastName?.trim()) errors.lastName = "Last name is required";
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleApiError = (err) => {
        const apiMsg = err?.response?.data || err?.response?.data?.error || err?.response?.data?.message || err?.message || "Something went wrong";
        setToast({ type: "error", message: apiMsg });
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await axios.post(
                BASE_URL + "login",
                { emailId: formData.emailId, password: formData.password },
                { withCredentials: true }
            );
            if (res.status === 200) {
                dispatch(addUser(res.data.data));
                setToast({ type: "success", message: "Signed in successfully" });
                setTimeout(() => navigate("/"), 600);
            }
        } catch (err) {
            // handleApiError(err);
            setToast({ type: "error", message: err?.response?.data?.error });

        } finally {
            setSubmitting(false);
        }
    };

    const handleSignUp = async () => {
        if (!validate()) return;
        setSubmitting(true);

        try {
            const res = await axios.post(
                BASE_URL + "signup",
                formData,
                { withCredentials: true }
            );
            console.log(res)

            if (res.status === 200) {

                setToast({ type: "success", message: "Otp Send successfully" });
                setIsOtp(true)

            }

            if (res.status === 201) {
                dispatch(addUser(res.data.data));
                setToast({ type: "success", message: "Account created successfully" });
                setTimeout(() => navigate("/"), 600);
            }
        } catch (err) {
            // handleApiError(err);
            setToast({ type: "error", message: err?.response?.data?.error });

            console.log(err)
        } finally {
            setSubmitting(false);
        }
    };

    // const handleLogin = async () => {
    //     if (!validate()) return;
    //     setSubmitting(true);
    //     try {
    //         const res = await axios.post(
    //             BASE_URL + "login",
    //             { emailId: formData.emailId, password: formData.password },
    //             { withCredentials: true }  // Keep this for cookie support
    //         );

    //         if (res.status === 200) {
    //             const { user, authToken } = res.data.data;

    //             // Store token in localStorage (fallback for devices without cookie support)
    //             localStorage.setItem('authToken', authToken);
    //             localStorage.setItem('user', JSON.stringify(user));

    //             // Set Authorization header for future requests
    //             axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    //             // Update Redux store
    //             dispatch(addUser(user));  // Changed from res.data.data to user

    //             setToast({ type: "success", message: "Signed in successfully" });
    //             setTimeout(() => navigate("/"), 600);
    //         }
    //     } catch (err) {
    //         setToast({ type: "error", message: err?.response?.data?.error });
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const handleSignUp = async () => {
    //     if (!validate()) return;
    //     setSubmitting(true);

    //     try {
    //         const res = await axios.post(
    //             BASE_URL + "signup",
    //             formData,
    //             { withCredentials: true }  // Keep this for cookie support
    //         );

    //         console.log(res);

    //         // Step 1: OTP sent
    //         if (res.status === 200) {
    //             setToast({ type: "success", message: "OTP sent successfully" });
    //             setIsOtp(true);
    //         }

    //         // Step 2: Account created after OTP verification
    //         if (res.status === 201) {
    //             const { user, authToken } = res.data.data;

    //             // Store token in localStorage (fallback for devices without cookie support)
    //             localStorage.setItem('authToken', authToken);
    //             localStorage.setItem('user', JSON.stringify(user));

    //             // Set Authorization header for future requests
    //             axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    //             // Update Redux store
    //             dispatch(addUser(user));  // Changed from res.data.data to user

    //             setToast({ type: "success", message: "Account created successfully" });
    //             setTimeout(() => navigate("/"), 600);
    //         }
    //     } catch (err) {
    //         setToast({ type: "error", message: err?.response?.data?.error });
    //         console.log(err);
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };



    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const BackgroundText = () => {
        return (
            <div className="absolute top-10 left-0 w-full flex justify-center z-0  ">
                {/* Masked Text with Animated Background */}
                <h1 className="masked-text ">
                    Welcome to Out Rank Engine
                </h1>
            </div>
        );
    };
    // const handleForgotChange = (e) => {
    //     setFOtp(e.target.value)
    //     setNewPassword(e.target.value)
    //     setFEmailId(e.target.value)


    // }


    const getOtp = async () => {
        setSubmitting(true);

        try {
            const res = await axios.post(BASE_URL + "profile/forgot/password", { fEmailId }, { withCredentials: true })
            console.log(res)
            if (res.status === 200) {
                setIsVerifyOtp(true)
                setToast({ type: "success", message: "Otp Send successfully" });


            }
        } catch (err) {
            handleApiError(err);
            console.log(err)
            setIsForgotPassword(false)
            setHideForgotPassword(false)
            // setIsVerifyOtp(false)


        } finally {
            setSubmitting(false);
        }

    }
    const verifyOtp = async () => {
        setSubmitting(true);

        try {
            const res = await axios.post(BASE_URL + "profile/otp/verify", { fEmailId, fOtp, newPassword }, { withCredentials: true })
            if (res.status === 200) {
                setToast({ type: "success", message: "Password Chnaged successfully" });

                setIsForgotPassword(false)
                setIsVerifyOtp(false)
            }
        } catch (err) {
            handleApiError(err);
            console.log(err)
        } finally {
            setSubmitting(false);
        }

    }

    const handletTogleForgot = () => {
        setIsForgotPassword(true)
        setHideForgotPassword(true)
    }

    // const resendOtp =()=>{

    // }


    return (
        <>
            <Navbar />
            {/* Gradient background */}
            <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col-reverse sm:flex-row  px-4 py-10 space-y-10 sm:space-y-0 sm:space-x-8 pt-24">

                <div className="w-full">


                    {/* Card */}
                    <div className="relative w-full max-w-md ">
                        {/* Decorative glow */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 blur-2xl" aria-hidden />
                        <div className="relative rounded-3xl bg-white/80 backdrop-blur shadow-xl ring-1 ring-black/5">
                            {/* Header tabs */}
                            <div className="p-2">
                                <div className="flex rounded-2xl bg-gray-100 p-1">
                                    <button
                                        className={`w-1/2 py-2.5 text-sm font-medium rounded-xl transition ${isLogin ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        onClick={() => setIsLogin(true)}
                                        aria-pressed={isLogin}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        className={`w-1/2 py-2.5 text-sm font-medium rounded-xl transition ${!isLogin ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        onClick={() => setIsLogin(false)}
                                        aria-pressed={!isLogin}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="px-6 pt-2 text-center">
                                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                                    {isLogin ? "Welcome back" : "Create your account"}
                                </h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    {isLogin ? "Sign in to access your account" : "Join us in a minute"}
                                </p>
                            </div>

                            {/* Form */}

                            <>
                                {
                                    !isForgotPassword ?
                                        (<form
                                            className="px-6 pb-6 pt-4 space-y-5"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                isLogin ? handleLogin() : handleSignUp();
                                            }}
                                            noValidate
                                        >
                                            {!isLogin && (
                                                <>
                                                    <div>

                                                        {isOtp && <>
                                                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                                                Email Varification OTP
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="otp"
                                                                name="otp"
                                                                value={formData.otp}
                                                                onChange={handleChange}
                                                                placeholder="OTP"
                                                                className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.emailId ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                                    }`}

                                                            />
                                                        </>}

                                                        {!isOtp && <>  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                            First Name
                                                        </label>
                                                            <input
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                value={formData.firstName}
                                                                onChange={handleChange}
                                                                placeholder="First name"
                                                                className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.firstName ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                                    }`}
                                                            />
                                                            {fieldErrors.firstName && (
                                                                <p className="mt-1 text-xs text-rose-600">{fieldErrors.firstName}</p>
                                                            )}
                                                        </>
                                                        }
                                                    </div>
                                                    {!isOtp && <div>
                                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="lastName"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                            placeholder="Last name"
                                                            className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.lastName ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                                }`}
                                                        />
                                                        {fieldErrors.lastName && (
                                                            <p className="mt-1 text-xs text-rose-600">{fieldErrors.lastName}</p>
                                                        )}
                                                    </div>}
                                                </>
                                            )}

                                            <div>


                                                {!isOtp &&
                                                    <>

                                                        <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                                                            Email address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="emailId"
                                                            name="emailId"
                                                            value={formData.emailId}
                                                            onChange={handleChange}
                                                            placeholder="leroy@jenkins.com"
                                                            className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.emailId ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                                }`}
                                                            autoComplete="email"
                                                        />
                                                        {fieldErrors.emailId && (
                                                            <p className="mt-1 text-xs text-rose-600">{fieldErrors.emailId}</p>
                                                        )}
                                                    </>
                                                }
                                            </div>

                                            {!isOtp && <div>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                        Password
                                                    </label>
                                                    {isLogin && <p
                                                        onClick={() => setIsForgotPassword(!isForgotPassword)}
                                                        className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-700 font-medium"
                                                    >
                                                        Forgot password?
                                                    </p>}
                                                </div>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type={showPw ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="••••••"
                                                        className={`w-full rounded-xl border px-3 py-2.5 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.password ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                            }`}
                                                        autoComplete={isLogin ? "current-password" : "new-password"}
                                                    />
                                                    <button
                                                        type="button"
                                                        aria-label={showPw ? "Hide password" : "Show password"}
                                                        className="absolute inset-y-0 right-2 my-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                                        onClick={() => setShowPw((s) => !s)}
                                                    >
                                                        {showPw ? (
                                                            <EyeSlashIcon className="h-5 w-5" />
                                                        ) : (
                                                            <EyeIcon className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                </div>
                                                {fieldErrors.password && (
                                                    <p className="mt-1 text-xs text-rose-600">{fieldErrors.password}</p>
                                                )}
                                            </div>

                                            }
                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-white font-semibold shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-70`}
                                            >
                                                {submitting && (
                                                    <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                                                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                    </svg>
                                                )}
                                                {isLogin ? (submitting ? "Signing In..." : "Sign In") : (submitting ? "Creating..." : "Sign Up")}
                                            </button>

                                            {/* Switch auth mode */}
                                            <p className="text-center text-sm text-gray-600">
                                                {isLogin ? (
                                                    <>
                                                        Don&apos;t have an account?{" "}
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsLogin(false)}
                                                            className="font-medium text-indigo-600 hover:text-indigo-700"
                                                        >
                                                            Sign Up
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        Existing user?{" "}
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsLogin(true)}
                                                            className="font-medium text-indigo-600 hover:text-indigo-700"
                                                        >
                                                            Sign In
                                                        </button>
                                                    </>
                                                )}
                                            </p>
                                        </form>)
                                        :

                                        // forgot password
                                        (<form
                                            className="px-6 pb-6 pt-4 space-y-5"
                                            onSubmit={(e) => {
                                                e.preventDefault();

                                                !isVerifyOtp ? getOtp()
                                                    : verifyOtp()

                                            }}
                                            noValidate
                                        >

                                            <>


                                                <div>

                                                    <>
                                                        <div className="flex items-center justify-between">

                                                            <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                                                                Email address
                                                            </label>
                                                            <p
                                                                onClick={() => setIsForgotPassword(false)}
                                                                className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-700 font-medium"
                                                            >
                                                                Back To Login
                                                            </p>
                                                        </div>
                                                        <input
                                                            type="email"
                                                            id="emailId"
                                                            name="emailId"
                                                            value={fEmailId}
                                                            onChange={(e) => setFEmailId(e.target.value)}
                                                            placeholder="leroy@jenkins.com"
                                                            className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.emailId ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                                }`}
                                                            autoComplete="email"
                                                        />
                                                        {fieldErrors.emailId && (
                                                            <p className="mt-1 text-xs text-rose-600">{fieldErrors.emailId}</p>
                                                        )}

                                                    </>

                                                </div>

                                            </>

                                            <div>


                                                {isVerifyOtp && <>
                                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                                        Paswword Reset OTP
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="otp"
                                                        name="otp"
                                                        value={fOtp}
                                                        onChange={(e) => setFOtp(e.target.value)}
                                                        placeholder="OTP"
                                                        className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.emailId ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                            }`}

                                                    />

                                                </>}

                                            </div>

                                            {isVerifyOtp &&
                                                <div>

                                                    <div className="flex items-center justify-between">
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                            New Password
                                                        </label>

                                                        <p
                                                            onClick={!isForgotPassword ? handletTogleForgot : getOtp}
                                                            className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-700 font-medium"
                                                        >
                                                            {isForgotPassword ? "Resend Otp" : 'Forgot password?'}
                                                        </p>


                                                    </div>




                                                    <div className="mt-1 relative">
                                                        <input
                                                            type={showPw ? "text" : "password"}
                                                            id="password"
                                                            name="password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            placeholder="••••••"
                                                            className={`w-full rounded-xl border px-3 py-2.5 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/60 ${fieldErrors.password ? "border-rose-400 focus:ring-rose-400/60" : "border-gray-300"
                                                                }`}
                                                            autoComplete={isLogin ? "current-password" : "new-password"}
                                                        />
                                                        <button
                                                            type="button"
                                                            aria-label={showPw ? "Hide password" : "Show password"}
                                                            className="absolute inset-y-0 right-2 my-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                                            onClick={() => setShowPw((s) => !s)}
                                                        >
                                                            {showPw ? (
                                                                <EyeSlashIcon className="h-5 w-5" />
                                                            ) : (
                                                                <EyeIcon className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {fieldErrors.password && (
                                                        <p className="mt-1 text-xs text-rose-600">{fieldErrors.password}</p>
                                                    )}
                                                </div>}


                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-white font-semibold shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-70`}
                                            >
                                                {submitting && (
                                                    <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                                                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                    </svg>
                                                )}
                                                {!isVerifyOtp ? (submitting ? "Sending Otp..." : "Get Otp") : (submitting ? "Verifying..." : "Verify Otp")}
                                            </button>

                                            {/* Switch auth mode */}
                                            {/* <p className="text-center text-sm text-gray-600">
                                            {isLogin ? (
                                                <>
                                                    Don&apos;t have an account?{" "}
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsLogin(false)}
                                                        className="font-medium text-indigo-600 hover:text-indigo-700"
                                                    >
                                                        Sign Up
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    Existing user?{" "}
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsLogin(true)}
                                                        className="font-medium text-indigo-600 hover:text-indigo-700"
                                                    >
                                                        Sign In
                                                    </button>
                                                </>
                                            )}
                                        </p> */}
                                        </form>)
                                }
                            </>

                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-6 space-y-8 ">

                    <h2 className="text-3xl font-bold text-gray-900 text-center masked-text">Welcome to Out Rank Engine</h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        Our powerful SEO Analyzer helps you stay ahead of the competition by providing data-driven insights and optimized content strategies. Here’s how it works:
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-blue-600">URL Scraping & Data Extraction</h3>
                            <p className="text-gray-700 mt-2">
                                Simply enter your website’s URL, and our tool scrapes the site to gather all essential SEO data—like keywords, meta tags, structure, and performance metrics—that are crucial for search engine optimization.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-blue-600">In-Depth Competitor Analysis</h3>
                            <p className="text-gray-700 mt-2">
                                Using <span className="font-medium">gemini-2.5-pro</span>, the tool analyzes your website’s data against your competitors. It identifies weaknesses you can exploit, key factors to improve, and strategies to outrank competitor websites with a fully SEO-optimized plan.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-blue-600">Content Generation for SEO Success</h3>
                            <p className="text-gray-700 mt-2">
                                Gemini takes the analysis and creates high-quality, SEO-optimized content tailored to your website. This content is designed to boost your search rankings, attract more traffic, and outperform your competitors on Google.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-blue-600">Optimized Image Creation</h3>
                            <p className="text-gray-700 mt-2">
                                With Gemini’s image generation model <span className="font-medium">Nano Banana</span>, it takes keywords, titles, and content insights to create visually appealing, fully optimized images. These images can be used on your website, social media, and other platforms to further enhance engagement and SEO performance.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-blue-600">URL Comparison Feature</h3>
                            <p className="text-gray-700 mt-2">
                                Compare your website’s SEO performance directly with your competitor’s by simply entering their URL. Get actionable insights to see where you stand and what improvements can give you a competitive edge.
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-gray-600 mt-6">
                        Experience a smarter, faster way to enhance your online presence, boost your search rankings, and leave your competitors behind—all through one intuitive tool.
                    </p>
                </div>


            </div>
            {/* Toasts */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default Login;




