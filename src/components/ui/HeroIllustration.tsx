"use client";

export function HeroIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-[24px] border-[2.5px] border-[#b5f200] bg-[#0c120c] overflow-hidden shadow-[0_0_40px_rgba(181,242,0,0.2)] flex items-center justify-center">
      {/* Background glass wall with sticky notes and charts */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b1710" />
            <stop offset="50%" stopColor="#08100c" />
            <stop offset="100%" stopColor="#050a07" />
          </linearGradient>
          <linearGradient id="wallGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a2e22" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0e1a13" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="limeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b5f200" />
            <stop offset="100%" stopColor="#7cb300" />
          </linearGradient>
        </defs>

        {/* Room Background */}
        <rect width="800" height="600" fill="url(#bgGrad)" />

        {/* Back Wall Grid Lines & Glass Panels */}
        <path d="M 0 150 L 800 150 M 0 300 L 800 300 M 0 450 L 800 450" stroke="#1c3324" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <path d="M 200 0 L 200 600 M 400 0 L 400 600 M 600 0 L 600 600" stroke="#1c3324" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

        {/* Floating sticky notes & charts on the wall (Top Section) */}
        <g opacity="0.85">
          {/* Sticky Notes */}
          <rect x="50" y="40" width="42" height="42" rx="4" fill="#a4f33d" opacity="0.7" />
          <rect x="100" y="30" width="38" height="38" rx="4" fill="#75d023" opacity="0.6" />
          <rect x="60" y="90" width="35" height="35" rx="4" fill="#c3f86b" opacity="0.8" />
          
          <rect x="180" y="50" width="45" height="45" rx="4" fill="#a4f33d" opacity="0.65" />
          <rect x="235" y="35" width="40" height="40" rx="4" fill="#8ce829" opacity="0.75" />
          <rect x="195" y="105" width="36" height="36" rx="4" fill="#b5f200" opacity="0.7" />

          {/* Wall Dashboard Wireframes */}
          <rect x="320" y="40" width="160" height="110" rx="8" fill="url(#wallGlass)" stroke="#2f573d" strokeWidth="1.5" />
          <path d="M 335 70 L 365 55 L 395 80 L 425 60 L 460 90" stroke="#b5f200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="460" cy="90" r="4" fill="#b5f200" />
          <line x1="335" y1="120" x2="400" y2="120" stroke="#487856" strokeWidth="3" strokeLinecap="round" />
          <line x1="410" y1="120" x2="455" y2="120" stroke="#b5f200" strokeWidth="3" strokeLinecap="round" />

          {/* Right Sticky Notes Cluster */}
          <rect x="520" y="35" width="40" height="40" rx="4" fill="#8ce829" opacity="0.7" />
          <rect x="570" y="45" width="44" height="44" rx="4" fill="#c3f86b" opacity="0.8" />
          <rect x="530" y="85" width="38" height="38" rx="4" fill="#a4f33d" opacity="0.6" />

          <rect x="650" y="30" width="46" height="46" rx="4" fill="#b5f200" opacity="0.7" />
          <rect x="705" y="45" width="38" height="38" rx="4" fill="#75d023" opacity="0.65" />
          <rect x="665" y="85" width="42" height="42" rx="4" fill="#a4f33d" opacity="0.75" />
        </g>

        {/* Conference Room Window Frame / Perspective lines */}
        <rect x="20" y="20" width="760" height="560" rx="16" fill="none" stroke="#25422f" strokeWidth="2" opacity="0.5" />

        {/* Conference Table */}
        <ellipse cx="400" cy="500" rx="350" ry="90" fill="#0d1f14" stroke="#1f3d29" strokeWidth="4" />
        <ellipse cx="400" cy="495" rx="340" ry="80" fill="#122619" />
        
        {/* Table Top Surface Reflection */}
        <ellipse cx="400" cy="485" rx="300" ry="60" fill="#193322" opacity="0.7" />

        {/* ── SEATED BUSINESSMEN ── */}
        
        {/* Person 1 (Far Left - Side view left chair) */}
        <g id="person-left-far">
          {/* Chair */}
          <rect x="95" y="310" width="45" height="110" rx="10" fill="#080e0a" stroke="#1b3022" strokeWidth="2" />
          <rect x="90" y="415" width="55" height="40" rx="8" fill="#0c1711" />
          {/* Body */}
          <path d="M 115 350 C 135 350 145 370 145 420 L 105 420 Z" fill="#182c20" />
          {/* Head & Hair */}
          <circle cx="125" cy="330" r="16" fill="#ca9a78" />
          <path d="M 112 322 C 112 312 135 310 138 322 Z" fill="#2d1d13" />
          {/* Suit Collar & Tie */}
          <path d="M 125 346 L 129 365 L 125 375 L 121 365 Z" fill="#b5f200" />
          <path d="M 116 346 L 125 356 L 134 346" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* Person 2 (Center Left - Seated, facing laptop) */}
        <g id="person-center-left">
          {/* Chair */}
          <rect x="235" y="330" width="50" height="120" rx="12" fill="#080e0a" stroke="#1b3022" strokeWidth="2" />
          {/* Body Suit */}
          <path d="M 230 380 C 230 370 290 370 290 380 L 300 460 L 220 460 Z" fill="#1b3324" />
          <path d="M 250 375 L 260 410 L 270 375" fill="#ffffff" />
          <path d="M 260 380 L 263 425 L 260 435 L 257 425 Z" fill="#b5f200" />
          {/* Head & Hair */}
          <circle cx="260" cy="345" r="18" fill="#dfb393" />
          <path d="M 245 340 C 245 328 275 325 275 340 Z" fill="#1f140e" />
          {/* Arm holding phone/tablet */}
          <path d="M 285 410 L 305 425 L 295 435" stroke="#1b3324" strokeWidth="12" strokeLinecap="round" />
          <rect x="298" y="415" width="14" height="24" rx="2" fill="#b5f200" transform="rotate(15 298 415)" />
        </g>

        {/* Person 3 (Center Right - Facing left, working on laptop) */}
        <g id="person-center-right">
          {/* Chair */}
          <rect x="515" y="330" width="50" height="120" rx="12" fill="#080e0a" stroke="#1b3022" strokeWidth="2" />
          {/* Body Suit */}
          <path d="M 510 380 C 510 370 570 370 570 380 L 580 460 L 500 460 Z" fill="#182e20" />
          <path d="M 530 375 L 540 410 L 550 375" fill="#ffffff" />
          <path d="M 540 380 L 543 425 L 540 435 L 537 425 Z" fill="#c3f86b" />
          {/* Head */}
          <circle cx="540" cy="345" r="18" fill="#c89674" />
          <path d="M 525 340 C 525 328 555 325 555 340 Z" fill="#3a2518" />
        </g>

        {/* Person 4 (Far Right - Side view right chair) */}
        <g id="person-right-far">
          {/* Chair */}
          <rect x="660" y="310" width="45" height="110" rx="10" fill="#080e0a" stroke="#1b3022" strokeWidth="2" />
          <rect x="655" y="415" width="55" height="40" rx="8" fill="#0c1711" />
          {/* Body */}
          <path d="M 655 420 C 655 370 665 350 685 350 L 695 420 Z" fill="#132419" />
          {/* Head */}
          <circle cx="675" cy="330" r="16" fill="#d9a888" />
          <path d="M 662 322 C 662 312 685 310 688 322 Z" fill="#191919" />
          {/* Suit Tie */}
          <path d="M 675 346 L 679 365 L 675 375 L 671 365 Z" fill="#b5f200" />
        </g>

        {/* ── LAPTOPS ON THE TABLE ── */}
        
        {/* Laptop 1 (Left) */}
        <g id="laptop-left">
          <polygon points="180,450 240,450 250,470 170,470" fill="#2d4234" stroke="#496651" strokeWidth="1.5" />
          <polygon points="185,410 235,410 240,450 180,450" fill="#0a120c" stroke="#b5f200" strokeWidth="2" />
          <rect x="190" y="415" width="40" height="30" fill="#b5f200" opacity="0.25" />
          <line x1="195" y1="425" x2="225" y2="425" stroke="#b5f200" strokeWidth="2" />
          <line x1="195" y1="433" x2="215" y2="433" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* Laptop 2 (Center Right) */}
        <g id="laptop-right">
          <polygon points="460,450 520,450 530,470 450,470" fill="#2d4234" stroke="#496651" strokeWidth="1.5" />
          <polygon points="465,410 515,410 520,450 460,450" fill="#0a120c" stroke="#b5f200" strokeWidth="2" />
          <rect x="470" y="415" width="40" height="30" fill="#b5f200" opacity="0.25" />
          <line x1="475" y1="425" x2="505" y2="425" stroke="#b5f200" strokeWidth="2" />
          <line x1="475" y1="433" x2="498" y2="433" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* Glowing Table Edge Accent Line */}
        <ellipse cx="400" cy="500" rx="340" ry="78" fill="none" stroke="#b5f200" strokeWidth="1.5" opacity="0.4" />
      </svg>

      {/* Floating subtle badge overlay on image bottom */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#b5f200]/30 text-xs font-mono text-neutral-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b5f200] animate-pulse" />
          <span className="text-[#b5f200] font-semibold">AI AUTOMATION HUB</span>
        </div>
        <span className="text-neutral-400 text-[10px]">BOUNTY BYTES STUDIO</span>
      </div>
    </div>
  );
}
