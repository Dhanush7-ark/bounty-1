import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/60 bg-black/60 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-32 overflow-hidden flex items-center">
            <Image
              src="/images/image.png"
              alt="Bounty Bytes AI Studios"
              width={140}
              height={40}
              className="object-contain object-left h-9 w-auto filter drop-shadow-[0_0_8px_rgba(132,204,22,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(163,230,53,0.6)]"
              priority
            />
          </div>
        </a>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
          <a href="#hero" className="hover:text-lime-400 transition-colors">
            Overview
          </a>
          <a href="#features" className="hover:text-lime-400 transition-colors">
            Tech Stack
          </a>
          <a href="#test-scroll" className="hover:text-lime-400 transition-colors">
            Scroll Verification
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="border-lime-500/30 text-lime-400 hover:bg-lime-500/10">
            System: Active
          </Button>
        </div>
      </Container>
    </header>
  );
}
