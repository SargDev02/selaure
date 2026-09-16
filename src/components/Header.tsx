import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-selaure bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-40 max-w-7xl items-center justify-between px-4">
        <Image
          src="/logo-selaure.png"
          alt="Selaure Beauty"
          width={150}
          height={60}
          priority
          className="h-auto w-32 sm:w-36"
        />

        <span className="text-xs tracking-[0.2em] text-text-secondary uppercase">
          Beauty
        </span>
      </div>
    </header>
  );
}