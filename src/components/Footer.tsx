import { clinic, fullAddress, navLinks } from "@/lib/clinic";
import { quickContactUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="pt-24 pb-32 md:pt-32 md:pb-36">
      <div className="container-page">
        {/* Assinatura de fechamento — o nome é o último elemento gráfico. */}
        <p className="font-display display-lg leading-none">
          Maria Eduarda <span className="text-ink-faint italic">Peres</span>
        </p>

        <div className="rule mt-12 grid gap-10 pt-10 md:grid-cols-4">
          <div>
            <p className="label text-ink-faint">Consultório</p>
            <p className="mt-4 max-w-52 text-sm leading-relaxed text-ink-soft">
              {fullAddress}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <p className="label text-ink-faint">Navegação</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-ink-faint">Contato</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${clinic.phone.e164}`}
                  className="transition-colors hover:text-accent"
                >
                  {clinic.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={quickContactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  WhatsApp
                </a>
              </li>
              {clinic.social.instagram ? (
                <li>
                  <a
                    href={clinic.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {clinic.social.instagramHandle}
                  </a>
                </li>
              ) : null}
              {clinic.email ? (
                <li>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {clinic.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <p className="label text-ink-faint">Responsável técnica</p>
            <p className="mt-4 text-sm text-ink-soft">
              {clinic.name}
              <br />
              {clinic.cro}
            </p>
          </div>
        </div>

        <p className="mt-14 max-w-2xl text-xs leading-relaxed text-ink-faint">
          © {new Date().getFullYear()} {clinic.legalName}. As informações deste
          site têm caráter informativo e não substituem a avaliação clínica
          presencial.
        </p>
      </div>
    </footer>
  );
}
