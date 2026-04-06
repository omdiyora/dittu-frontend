"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { LoginInput } from "./ui/LoginInput";
import { Button } from "./ui/Loginbutton";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getClientIP } from "@/helpers/clientIP";

const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, "Username or Email is required")
        .max(255),
    password: z
        .string()
        .min(6, "Minimum 6 characters required")
        .max(100),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [loginError, setLoginError] = useState<string | null>(null);

    const [formData, setFormData] = useState<LoginFormData>({
        identifier: "",
        password: "",
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setLoginError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoginError(null);

        // ✅ Zod validation
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<LoginFormData> = {};
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                email: formData.identifier,
                password: formData.password,
                user_agent: navigator.userAgent,
                ip_address: await getClientIP(),
                redirect: false,
            });

            if (res?.error) {
                setLoginError(res.error);
                return;
            }

            // ✅ Fetch updated session
            const session = await fetch("/api/auth/session").then((r) => r.json());

            if (session?.user?.account_status === "Inactive") {
                setLoginError(
                    "Your account is disabled. Please contact your administrator."
                );
                return;
            }

            toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
            });

            router.push("/account");
        } catch (error) {
            setLoginError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-5"
        >
            {/* Username / Email */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <LoginInput
                    label="Username or Email"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    error={errors.identifier}
                    autoComplete="email"
                    icon={<Mail className="h-5 w-5" />}
                />
            </motion.div>

            {/* Password */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <LoginInput
                    label="Password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="current-password"
                    icon={<Lock className="h-5 w-5" />}
                    endContent={
                        <button
                            type="button"
                            onClick={toggleVisibility}
                            className="hover:text-primary"
                            tabIndex={-1}
                        >
                            {isVisible ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    }
                />
            </motion.div>

            {/* Error message */}
            {loginError && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600"
                >
                    {loginError}
                </motion.p>
            )}

            {/* Forgot password */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex justify-end"
            >
                <a
                    href="/login/forget-password"
                    className="text-sm text-muted-foreground hover:text-primary"
                >
                    Forgot Password?
                </a>
            </motion.div>

            {/* Submit button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full bg-black    "
                    size="lg"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Signing in...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Sign In
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    )}
                </Button>
            </motion.div>
        </motion.form>
    );
}
