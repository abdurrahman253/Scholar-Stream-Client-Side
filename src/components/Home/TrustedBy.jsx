'use client';

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

const ParallaxLogos = ({ baseVelocity }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  
  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    if (!delta) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const logos = [
    "https://i.postimg.cc/Jnrx52J1/money-magazine-60.webp",
    "https://i.postimg.cc/br2txx6G/yahoo-finance-60.webp",
    "https://i.postimg.cc/Wbg9jg2P/WSJ.webp",
    "https://i.postimg.cc/DykgC01t/USA-Today-60.webp",
    "https://i.postimg.cc/vmN75ZQW/msn-60.webp",
    "https://i.postimg.cc/J45bPqrL/nbc-logo-60.webp",
    "https://i.postimg.cc/dQ8dVBTG/ABC-logo-60.webp",
    "https://i.postimg.cc/K8s3HpdX/The-New-York-Times-60.webp",
    "https://i.postimg.cc/zDSbrG9H/Chicago-Tribune-Logo-60.webp",
  ];

  const logoElements = logos.map((src, i) => (
    <img
      key={i}
      src={src}
      alt="Media logo"
      className="h-10 md:h-12 mx-8 md:mx-14 flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out"
    />
  ));

  return (
    <div className="overflow-hidden py-14 relative bg-white">
      {/* Premium fade edges */}
      <div className="absolute inset-y-0 left-0 w-40 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div className="flex items-center whitespace-nowrap" style={{ x }}>
        {logoElements}
        {logoElements}
        {logoElements}
        {logoElements} 
      </motion.div>
    </div>
  );
};

const TrustedBy = () => {
  return (
    <section className="bg-white py-24 border-t border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Featured In
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Trusted by the <span className="text-indigo-600">World's Leading</span> Media
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Recognized and featured across top-tier publications and news outlets globally
          </p>
        </div>

        {/* Single premium infinite scrolling line */}
        <ParallaxLogos baseVelocity={-20} />
      </div>
    </section>
  );
};

export default TrustedBy;