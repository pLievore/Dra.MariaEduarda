import { faqs, siteUrl } from "@/lib/clinic";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section id="duvidas" className="py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="display-lg lg:sticky lg:top-32">
            Antes de <span className="text-accent block italic">agendar.</span>
          </h2>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question}>
              <details className="group rule py-6 last:border-b last:border-line">
                <summary className="flex cursor-pointer list-none items-start gap-5">
                  <span className="label pt-1.5 text-ink-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display-md flex-1">{faq.question}</span>
                  <span
                    aria-hidden
                    className="pt-2 text-ink-faint transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:pl-11">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${siteUrl}#faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
    </section>
  );
}
