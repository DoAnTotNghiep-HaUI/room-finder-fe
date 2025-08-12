import React from "react";
export const Navigation = ({ mobile = false }: { mobile?: boolean }) => {
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Search",
      href: "/find-rental",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
  return (
    <nav className={`${mobile ? "flex flex-col" : "flex space-x-4"}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={`${mobile ? "xl block rounded-md px-3 py-2 text-lg font-medium" : "rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}`}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};
