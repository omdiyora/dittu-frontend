"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "./RegisterForm";
// import { RegisterForm } from "@/components/RegisterForm"; // create this

const LoginPages = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            {/* CENTER BRAND */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.06, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-extrabold tracking-widest text-gray-900 select-none"
                >
                    DITTU
                </motion.h1>
            </div>

            <div className="relative grid min-h-screen">

                {/* FORM PANEL */}
                <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12">

                    {/* CARD */}
                    <div className="w-full max-w-sm bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border">

                        {/* HEADER */}
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-bold">
                                {isLogin ? "Welcome back" : "Create account"}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-2">
                                {isLogin
                                    ? "Please enter your credentials"
                                    : "Start your skincare journey"}
                            </p>
                        </div>

                        {/* FORM SWITCH ANIMATION */}
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <LoginForm />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <RegisterForm />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* TOGGLE BUTTON */}
                        <div className="mt-6 text-center text-sm">
                            {isLogin ? (
                                <p>
                                    Don’t have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="text-black font-semibold hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="text-black font-semibold hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-10 text-xs text-muted-foreground text-center">
                        <p>
                            By continuing, you agree to our Terms & Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPages;