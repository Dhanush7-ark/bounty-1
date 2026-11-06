"use client";

export function SpaceLighting() {
  return (
    <>
      {/* Deep Space Cosmic Ambient Light */}
      <ambientLight intensity={0.35} color="#0a0f1d" />

      {/* Primary Warm Solar Sunlight from Sun Position */}
      <directionalLight
        position={[25, 30, 20]}
        intensity={2.4}
        color="#fff7e6"
      />

      {/* Secondary Galactic Blue Starlight from opposite side */}
      <directionalLight
        position={[-35, -20, -100]}
        intensity={1.2}
        color="#38bdf8"
      />

      {/* Soft Fill Light from deep space horizon */}
      <directionalLight
        position={[0, -40, -250]}
        intensity={0.8}
        color="#818cf8"
      />

      {/* Point Lights placed near key spatial milestones for card highlights */}
      {/* Hero Waypoint Glow */}
      <pointLight
        position={[0, 0, -15]}
        intensity={2.2}
        distance={35}
        color="#b5f200"
      />

      {/* Tech Stack Waypoint Glow (Saturn Amber-Green Accent) */}
      <pointLight
        position={[-5, 2, -120]}
        intensity={2.8}
        distance={50}
        color="#eab308"
      />

      {/* Core Waypoint Glow (Emerald Core Engine) */}
      <pointLight
        position={[0, 0, -210]}
        intensity={3.0}
        distance={55}
        color="#10b981"
      />

      {/* Terminal Waypoint Glow (Cyan Space Terminal) */}
      <pointLight
        position={[0, -2, -290]}
        intensity={3.5}
        distance={65}
        color="#06b6d4"
      />
    </>
  );
}
