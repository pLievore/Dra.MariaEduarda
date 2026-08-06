"use client";

import { motion, useReducedMotion } from "motion/react";
import { clinic } from "@/lib/clinic";

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.22, 1, 0.36, 1] as const;


export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="pt-28 pb-0 md:pt-36">
      <div className="container-page">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Coluna do texto — ocupa 7 de 12, deliberadamente fora do centro. */}
          <div className="lg:col-span-7 lg:pt-6">
            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="label text-ink-faint"
            >
              Cidade Monções · São Paulo
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="display-xl mt-6"
            >
              {/*
                Sem <br /> fixo: a quebra dura ignora `text-wrap: balance` e
                produz linhas desiguais no celular. O único corte garantido é
                antes do acento, e ele vem do `block` — não de um caractere.
              */}
              Odontologia que começa{" "}
              <span className="text-accent block italic">pela prevenção.</span>
            </motion.h1>

            <motion.div
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="mt-8 max-w-md md:mt-10"
            >
              <p className="leading-relaxed text-ink-soft">
                {clinic.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#agendar"
                  className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  Agendar avaliação
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href="#servicos"
                  className="border-b border-ink/25 pb-1 text-sm font-medium transition-colors hover:border-ink"
                >
                  Ver tratamentos
                </a>
              </div>
            </motion.div>
          </div>

          {/* Coluna do vídeo — única peça arredondada da página, por escolha. */}
          <motion.div
            variants={rise}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-paper-dim">
              <video
                className="size-full object-cover object-[45%_center]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/hero-poster.jpg"
                aria-hidden
              >
                <source src="/video/hero.webm" type="video/webm" />
                <source src="/video/hero.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              Consultório na Rua Alcides Ricardini Neves, 12 — conj. 305
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Masthead />
    </section>
  );
}

/**
 * Faixa de metadados no rodapé do hero, no lugar dos "cards de prova social".
 * Lê como o expediente de uma revista: fatos secos, separados por fios.
 */
function Masthead() {
  return (
    <div className="container-page mt-14 md:mt-20">
      <div className="rule grid grid-cols-2 lg:grid-cols-4">
        {clinic.trustPoints.map((point) => (
          <div
            key={point.label}
            className="border-b border-line py-5 pr-4 md:py-6 lg:border-r lg:border-b-0 lg:pr-6 lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
          >
            <p className="font-display text-xl md:text-2xl">{point.value}</p>
            <p className="mt-1.5 text-xs text-ink-faint">{point.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
