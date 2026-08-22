import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-800/80 bg-black/90 py-10 text-center text-xs text-neutral-400 backdrop-blur-md">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/image.png"
            alt="Bounty Bytes AI Studios"
            width={120}
            height={34}
            className="h-7 w-auto object-contain"
          />
          <span className="text-neutral-500">|</span>
          <p>© 2026 Bounty Bytes AI Studios. All rights reserved.</p>
        </div>

        <div className="flex items-center space-x-6 text-neutral-400 font-mono text-[11px]">
          <span className="text-lime-400">Next.js</span>
          <span>•</span>
          <span className="text-lime-400">R3F Three.js</span>
          <span>•</span>
          <span className="text-lime-400">GSAP</span>
          <span>•</span>
          <span className="text-lime-400">Lenis</span>
        </div>
      </Container>
    </footer>
  );
}
