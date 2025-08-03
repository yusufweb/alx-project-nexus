// components/HeroSection.tsx
import React from "react";
import Image from "next/image";
import Button from "./Button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[100vh] sm:h-[100vh] md:h-[100vh] w-full overflow-hidden">
      {/* Background Image using next/image */}
      <Image
        src="/Hero/hero-bg-1.png"
        alt="Movie Hero background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0"
        priority
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-[#010616] opacity-55 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full text-left text-white px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8 drop-shadow-lg">
          Cine
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Hub
          </span>
        </h1>
        <div>
          <p className="text-[18px] sm:text-[18px] md:text-[18px] max-w-3xl mb-8 text-gray-200 drop-shadow-md">
            What Should We Watch Tonight? We’ve all asked it. Now there\'s a
            better answer. Whether you\'re solo, with friends, or on date night,
            we help you pick the right movie—every time.
          </p>
          <div className="flex items-center space-x-4">
            <Button title="Explore" />
            <Button title="My Favorite" />
          </div> 
        </div>
      </div>
       <div className="absolute inset-0 bg-gradient-to-t from-[#010616] to-transparent"></div>
    </section>
  );
};

export default HeroSection;
