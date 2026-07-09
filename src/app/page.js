import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import ScoreBoard from "@/components/sections/ScoreBoard";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechStack />
      <ScoreBoard />
      <Contact />
    </>
  );
}
