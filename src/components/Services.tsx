import { services } from "@/lib/clinic";
import { Reveal } from "./Reveal";

/**
 * Lista numerada em vez de grid de cards: cada tratamento é uma faixa de
 * largura total separada por fio, como um sumário de revista.
 */
export function Services() {
  return (
    <section id="servicos" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="display-lg max-w-xl">
              O que fazemos, <span className="text-accent italic">e por quê.</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Cada plano é apresentado por escrito — etapas, prazos e valores —
              antes de qualquer procedimento começar.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <article className="group rule grid gap-4 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10 last:border-b last:border-line">
                <div className="flex items-start gap-5 md:col-span-5">
                  <span className="label pt-2 text-ink-faint transition-colors duration-500 group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md">{service.name}</h3>
                </div>

                <p className="text-base leading-relaxed text-ink-soft md:col-span-5 md:pt-2">
                  {service.description}
                </p>

                <p className="text-xs leading-relaxed text-ink-faint md:col-span-2 md:pt-3">
                  {service.highlights.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
