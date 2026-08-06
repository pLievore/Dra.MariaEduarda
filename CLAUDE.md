# CLAUDE.md

Landing page de agendamento para um consultório odontológico. Next.js 16 (App
Router) + Tailwind v4 + motion, deploy na Vercel. Sem backend.

## Direção visual — editorial, não "landing de serviço"

A página foi deliberadamente afastada do template de landing page. Não reintroduza
o que foi removido:

- **Papel creme (`--color-paper`) em toda a página.** A seção de agendamento é a
  **única** escura, e funciona como ponto final do argumento. Não adicione uma
  segunda seção escura.
- **Sem cards.** Serviços, FAQ, pilares e depoimentos são faixas de largura
  total separadas por fios de 1px (`.rule`). Nada de `rounded-*` com sombra.
- **Sem cantos arredondados** em blocos de conteúdo, campos ou botões. O raio
  zero é parte da identidade. **Exceção única:** o vídeo do hero usa
  `rounded-3xl`. Já foi tentada uma máscara radial dissolvendo as bordas no
  fundo e o resultado ficou lavado — não repita.
- **Tipografia é o elemento gráfico**, mas com teto baixo. Instrument Serif nas
  classes `.display-xl` (só o h1, teto 4,5rem), `.display-lg` (títulos de seção,
  teto 2,75rem) e `.display-md` (itens de lista, teto 1,625rem). Ela tem um peso
  só — a hierarquia vem do tamanho, nunca de `font-weight`. **Não aumente esses
  tetos:** a primeira versão usava 8,5rem e ficou exagerada. Frase longa nunca
  vai em corpo de manchete — o serifado já dá o tom sem tamanho gritante.
- **Itálico + `text-accent`** é o único destaque dentro de um título. Use uma vez
  por título, no máximo.
- **Grid de 12 colunas assimétrico** (`lg:col-span-7`, `lg:col-start-6`).
  Conteúdo centralizado é a exceção, não o padrão.
- **Um acento só** (`--color-accent`, verde-mata). Sem gradientes.

### A exceção: o formulário

`BookingForm` é **deliberadamente convencional** e não segue as regras acima nos
controles: campos com caixa e borda visível, rótulo acima de cada campo, selects
nativos, painel branco e botão verde de WhatsApp em largura total. Já foi
tentada a versão "bonita" (inputs só com sublinhado, em 3 passos, sobre fundo
escuro) e o resultado não se lia como formulário.

Formulário é o lugar onde a familiaridade vale mais que a originalidade. A
identidade editorial entra na moldura e no título da seção — nunca nos campos.

## Regras deste repositório

- **Conteúdo mora em `src/lib/clinic.ts`.** Nunca escreva texto de negócio
  (telefone, endereço, nome de serviço, depoimento) direto num componente.
- **O CTA é sempre o WhatsApp.** Não introduza formulário com backend, login ou
  coleta de dados sem pedido explícito — a proposta é zero dado armazenado.
- **`prefers-reduced-motion` é respeitado** em toda animação. Ao adicionar
  `motion`, use o hook `useReducedMotion` como nos componentes existentes.
- **Português do Brasil** em toda a interface e nos comentários.
- Comentários só onde a intenção não é óbvia pelo código.

## Conformidade odontológica (CFO, Resolução 196/2019)

A publicidade odontológica é regulada. Ao gerar ou alterar textos:

- O CRO do responsável técnico deve permanecer visível.
- Proibido: promessa/garantia de resultado, foto de antes-e-depois, divulgação
  de preço ou promoção, superlativos ("o melhor", "o único").
- Depoimento de paciente é permitido, mas sem garantia de resultado.

Na dúvida, opte pelo texto mais conservador.

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm test
```
