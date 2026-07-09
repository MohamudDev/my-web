"use client";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
    color: "from-blue-500/20 to-cyan-500/5",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js"],
    color: "from-green-500/20 to-emerald-500/5",
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL"],
    color: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "AI Master"],
    color: "from-purple-500/20 to-pink-500/5",
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-6 md:px-12 relative z-10 bg-bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 h-full flex flex-col relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <h3 className="text-xl font-bold mb-6 text-white relative z-10 border-b border-white/10 pb-4">
                {category.title}
              </h3>
              
              <ul className="flex flex-col gap-3 relative z-10 flex-grow">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-text-secondary group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
