"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/clinic";
import { bookingUrl, formatPhone, isValidPhone } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

// O consultório atende de segunda a sexta — sábado e domingo ficam de fora.
const days = [
  "Assim que possível",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
];

const periods = ["Manhã (08h–12h)", "Tarde (12h–16h)", "Fim do dia (16h–19h)"];

const reassurances = [
  "Você recebe a confirmação do horário pelo WhatsApp",
  "Nenhum dado é armazenado neste site",
  "Sem compromisso de fechar tratamento na avaliação",
];

type Errors = Partial<Record<"name" | "phone" | "service", string>>;

/**
 * Formulário convencional de propósito: caixas visíveis, rótulos acima dos
 * campos, selects nativos e um botão único. A identidade editorial fica na
 * moldura e na tipografia do título — não nos controles, onde a familiaridade
 * vale mais do que a originalidade.
 */
export function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [day, setDay] = useState(days[0]);
  const [period, setPeriod] = useState(periods[0]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Informe seu nome.";
    if (!isValidPhone(phone)) found.phone = "Informe um telefone com DDD.";
    if (!service) found.service = "Escolha o tratamento.";
    return found;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const url = bookingUrl({
      service,
      preferredDay: day,
      preferredPeriod: period,
      name: name.trim(),
      phone,
      notes,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    // Verde profundo: dá o contraste que ancora a seção sem tirar legibilidade
    // do formulário, que fica num painel branco por cima.
    <section id="agendar" className="bg-accent py-24 text-paper md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="label text-paper/50">Agendamento</p>
          <h2 className="display-lg mt-6">
            Preencha e a gente{" "}
            <span className="block text-paper/55 italic">te responde.</span>
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-paper/75">
            Ao enviar, o WhatsApp do consultório abre com a sua mensagem já
            escrita — você só confirma o envio.
          </p>

          <ul className="mt-10 space-y-3">
            {reassurances.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-paper/75">
                <span aria-hidden>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white p-6 text-ink md:p-10"
          >
            <h3 className="text-lg font-medium">Solicite seu horário</h3>
            <p className="mt-1.5 text-sm text-ink-faint">
              Campos com <span aria-hidden>*</span> são obrigatórios.
            </p>

            <div className="mt-8 space-y-6">
              <Field
                id="booking-name"
                label="Nome completo"
                required
                error={errors.name}
              >
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  value={name}
                  autoComplete="name"
                  placeholder="Ex.: Ana Paula Moreira"
                  aria-invalid={Boolean(errors.name)}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass(Boolean(errors.name))}
                />
              </Field>

              <Field
                id="booking-phone"
                label="WhatsApp com DDD"
                required
                error={errors.phone}
              >
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  autoComplete="tel"
                  placeholder="(11) 90000-0000"
                  aria-invalid={Boolean(errors.phone)}
                  onChange={(event) => setPhone(formatPhone(event.target.value))}
                  className={inputClass(Boolean(errors.phone))}
                />
              </Field>

              <Field
                id="booking-service"
                label="Qual tratamento você procura?"
                required
                error={errors.service}
              >
                <select
                  id="booking-service"
                  name="service"
                  value={service}
                  aria-invalid={Boolean(errors.service)}
                  onChange={(event) => setService(event.target.value)}
                  className={`${inputClass(Boolean(errors.service))} ${
                    service ? "" : "text-ink-faint"
                  }`}
                >
                  <option value="">Selecione uma opção</option>
                  {services.map((option) => (
                    <option key={option.slug} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                  <option value="Ainda não sei / outro">
                    Ainda não sei / outro
                  </option>
                </select>
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="booking-day" label="Melhor dia">
                  <select
                    id="booking-day"
                    name="day"
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    className={inputClass(false)}
                  >
                    {days.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="booking-period" label="Período">
                  <select
                    id="booking-period"
                    name="period"
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className={inputClass(false)}
                  >
                    {periods.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                id="booking-notes"
                label="Quer contar mais alguma coisa?"
                hint="Opcional"
              >
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  maxLength={400}
                  placeholder="Ex.: sinto dor ao mastigar do lado direito há uma semana."
                  onChange={(event) => setNotes(event.target.value)}
                  className={`${inputClass(false)} resize-none`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 bg-[#128C4A] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#0e6f3a]"
            >
              <WhatsAppIcon className="size-5" />
              Enviar no WhatsApp
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-ink-faint">
              Seus dados são usados apenas para montar a mensagem. Atendimento de
              segunda a sexta, das 08h às 19h.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full border bg-white px-4 py-3.5 text-base text-ink transition-colors placeholder:text-ink-faint focus:outline-none ${
    hasError
      ? "border-red-600 focus:border-red-600"
      : "border-ink/20 focus:border-accent"
  }`;
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden className="text-accent">
            {" "}
            *
          </span>
        ) : null}
        {hint ? (
          <span className="ml-1.5 font-normal text-ink-faint">({hint})</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
