import { DEFAULT_HERO_STATS } from './heroData';

export default function HeroStats({
  stats = DEFAULT_HERO_STATS,
  className = '',
}) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 ${className}`}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/[0.03] lg:bg-transparent border border-white/10 lg:border-0 rounded-xl p-2.5 lg:p-0 text-center lg:text-left backdrop-blur-sm"
        >
          <span className="block text-base sm:text-lg lg:text-xl font-black text-white">
            {stat.value}
          </span>
          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-400 leading-tight mt-0.5">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
