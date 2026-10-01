import { DEFAULT_HERO_STATS } from './heroData';

export default function HeroStats({
  stats = DEFAULT_HERO_STATS,
  className = '',
}) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pt-3 sm:pt-5 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0 ${className}`}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/80 lg:bg-white/60 border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center lg:text-left backdrop-blur-sm shadow-xs hover:border-emerald-200 hover:shadow-sm transition-all"
        >
          <span className="block text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight">
            {stat.value}
          </span>
          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-tight mt-0.5">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

