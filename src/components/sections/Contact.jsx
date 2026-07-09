"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative z-10 bg-bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's Work <span className="text-primary">Together</span>
          </h2>
          
          <p className="text-text-secondary text-lg mb-12 leading-relaxed">
            I'm always open to discussing new opportunities, freelance work, and exciting collaborations. Feel free to reach out.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="mailto:sharmaarkemohamed341@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-bg-main font-semibold rounded-full hover:bg-primary-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,180,100,0.4)] w-full sm:w-auto justify-center"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>
            
            <a
              href="https://github.com/MohamudDev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-bg-main transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <GithubIcon size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
