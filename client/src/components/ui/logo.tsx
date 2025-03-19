import { SiGithub } from "react-icons/si";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <SiGithub className="h-8 w-8" />
      <span className="font-semibold text-lg">README Generator</span>
    </div>
  );
}
