"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Leaf } from "lucide-react";

export function DecorativePanel() {
    return (
        <div className="relative hidden h-full overflow-hidden lg:block">

            {/* Background Image (Skincare theme) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dbfyydres/image/upload/v1775287974/laura-jaeger-_dSHqe4mcWE-unsplash_nhvqtg.jpg?q=80&w=1400&auto=format&fit=crop)`
                }}
            />

            {/* Soft Beauty Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f5f2]/90 via-[#eee7df]/80 to-[#e4dcd3]/90" />

            {/* Glow Effect */}
            <motion.div
                className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-gray-800">

                {/* Logo */}
                <motion.div
                    className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <Sparkles className="h-10 w-10 text-black-600" />
                </motion.div>

                {/* Brand Name */}
                <h2 className="text-4xl font-bold tracking-tight mb-3">
                    Dittu
                </h2>

                {/* Tagline */}
                <p className="text-lg text-gray-700/80 text-center max-w-md leading-relaxed">
                    Discover radiant, healthy skin with our premium skincare products.
                    Nourish your beauty naturally.
                </p>

                {/* Features */}
                <div className="mt-12 grid grid-cols-3 gap-6">
                    {[
                        { icon: Leaf, label: "Natural" },
                        { icon: Heart, label: "Skin Safe" },
                        { icon: Sparkles, label: "Glow Boost" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.2 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/40 backdrop-blur-md shadow">
                                <item.icon className="h-5 w-5 text-pink-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Review / Trust */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-600">
                        Trusted by 10,000+ happy customers
                    </p>

                    <div className="mt-2 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full fill-white">
                    <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L0,120Z" />
                </svg>
            </div>
        </div>
    );
}