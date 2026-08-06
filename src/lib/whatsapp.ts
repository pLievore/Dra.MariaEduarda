import { clinic } from "./clinic";

export type BookingDraft = {
  service: string;
  preferredDay: string;
  preferredPeriod: string;
  name: string;
  phone: string;
  notes?: string;
};

/** Monta a mensagem que o paciente envia à clínica, já formatada. */
export function buildBookingMessage(draft: BookingDraft): string {
  const lines = [
    `Olá! Gostaria de agendar uma consulta com a ${clinic.name}.`,
    "",
    `*Serviço:* ${draft.service}`,
    `*Melhor dia:* ${draft.preferredDay}`,
    `*Período:* ${draft.preferredPeriod}`,
    `*Nome:* ${draft.name}`,
    `*Telefone:* ${draft.phone}`,
  ];

  const notes = draft.notes?.trim();
  if (notes) {
    lines.push(`*Observações:* ${notes}`);
  }

  return lines.join("\n");
}

/** Link wa.me pronto para abrir a conversa com a mensagem pré-preenchida. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${clinic.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function bookingUrl(draft: BookingDraft): string {
  return whatsappUrl(buildBookingMessage(draft));
}

/** CTA genérico usado no header, no botão flutuante e no rodapé. */
export const quickContactUrl = whatsappUrl(
  `Olá! Vim pelo site e gostaria de informações sobre agendamento com a ${clinic.name}.`,
);

/** Normaliza o telefone digitado para (11) 91234-5678. */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}
