import { describe, expect, it } from "vitest";
import {
  bookingUrl,
  buildBookingMessage,
  formatPhone,
  isValidPhone,
} from "@/lib/whatsapp";

const draft = {
  service: "Reabilitação oral",
  preferredDay: "Terça-feira",
  preferredPeriod: "Manhã (08h–12h)",
  name: "Ana Paula",
  phone: "(11) 91234-5678",
};

describe("buildBookingMessage", () => {
  it("inclui todos os campos preenchidos", () => {
    const message = buildBookingMessage(draft);

    expect(message).toContain("Reabilitação oral");
    expect(message).toContain("Terça-feira");
    expect(message).toContain("Ana Paula");
    expect(message).toContain("(11) 91234-5678");
  });

  it("omite observações quando vazias ou só espaços", () => {
    expect(buildBookingMessage({ ...draft, notes: "   " })).not.toContain(
      "Observações",
    );
    expect(buildBookingMessage({ ...draft, notes: "Sinto dor" })).toContain(
      "*Observações:* Sinto dor",
    );
  });
});

describe("bookingUrl", () => {
  it("gera um link wa.me com a mensagem codificada", () => {
    const url = bookingUrl(draft);

    expect(url.startsWith("https://wa.me/")).toBe(true);
    expect(url).toContain("?text=");
    expect(url).not.toContain(" ");
  });
});

describe("formatPhone", () => {
  it("formata celular e fixo", () => {
    expect(formatPhone("11912345678")).toBe("(11) 91234-5678");
    expect(formatPhone("1155551234")).toBe("(11) 5555-1234");
  });

  it("ignora caracteres não numéricos e limita a 11 dígitos", () => {
    expect(formatPhone("(11) 9a1234-5678999")).toBe("(11) 91234-5678");
  });
});

describe("isValidPhone", () => {
  it("exige ao menos 10 dígitos", () => {
    expect(isValidPhone("(11) 9123-456")).toBe(false);
    expect(isValidPhone("(11) 5555-1234")).toBe(true);
  });
});
