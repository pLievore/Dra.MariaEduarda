import { clinic } from "@/lib/clinic";
import { Reveal } from "./Reveal";

export function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    clinic.mapsEmbedQuery,
  )}&output=embed`;

  return (
    <section id="local" className="bg-paper-warm py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="display-lg max-w-lg">
              Entre o Brooklin
              <br />
              <span className="text-accent italic">e a Berrini.</span>
            </h2>
            <a
              href={clinic.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 border-b border-ink pb-1 text-sm font-medium"
            >
              Traçar rota no Google Maps
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 aspect-16/9 overflow-hidden bg-paper-dim md:mt-20 md:aspect-21/9">
            <iframe
              title={`Mapa da localização do consultório da ${clinic.name}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0 grayscale-[0.35]"
            />
          </div>
        </Reveal>

        {/* Bloco de expediente: endereço, horários e contato em colunas com fios. */}
        <div className="rule mt-12 grid gap-8 pt-10 md:grid-cols-3 md:gap-12">
          <Reveal>
            <p className="label text-ink-faint">Endereço</p>
            <p className="mt-4 leading-relaxed">
              {clinic.address.street}
              <br />
              {clinic.address.complement} — {clinic.address.neighborhood}
              <br />
              {clinic.address.city} — {clinic.address.state},{" "}
              {clinic.address.postalCode}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="label text-ink-faint">Horários</p>
            <div className="mt-4 space-y-1">
              {clinic.hours.map((slot) => (
                <p key={slot.label} className="flex justify-between gap-4 md:max-w-56">
                  <span>{slot.label}</span>
                  <span className="text-ink-faint">
                    {"closed" in slot && slot.closed
                      ? "Fechado"
                      : `${slot.opens}–${slot.closes}`}
                  </span>
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="label text-ink-faint">Contato</p>
            <div className="mt-4 space-y-1">
              <a
                href={`tel:${clinic.phone.e164}`}
                className="block transition-colors hover:text-accent"
              >
                {clinic.phone.display}
              </a>
              {clinic.social.instagram ? (
                <a
                  href={clinic.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-accent"
                >
                  {clinic.social.instagramHandle}
                </a>
              ) : null}
              {clinic.email ? (
                <a
                  href={`mailto:${clinic.email}`}
                  className="block transition-colors hover:text-accent"
                >
                  {clinic.email}
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
