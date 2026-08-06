/**
 * Fonte única de verdade do consultório.
 *
 * Tudo que é conteúdo (NAP, serviços, depoimentos, FAQ) mora aqui — nenhum
 * componente deve conter texto de negócio hard-coded. Campos marcados com
 * `TODO:` ainda precisam ser confirmados com a Dra. antes do lançamento.
 */

export const clinic = {
  name: "Dra. Maria Eduarda Peres",
  legalName: "Dra. Maria Eduarda Peres — Odontologia",
  role: "Cirurgiã-dentista",
  cro: "CROSP 154343",
  /**
   * Áreas de atuação — não são especialidades registradas no CRO.
   * O texto do site fala em "foco em", nunca em "especialista em": anunciar
   * especialidade não registrada é infração ética (CFO 196/2019).
   */
  focusAreas: ["Prevenção", "Dentística", "Reabilitação oral"],
  education: "Formação em Odontologia pela USP",
  tagline: "Odontologia de alto padrão no Brooklin",
  shortDescription:
    "Prevenção, dentística e reabilitação oral com atendimento pessoal e um plano de tratamento feito para o seu sorriso — a minutos da Berrini.",

  phone: {
    display: "(11) 91999-7755",
    e164: "+5511919997755",
  },
  whatsapp: {
    number: "5511919997755",
    display: "(11) 91999-7755",
  },
  // TODO: confirmar e-mail de contato (por ora, nenhum link de e-mail é exibido).
  email: "",

  address: {
    street: "Rua Alcides Ricardini Neves, 12",
    complement: "Conj. 305",
    neighborhood: "Cidade Monções",
    city: "São Paulo",
    state: "SP",
    postalCode: "04575-050",
    country: "BR",
  },
  geo: {
    // Aproximado a partir do CEP. TODO: confirmar no Google Maps (botão direito no pino → copiar coordenadas).
    latitude: -23.6094,
    longitude: -46.6928,
  },
  mapsUrl: "https://share.google/gTOcG6FXjxKQnA1kw",
  mapsEmbedQuery:
    "Rua Alcides Ricardini Neves, 12, Cidade Monções, São Paulo - SP, 04575-050",

  social: {
    instagram: "https://www.instagram.com/mariaeduardaperes__/",
    instagramHandle: "@mariaeduardaperes__",
    facebook: "",
  },

  /** Horário de funcionamento. `closed: true` esconde o dia do JSON-LD. */
  hours: [
    { label: "Segunda a sexta", opens: "08:00", closes: "19:00", days: ["Mo", "Tu", "We", "Th", "Fr"] },
    { label: "Sábado e domingo", opens: "", closes: "", days: ["Sa", "Su"], closed: true },
  ],

  /**
   * Provas de confiança exibidas abaixo do hero.
   * Só entram aqui fatos verificáveis — nada de número estimado.
   */
  trustPoints: [
    { value: "USP", label: "formação em Odontologia" },
    { value: "08h–19h", label: "de segunda a sexta" },
    { value: "Monções", label: "a minutos da Berrini" },
    { value: "WhatsApp", label: "agendamento direto" },
  ],
} as const;

export type Service = {
  slug: string;
  name: string;
  description: string;
  /** Texto pré-preenchido no WhatsApp quando o paciente escolhe este serviço. */
  highlights: string[];
};

/**
 * Serviços derivados das áreas de atuação declaradas: prevenção, dentística e
 * reabilitação oral. Não adicione procedimento que a Dra. não realize.
 */
export const services: Service[] = [
  {
    slug: "prevencao",
    name: "Prevenção e clínica geral",
    description:
      "Avaliação completa, limpeza profissional, aplicação de flúor e acompanhamento periódico — o caminho mais barato e menos invasivo é sempre chegar antes do problema.",
    highlights: ["Avaliação completa", "Profilaxia", "Acompanhamento"],
  },
  {
    slug: "dentistica",
    name: "Dentística restauradora",
    description:
      "Tratamento de cáries e restaurações em resina com cor e textura ajustadas ao seu dente. Preserva ao máximo a estrutura saudável.",
    highlights: ["Restauração em resina", "Tratamento de cárie", "Mínima intervenção"],
  },
  {
    slug: "estetica",
    name: "Estética do sorriso",
    description:
      "Clareamento dental e facetas em resina, planejados a partir das proporções do seu rosto para um resultado natural.",
    highlights: ["Clareamento", "Facetas em resina", "Planejamento do sorriso"],
  },
  {
    slug: "reabilitacao",
    name: "Reabilitação oral",
    description:
      "Devolver função e estética a quem perdeu dentes ou tem desgaste avançado, com coroas e próteses planejadas caso a caso.",
    highlights: ["Coroas", "Próteses", "Reabilitação da mordida"],
  },
  {
    slug: "urgencia",
    name: "Urgência odontológica",
    description:
      "Dor, fratura ou sensibilidade forte? Chame no WhatsApp descrevendo o que está sentindo — buscamos o encaixe mais próximo na agenda.",
    highlights: ["Encaixe na agenda", "Alívio da dor", "Diagnóstico imediato"],
  },
];

export type Testimonial = {
  name: string;
  text: string;
  service: string;
};

/**
 * TODO: preencher com avaliações REAIS do Google, com autorização do paciente.
 *
 * Deliberadamente vazio: enquanto estiver assim, a seção de depoimentos e o
 * link correspondente no menu não são renderizados. Depoimento inventado é
 * propaganda enganosa e, no caso de saúde, também infração ética — melhor
 * nenhuma seção do que uma seção falsa.
 *
 * Formato esperado:
 *   { name: "Ana Paula M.", service: "Clareamento", text: "..." }
 */
export const testimonials: Testimonial[] = [];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Preciso agendar antes ou posso ir direto?",
    answer:
      "O atendimento é sempre com hora marcada, de segunda a sexta, das 08h às 19h. O jeito mais rápido de reservar é pelo WhatsApp — respondemos dentro do horário comercial.",
  },
  {
    question: "Onde fica o consultório?",
    answer:
      "Na Rua Alcides Ricardini Neves, 12, conjunto 305, na Cidade Monções — entre o Brooklin e a Av. Berrini, a poucos minutos da estação Berrini da CPTM.",
  },
  // TODO: confirmar com a Dra. se atende convênio ou apenas particular com reembolso.
  {
    question: "Vocês atendem por convênio?",
    answer:
      "O atendimento é particular, com possibilidade de reembolso pelo seu plano. Emitimos toda a documentação necessária e orientamos você no processo.",
  },
  // TODO: confirmar formas de pagamento aceitas.
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Pix, dinheiro, cartão de débito e crédito. O plano de tratamento e o valor são apresentados por escrito antes de qualquer procedimento.",
  },
  {
    question: "Como é a primeira consulta?",
    answer:
      "É uma avaliação completa: entendemos sua queixa, examinamos os dentes e a mordida e montamos o plano de tratamento. Você sai sabendo o que precisa ser feito, em que ordem e por quê — sem compromisso de começar no mesmo dia.",
  },
  {
    question: "Tenho medo de dentista. Como funciona?",
    answer:
      "Nada acontece sem você entender e concordar. A consulta segue o seu ritmo, com pausa sempre que precisar e explicação de cada passo. Se preferir, a primeira visita pode ser só conversa e avaliação.",
  },
  {
    question: "Estou com dor. Consigo um horário rápido?",
    answer:
      "Chame no WhatsApp descrevendo o que está sentindo e há quanto tempo. Casos de dor têm prioridade e buscamos o encaixe mais próximo disponível na agenda.",
  },
];

/** O item de depoimentos só aparece quando existem depoimentos reais. */
export const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#local", label: "Onde estamos" },
].filter((link) => link.href !== "#depoimentos" || testimonials.length > 0);

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://dramariaeduardaperes.com.br";

export const fullAddress = `${clinic.address.street}${
  clinic.address.complement ? ` — ${clinic.address.complement}` : ""
}, ${clinic.address.neighborhood}, ${clinic.address.city} — ${clinic.address.state}`;
