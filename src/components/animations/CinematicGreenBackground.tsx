"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CinematicGreenBackgroundProps {
  className?: string;
  showEmblem?: boolean;
}

export function CinematicGreenBackground({
  className = "",
  showEmblem = true,
}: CinematicGreenBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll springs
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  // Emblem scale & rotation transform based on scroll
  const emblemScale = useTransform(smoothScroll, [0, 0.5, 1], [0.72, 1.12, 0.85]);
  const emblemRotate = useTransform(smoothScroll, [0, 0.5, 1], [-4, 0, 4]);
  const emblemY = useTransform(smoothScroll, [0, 0.5, 1], [40, 0, -40]);
  const emblemGlow = useTransform(smoothScroll, [0, 0.5, 1], [0.5, 1.0, 0.6]);

  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // WebGL Shader Engine for Organic Flame & Liquid-Ink Silhouette
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL support
    const gl =
      canvas.getContext("webgl2", { powerPreference: "high-performance", alpha: false }) ||
      canvas.getContext("webgl", { powerPreference: "high-performance", alpha: false });

    if (!gl) {
      console.warn("WebGL not supported, falling back to 2D canvas");
      return;
    }

    let animationFrameId: number;
    let startTime = performance.now();

    // Resize handler
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR at 1.5 for performance
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Organic flame-like & liquid-ink silhouettes with green palette
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_scroll;

      // Fast Simplex-style hash and noise
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      // 4-octave Fractional Brownian Motion with rotation
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.52;
        mat2 rot = mat2(cos(0.55), sin(0.55), -sin(0.55), cos(0.55));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.08 + vec2(14.2, -8.7);
          a *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.38;

        // Domain warping for organic liquid flames
        vec2 q = vec2(
          fbm(p * 1.4 + vec2(0.0, -t * 0.75)),
          fbm(p * 1.4 + vec2(4.8, -t * 0.65))
        );

        vec2 r = vec2(
          fbm(p * 2.1 + 3.8 * q + vec2(1.7, -t * 1.1)),
          fbm(p * 2.1 + 3.8 * q + vec2(7.9, -t * 0.95))
        );

        float f = fbm(p * 1.7 + 3.2 * r + vec2(0.0, -t * 0.45));

        // Rising liquid-ink / flame wall from bottom (matching reference video frames)
        float baseHeight = 0.58 + 0.18 * sin(t * 0.4) + u_scroll * 0.3;
        float flameDist = (1.0 - uv.y) - baseHeight + (f - 0.5) * 0.85;

        // Specified Palette
        vec3 colBg = vec3(0.012, 0.027, 0.016);          // #030704
        vec3 colDarkGreen = vec3(0.024, 0.239, 0.125);   // #063D20
        vec3 colDeepEmerald = vec3(0.0, 0.561, 0.298);    // #008F4C
        vec3 colNeonGreen = vec3(0.0, 1.0, 0.522);        // #00FF85
        vec3 colHighlight = vec3(0.224, 1.0, 0.612);      // #39FF9C

        // Sharp liquid flame edge thresholds
        float edge = smoothstep(-0.045, 0.045, flameDist);
        float glowEdge = smoothstep(-0.22, 0.08, flameDist);
        float highlightRim = smoothstep(-0.02, 0.02, flameDist) * (1.0 - smoothstep(0.02, 0.065, flameDist));

        // Deep internal shading
        float internalDepth = clamp((flameDist + 0.35) / 0.7, 0.0, 1.0);
        vec3 flameCol = mix(colDarkGreen, colDeepEmerald, internalDepth);
        flameCol = mix(flameCol, colNeonGreen, pow(internalDepth, 2.8) * 0.9);

        // Final color composition with dramatic cinematic contrast
        vec3 finalCol = mix(colBg, flameCol, glowEdge);
        finalCol += colHighlight * highlightRim * 2.0;
        finalCol += colNeonGreen * (1.0 - edge) * pow(f, 3.2) * 0.45;

        // Vignette around edges to focus center emblem
        float vignette = 1.0 - length(uv - 0.5) * 0.65;
        finalCol *= clamp(vignette, 0.25, 1.0);

        gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    // Helper: Compile Shader
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering screen
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uScroll = gl.getUniformLocation(program, "u_scroll");

    // Render loop
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, reducedMotion ? 0 : elapsed);
      gl.uniform1f(uScroll, smoothScroll.get());

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [smoothScroll, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#030704] select-none ${className}`}
      style={{
        boxShadow: "inset 0 0 120px rgba(3, 7, 4, 0.95)",
      }}
    >
      {/* ─── LAYER 1: GPU WEBGL FLUID FLAME BACKGROUND ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ filter: "contrast(115%) brightness(105%)" }}
      />

      {/* ─── LAYER 2: FLOATING GREEN EMBER PARTICLES ─── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00FF85] opacity-60 filter blur-[1px]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${(i * 7.5 + 4) % 96}%`,
              bottom: "-5%",
              boxShadow: "0 0 8px #00FF85",
              animation: `particleFlow ${7 + (i % 5) * 2}s linear infinite`,
              animationDelay: `-${(i * 1.3) % 8}s`,
            }}
          />
        ))}
      </div>

      {/* ─── LAYER 3: SYMMETRICAL TRIBAL-FLAME EMBLEM (MATCHING REFERENCE) ─── */}
      {showEmblem && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{
            scale: emblemScale,
            rotate: emblemRotate,
            y: emblemY,
          }}
        >
          {/* Ambient Emblem Halo Bloom */}
          <motion.div
            className="absolute w-[500px] sm:w-[750px] h-[350px] sm:h-[500px] rounded-full blur-[70px] pointer-events-none"
            style={{
              opacity: emblemGlow,
              background:
                "radial-gradient(ellipse at center, rgba(0, 255, 133, 0.32) 0%, rgba(0, 143, 76, 0.15) 45%, transparent 75%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Symmetrical Cyber-Tribal Flame Winged Emblem Vector */}
          <div className="relative w-[340px] sm:w-[560px] md:w-[720px] lg:w-[860px] h-auto">
            <svg
              className="w-full h-auto filter drop-shadow-[0_0_22px_rgba(0,255,133,0.65)] drop-shadow-[0_0_55px_rgba(0,255,133,0.3)]"
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Luminous Neon Gradient */}
                <linearGradient id="emblemNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#39FF9C" />
                  <stop offset="35%" stopColor="#00FF85" />
                  <stop offset="70%" stopColor="#008F4C" />
                  <stop offset="100%" stopColor="#063D20" />
                </linearGradient>

                {/* Symmetrical Rim Filter */}
                <filter id="emblemGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur1" />
                  <feGaussianBlur stdDeviation="12" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ─── LEFT WING (ORGANIC FLAME BARBS & THORNS) ─── */}
              <g id="leftWing">
                {/* Primary Upper Flame Wing */}
                <path
                  d="M 500 300 C 470 200, 390 100, 260 50 C 310 110, 360 210, 380 290 C 330 240, 240 180, 130 150 C 190 220, 260 280, 330 330 C 260 320, 170 320, 80 340 C 160 380, 250 395, 330 400 C 240 430, 140 470, 70 540 C 160 510, 260 470, 340 440 C 270 480, 190 530, 120 590 C 220 560, 330 500, 410 440 C 450 400, 480 350, 500 300 Z"
                  fill="#063D20"
                  stroke="#00FF85"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Secondary Sharp Barb Overlays */}
                <path
                  d="M 440 240 C 390 150, 320 80, 220 40 C 280 110, 330 190, 360 270 Z"
                  fill="#008F4C"
                  stroke="#39FF9C"
                  strokeWidth="1.5"
                  opacity="0.9"
                />

                <path
                  d="M 380 330 C 300 280, 220 230, 130 200 C 190 260, 260 310, 330 350 Z"
                  fill="#00FF85"
                  opacity="0.8"
                />

                {/* Lower Curling Thorn Tendril */}
                <path
                  d="M 420 440 C 360 480, 280 520, 180 560 C 270 530, 350 480, 400 440 Z"
                  fill="#00FF85"
                  stroke="#39FF9C"
                  strokeWidth="1.2"
                />

                {/* Left Demonic Cybernetic Eye Cutout */}
                <path
                  d="M 460 290 Q 425 290 415 310 Q 440 320 460 305 Z"
                  fill="#39FF9C"
                  filter="url(#emblemGlowFilter)"
                />
              </g>

              {/* ─── RIGHT WING (PERFECT SYMMETRY VIA MIRROR TRANSFORM) ─── */}
              <use href="#leftWing" transform="translate(1000, 0) scale(-1, 1)" />

              {/* ─── CENTRAL STILETTO SPINE & SHARP CORE CUTOUTS ─── */}
              <g id="centerSpine">
                {/* Central Stiletto Dagger */}
                <path
                  d="M 500 60 L 512 280 L 500 540 L 488 280 Z"
                  fill="#39FF9C"
                  stroke="#00FF85"
                  strokeWidth="2"
                  filter="url(#emblemGlowFilter)"
                />

                {/* Core White-Hot Node */}
                <circle cx="500" cy="300" r="7" fill="#FFFFFF" filter="url(#emblemGlowFilter)" />

                {/* Intersecting Diamond Core */}
                <path
                  d="M 500 260 L 525 300 L 500 340 L 475 300 Z"
                  fill="#063D20"
                  stroke="#39FF9C"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>
        </motion.div>
      )}

      {/* ─── LAYER 4: EDITORIAL VIGNETTE & METADATA ─── */}
      <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10">
        {/* Top telemetry tags */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-[#00FF85]/60">
          <span>03 // KINETIC MATRIX</span>
          <span>EMERALD CORE // 60 FPS</span>
        </div>

        {/* Bottom telemetry tags */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-[#00FF85]/60">
          <span>FLUID NOISE // DOMAIN WARPED</span>
          <span>LATENCY // &lt;16MS</span>
        </div>
      </div>
    </div>
  );
}
