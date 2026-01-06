import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, Star } from 'lucide-react';
import Container from '../Shared/Container';
import { Link } from 'react-router-dom';

const TrustSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-12 md:py-24 bg-white text-gray-900 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-24">
          
          {/* Left Side: Stats & Trustpilot */}
          <motion.div 
            {...fadeInUp}
            className="w-full lg:w-1/3 text-center lg:text-left space-y-4 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] md:text-xs font-bold tracking-widest uppercase">
              <Sparkles size={12} />
              Trusted by Students
            </div>
            
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter flex items-baseline justify-center lg:justify-start gap-1">
                4.8
                <span className="text-xl md:text-2xl text-gray-400 font-bold tracking-normal">/5</span>
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" className="md:w-7 md:h-7" stroke="none" />
                ))}
              </div>
              <p className="text-gray-500 font-medium text-sm md:text-lg italic">
                2k+ Reviews • <span className="text-emerald-600 font-bold not-italic">Excellent</span>
              </p>
            </div>

            <div className="pt-4 md:pt-6 border-t border-gray-100 max-w-[150px] md:max-w-[200px] mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xl md:text-3xl font-black text-gray-900">
                <span className="text-emerald-500 text-2xl md:text-4xl leading-none">★</span>
                <span className="tracking-tighter uppercase italic text-lg md:text-2xl text-gray-400">Trustpilot</span>
              </div>
            </div>
          </motion.div>

          {/* Center: Main Content */}
          <div className="w-full lg:w-2/3 relative">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-6 md:space-y-10"
            >
              <h3 className="text-3xl md:text-6xl font-black leading-tight text-gray-900 text-center lg:text-left">
                12 million students <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                  can't be wrong
                </span>
              </h3>

              <ul className="grid grid-cols-1 gap-3 md:gap-6">
                {[
                  "Trusted by millions globally.",
                  "Access expert scholarship help.",
                  "Highly rated success stories."
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 text-sm md:text-xl text-gray-600 font-semibold bg-gray-50 p-3 rounded-xl md:bg-transparent md:p-0"
                  >
                    <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                      <CheckCircle2 className="text-emerald-600 w-4 h-4 md:w-6 md:h-6" strokeWidth={3} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Floating Illustration (Hidden on Mobile/Tablet) */}
            <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 hidden xl:block">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                <img 
                  src="https://i.postimg.cc/43YVQ9x8/trustpilot-reading-illustration.jpg" 
                  alt="Success" 
                  className="w-[450px] rounded-[3rem] shadow-2xl border-[10px] border-white"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- Premium Bottom Banner (Mobile Optimized) --- */}
        <motion.div 
          className="mt-12 md:mt-24 relative rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center overflow-hidden bg-gray-900"
        >
            <div className="relative z-10 space-y-6 md:space-y-10">
              <h4 className="text-2xl md:text-5xl font-black text-white leading-tight">
                Earn scholarships <br className="md:hidden" /> with <span className="text-indigo-400">ScholarStream</span>
              </h4>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/all-scholarships" 
                  className="relative inline-flex items-center gap-2 px-8 py-4 md:px-12 md:py-6 bg-white text-gray-900 font-black rounded-xl md:rounded-2xl transition-all overflow-hidden"
                >
                  <Sparkles size={16} className="text-indigo-600" />
                  <span className="uppercase tracking-wider text-xs md:text-sm">Check Matches</span>
                  <ArrowRight size={16} />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </Link>
              </motion.div>

              <div className="flex items-center justify-center gap-4 md:gap-6 opacity-40">
                {["Verified", "Secure"].map(tag => (
                  <span key={tag} className="text-white text-[9px] md:text-xs font-bold uppercase tracking-[2px]">{tag}</span>
                ))}
              </div>
            </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TrustSection;