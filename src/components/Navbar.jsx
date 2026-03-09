export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/30 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a10 10 0 0 1 0 20"/>
            <path d="M12 7v5l3 3"/>
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl font-bold gradient-text leading-tight">
            Color Palette Generator
          </h1>
          <p className="text-[11px] text-[var(--text-muted)] font-medium tracking-wide">
            Generate beautiful color palettes instantly
          </p>
        </div>

        {/* Spacer + badge */}
        <div className="ml-auto">
          <span className="text-xs px-3 py-1 rounded-full glass border border-white/20 text-[var(--text-muted)] font-medium">
            ✦ Free Tool
          </span>
        </div>
      </div>
    </nav>
  );
}
