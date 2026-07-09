"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import Image from "next/image";

const projects = [
  {
    title: "House Viewer",
    description: "A modern web platform where users can explore house designs with interactive images and 3D viewing. Engineers upload projects while administrators review and approve them.",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    liveUrl: "#",
    githubUrl: "https://github.com/MohamudDev/House-design"
  },
  {
    title: "Score Counter",
    description: "A responsive score counter application built with React that allows users to track scores in real time through a clean and intuitive interface.",
    technologies: ["React", "JavaScript", "CSS"],
    image: "/score-counter.png",
    liveUrl: "#",
    githubUrl: "https://github.com/MohamudDev"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card overflow-hidden group flex flex-col h-full"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-bg-main/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-text-secondary mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto">
                  <a
                    href={project.liveUrl}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/10 hover:bg-primary hover:text-bg-main text-primary transition-colors rounded-lg font-medium border border-primary/30 hover:border-primary"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white text-white hover:text-bg-main transition-colors rounded-lg font-medium border border-white/10 hover:border-white"
                  >
                    <GithubIcon size={18} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
