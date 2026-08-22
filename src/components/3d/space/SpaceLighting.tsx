"use client";

export function SpaceLighting() {
  return (
    <>
      {/* Deep Space Ambient Light */}
      <ambientLight intensity={0.25} color="#040a06" />

      {/* Main Cool Sunlight from top-right */}
      <directionalLight
        position={[40, 50, 20]}
        intensity={1.2}
        color="#e2e8f0"
      />

      {/* Electric Green Rim Light from deep left */}
      <directionalLight
        position={[-30, -20, -100]}
        intensity={1.8}
        color="#00FF66"
      />

      {/* Point Lights placed near key spatial milestones */}
      {/* Hero Node Glow */}
      <pointLight
        position={[0, 0, -15]}
        intensity={2.0}
        distance={35}
        color="#00FF66"
      />

      {/* Tech Stack Node Glow */}
      <pointLight
        position={[-5, 2, -120]}
        intensity={2.5}
        distance={45}
        color="#00FF66"
      />

      {/* Core Node Glow */}
      <pointLight
        position={[0, 0, -210]}
        intensity={3.0}
        distance={50}
        color="#00FF66"
      />

      {/* Terminal Node Glow */}
      <pointLight
        position={[0, -2, -290]}
        intensity={3.5}
        distance={60}
        color="#00FF66"
      />
    </>
  );
}
