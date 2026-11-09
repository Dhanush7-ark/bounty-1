"use client";

import { useId } from "react";

interface AnimatedGreenMonsterLayerProps {
  speedSeconds?: number;
  direction?: "left" | "right";
  opacity?: number;
  heightClass?: string;
  tileImageSrc?: string;
  glowIntensity?: number;
  glowColor?: string;
  scaleYVariation?: boolean;
  position?: "top" | "bottom";
}

/**
 * AnimatedGreenMonsterLayer
 * Renders small, cute monster flame hand silhouettes with glowing neon-green palm eyes,
 * scrolling seamlessly at 60 FPS.
 *
 * Supports both top-edge (hanging/dripping downward) and bottom-edge (reaching upward) positions.
 */
export function AnimatedGreenMonsterLayer({
  speedSeconds = 22,
  direction = "left",
  opacity = 1.0,
  heightClass = "h-[180px] sm:h-[220px] md:h-[250px]",
  tileImageSrc = "/green_monster_hands_tile.png",
  glowIntensity = 18,
  glowColor = "#00FF41",
  scaleYVariation = true,
  position = "bottom",
}: AnimatedGreenMonsterLayerProps) {
  const uniqueId = useId().replace(/:/g, "");
  const scrollAnimName = `greenMonsterScroll_${direction}_${uniqueId}`;
  const flickerAnimName = `greenMonsterFlicker_${uniqueId}`;

  const isTop = position === "top";

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
            opacity: ${Math.max(0.7, opacity * 0.94)};
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
          <filter id={`greenHeatDistort_${uniqueId}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.03"
              numOctaves="2"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.03; 0.014 0.038; 0.01 0.03"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="3.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`absolute inset-x-0 ${
          isTop ? "top-0" : "bottom-0"
        } ${heightClass} pointer-events-none overflow-hidden select-none z-10`}
        style={{
          filter: `drop-shadow(0 ${isTop ? "2px" : "-2px"} ${glowIntensity}px ${glowColor}) url(#greenHeatDistort_${uniqueId})`,
        }}
      >
        {/* Dual-Tile Endless Track */}
        <div
          className="w-[200%] h-full flex"
          style={{
            animation: `${scrollAnimName} ${speedSeconds}s linear infinite, ${
              scaleYVariation ? `${flickerAnimName} 3.6s ease-in-out infinite` : "none"
            }`,
            willChange: "transform",
          }}
        >
          {/* Tile 1 */}
          <div
            className={`w-1/2 h-full bg-repeat-x flex-shrink-0 ${
              isTop ? "bg-top" : "bg-bottom"
            }`}
            style={{
              backgroundImage: `url('${tileImageSrc}')`,
              backgroundSize: "auto 100%",
              backgroundPosition: isTop ? "left top" : "left bottom",
            }}
          />
          {/* Tile 2 (Seamless clone) */}
          <div
            className={`w-1/2 h-full bg-repeat-x flex-shrink-0 ${
              isTop ? "bg-top" : "bg-bottom"
            }`}
            style={{
              backgroundImage: `url('${tileImageSrc}')`,
              backgroundSize: "auto 100%",
              backgroundPosition: isTop ? "left top" : "left bottom",
            }}
          />
        </div>
      </div>
    </>
  );
}
