export default function HeroSlide({
  id,
  sectionTag,
  tagColor = 'text-[#0b7542]',
  title,
  description,
  image,
  imageAlt,
  personName,
  personRole,
  badgeLabel,
  badgeStyle = 'bg-emerald-50 text-[#0b7542] border-emerald-200/90',
  reverse = false,
  className = '',
}) {
  return (
    <div
      id={id}
      className={`scrolly-transition absolute w-full max-w-5xl mx-auto flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-3 sm:gap-6 lg:gap-14 transform translate-x-12 opacity-0 pointer-events-auto px-4 ${className}`}
    >
      {/* Visual Avatar / Card */}
      <div className="w-full md:w-5/12 flex justify-center">
        <div className="w-full max-w-[160px] sm:max-w-[220px] md:max-w-[320px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white/95 backdrop-blur-xl p-2 sm:p-3 ring-1 ring-slate-900/5">
          <div className="aspect-[4/3] sm:aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 relative">
            <img
              src={image}
              alt={imageAlt}
              fetchPriority="high"
              width="400"
              height="533"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>
          <div className="pt-2 sm:pt-3 pb-0.5 px-1 flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">{personName}</h3>
              <p className={`text-[9px] sm:text-[10px] ${tagColor} font-semibold uppercase tracking-wider`}>
                {personRole}
              </p>
            </div>
            {badgeLabel && (
              <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${badgeStyle}`}>
                {badgeLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Copy Content */}
      <div className="w-full md:w-7/12 space-y-1.5 sm:space-y-4 text-center md:text-left">
        {sectionTag && (
          <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] ${tagColor}`}>
            {sectionTag}
          </p>
        )}
        <h2 className="text-xl sm:text-3xl lg:text-5xl font-black text-slate-900 leading-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

