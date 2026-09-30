export default function HeroBadge({
  text = 'PM Surya Ghar Subsidy ₹78,000',
  pulse = true,
  className = '',
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/25 text-[11px] sm:text-xs font-bold text-[#00BFA6] tracking-wide shadow-sm ${className}`}
    >
      {pulse && <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse shrink-0" />}
      <span>{text}</span>
    </div>
  );
}
