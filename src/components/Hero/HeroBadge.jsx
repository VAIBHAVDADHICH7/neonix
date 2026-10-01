export default function HeroBadge({
  text = 'PM Surya Ghar Subsidy ₹78,000',
  pulse = true,
  className = '',
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-[11px] sm:text-xs font-bold text-[#0b7542] tracking-wide shadow-xs backdrop-blur-sm ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F9D58] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0b7542]" />
        </span>
      )}
      <span>{text}</span>
    </div>
  );
}

