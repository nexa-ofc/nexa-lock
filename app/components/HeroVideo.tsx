"use client";

export default function HeroVideo() {
  return (
    <div className="neobrutal overflow-hidden">
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full aspect-[16/10] object-cover"
      />
    </div>
  );
}
