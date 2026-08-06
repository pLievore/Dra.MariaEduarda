import Image from "next/image";
import { clinic } from "@/lib/clinic";
import { Reveal } from "./Reveal";

const pillars = [
  {
    title: "A prevenção vem primeiro",
    text: "Tratar cedo é mais simples, mais barato e menos invasivo. O plano começa pelo que evita o problema, não pelo procedimento mais caro.",
  },
  {
    title: "No seu ritmo, sem susto",
    text: "Nada acontece sem você entender e concordar. Cada etapa é explicada antes, e a consulta segue o tempo que você precisar.",
  },
  {
    title: "Perto do seu trabalho",
    text: "Cidade Monções, entre o Brooklin e a Berrini. Com atendimento das 08h às 19h, dá para encaixar antes ou depois do expediente.",
  },
];

export function About() {
  return (
    <section id="sobre" className="bg-paper-warm py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <blockquote className="font-display max-w-2xl text-2xl leading-snug md:text-3xl">
            “Você sai daqui sabendo o que precisa ser feito —{" "}
            <span className="text-accent italic">e por quê.</span>”
          </blockquote>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden bg-paper-dim">
              <Image
                src="/images/dra-maria-eduarda.png"
                alt={`${clinic.name}, ${clinic.role} na ${clinic.address.neighborhood}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rule mt-4 flex items-baseline justify-between pt-3">
              <p className="label">{clinic.name}</p>
              <p className="text-xs text-ink-faint">{clinic.cro}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="label text-ink-faint">Quem vai te atender</p>
              {/* TODO: revisar com a Dra. — texto construído a partir de formação e áreas de atuação. */}
              <p className="mt-6 text-lg leading-relaxed text-balance">
                Com {clinic.education.toLowerCase()}, a Dra. Maria Eduarda atende
                na Cidade Monções com foco em{" "}
                {clinic.focusAreas.join(", ").toLowerCase()}.
              </p>
              <p className="mt-5 leading-relaxed text-ink-soft">
                A proposta é simples: consulta sem pressa, diagnóstico honesto e
                um plano de tratamento que respeita o seu tempo e o seu
                orçamento. Você não vai ouvir jargão nem sair do consultório sem
                saber o que será feito, quanto custa e quanto tempo leva.
              </p>
            </Reveal>

            <div className="mt-14">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 0.08}>
                  <div className="rule grid gap-2 py-6 md:grid-cols-12 md:gap-6">
                    <h3 className="text-base font-medium md:col-span-5">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft md:col-span-7">
                      {pillar.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
