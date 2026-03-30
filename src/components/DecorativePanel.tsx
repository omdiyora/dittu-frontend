import { motion } from "framer-motion";
import { Building2, Shield, TrendingUp, Users } from "lucide-react";
// import heroImage from "/assets/images/hero-consultancy.jpg";

export function DecorativePanel() {
    return (
        <div className="relative hidden h-full overflow-hidden lg:block">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/assets/images/hero-consultancy.jpg)` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/70" />

            {/* Animated Accent Shapes */}
            <motion.div
                className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-primary-foreground">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center max-w-md"
                >
                    {/* Logo */}
                    <motion.div
                        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.4,
                        }}
                    >
                        <Building2 className="h-10 w-10" />
                    </motion.div>

                    <h2 className="font-display mb-4 text-4xl font-bold tracking-tight">
                        Diyora Consultancy
                    </h2>
                    <p className="text-lg text-primary-foreground/80 leading-relaxed">
                        Your trusted partner for all loan consultancy services. Helping you achieve your financial goals with expert guidance.
                    </p>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 grid grid-cols-3 gap-6"
                >
                    {[
                        { icon: Shield, label: "Trusted" },
                        { icon: TrendingUp, label: "Expert" },
                        { icon: Users, label: "Personal" },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + i * 0.1 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                                <feature.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-primary-foreground/70">
                                {feature.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-primary-foreground/60">
                        Serving clients since 2010
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.3 + i * 0.1 }}
                                className="text-yellow-400 text-lg"
                            >
                                ★
                            </motion.span>
                        ))}
                    </div>

                </motion.div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
                    <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
                </svg>
            </div>
        </div>
    );
}
