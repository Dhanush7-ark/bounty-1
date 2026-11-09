"use client";

import { useId } from "react";

interface AnimatedFlameLayerProps {
  speedSeconds?: number;
  direction?: "left" | "right";
  opacity?: number;
  heightClass?: string;
  tileImageSrc?: string;
  glowIntensity?: number;
  glowColor?: string;
  scaleYVariation?: boolean;
}

/**
 * AnimatedFlameLayer
 * Compact horizontal flame hands strip scrolling from right to left at 60 FPS.
 * Renders authentic licking flame tongues and grasping claw hands from the reference.
 */
export function AnimatedFlameLayer({
  speedSeconds = 22,
  direction = "left",
  opacity = 1.0,
  heightClass = "h-[180px] sm:h-[220px] md:h-[250px]",
  tileImageSrc = "/exact_flame_hands_tile.png",
  glowIntensity = 14,
  glowColor = "#FF1E38",
  scaleYVariation = true,
}: AnimatedFlameLayerProps) {
  const uniqueId = useId().replace(/:/g, "");
  const scrollAnimName = `flameScroll_${direction}_${uniqueId}`;
  const flickerAnimName = `flameFlicker_${uniqueId}`;

  return (
    <>
      <style>{`
        @keyframes ${scrollAnimName} {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes ${flickerAnimName} {
          0%, 100% {
            opacity: ${opacity};
            transform: scaleY(1);
          }
          33% {
            opacity: ${Math.max(0.65, opacity * 0.92)};
            transform: scaleY(1.025);
          }
          66% {
            opacity: ${Math.min(1.0, opacity * 1.05)};
            transform: scaleY(0.98);
          }
        }
      `}</style>

      {/* Organic heat distortion filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`flameHeatDistort_${uniqueId}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.03"
              numOctaves="2"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.03; 0.014 0.038; 0.01 0.03"
                dur="6s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`absolute inset-x-0 bottom-0 ${heightClass} pointer-events-none overflow-hidden select-none`}
        style={{
          filter: `drop-shadow(0 -2px ${glowIntensity}px ${glowColor}) url(#flameHeatDistort_${uniqueId})`,
        }}
      >
        {/* Dual-Tile Endless Track */}
        <div
          className="w-[200%] h-full flex"
          style={{
            animation: `${scrollAnimName} ${speedSeconds}s linear infinite, ${
              scaleYVariation ? `${flickerAnimName} 3.8s ease-in-out infinite` : "none"
            }`,
            willChange: "transform",
          }}
        >
          {/* Tile 1 */}
          <div
            className="w-1/2 h-full bg-repeat-x bg-bottom flex-shrink-0"
            style={{
              backgroundImage: `url('${tileImageSrc}')`,
              backgroundSize: "auto 100%",
              backgroundPosition: "left bottom",
            }}
          />
          {/* Tile 2 (Seamless loop clone) */}
          <div
            className="w-1/2 h-full bg-repeat-x bg-bottom flex-shrink-0"
            style={{
              backgroundImage: `url('${tileImageSrc}')`,
              backgroundSize: "auto 100%",
              backgroundPosition: "left bottom",
            }}
          />
        </div>
      </div>
    </>
  );
}
