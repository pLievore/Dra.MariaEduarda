import { clinic, testimonials } from "@/lib/clinic";
import { Reveal } from "./Reveal";

export function Testimonials() {
  // Sem depoimentos reais cadastrados, a seção inteira sai do ar.
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="display-lg max-w-lg">
              Quem já sentou
              <br />
              <span className="text-accent italic">na cadeira.</span>
            </h2>
            <a
              href={clinic.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-b border-ink pb-1 text-sm font-medium"
            >
              Ver avaliações no Google
            </a>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.name}>
              <figure className="rule grid gap-4 py-8 md:grid-cols-12 md:gap-8 last:border-b last:border-line">
                <figcaption className="md:col-span-4">
                  <p className="font-display text-xl">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-ink-faint">{testimonial.service}</p>
                </figcaption>
                <blockquote className="leading-relaxed text-balance text-ink-soft md:col-span-8">
                  “{testimonial.text}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
