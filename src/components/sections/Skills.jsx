"use client";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Server, Smartphone, Globe, Terminal, Cpu, GitBranch, Figma } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

const skills = [
  { name: "HTML5", icon: Globe },
  { name: "CSS3", icon: Layout },
  { name: "JavaScript", icon: Code2 },
  { name: "React.js", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Server },
  { name: "Express.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind CSS", icon: Layout },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GithubIcon },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass px-6 py-4 rounded-[20px] flex items-center gap-3 hover:border-primary/50 transition-colors shadow-sm hover:shadow-primary/20"
            >
              <skill.icon className="text-primary" size={24} />
              <span className="font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
