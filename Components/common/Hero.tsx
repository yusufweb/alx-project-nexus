// components/HeroSection.tsx
import React from "react";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";

const HeroSection: React.FC = () => {
  const router = useRouter();
  return (
    <section className="relative h-[100vh] sm:h-[100vh] md:h-[100vh] w-full overflow-hidden">
      {/* Background Image using next/image */}
      <Image
        src="/Hero/hero-bg-1.png"
        alt="Movie Hero background"
        fill
        quality={80}
        className="z-0 object-cover"
        priority
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-[#010616] opacity-35 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full text-left text-white px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8 drop-shadow-lg">
          Cine
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Hub
          </span>
        </h1>
        <div>
          <p className="text-[14px] sm:text-[18px] md:text-[18px] max-w-3xl mb-8 text-gray-200 drop-shadow-md">
            What Should We Watch Tonight? We have all asked it. Now there is a
            better answer. Whether you are solo, with friends, or on date night,
            we help you pick the right movie every time.
          </p>
          <div className="flex items-center flex-col lg:flex-row md:flex-row lg:space-x-4 md:space-x-4 space-y-5 lg:space-y-0 md:space-y-0">
            <Button title="Explore" className="w-full lg:w-auto md:w-auto" />
            <Button
              title="My Favorite"
              className="w-full lg:w-auto md:w-auto"
              onClick={() => router.push("/favourite")}
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#010616] to-transparent"></div>
    </section>
  );
};

export default HeroSection;
