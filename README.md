# Prospect Dentist — Landing de agendamento

Landing page de agendamento de consultas da **Dra. Maria Eduarda Peres**,
cirurgiã-dentista no Brooklin/Berrini, São Paulo.

O objetivo da página é único: **levar o visitante ao WhatsApp com uma mensagem
de agendamento já montada.** Todo o resto — serviços, prova social, FAQ, mapa —
existe para remover objeções no caminho até esse botão.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Estilo | Tailwind CSS v4 (config CSS-first em `globals.css`) |
| Tipografia | Instrument Serif (display) + Inter (texto) |
| Animação | `motion` (Framer Motion), com respeito a `prefers-reduced-motion` |
| Testes | Vitest |
| Deploy | Vercel (região `gru1`) |

## Direção visual

Editorial, não "landing de serviço": papel creme em toda a página, tipografia
serifada em escala grande no lugar de ícones, faixas separadas por fios de 1px
no lugar de cards, grid de 12 colunas assimétrico e raio zero. A seção de
agendamento é a única escura — ela é o ponto final do argumento.

As regras completas estão em [`CLAUDE.md`](CLAUDE.md); vale ler antes de
adicionar qualquer seção nova.

Sem backend e sem banco: o formulário de agendamento monta um link `wa.me`
no cliente. Zero dado de paciente trafega ou é armazenado pelo site.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # ajuste NEXT_PUBLIC_SITE_URL
npm run dev
```

Outros comandos: `npm run build`, `npm run lint`, `npm test`.

## Estrutura

```
src/
  app/
    layout.tsx      metadata, fontes, JSON-LD do tipo Dentist
    page.tsx        composição das seções
    globals.css     design tokens (@theme do Tailwind v4)
    sitemap.ts
    robots.ts
  components/       uma seção da landing por arquivo
  lib/
    clinic.ts       ← ÚNICO arquivo de conteúdo. NAP, serviços, FAQ, depoimentos
    whatsapp.ts     montagem da mensagem e do link wa.me
tests/              testes do gerador de mensagem
docs/
  veo3-prompts.md       prompts do vídeo do hero + comandos de compressão
  conteudo-pendente.md  checklist do que falta confirmar com a clínica
public/
  video/            hero.mp4, hero.webm, hero-poster.jpg
  images/
```

**Regra:** nenhum componente deve conter texto de negócio hard-coded. Se é
informação da clínica, mora em `src/lib/clinic.ts`.

## Antes de publicar

Dados de contato, endereço, horários e CRO já estão preenchidos e os CTAs
funcionam. Restam dois bloqueadores — o domínio final e a confirmação sobre
convênio/pagamento. Detalhes em
[`docs/conteudo-pendente.md`](docs/conteudo-pendente.md).

## Deploy

```bash
npx vercel link
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel --prod
```

O build é o padrão do Next; a Vercel detecta sozinha. `vercel.json` só fixa a
região em São Paulo e o cache longo dos vídeos do hero.
