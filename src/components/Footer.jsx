import { Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-bg-secondary text-center">
      <div className="container mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/MohamudDev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="GitHub"
          >
            <GithubIcon size={24} />
          </a>
          <a
            href="mailto:sharmaarkemohamed341@gmail.com"
            className="text-text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Sharma'arke Mohamed. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
