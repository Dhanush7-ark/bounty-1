"use client";

import { ArrowRight } from "lucide-react";

export const SERVICES_DATA = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Digital marketing is the promotion of products and services using digital channels, such as websites, social media, search engines, and mobile applications. It involves various strategies to connect with potential customers online, enhance brand visibility, and engage audiences effectively.",
    color: "from-amber-500/20 via-teal-900/30 to-black",
    borderColor: "group-hover:border-amber-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#040b11" />
        <circle cx="40" cy="30" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="270" cy="40" r="1.5" fill="#b5f200" opacity="0.9" />
        <circle cx="230" cy="170" r="1" fill="#ffffff" opacity="0.6" />
        <circle cx="70" cy="160" r="1.2" fill="#ffffff" opacity="0.7" />

        {/* Space Planet with Rings */}
        <ellipse cx="230" cy="130" rx="35" ry="10" fill="none" stroke="#b5f200" strokeWidth="1.5" opacity="0.5" transform="rotate(-15 230 130)" />
        <circle cx="230" cy="130" r="18" fill="#0c2e1b" stroke="#10b981" strokeWidth="1.5" />
        <ellipse cx="230" cy="130" rx="35" ry="10" fill="none" stroke="#b5f200" strokeWidth="1.5" opacity="0.8" transform="rotate(-15 230 130)" clipPath="polygon(0 0, 300 0, 300 130, 0 130)" />

        {/* Space Satellite Station */}
        <path d="M 60 70 L 100 50 M 80 60 L 130 90 M 110 80 L 150 60" stroke="#00ffcc" strokeWidth="2" />
        {/* Solar Panels */}
        <rect x="35" y="55" width="30" height="18" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-20 50 64)" />
        <rect x="145" y="45" width="30" height="18" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-20 160 54)" />
        {/* Main Station Core */}
        <rect x="85" y="55" width="40" height="24" rx="4" fill="#0f172a" stroke="#b5f200" strokeWidth="2" />
        <circle cx="105" cy="67" r="4" fill="#b5f200" className="animate-pulse" />

        {/* Holographic Laser Signal Data Beams */}
        <path d="M 105 79 L 230 130" stroke="#b5f200" strokeWidth="2" strokeDasharray="4 4" opacity="0.9" />
        <path d="M 105 79 L 170 145 L 230 130" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.7" />

        {/* Space Analytics Bar Chart */}
        <rect x="60" y="140" width="14" height="25" rx="2" fill="#f59e0b" opacity="0.9" />
        <rect x="80" y="125" width="14" height="40" rx="2" fill="#10b981" opacity="0.9" />
        <rect x="100" y="110" width="14" height="55" rx="2" fill="#00ffcc" />
        <rect x="120" y="95" width="14" height="70" rx="2" fill="#b5f200" />
        <path d="M 60 140 L 80 125 L 100 110 L 120 95" stroke="#b5f200" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Development",
    description:
      "In web development, AI improves user experience through personalized content and automated testing. It enhances security by monitoring for suspicious activities and helps manage dynamic content. Examples include chatbots for customer service and code optimization tools for developers.",
    color: "from-purple-900/30 via-indigo-950/40 to-black",
    borderColor: "group-hover:border-purple-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#090514" />
        <circle cx="30" cy="40" r="1.2" fill="#ffffff" opacity="0.8" />
        <circle cx="260" cy="30" r="1.5" fill="#c084fc" opacity="0.9" />
        <circle cx="240" cy="160" r="1" fill="#ffffff" opacity="0.7" />

        {/* Deep Space Planet */}
        <circle cx="50" cy="140" r="30" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
        <ellipse cx="50" cy="140" rx="50" ry="12" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.7" transform="rotate(-20 50 140)" />

        {/* Spatial Holographic Smartphone in Zero-Gravity */}
        <rect x="110" y="25" width="95" height="150" rx="16" fill="#130e2e" stroke="#a855f7" strokeWidth="2" transform="rotate(8 157 100)" />
        <rect x="145" y="32" width="25" height="4" rx="2" fill="#4c1d95" transform="rotate(8 157 100)" />

        {/* Floating Holographic UI Components */}
        <rect x="122" y="48" width="70" height="32" rx="6" fill="#2e1065" stroke="#c084fc" strokeWidth="1" transform="rotate(8 157 100)" />
        <circle cx="138" cy="64" r="6" fill="#b5f200" transform="rotate(8 157 100)" />
        <line x1="150" y1="60" x2="180" y2="60" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" transform="rotate(8 157 100)" />

        {/* Orbiting Space Code Nodes */}
        <circle cx="230" cy="65" r="16" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" opacity="0.8" />
        <polygon points="230,55 238,70 222,70" fill="#b5f200" />
        <path d="M 190 60 L 230 65 M 190 120 L 240 130" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    id: "ai-ml-services",
    title: "AI/ML Services",
    description:
      "Artificial Intelligence (AI) and Machine Learning (ML) services are transforming various industries by enabling businesses to automate processes, gain valuable insights from data, and deliver personalized experiences. These services leverage advanced algorithms and models to process large amounts of data and make intelligent decisions.",
    color: "from-blue-900/30 via-indigo-900/40 to-black",
    borderColor: "group-hover:border-blue-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#040914" />
        <circle cx="50" cy="30" r="1.5" fill="#38bdf8" opacity="0.9" />
        <circle cx="250" cy="160" r="1" fill="#ffffff" opacity="0.8" />

        {/* Cosmic Nebula Glow */}
        <circle cx="150" cy="90" r="70" fill="#1e3a8a" opacity="0.3" filter="blur(10px)" />

        {/* Cybernetic Space Astronaut AI Head */}
        <ellipse cx="150" cy="145" rx="65" ry="18" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="120" y="45" width="60" height="55" rx="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Glowing Visor & AI Neural Core */}
        <rect x="128" y="58" width="44" height="20" rx="8" fill="#0284c7" />
        <ellipse cx="142" cy="68" rx="5" ry="5" fill="#b5f200" className="animate-pulse" />
        <ellipse cx="158" cy="68" rx="5" ry="5" fill="#b5f200" className="animate-pulse" />

        {/* Neural Network Space Nodes */}
        <circle cx="70" cy="70" r="5" fill="#38bdf8" />
        <circle cx="85" cy="110" r="4" fill="#b5f200" />
        <circle cx="230" cy="75" r="5" fill="#38bdf8" />
        <circle cx="215" cy="115" r="4" fill="#b5f200" />
        <path d="M 70 70 L 120 70 M 85 110 L 120 85 M 230 75 L 180 70 M 215 115 L 180 85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    id: "desktop-dev",
    title: "Desktop Development",
    description:
      "Desktop development involves creating software applications specifically designed to run on personal computers or laptops. These applications utilize the system's resources and operate within various operating systems such as Windows, macOS, and Linux.",
    color: "from-cyan-900/30 via-slate-900/40 to-black",
    borderColor: "group-hover:border-cyan-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#030c14" />
        <circle cx="40" cy="40" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="270" cy="30" r="1.5" fill="#22d3ee" opacity="0.9" />

        {/* Sci-Fi Spacecraft Cockpit Frame */}
        <polygon points="10,10 290,10 270,180 30,180" fill="none" stroke="#155e75" strokeWidth="2" opacity="0.6" />

        {/* Floating Holographic Desktop Code Viewport */}
        <rect x="45" y="25" width="210" height="135" rx="8" fill="#082f49" stroke="#06b6d4" strokeWidth="2" opacity="0.9" />

        {/* Space Code Lines & Laser Grids */}
        <line x1="60" y1="45" x2="120" y2="45" stroke="#b5f200" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="45" x2="190" y2="45" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="65" x2="150" y2="65" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="85" x2="170" y2="85" stroke="#b5f200" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="105" x2="130" y2="105" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" />

        {/* Orbital Radar Screen */}
        <circle cx="215" cy="110" r="20" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="215" y1="90" x2="215" y2="130" stroke="#22d3ee" strokeWidth="1" />
        <line x1="195" y1="110" x2="235" y2="110" stroke="#22d3ee" strokeWidth="1" />
        <circle cx="222" cy="103" r="2.5" fill="#b5f200" />
      </svg>
    ),
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    description:
      "Graphic design is the art and practice of creating visual content to communicate ideas and messages effectively. It involves combining elements such as typography, images, colors, and shapes to create aesthetically pleasing and informative designs. Graphic designers work across various mediums, including print materials, digital interfaces, and brand identities.",
    color: "from-pink-900/30 via-rose-950/40 to-black",
    borderColor: "group-hover:border-pink-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#120512" />
        <circle cx="30" cy="30" r="1.5" fill="#f43f5e" opacity="0.9" />
        <circle cx="260" cy="40" r="1.2" fill="#ffffff" opacity="0.8" />

        {/* Space Planet Ring in Studio */}
        <ellipse cx="150" cy="110" rx="90" ry="24" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity="0.6" transform="rotate(-10 150 110)" />

        {/* Cosmic 3D Spatial Spheres & Color Ribbons */}
        <circle cx="100" cy="75" r="24" fill="#f43f5e" stroke="#fb7185" strokeWidth="2" opacity="0.9" />
        <circle cx="150" cy="90" r="20" fill="#b5f200" stroke="#d9f99d" strokeWidth="2" />
        <circle cx="190" cy="65" r="28" fill="#a855f7" stroke="#c084fc" strokeWidth="2" opacity="0.85" />

        {/* Glowing Geometric Vector Pyramids */}
        <polygon points="120,125 150,65 175,135" fill="none" stroke="#fb7185" strokeWidth="2" />
        <line x1="150" y1="65" x2="150" y2="135" stroke="#b5f200" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "ai-agents",
    title: "AI Agents Development",
    description:
      "AI agents development focuses on building autonomous intelligent systems that analyze environments, learn from data, and execute complex business workflows with minimum human intervention.",
    color: "from-teal-900/30 via-slate-900/40 to-black",
    borderColor: "group-hover:border-teal-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#031213" />
        <circle cx="40" cy="30" r="1.2" fill="#2dd4bf" opacity="0.9" />
        <circle cx="270" cy="160" r="1" fill="#ffffff" opacity="0.8" />

        {/* Space Asteroid Field Matrix */}
        <polygon points="40,80 55,65 70,75 60,95 45,90" fill="#132e30" stroke="#0d9488" strokeWidth="1" />
        <polygon points="230,130 250,115 265,125 255,145 235,140" fill="#132e30" stroke="#0d9488" strokeWidth="1" />

        {/* Autonomous Space Drone AI Probe */}
        <circle cx="150" cy="90" r="28" fill="#0f292a" stroke="#2dd4bf" strokeWidth="2.5" />
        <circle cx="150" cy="90" r="14" fill="#14b8a6" />
        <circle cx="150" cy="90" r="6" fill="#b5f200" className="animate-pulse" />

        {/* Scanning Laser Beams */}
        <path d="M 150 118 L 100 170 M 150 118 L 200 170" stroke="#b5f200" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="100" y1="170" x2="200" y2="170" stroke="#2dd4bf" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description:
      "Cyber security services safeguard digital assets, enterprise networks, and cloud infrastructures against unauthorized access, cyber threats, ransomware, and data breaches.",
    color: "from-emerald-900/30 via-teal-950/40 to-black",
    borderColor: "group-hover:border-emerald-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#031410" />
        <circle cx="50" cy="30" r="1.5" fill="#34d399" opacity="0.9" />

        {/* Protected Space Planet */}
        <circle cx="150" cy="100" r="32" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />

        {/* Planetary Orbital Forcefield Shield Matrix */}
        <circle cx="150" cy="100" r="52" fill="none" stroke="#b5f200" strokeWidth="2" strokeDasharray="6 4" opacity="0.85" />
        <ellipse cx="150" cy="100" rx="70" ry="20" fill="none" stroke="#34d399" strokeWidth="1.5" transform="rotate(-15 150 100)" />

        {/* 3D Holographic Security Padlock in Space */}
        <rect x="130" y="85" width="40" height="32" rx="6" fill="#022c22" stroke="#b5f200" strokeWidth="2" />
        <path d="M 136 85 C 136 72 164 72 164 85" fill="none" stroke="#34d399" strokeWidth="2.5" />
        <circle cx="150" cy="101" r="4" fill="#b5f200" />
      </svg>
    ),
  },
  {
    id: "it-infrastructures",
    title: "IT Infrastructures",
    description:
      "IT infrastructure solutions deliver scalable network architectures, high-performance data center servers, and reliable enterprise system management for seamless operational performance.",
    color: "from-teal-950/40 via-emerald-950/40 to-black",
    borderColor: "group-hover:border-teal-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#031413" />
        <circle cx="30" cy="40" r="1.2" fill="#ffffff" opacity="0.8" />

        {/* Sci-Fi Space Station Server Racks Corridor */}
        <polygon points="15,15 115,35 115,175 15,195" fill="#092827" stroke="#14b8a6" strokeWidth="1.5" />
        <polygon points="285,15 185,35 185,175 285,195" fill="#092827" stroke="#14b8a6" strokeWidth="1.5" />

        {/* Space Server LED Status Lights */}
        <line x1="30" y1="55" x2="100" y2="65" stroke="#b5f200" strokeWidth="3" />
        <line x1="30" y1="85" x2="100" y2="95" stroke="#2dd4bf" strokeWidth="3" />
        <line x1="30" y1="115" x2="100" y2="125" stroke="#10b981" strokeWidth="3" />
        <line x1="270" y1="55" x2="200" y2="65" stroke="#b5f200" strokeWidth="3" />
        <line x1="270" y1="85" x2="200" y2="95" stroke="#2dd4bf" strokeWidth="3" />
        <line x1="270" y1="115" x2="200" y2="125" stroke="#10b981" strokeWidth="3" />

        {/* Deep Space Nebula in Center Corridor */}
        <circle cx="150" cy="105" r="25" fill="#0d9488" opacity="0.3" filter="blur(8px)" />
        <line x1="150" y1="35" x2="150" y2="175" stroke="#b5f200" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    ),
  },
  {
    id: "cloud-applications",
    title: "Cloud Applications",
    description:
      "Cloud applications leverage distributed cloud computing networks to deliver high-availability, fault-tolerant, and globally scalable software services anytime, anywhere.",
    color: "from-sky-900/30 via-blue-950/40 to-black",
    borderColor: "group-hover:border-sky-400/50",
    renderVisual: () => (
      <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 300 200" fill="none">
        {/* Deep Space Background */}
        <rect width="300" height="200" fill="#030e1a" />
        <circle cx="40" cy="30" r="1.5" fill="#38bdf8" opacity="0.9" />

        {/* Orbital Space Colony Matrix Base */}
        <ellipse cx="150" cy="155" rx="105" ry="32" fill="#072d4a" stroke="#0284c7" strokeWidth="1.5" />
        <ellipse cx="150" cy="155" rx="75" ry="22" stroke="#b5f200" strokeWidth="1" strokeDasharray="3 3" />

        {/* Glowing 3D Cosmic Space Cloud Constellation */}
        <path
          d="M 95 90 C 95 72 118 62 135 68 C 145 52 178 52 188 68 C 205 68 215 85 208 100 C 218 112 208 130 190 130 H 100 C 85 130 80 108 95 90 Z"
          fill="#0c4a6e"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />

        {/* Interconnected Space Data Rays */}
        <line x1="120" y1="130" x2="100" y2="155" stroke="#b5f200" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="150" y1="130" x2="150" y2="155" stroke="#38bdf8" strokeWidth="2" />
        <line x1="180" y1="130" x2="200" y2="155" stroke="#b5f200" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="150" cy="95" r="4" fill="#b5f200" className="animate-pulse" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Heading matching 1st image */}
      <div className="mb-12 text-center flex flex-col items-center">
        <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#b5f200] font-semibold mb-3">
          02 // OUR CORE SERVICES
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
          <span>We provide effective design solutions</span>
          <span className="inline-flex items-center text-[#b5f200] transform hover:rotate-45 transition-transform duration-300">
            <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.59 8.41L23 9.59L16.29 15.29L18.41 24L12 19.59L5.59 24L7.71 15.29L1 9.59L9.41 8.41L12 0Z" />
            </svg>
          </span>
        </h2>
      </div>

      {/* 3x3 Grid matching 1st image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className={`group relative rounded-2xl overflow-hidden border border-neutral-800 bg-gradient-to-b ${service.color} transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${service.borderColor} aspect-[4/3] flex flex-col items-center justify-center p-2 cursor-pointer`}
          >
            {/* Space Visual Illustration */}
            <div className="absolute inset-0 z-0">
              {service.renderVisual()}
            </div>

            {/* Default State: Dark glass center title pill badge */}
            <div className="relative z-10 px-5 py-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 shadow-xl max-w-[85%] text-center transition-all duration-300 group-hover:opacity-0">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                {service.title}
              </h3>
            </div>

            {/* Hover State: Exact detailed description overlay matching user reference images */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/92 backdrop-blur-md p-4 sm:p-5 flex flex-col items-center justify-between border-2 border-white/20 rounded-2xl shadow-2xl">
              {/* Top Row: Ps Icon & Yellow Title */}
              <div className="w-full flex flex-col items-center relative">
                <span className="absolute top-0 left-0 w-6 h-6 rounded bg-[#0081d6] flex items-center justify-center font-bold text-[11px] text-white shadow-md border border-white/30">
                  Ps
                </span>
                <h3 className="text-yellow-400 font-bold text-base sm:text-lg text-center leading-tight tracking-tight px-6 pt-0.5">
                  {service.title}
                </h3>
              </div>

              {/* Description Body */}
              <p className="text-white text-xs sm:text-sm font-normal leading-snug sm:leading-relaxed text-center px-1 py-2 flex-1 flex items-center justify-center">
                {service.description}
              </p>

              {/* Bottom White Arrow */}
              <div className="w-full flex items-center justify-center pt-1 text-white">
                <ArrowRight className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
