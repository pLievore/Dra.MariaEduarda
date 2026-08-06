# Conteúdo pendente

Os dados da clínica já estão preenchidos em
[`src/lib/clinic.ts`](../src/lib/clinic.ts). O que resta é curto — mas dois
itens ainda impedem o lançamento.

## ⛔ Bloqueia o lançamento

- [ ] **Domínio final** → `NEXT_PUBLIC_SITE_URL` na Vercel. Hoje o fallback é
      `https://dramariaeduardaperes.com.br`, que não existe. Afeta canonical,
      sitemap, Open Graph e JSON-LD.
- [ ] **Convênio e formas de pagamento** — as duas respostas do FAQ marcadas com
      `TODO:` em `clinic.ts` são suposições. Uma resposta errada sobre convênio
      gera paciente frustrado na recepção.

## ⚠️ Confirmar antes de divulgar

- [ ] **Coordenadas do mapa** (`clinic.geo`) — estão aproximadas a partir do CEP.
      Corrija no Google Maps: botão direito no pino → copiar lat/long. O mapa
      embutido usa o endereço por texto, então ele já aparece certo; isso afeta
      só o JSON-LD.
- [ ] **URL curta do Google Maps** (`clinic.mapsUrl`) — hoje aponta para o link
      de compartilhamento original.
- [ ] **Bio da Dra.** — o texto em [`About.tsx`](../src/components/About.tsx) foi
      construído a partir de "formação pela USP" e "foco em prevenção,
      dentística e reabilitação oral". Vale a Dra. ler e aprovar.
- [ ] **Lista de serviços** (`services`) — os 5 derivam das áreas de atuação
      informadas. Remova o que ela não realiza.
- [ ] **E-mail de contato** (`clinic.email`) — vazio por ora. Enquanto estiver
      assim, nenhum link de e-mail é renderizado (comportamento intencional).

## 📝 Depoimentos — seção desativada

`testimonials` está **deliberadamente vazio**, e por isso a seção de depoimentos
e o item correspondente no menu não são renderizados.

Para ativar, cole avaliações reais do Google (com autorização do paciente) no
formato documentado em `clinic.ts`. Depoimento inventado é propaganda enganosa
e, em saúde, também infração ética.

O mesmo raciocínio vale para os `trustPoints`: só entram fatos verificáveis
(USP, horário, localização, WhatsApp). Não coloque "+2.000 pacientes" sem ter
como comprovar.

## Assets

| Arquivo | Status |
|---|---|
| `public/video/hero.mp4` | ✅ 875 KB · 1280×720 · 7s · mudo |
| `public/video/hero.webm` | ✅ 543 KB |
| `public/video/hero-poster.jpg` | ✅ primeiro frame do trecho cortado |
| `public/images/dra-maria-eduarda.png` | ✅ retrato profissional |
| `public/og.jpg` | ✅ 1200×630, gerado de um frame do vídeo |
| `public/favicon.ico` | ⬜ pendente |

**Corte:** os 3 primeiros segundos do original foram descartados — começavam com
a dentista caminhando de costas. A entrada agora é com ela já parada, de perfil,
organizando os instrumentos.

**Se o vídeo for trocado:** o hero o exibe num recorte vertical 4:5 com
`object-position: 45% center`. A ação precisa estar no centro do quadro — as
laterais são cortadas.

**Nota sobre o vídeo:** a marca d'água em forma de brilho, que ficava em
`x=1140–1182, y=577–625`, foi removida com o filtro `delogo` do ffmpeg a pedido.
Se o vídeo for regerado, o comando está em [veo3-prompts.md](./veo3-prompts.md).
Marcações invisíveis de proveniência embutidas pelo gerador (tipo SynthID) não
são afetadas por isso.

Comandos de compressão e prompts alternativos: [veo3-prompts.md](./veo3-prompts.md).

## Conformidade (CFO — Resolução 196/2019)

Já respeitado pela página. Reconfira a cada mudança de texto:

- ✅ CRO do responsável técnico visível (hero e rodapé).
- ✅ Fala em "foco em / áreas de atuação", nunca em "especialista em" — anunciar
  especialidade não registrada no CRO é infração.
- ✅ Sem promessa de resultado e sem superlativos ("o melhor", "o único").
- ✅ Sem foto de antes/depois — **não adicione**, é vedado.
- ✅ Sem preço ou promoção divulgados publicamente.
