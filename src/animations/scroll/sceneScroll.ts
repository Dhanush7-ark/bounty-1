import { Object3D } from "three";
import { lerp } from "@/lib/utils";

export interface Scroll3DTransform {
  targetRotationX: number;
  targetRotationY: number;
  targetPositionZ: number;
}

export function update3DScrollTransform(
  object: Object3D | null,
  scrollProgress: number,
  delta: number
): void {
  if (!object) return;

  const targetRotX = scrollProgress * Math.PI * 2;
  const targetRotY = scrollProgress * Math.PI * 4;
  const targetPosZ = Math.sin(scrollProgress * Math.PI) * 2;

  const lerpSpeed = Math.min(1, delta * 4);

  object.rotation.x = lerp(object.rotation.x, targetRotX, lerpSpeed);
  object.rotation.y = lerp(object.rotation.y, targetRotY, lerpSpeed);
  object.position.z = lerp(object.position.z, targetPosZ, lerpSpeed);
}
