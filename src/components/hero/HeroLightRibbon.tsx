"use client";

import { useId } from "react";

export function HeroLightRibbon() {
  const id = useId().replace(/:/g, "_");

  // ─── 1. CORE CENTERLINE BEZIER PATH ───
  // Trajectory:
  // Starts top-right (1440, 70) -> sweeps down-left across top-right (1160, 140) -> (860, 260)
  // Curves into left corridor between columns (620, 390) -> (450, 460)
  // Forms dramatic glowing hairpin loop on the left: apex at (330, 530)
  // Sweeps out bottom of loop (340, 630) -> (480, 690) -> (700, 690)
  // Sweeps across lower half towards bottom-right (950, 680) -> (1200, 740) -> (1440, 800)
  const corePathD =
    "M 1440 70 C 1180 130, 880 250, 620 390 C 470 470, 320 475, 330 555 C 340 645, 500 700, 710 690 C 950 680, 1200 740, 1440 800";

  // ─── 2. COMPLEMENTARY 3D LOOP-BACK STRANDS (THE VORTEX SPIRAL BEHIND THE CARD) ───
  // Completes the 3D ribbon loop, wrapping gracefully behind the dashboard
  const spiralBackD1 =
    "M 330 555 C 310 440, 480 340, 720 300 C 980 260, 1250 200, 1440 160";
  const spiralBackD2 =
    "M 350 575 C 330 460, 500 360, 740 320 C 1000 280, 1260 220, 1440 180";

  // ─── 3. FANNED STRANDS (UPPER & INNER FILAMENTS - 12 STRANDS) ───
  // These fan out above the core ribbon, cascading down from top-right
  const innerFilaments = [
    {
      d: "M 1440 40 C 1170 100, 860 220, 600 360 C 450 440, 305 450, 315 530 C 325 615, 480 670, 680 660 C 920 650, 1170 710, 1440 770",
      stroke: "#FFFFFF",
      width: 1.0,
      opacity: 0.85,
      dash: "600 1200",
      speed: "16s",
      delay: "-2s",
    },
    {
      d: "M 1440 55 C 1175 115, 870 235, 610 375 C 460 455, 312 462, 322 542 C 332 630, 490 685, 695 675 C 935 665, 1185 725, 1440 785",
      stroke: "#EEFF60",
      width: 1.4,
      opacity: 0.75,
      dash: "550 1100",
      speed: "18s",
      delay: "-6s",
    },
    {
      d: "M 1440 85 C 1185 145, 890 265, 630 405 C 480 482, 328 488, 338 568 C 348 658, 510 712, 725 702 C 965 692, 1215 752, 1440 812",
      stroke: "#C6FF36",
      width: 1.6,
      opacity: 0.8,
      dash: "700 1300",
      speed: "15s",
      delay: "-9s",
    },
    {
      d: "M 1440 100 C 1190 160, 900 280, 640 420 C 490 495, 335 500, 345 580 C 355 670, 520 725, 740 715 C 980 705, 1230 765, 1440 825",
      stroke: "#D4FF38",
      width: 1.2,
      opacity: 0.65,
      dash: "450 950",
      speed: "20s",
      delay: "-4s",
    },
    {
      d: "M 1440 118 C 1200 175, 915 295, 655 435 C 505 510, 345 515, 355 595 C 365 685, 535 740, 755 730 C 995 720, 1245 780, 1440 840",
      stroke: "#C6FF36",
      width: 1.5,
      opacity: 0.55,
      dash: "500 1050",
      speed: "17s",
      delay: "-11s",
    },
    {
      d: "M 1440 135 C 1208 190, 928 310, 670 450 C 518 522, 355 528, 365 608 C 375 700, 548 752, 770 742 C 1010 732, 1260 792, 1440 852",
      stroke: "#AEEA00",
      width: 1.1,
      opacity: 0.5,
      dash: "620 1250",
      speed: "22s",
      delay: "-1s",
    },
    {
      d: "M 1440 152 C 1215 205, 940 325, 685 465 C 530 535, 365 540, 375 620 C 385 712, 560 765, 785 755 C 1025 745, 1275 805, 1440 865",
      stroke: "#C6FF36",
      width: 0.9,
      opacity: 0.4,
      dash: "400 900",
      speed: "19s",
      delay: "-7s",
    },
    {
      d: "M 1440 170 C 1225 220, 955 340, 700 480 C 542 548, 375 552, 385 632 C 395 725, 572 778, 800 768 C 1040 758, 1290 818, 1440 878",
      stroke: "#88CC14",
      width: 0.8,
      opacity: 0.35,
      dash: "480 1000",
      speed: "24s",
      delay: "-13s",
    },
    {
      d: "M 1440 25 C 1160 85, 845 205, 585 345 C 438 425, 298 438, 308 518 C 318 602, 468 655, 665 645 C 905 635, 1155 695, 1440 755",
      stroke: "#FFFFFF",
      width: 0.9,
      opacity: 0.7,
      dash: "350 850",
      speed: "14s",
      delay: "-3.5s",
    },
    {
      d: "M 1440 10 C 1150 70, 830 190, 570 330 C 425 410, 290 425, 300 505 C 310 590, 455 642, 650 632 C 890 622, 1140 682, 1440 742",
      stroke: "#C6FF36",
      width: 0.75,
      opacity: 0.35,
      dash: "500 1100",
      speed: "21s",
      delay: "-8s",
    },
    {
      d: "M 1440 190 C 1235 238, 970 355, 715 495 C 555 560, 385 565, 395 645 C 405 738, 585 790, 815 780 C 1055 770, 1305 830, 1440 890",
      stroke: "#7CB342",
      width: 0.75,
      opacity: 0.25,
      dash: "420 920",
      speed: "26s",
      delay: "-15s",
    },
    {
      d: "M 1440 210 C 1245 255, 985 370, 730 510 C 568 572, 395 578, 405 658 C 415 750, 598 802, 830 792 C 1070 782, 1320 842, 1440 902",
      stroke: "#689F38",
      width: 0.65,
      opacity: 0.2,
      dash: "380 880",
      speed: "28s",
      delay: "-5s",
    },
  ];

  // ─── 4. FANNED STRANDS (LOWER & OUTER FILAMENTS - 12 STRANDS) ───
  // These fan out around the outer edge of the loop and sweep across bottom
  const outerFilaments = [
    {
      d: "M 1440 78 C 1182 138, 882 258, 622 398 C 472 476, 322 482, 332 562 C 342 652, 502 708, 712 698 C 952 688, 1202 748, 1440 808",
      stroke: "#FFFFFF",
      width: 1.2,
      opacity: 0.9,
      dash: "580 1150",
      speed: "17s",
      delay: "-4s",
    },
    {
      d: "M 1440 92 C 1188 152, 892 272, 632 412 C 482 488, 328 495, 338 575 C 348 665, 512 720, 728 710 C 968 700, 1218 760, 1440 820",
      stroke: "#EEFF60",
      width: 1.5,
      opacity: 0.85,
      dash: "640 1280",
      speed: "16s",
      delay: "-10s",
    },
    {
      d: "M 1440 108 C 1195 168, 905 288, 645 428 C 492 502, 335 508, 345 588 C 355 678, 525 732, 742 722 C 982 712, 1232 772, 1440 832",
      stroke: "#C6FF36",
      width: 1.8,
      opacity: 0.8,
      dash: "520 1080",
      speed: "19s",
      delay: "-1s",
    },
    {
      d: "M 1440 125 C 1202 182, 918 302, 658 442 C 502 514, 342 520, 352 600 C 362 690, 538 745, 758 735 C 998 725, 1248 785, 1440 845",
      stroke: "#D4FF38",
      width: 1.3,
      opacity: 0.65,
      dash: "460 980",
      speed: "15s",
      delay: "-7s",
    },
    {
      d: "M 1440 142 C 1210 198, 930 318, 672 458 C 512 528, 348 532, 358 612 C 368 702, 550 758, 772 748 C 1012 738, 1262 798, 1440 858",
      stroke: "#C6FF36",
      width: 1.4,
      opacity: 0.55,
      dash: "600 1220",
      speed: "21s",
      delay: "-12s",
    },
    {
      d: "M 1440 160 C 1218 212, 942 332, 685 472 C 522 540, 355 545, 365 625 C 375 715, 562 770, 788 760 C 1028 750, 1278 810, 1440 870",
      stroke: "#AEEA00",
      width: 1.0,
      opacity: 0.45,
      dash: "420 920",
      speed: "23s",
      delay: "-5s",
    },
    {
      d: "M 1440 178 C 1225 228, 955 348, 700 488 C 532 552, 362 558, 372 638 C 382 728, 575 782, 802 772 C 1042 762, 1292 822, 1440 882",
      stroke: "#C6FF36",
      width: 0.85,
      opacity: 0.4,
      dash: "540 1120",
      speed: "18s",
      delay: "-8.5s",
    },
    {
      d: "M 1440 195 C 1232 242, 968 362, 715 502 C 542 565, 368 570, 378 650 C 388 740, 588 795, 818 785 C 1058 775, 1308 835, 1440 895",
      stroke: "#88CC14",
      width: 0.75,
      opacity: 0.3,
      dash: "380 860",
      speed: "25s",
      delay: "-14s",
    },
    {
      d: "M 1440 62 C 1178 122, 875 242, 615 382 C 465 462, 318 470, 328 550 C 338 638, 495 692, 702 682 C 942 672, 1192 732, 1440 792",
      stroke: "#FFFFFF",
      width: 1.1,
      opacity: 0.85,
      dash: "620 1260",
      speed: "16.5s",
      delay: "-3s",
    },
    {
      d: "M 1440 215 C 1240 258, 980 378, 730 518 C 552 578, 375 582, 385 662 C 395 752, 600 808, 832 798 C 1072 788, 1322 848, 1440 908",
      stroke: "#7CB342",
      width: 0.7,
      opacity: 0.25,
      dash: "480 1020",
      speed: "27s",
      delay: "-11s",
    },
    {
      d: "M 1440 235 C 1248 272, 992 392, 745 532 C 562 590, 382 595, 392 675 C 402 765, 612 820, 848 810 C 1088 800, 1338 860, 1440 920",
      stroke: "#689F38",
      width: 0.65,
      opacity: 0.2,
      dash: "440 940",
      speed: "29s",
      delay: "-6.5s",
    },
    {
      d: "M 1440 255 C 1255 288, 1005 408, 760 548 C 572 602, 388 608, 398 688 C 408 778, 625 832, 862 822 C 1102 812, 1352 872, 1440 932",
      stroke: "#558B2F",
      width: 0.6,
      opacity: 0.15,
      dash: "400 900",
      speed: "31s",
      delay: "-16s",
    },
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* ─── OPTICAL VOLUMETRIC GLOW HOTSPOT (MATCHING PHOTO'S WHITE-HOT BLOOM) ─── */}
      {/* 1. Primary Apex Lens Flare Bloom at (x: 23%, y: 56%) */}
      <div
        className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full pointer-events-none blur-[65px] opacity-75"
        style={{
          left: "22%",
          top: "48%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255, 255, 240, 0.45) 0%, rgba(198, 255, 54, 0.32) 30%, rgba(174, 234, 0, 0.12) 60%, transparent 75%)",
          mixBlendMode: "screen",
        }}
      />

      {/* 2. Secondary Intense Center-Core Hotspot */}
      <div
        className="absolute w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full pointer-events-none blur-[35px] opacity-90"
        style={{
          left: "23%",
          top: "56%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(229, 255, 69, 0.5) 40%, rgba(198, 255, 54, 0.15) 70%, transparent 85%)",
          mixBlendMode: "screen",
        }}
      />

      {/* 3. Upper Right Ambient Light Spill */}
      <div
        className="absolute w-[550px] sm:w-[750px] h-[450px] sm:h-[550px] rounded-full pointer-events-none blur-[90px] opacity-50"
        style={{
          right: "-5%",
          top: "8%",
          background:
            "radial-gradient(circle, rgba(198, 255, 54, 0.18) 0%, rgba(138, 201, 38, 0.06) 50%, transparent 75%)",
          mixBlendMode: "screen",
        }}
      />

      {/* 4. Lower Right Trailing Aura */}
      <div
        className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full pointer-events-none blur-[80px] opacity-40"
        style={{
          right: "-5%",
          bottom: "5%",
          background:
            "radial-gradient(circle, rgba(198, 255, 54, 0.14) 0%, rgba(138, 201, 38, 0.04) 50%, transparent 75%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ─── HIGH-PRECISION SVG LIGHT RIBBON & MULTI-FILAMENT BUNDLE ─── */}
      <svg
        className="w-full h-full opacity-95 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Multi-stage Gaussian Bloom Filters */}
          <filter id={`bloomHot_${id}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feGaussianBlur stdDeviation="24" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`bloomStrand_${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`bloomWide_${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="32" result="wideBlur" />
            <feMerge>
              <feMergeNode in="wideBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients along the Ribbon Trajectory */}
          <linearGradient id={`gradHotCore_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6FF36" stopOpacity="0.25" />
            <stop offset="18%" stopColor="#EEFF60" stopOpacity="0.85" />
            <stop offset="38%" stopColor="#FFFFFF" stopOpacity="1.0" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="1.0" />
            <stop offset="72%" stopColor="#E5FF45" stopOpacity="0.9" />
            <stop offset="88%" stopColor="#C6FF36" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7CB342" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={`gradLimeRibbon_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7CB342" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#C6FF36" stopOpacity="0.75" />
            <stop offset="48%" stopColor="#EEFF60" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#C6FF36" stopOpacity="0.85" />
            <stop offset="88%" stopColor="#88CC14" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#558B2F" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`gradSpiralBack_${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6FF36" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#AEEA00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C6FF36" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ─── 1. 3D SPIRAL VORTEX BACKGROUND EXTENSION ─── */}
        <g opacity="0.45">
          <path
            d={spiralBackD1}
            fill="none"
            stroke={`url(#gradSpiralBack_${id})`}
            strokeWidth="1.6"
            strokeDasharray="300 900"
            style={{
              animation: "ribbonFlow 22s linear infinite",
            }}
          />
          <path
            d={spiralBackD2}
            fill="none"
            stroke="#C6FF36"
            strokeWidth="1.2"
            opacity="0.35"
            strokeDasharray="4 6"
          />
        </g>

        {/* ─── 2. BROAD VOLUMETRIC AURA OF MAIN RIBBON ─── */}
        <path
          d={corePathD}
          fill="none"
          stroke={`url(#gradLimeRibbon_${id})`}
          strokeWidth="68"
          opacity="0.22"
          filter={`url(#bloomWide_${id})`}
        />

        {/* ─── 3. SECONDARY GLOW RIBBON ─── */}
        <path
          d={corePathD}
          fill="none"
          stroke={`url(#gradHotCore_${id})`}
          strokeWidth="28"
          opacity="0.55"
          filter={`url(#bloomHot_${id})`}
        />

        {/* ─── 4. INNER FANNED FILAMENT STRANDS (12 SILKY THREADS) ─── */}
        <g filter={`url(#bloomStrand_${id})`}>
          {innerFilaments.map((f, i) => (
            <path
              key={`in-${i}`}
              d={f.d}
              fill="none"
              stroke={f.stroke}
              strokeWidth={f.width}
              opacity={f.opacity}
              strokeDasharray={f.dash}
              style={{
                animation: `ribbonFlow ${f.speed} linear infinite`,
                animationDelay: f.delay,
              }}
            />
          ))}
        </g>

        {/* ─── 5. OUTER FANNED FILAMENT STRANDS (12 SILKY THREADS) ─── */}
        <g filter={`url(#bloomStrand_${id})`}>
          {outerFilaments.map((f, i) => (
            <path
              key={`out-${i}`}
              d={f.d}
              fill="none"
              stroke={f.stroke}
              strokeWidth={f.width}
              opacity={f.opacity}
              strokeDasharray={f.dash}
              style={{
                animation: `ribbonFlow ${f.speed} linear infinite`,
                animationDelay: f.delay,
              }}
            />
          ))}
        </g>

        {/* ─── 6. THE INTENSE WHITE-HOT CORE BEAM (CENTER OF HAIRPIN LOOP) ─── */}
        {/* Mid intense chartreuse beam */}
        <path
          d={corePathD}
          fill="none"
          stroke="#E5FF45"
          strokeWidth="8.5"
          opacity="0.9"
          filter={`url(#bloomHot_${id})`}
          strokeDasharray="800 1600"
          style={{
            animation: "ribbonFlow 14s linear infinite",
          }}
        />

        {/* Ultra-hot pure white center stroke */}
        <path
          d={corePathD}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          opacity="0.98"
          filter={`url(#bloomStrand_${id})`}
          strokeDasharray="650 1400"
          style={{
            animation: "ribbonFlow 12s linear infinite",
          }}
        />

        {/* ─── 7. TRAVELING ENERGY SPARKS / PARTICLES FLOWING ALONG RIBBON ─── */}
        {/* Leading Spark 1 */}
        <g filter={`url(#bloomHot_${id})`}>
          <circle r="4.5" fill="#FFFFFF">
            <animateMotion
              path={corePathD}
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="12" fill="#C6FF36" opacity="0.75">
            <animateMotion
              path={corePathD}
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Follower Spark 2 */}
        <g filter={`url(#bloomHot_${id})`}>
          <circle r="3.5" fill="#FFFFFF">
            <animateMotion
              path={corePathD}
              dur="8.2s"
              begin="-2.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="9" fill="#EEFF60" opacity="0.6">
            <animateMotion
              path={corePathD}
              dur="8.2s"
              begin="-2.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Follower Spark 3 */}
        <g filter={`url(#bloomHot_${id})`}>
          <circle r="3" fill="#FFFFFF">
            <animateMotion
              path={corePathD}
              dur="10.5s"
              begin="-5.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="8" fill="#C6FF36" opacity="0.5">
            <animateMotion
              path={corePathD}
              dur="10.5s"
              begin="-5.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
