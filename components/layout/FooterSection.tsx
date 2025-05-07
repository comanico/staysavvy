import { ModeToggle } from "@/components/ui/mode-toggle";
import { Footer, FooterBottom } from "@/components/ui/footer";
import LaunchUI from "@/components/logos/launch-ui";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import ManageCookies from "../cookies/ManageCookies";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

function FooterSection({
  logo = <LaunchUI />,
  name = "Launch UI",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Changelog", href: "#" },
        { text: "Documentation", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Blog", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Discord", href: "#" },
        { text: "Twitter", href: "#" },
        { text: "Github", href: "#" },
      ],
    },
  ],
  copyright = "© 2025 Neva Partners. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Service", href: "#" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <FooterBottom>
          <div>{copyright}</div>
          <div className="flex items-center gap-4">
            {policies.map((policy, index) => (
              <a key={index} href={policy.href}>
                {policy.text}
              </a>
            ))}
            <ManageCookies />
          </div>
        </FooterBottom>
      </div>
    </footer>
  );
}

export default FooterSection;
