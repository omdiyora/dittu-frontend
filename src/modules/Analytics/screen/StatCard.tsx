// StatCard.tsx
import { IconType } from "react-icons";

interface StatCardProps {
  icon: IconType;
  value: number;
  label: string;
  bgColor: string;
  iconColor: string;
  glow: string;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  bgColor,
  iconColor,
  glow,
}: StatCardProps) {
  return (
    <div
      className={`
        group cursor-pointer rounded-xl p-4
        transition-all duration-300 ease-out
        ${bgColor}
        hover:-translate-y-1 hover:scale-[1.03]
        hover:shadow-xl ${glow}
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          bg-white/70
          transition-all duration-300
          group-hover:animate-bounce
        `}
      >
        <Icon className={`${iconColor} text-[22px]`} />
      </div>

      {/* Value */}
      <h2 className="mt-3 text-2xl font-bold text-gray-900">
        {value}
      </h2>

      {/* Label */}
      <p className="text-sm text-black mt-1 nunito-bold">
        {label}
      </p>
    </div>
  );
}
