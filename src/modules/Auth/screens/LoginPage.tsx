"use client"
import { motion } from "framer-motion";
import { LoginForm } from "@/components/LoginForm";
import { DecorativePanel } from "@/components/DecorativePanel";

const LoginPages = () => {
    return (
        <>
            <title>Login | Welcome Back</title>
            <meta
                name="description"
                content="Sign in to your account securely. Access your personalized dashboard and continue your journey."
            />

            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Decorative Panel */}
                <DecorativePanel />

                {/* Login Panel */}
                <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm"
                    >
                        {/* Mobile Logo */}
                        <div className="mb-8 flex flex-col items-center lg:hidden">
                            <motion.div
                                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <span className="text-2xl font-bold text-primary-foreground">L</span>
                            </motion.div>
                        </div>

                        {/* Header */}
                        <div className="mb-8 text-center lg:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl font-bold tracking-tight"
                            >
                                Welcome back
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-2 text-muted-foreground"
                            >
                                Please enter your credentials to continue
                            </motion.p>
                        </div>

                        {/* Login Form */}
                        <LoginForm />
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 text-center text-xs text-muted-foreground"
                    >
                        <p>
                            By signing in, you agree to our{" "}
                            <a href="#" className="underline hover:text-primary">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="underline hover:text-primary">
                                Privacy Policy
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default LoginPages;
