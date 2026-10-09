# Portfólio — Pedro Henrique Marcelino

Site pessoal de **Pedro Henrique Marcelino**, desenvolvedor fullstack júnior e suporte de TI.
Visual inspirado na interface de *Cyberpunk 2077*, com referências sutis ao jogo, sem perder o tom profissional.

HTML, CSS e JavaScript puros: sem framework, sem build e sem dependências. Basta hospedar os arquivos.

## Estrutura

```
meu portfolio/
├── .claude/                        # pré-visualização local no Claude (servidor PowerShell); não precisa publicar
└── portfolio v2/                   # o site (é esta pasta que vai para a hospedagem)
    ├── index.html                  # todo o conteúdo do site (seções comentadas)
    └── assets/
        ├── css/style.css           # estilos (índice no topo do arquivo; tokens de cor/fonte em :root)
        ├── js/i18n.js              # idiomas PT/EN: dicionário em inglês + "tradutor Kiroshi" (troca animada)
        ├── js/main.js              # menu mobile, revelação ao rolar, relógio, copiar e-mail, vídeos e modo braindance
        ├── js/breach-protocol.js   # easter egg (minigame) — pode ser removido sem afetar o resto
        ├── fonts/                  # Barlow, JetBrains Mono e Rajdhani (woff2, licença OFL); cache de 1 ano
        │                           #   via vercel.json — ao trocar uma fonte, use um nome de arquivo novo
        ├── img/                    # foto, favicons e imagem de compartilhamento (og-image.jpg)
        └── docs/                   # currículo em PDF (botão "Baixar currículo")
```

## Rodar localmente

- **Mais simples:** abra o `index.html` no navegador.
- **Com servidor local** (como o site vai rodar publicado), a partir da pasta `meu portfolio`:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1 -Root "portfolio v2"
```

Depois acesse http://localhost:5173.

## Editar o conteúdo

Tudo está no `index.html`, dividido por comentários:

| Seção | Comentário no HTML | O que editar |
| --- | --- | --- |
| Topo | `HERO` | nome, cargo, frase de apresentação, botões |
| Fatos rápidos | `FATOS RÁPIDOS` | empresa atual, formação, cidade, idiomas |
| Perfil | `01 PERFIL // CHARACTER` | bio e os 5 "atributos" |
| Projetos | `02 PROJETOS // JOURNAL` | destaques (*main jobs*), criativos com IA (*braindance*), outros projetos (*side jobs*) e sites (*gigs*) |
| Trajetória | `03 TRAJETÓRIA // LIFEPATH` | experiências, formação e idiomas |
| Stack | `04 STACK // CYBERWARE` | tecnologias por categoria |
| Contato | `05 CONTATO // MESSAGES` | e-mail, WhatsApp, LinkedIn e GitHub |

**Novo projeto em destaque:** copie um bloco `<article class="job panel">` e ajuste textos, tags e links.
O status usa as classes `status--live` (em operação), `status--demo` (demo online) ou `status--academic`.

**Trocar a foto:** substitua `assets/img/pedro-henrique-marcelino.webp`, mantendo o nome (ou atualize o `src` no HTML).
Se a proporção mudar, ajuste `width`/`height` da `<img>` e a posição do retículo em `.portrait__reticle` no CSS.

**Trocar o currículo:** substitua `assets/docs/curriculo-pedro-henrique-marcelino.pdf` mantendo o nome.

**Vídeos (card *Braindance*):** ficam no **Cloudflare R2** (bucket `videos-portfolio`), não no repositório.
São versões recodificadas para web: `homem-vs-ia-720p.mp4` (player), `cyberpunk-fundo.mp4` (fundo do card, 480p sem áudio)
e `cyberpunk-720p.mp4` (com áudio, carregado só no modo braindance pelo `data-src-hd`). Antes de subir um vídeo novo,
recodifique com o ffmpeg (H.264 ~2 Mbps com `-movflags +faststart`); vídeos exportados direto do editor costumam travar.
Depois atualize o `data-src` no `index.html`. O CORS do bucket precisa liberar `GET`/`HEAD` para o domínio do site;
sem isso, a onda de áudio do modo braindance não funciona. A pasta `assets/video/` está no `.gitignore`.

## Idiomas (português e inglês)

O site abre no idioma do navegador (português para `pt-*`, inglês para os demais) e lembra a escolha feita
no seletor PT/EN da barra de status. Para mandar o link já em inglês: `https://portfoliov2-pi-one.vercel.app/?lang=en`.

- O **português** é o próprio `index.html`. O **inglês** fica no dicionário `EN` do `assets/js/i18n.js`, onde a chave é
  o conteúdo do elemento em português (com a marcação interna, como `<strong>`) e o valor é a versão em inglês.
- **Editou um texto em português?** Atualize a chave correspondente no dicionário. Sem isso, aquele trecho continua em
  português na versão em inglês; rodando em `localhost`, o console do navegador lista tudo o que ficou sem tradução.
- **Textos gerados por JavaScript** (botões tocar/pausar, minigame etc.) usam `window.i18n.t('texto em PT')` e o
  evento `langchange`.

## Publicar

Funciona em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages):

- **Vercel / Netlify:** importe o repositório; não há comando de build e o diretório de saída é a raiz.
- **GitHub Pages:** *Settings → Pages → Deploy from a branch*, pasta raiz.

O endereço oficial (`https://portfoliov2-pi-one.vercel.app`) está no `<head>` do `index.html` (canonical, `og:url`,
`og:image`, `twitter:image` e JSON-LD). Ao trocar de domínio, atualize todas essas ocorrências: LinkedIn e WhatsApp
exigem URLs completas para mostrar a prévia do link.

## Referências ao jogo (easter eggs)

- Seções com nomes do menu do jogo: *Character*, *Journal*, *Lifepath*, *Shards*, *Cyberware*, *Messages*.
- Projetos organizados como no diário: *Main jobs*, *Side jobs* e *Gigs*, com o losango de missão no status.
- Os 5 atributos (*Intelligence*, *Technical Ability*, *Reflexes*, *Cool*, *Body*) descrevem as competências.
- Retrato com "scan" das *Kiroshi Optics* (passe o mouse na foto para escanear de novo).
- Troca de idioma como o tradutor das *Kiroshi*: uma linha de scan desce a tela e os textos se decodificam no outro idioma.
- Vídeos com IA na seção *Braindance* (as "gravações" do jogo), com o fluxo em camadas como no editor de BD.
  O botão **Entrar no braindance** abre o vídeo de fundo em tela cheia, com áudio, camada térmica e linha do tempo.
- Stack organizada por slots de *cyberware* (criativos no *Ocular system*); WhatsApp como *Holocall*; *never fade away* no rodapé.
- **Breach Protocol jogável:** botão `> breach_protocol` no rodapé, `breach()` no console ou Konami code
  (↑ ↑ ↓ ↓ ← → ← → B A). A matriz é gerada a partir de um caminho válido, então sempre tem solução.

## Acessibilidade e desempenho

- Navegação por teclado, link "pular para o conteúdo", foco visível e textos alternativos.
- Respeita `prefers-reduced-motion`: as animações são desligadas para quem prefere menos movimento.
- Responsivo de 320px a telas largas, testado em 320, 375, 768, 1024, 1080, 1440 e 1920px.
- Sem bibliotecas externas além das fontes do Google Fonts (Rajdhani, Barlow e JetBrains Mono).
