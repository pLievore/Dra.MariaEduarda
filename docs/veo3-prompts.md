# Vídeo do Hero — prompts para o Veo 3

> **Status:** o vídeo em uso já está em `public/video/` (consultório claro, uma
> dentista mostrando um tablet para a paciente, ação no centro/direita e parede
> desfocada à esquerda — exatamente o enquadramento que o layout pede). Este
> documento fica como referência para regerar ou substituir o vídeo.

O hero usa um vídeo de fundo em loop, **mudo**, atrás de um overlay escuro.
Isso define as regras do prompt:

- **Sem áudio e sem falas.** O vídeo toca com `muted` — qualquer diálogo é desperdício de tokens e de geração.
- **Sem texto na imagem.** Legendas e placas geradas por IA quase sempre saem com erro de ortografia, e o título já vive no HTML.
- **Ação no centro do quadro.** Gere em 16:9, mas saiba que o layout editorial exibe o vídeo num **recorte vertical 4:5** na coluna da direita (`object-position: 58% center`). O que estiver nas bordas laterais será cortado.
- **Movimento lento e contínuo.** Um travelling suave faz loop bem; corte rápido não.
- **Sem sorriso "antes e depois" nem promessa de resultado** — o CFO proíbe publicidade odontológica que prometa resultado. Ambiente, cuidado e acolhimento são seguros.

---

## Prompt principal (recomendado) — o consultório

```
Cinematic slow dolly-in through a high-end modern dental clinic in São Paulo,
Brazil. Soft diffused daylight pours from a large window on the right, warm
morning sun grazing across matte white surfaces, pale oak cabinetry and brushed
brass details. A pristine dental chair sits in the right third of the frame,
clean and unoccupied. In the mid-ground a female dentist in an impeccable white
coat, seen from behind and slightly out of focus, calmly arranges sterile
instruments. Shallow depth of field, creamy bokeh, subtle dust motes floating in
the light beam. Warm sand, cream and soft green color palette, gentle natural
shadows. The subject stays centered in the frame so the shot survives a vertical
4:5 crop. Camera glides forward very slowly and steadily on a gimbal,
no cuts. Shot on ARRI Alexa with a 35mm anamorphic lens, natural film grain,
premium editorial commercial look, calm and reassuring mood.

Negative: no text, no logos, no captions, no watermark, no faces looking at
camera, no close-up of open mouth or teeth, no blood, no distorted hands, no
fast movement, no jump cuts, no lens flare artifacts.
```

**Configuração no Veo 3:** 16:9 · 1080p · 8s · sem áudio.

---

## Prompt alternativo A — o acolhimento (mais humano)

Use se quiser reforçar "não tenha medo de dentista" em vez de "alto padrão".

```
Cinematic slow push-in on a bright, airy dental consultation room in São Paulo.
A female dentist in a white coat sits beside a patient, both seen in profile from
a respectful distance, mid-conversation — she gestures calmly toward a tablet
screen, explaining. The patient's shoulders are relaxed. Soft window light from
the right, warm and diffused, wrapping both figures. Shallow depth of field, the
foreground softly blurred. Warm sand, cream and off-white palette. Both figures
sit centered in the frame so the shot survives a vertical 4:5 crop. Very slow,
steady gimbal push-in, single continuous take. Shot on ARRI Alexa, 40mm lens,
fine film grain, warm documentary-commercial aesthetic, trustworthy and human.

Negative: no text, no logos, no captions, no watermark, no direct eye contact
with camera, no open mouth close-ups, no dental procedure in progress, no
distorted hands or fingers, no fast motion.
```

---

## Prompt alternativo B — detalhe abstrato (o mais seguro)

Zero pessoas — elimina qualquer risco de mão/rosto deformado, que é o defeito
mais comum em geração de vídeo. Ótimo fallback.

```
Extreme close-up macro shot, cinematic. Sterile dental instruments laid out in
perfect symmetry on a matte white tray, brushed steel catching a slow-moving
sliver of warm morning light. Water droplets on a polished surface. Camera drifts
laterally from right to left at an almost imperceptible speed, revealing the
softly blurred background of a modern clinic in cream and warm sand tones.
Shallow depth of field, heavy bokeh, gentle light bloom. The subject stays
centered so the shot survives a vertical 4:5 crop. Single continuous take, no cuts. Shot on ARRI Alexa with
a 100mm macro lens, subtle film grain, luxury editorial commercial look.

Negative: no text, no logos, no watermark, no people, no hands, no blood, no
sharp reflections of a camera crew, no fast movement.
```

---

## Pós-produção (obrigatório antes de subir)

O Veo 3 entrega um MP4 pesado demais para um hero. Comprima:

```bash
# MP4 (H.264) — fallback universal, sem faixa de áudio
ffmpeg -i veo3-output.mp4 -an -vf "scale=1920:-2" \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart \
  public/video/hero.mp4

# WebM (VP9) — servido primeiro, ~40% menor
ffmpeg -i veo3-output.mp4 -an -vf "scale=1920:-2" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 \
  public/video/hero.webm

# Poster: 1º frame, exibido enquanto o vídeo carrega
ffmpeg -i veo3-output.mp4 -vframes 1 -q:v 3 public/video/hero-poster.jpg
```

**Meta de tamanho: até 2,5 MB no MP4.** Acima disso o LCP no 4G despenca — se
passar, suba o `-crf` ou corte a duração para 6s.

### Remoção da marca d'água

O gerador carimba um ícone de brilho no canto inferior direito. Localize-o com
um recorte ampliado e apague com `delogo`, que interpola a partir da borda da
caixa — encadeie o filtro **antes** de qualquer escala:

```bash
# 1. localizar: recorta a região e amplia 3x sem suavizar
ffmpeg -y -ss 8 -i veo3-output.mp4 -vframes 1 \
  -vf "crop=200:180:1060:510,scale=600:-1:flags=neighbor" zoom.png

# 2. apagar (coordenadas do vídeo atual, 1280x720)
ffmpeg -i veo3-output.mp4 -an -vf "delogo=x=1130:y=567:w=62:h=68" ...
```

A caixa precisa cobrir o ícone com alguma folga e não pode encostar na borda do
quadro. Funciona bem sobre fundo liso; sobre textura, aparece um borrão.

Os três arquivos vão em `public/video/` com exatamente esses nomes; o
[Hero.tsx](../src/components/Hero.tsx) já aponta para eles.
