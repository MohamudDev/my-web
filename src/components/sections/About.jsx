"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center relative z-10">
            About <span className="text-primary">Me</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-[20px] overflow-hidden flex-shrink-0 border-2 border-primary/30 shadow-lg">
              <Image
                src="/profile.png"
                alt="Sharma'arke Mohamed"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
            <p className="text-text-secondary text-lg leading-relaxed text-center md:text-left">
              I am a passionate Full Stack Web & Mobile Developer who enjoys building modern web and mobile applications. I love creating fast, responsive, and user-friendly digital experiences using the latest technologies. I continuously improve my skills and enjoy solving real-world problems through clean and efficient code.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
