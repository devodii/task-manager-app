import Link from "next/link";
import { IoLogoGithub } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer className="fixed bottom-12 border-t w-full container flex gap-2 flex-col pt-2">
      <p>Task Manager</p>

      <Link href="https://github.com/devodii/task-manager-app" target="_blank">
        <IoLogoGithub className="text-2xl" />
      </Link>
    </footer>
  );
};
