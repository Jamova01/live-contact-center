"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <nav className="flex space-x-8">
      <Link
        href="/"
        className={`text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 ${
          pathname === "/" ? "text-gray-800 underline" : ""
        }`}
      >
        Agents
      </Link>
      <Link
        href="/clients"
        className={`text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 ${
          pathname === "/clients" ? "text-gray-800 underline" : ""
        }`}
      >
        Clients
      </Link>
    </nav>
  );
};
