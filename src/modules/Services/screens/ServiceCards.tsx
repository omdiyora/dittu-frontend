// import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    slug: string;
    description: string;
    features: string[];
    rate: string;
    maxAmount: string;
    delay?: number;
}

const ServiceCards = ({
    icon: Icon,
    title,
    slug,
    description,
    features,
    rate,
    maxAmount,
    delay = 0,
}: ServiceCardProps) => {
    const router = useRouter();
    return (
        <div
            className="bg-white group relative bg-card shadow-xl rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border animate-fade-up"
            style={{ animationDelay: `${delay}s` }}
        >
            {/* Icon */}
            <div className="bg-[#54221c]/15 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 " />
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground mb-6">{description}</p>

            {/* Features */}
            {/* <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                    </li>
                ))}
            </ul> */}

            {/* Stats */}
            {/* <div className="flex items-center gap-6 py-4 border-t border-border mb-6">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Rate from</p>
                    <p className="text-lg font-bold text-accent">{rate}</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Up to</p>
                    <p className="text-lg font-bold text-foreground">{maxAmount}</p>
                </div>
            </div> */}

            <Button
                type="submit"
                size="lg"
                className="bg-[#54221c] text-white font-medium w-fit"
                // variant="ghost"
                onClick={() => router.push(`/contact`)}
            // onClick={() => router.push(`/services/${slug}`)}
            >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
        </div>
    );
};

export default ServiceCards;
