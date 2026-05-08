"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
// import { LoginInput } from "./ui/LoginInput";
// import { Button } from "./ui/Loginbutton";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/components/ui/LoginInput";
import { Button } from "@/components/ui/Loginbutton";

const registerSchema = z
    .object({
        first_name: z.string().min(2, "First name required"),
        last_name: z.string().min(2, "Last name required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Minimum 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
    const [formData, setFormData] = useState<RegisterFormData>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<RegisterFormData> = {};
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0] as keyof RegisterFormData] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        console.log(formData, 'formData');


        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast({
                title: "Account created 🎉",
                description: "You can now login",
            });

            router.push("/login");
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-5"
        >
            {/* Name */}
            <LoginInput
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                error={errors.first_name}
                icon={<User className="h-5 w-5" />}
            />

            <LoginInput
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                error={errors.last_name}
                icon={<User className="h-5 w-5" />}
            />

            {/* Email */}
            <LoginInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail className="h-5 w-5" />}
            />

            {/* Password */}
            <LoginInput
                label="Password"
                name="password"
                type={isVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<Lock className="h-5 w-5" />}
                endContent={
                    <button type="button" onClick={toggleVisibility}>
                        {isVisible ? <EyeOff /> : <Eye />}
                    </button>
                }
            />

            {/* Confirm Password */}
            <LoginInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<Lock className="h-5 w-5" />}
            />

            {/* Submit */}
            <Button type="submit" disabled={isLoading} className="w-full bg-black">
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        Creating...
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        Register
                        <ArrowRight />
                    </span>
                )}
            </Button>
        </motion.form>
    );
}