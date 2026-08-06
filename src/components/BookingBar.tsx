"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/clinic";
import { quickContactUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Barra fixa no rodapé, no lugar da bolha flutuante de WhatsApp.
 * Some quando a própria seção de agendamento está na tela — ali o formulário
 * já é o CTA, e a barra só competiria com ele.
 */
export function BookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("agendar");

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      const rect = section?.getBoundingClientRect();
      const bookingOnScreen =
        rect !== undefined && rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(pastHero && !bookingOnScreen);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 backdrop-blur-sm transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <p className="hidden text-sm text-ink-soft sm:block">
          Segunda a sexta, 08h–19h · com hora marcada
        </p>
        <div className="flex flex-1 items-center gap-3 sm:flex-none">
          <a
            href={`tel:${clinic.phone.e164}`}
            className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:block"
          >
            {clinic.phone.display}
          </a>
          <a
            href="#agendar"
            className="group inline-flex flex-1 items-center justify-center gap-3 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent sm:flex-none"
          >
            Agendar consulta
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
          <a
            href={quickContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="inline-flex size-11 shrink-0 items-center justify-center border border-ink/20 transition-colors hover:border-ink"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
