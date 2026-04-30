import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/site.config";

const Footer = () => {
  const pages = [
    { title: "Home", href: "/" },
    { title: "Gallery", href: "/gallery" },
    { title: "About", href: "/about" },
  ];

  return (
    <div className="flex flex-col items-center lg:items-start p-16 pb-12 gap-8 lg:gap-16 rounded-xl font-light relative flex-1 bg-primary text-white dark:text-black">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <Avatar className="size-[60px]">
          <AvatarImage src={siteConfig.avatar} alt="avatar" sizes="60px" />
          <AvatarFallback>{siteConfig.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center lg:items-start gap-[2px]">
          <h1 className="text-2xl">{siteConfig.name}</h1>
          <p className="text-sm opacity-60">{siteConfig.role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest opacity-60">Pages</p>
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            {p.title}
          </Link>
        ))}
      </div>

      <div className="text-xs opacity-60">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
