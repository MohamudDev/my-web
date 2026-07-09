"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { Download } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left z-10"
        >
          <h2 className="text-primary font-medium tracking-wider mb-2 text-sm md:text-base uppercase">
            Hello, I am
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Sharma'arke <br className="hidden md:block" /> Mohamed
          </h1>
          <h3 className="text-xl md:text-2xl text-text-secondary font-medium mb-6">
            Full Stack Web & Mobile Developer
          </h3>
          <p className="text-text-secondary mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I build modern, responsive, and user-friendly web and mobile applications using modern technologies. I focus on creating clean interfaces, scalable solutions, and seamless user experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start flex-wrap">
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-primary text-bg-main font-semibold hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(234,180,100,0.3)] hover:shadow-[0_0_25px_rgba(234,180,100,0.5)] w-full sm:w-auto text-center"
            >
              View Projects
            </a>
            <a
              href="/cv.jpg"
              download="Sharmaarke_Mohamed_CV.jpg"
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-center border border-white/20"
            >
              <Download size={18} />
              <span>Download CV</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center md:justify-end z-10"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2 border-2 border-primary/30">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src="/profile.png"
                alt="Sharma'arke Mohamed"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
