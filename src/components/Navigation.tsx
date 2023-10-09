"use client";
import { useUser } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
  type: string;
};

type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const { Auth } = useUser();
  let filteredNavLinks = [];
  if (!Auth) {
    filteredNavLinks = navLinks.filter(isProtected);
  } else {
    filteredNavLinks = navLinks;
  }

  return (
    <>
      {filteredNavLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? "button active" : "button"}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

function isProtected(link: NavLink) {
  return link.type === "public";
}

export { Navigation };
