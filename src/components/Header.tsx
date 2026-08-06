"use client";

import { useEffect, useState } from "react";
import { clinic, navLinks } from "@/lib/clinic";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "border-b border-line bg-paper/95 backdrop-blur-sm" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        {/* Tracking menor no celular: 0.22em em 24 caracteres esbarra no "Menu". */}
        <a
          href="#top"
          className="label tracking-[0.12em] transition-opacity hover:opacity-60 sm:tracking-[0.22em]"
        >
          {clinic.name}
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="label hidden text-ink-faint xl:block">{clinic.cro}</span>
          <a
            href="#agendar"
            className="hidden border-b border-ink pb-0.5 text-sm font-medium transition-colors hover:text-accent sm:block"
          >
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="label lg:hidden"
          >
            {menuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-line bg-paper lg:hidden">
          <ul className="container-page py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display block border-b border-line py-4 text-2xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
