/* ==========================================================================
   Idiomas (PT/EN) — "tradutor Kiroshi"
   No jogo, os implantes óticos Kiroshi traduzem qualquer idioma em tempo real.
   Aqui: ao trocar o idioma, uma linha de scan desce a tela e cada texto visível
   se decodifica no outro idioma quando ela passa.

   Como funciona
   - O português é o próprio index.html. O inglês está no dicionário EN abaixo:
     a chave é o conteúdo do elemento em português (HTML interno, com os espaços
     colapsados) e o valor é a versão em inglês, com a mesma marcação.
   - O idioma inicial é decidido no <head> (antes da primeira pintura):
     ?lang=pt|en na URL > escolha salva > idioma do navegador (pt* → PT, resto → EN).
   - Textos criados por JS usam window.i18n.t('texto em PT') e o evento
     'langchange' (veja main.js e breach-protocol.js).

   Ao editar um texto em português no HTML, atualize a chave correspondente aqui.
   Em localhost, o console lista os textos em português que ficaram sem tradução.
   ========================================================================== */
(() => {
  'use strict';

  const EN = {
    /* ---------------------------------------------------- Página / <head> */
    'Pedro Henrique Marcelino — Desenvolvedor Fullstack & Suporte de TI': 'Pedro Henrique Marcelino — Fullstack Developer & IT Support',
    'Portfólio de Pedro Henrique Marcelino, desenvolvedor fullstack júnior e suporte de TI em Leme/SP. Sistemas SaaS e corporativos, integrações com APIs REST, bancos de dados, infraestrutura em VPS e vídeos de marketing com IA.':
      'Portfolio of Pedro Henrique Marcelino, junior fullstack developer and IT support in Leme, Brazil. SaaS and enterprise systems, REST API integrations, databases, VPS infrastructure and AI-powered marketing videos.',

    /* ---------------------------------------- Status bar, header e menu */
    'Pular para o conteúdo': 'Skip to content',
    'Disponível para presencial e home office': 'Available for on-site and remote work',
    'Pedro Henrique Marcelino, voltar ao início': 'Pedro Henrique Marcelino, back to top',
    'Fullstack · Suporte de TI': 'Fullstack · IT Support',
    'Navegação principal': 'Main navigation',
    '<span class="nav__index">01</span>Perfil': '<span class="nav__index">01</span>Profile',
    '<span class="nav__index">02</span>Projetos': '<span class="nav__index">02</span>Projects',
    '<span class="nav__index">03</span>Trajetória': '<span class="nav__index">03</span>Career',
    '<span class="nav__index">05</span>Contato': '<span class="nav__index">05</span>Contact',
    'Currículo <span class="btn__icon" aria-hidden="true">↓</span>': 'Résumé (PT) <span class="btn__icon" aria-hidden="true">↓</span>',
    'E-mail': 'Email',

    /* ---------------------------------------------------------------- Hero */
    'Desenvolvedor Fullstack Júnior · Suporte de TI': 'Junior Fullstack Developer · IT Support',
    'Construo <strong>sistemas SaaS e corporativos</strong> que conectam APIs, bancos de dados e a operação real das empresas — e mantenho a infraestrutura rodando quando ela mais importa.':
      'I build <strong>SaaS and enterprise systems</strong> that connect APIs, databases and the real-world operations of companies — and I keep the infrastructure running when it matters most.',
    'Ver projetos <span class="btn__icon" aria-hidden="true">→</span>': 'View projects <span class="btn__icon" aria-hidden="true">→</span>',
    'Baixar currículo <span class="btn__icon" aria-hidden="true">↓</span>': 'Download résumé (PT) <span class="btn__icon" aria-hidden="true">↓</span>',
    'Pedro Henrique Marcelino, de suéter preto e corrente prateada, em retrato sobre fundo escuro':
      'Pedro Henrique Marcelino in a black sweater and silver chain, portrait on a dark background',
    'Alvo identificado': 'Target identified',
    'Nome': 'Name',
    'Classe': 'Class',
    'Fullstack / Suporte TI': 'Fullstack / IT Support',
    'Afiliação': 'Affiliation',
    'Ameaça': 'Threat',
    'Só para bugs': 'Only to bugs',

    /* ------------------------------------------------------ Fatos rápidos */
    'Resumo rápido': 'Quick summary',
    'Atual': 'Current',
    'Suporte de TI &amp; Dev Fullstack · jun 2026 — hoje': 'IT Support &amp; Fullstack Dev · Jun 2026 — present',
    'Formação': 'Education',
    'Sistemas de Informação': 'Information Systems',
    'FHO Uniararas · previsão 2028': 'FHO Uniararas · expected 2028',
    'Base': 'Based in',
    'Leme — SP': 'Leme — SP, Brazil',
    'Presencial ou home office · CNH AB': 'On-site or remote · Driver’s license A/B',
    'Idiomas': 'Languages',
    'Português nativo · inglês intermediário': 'Native Portuguese · intermediate English',

    /* -------------------------------------------------------------- Perfil */
    '<span class="kicker__index">01</span>Perfil<span class="kicker__game" lang="en">Character</span>':
      '<span class="kicker__index">01</span>Profile<span class="kicker__game" lang="en">Character</span>',
    'Do código à <span class="accent">operação real.</span>': 'From code to <span class="accent">real-world operations.</span>',
    'Tecnologia boa não é só <em>futurista</em> — é a que melhora o trabalho de alguém hoje.':
      'Good technology isn’t just <em>futuristic</em> — it’s the kind that makes someone’s work better today.',
    'Sou <strong>desenvolvedor fullstack júnior e suporte de TI na Kybernan</strong>, em Leme (SP). No dia a dia, desenvolvo e mantenho sistemas SaaS e corporativos — das regras de negócio e interfaces às integrações com APIs REST e bancos de dados relacionais e NoSQL — e cuido da infraestrutura em servidores VPS para que rotinas críticas não parem.':
      'I’m a <strong>junior fullstack developer and IT support specialist at Kybernan</strong>, in Leme, Brazil. Day to day, I build and maintain SaaS and enterprise systems — from business rules and interfaces to integrations with REST APIs and relational and NoSQL databases — and I look after the infrastructure on VPS servers so critical routines never stop.',
    'Trabalhar dos dois lados, construindo o software e apoiando quem depende dele, me deu uma <strong>visão de ponta a ponta</strong>: entendo o problema na operação, traduzo em solução técnica e acompanho até ela rodar em produção. Antes disso, como consultor de robótica educacional, desenvolvia algoritmos em C para sistemas embarcados e ensinava lógica de programação.':
      'Working on both sides — building the software and supporting the people who rely on it — gave me an <strong>end-to-end view</strong>: I understand the problem in the field, turn it into a technical solution and follow it all the way to production. Before that, as an educational robotics consultant, I wrote C algorithms for embedded systems and taught programming logic.',
    'Também tenho um lado criativo forte: produzo <strong>vídeos de marketing com IA</strong> para o Instagram da @kyberfood, com cenas geradas no Google Flow, vozes no ElevenLabs e edição manual.':
      'I also have a strong creative side: I produce <strong>AI-powered marketing videos</strong> for @kyberfood on Instagram, with scenes generated in Google Flow, voices in ElevenLabs and hand editing.',
    'Hoje curso <strong>Sistemas de Informação na FHO Uniararas</strong> e sigo construindo soluções escaláveis, confiáveis e centradas na eficiência do negócio.':
      'I’m currently studying <strong>Information Systems at FHO Uniararas</strong> and keep building scalable, reliable solutions focused on business efficiency.',
    'Atributos <span lang="en">// Attributes</span>': 'Attributes',
    'Lógica &amp; pensamento crítico': 'Logic &amp; critical thinking',
    'Lógica algorítmica e questionamento construtivo para entender o problema antes de propor a solução.':
      'Algorithmic logic and constructive questioning to understand the problem before proposing a solution.',
    'Fullstack de ponta a ponta': 'End-to-end fullstack',
    'Regras de negócio, interfaces, APIs REST e bancos de dados, com boas práticas e Clean Code.':
      'Business rules, interfaces, REST APIs and databases, with good practices and Clean Code.',
    'Suporte &amp; infraestrutura': 'Support &amp; infrastructure',
    'Servidores VPS, rotinas sincronizadas e resposta rápida para manter serviços críticos no ar.':
      'VPS servers, synchronized routines and fast response to keep critical services up and running.',
    'Comunicação &amp; tradução técnica': 'Communication &amp; technical translation',
    'Explico o técnico com clareza para quem opera, aprende ou decide — e colaboro bem em equipe.':
      'I explain technical topics clearly to whoever operates, learns or decides — and I work well in a team.',
    'Adaptabilidade &amp; aprendizado': 'Adaptability &amp; learning',
    'Resiliência, organização e curiosidade ativa para aprender rápido o que cada projeto exige.':
      'Resilience, organization and active curiosity to quickly learn whatever each project demands.',

    /* ------------------------------------------------------------ Projetos */
    '<span class="kicker__index">02</span>Projetos<span class="kicker__game" lang="en">Journal</span>':
      '<span class="kicker__index">02</span>Projects<span class="kicker__game" lang="en">Journal</span>',
    'Missões em <span class="accent">produção.</span>': 'Missions in <span class="accent">production.</span>',
    'Produtos em operação, projetos acadêmicos e experimentos — sempre com o mesmo objetivo: menos trabalho manual, dados confiáveis e interfaces que acompanham o ritmo do negócio.':
      'Products in operation, academic projects and experiments — always with the same goal: less manual work, reliable data and interfaces that keep up with the pace of the business.',
    'Em destaque': 'Featured',
    'Em operação': 'In production',
    'Tecnologias e temas': 'Technologies and topics',
    'Tecnologias': 'Technologies',
    'Código proprietário · Kybernan': 'Proprietary code · Kybernan',
    '(abre em nova aba)': '(opens in a new tab)',

    // Kyberrock
    'Pesagem': 'Weighing',
    'Carregamento': 'Loading',
    'SaaS corporativo · Integração ERP': 'Enterprise SaaS · ERP integration',
    'Gestão industrial e balança rodoviária para pedreiras': 'Industrial management and truck scale for quarries',
    'Sistema de gestão e operação para pedreiras, integrado nativamente ao ERP OMIE: faz a pesagem na balança rodoviária, organiza o carregamento e integra o faturamento. Atuo no desenvolvimento e na sustentação do produto.':
      'Management and operations system for quarries, natively integrated with the OMIE ERP: it handles truck-scale weighing, organizes loading and integrates billing. I work on the product’s development and maintenance.',
    'Interface direta com a balança rodoviária, que segue operando mesmo sem internet': 'Direct interface with the truck scale, which keeps working even without internet',
    'Consumo massivo de APIs e sincronização complexa de dados com o OMIE': 'Heavy API consumption and complex data synchronization with OMIE',
    'Gestor, comercial, carregador e diretoria acompanham tudo ao vivo, no computador ou no celular': 'Managers, sales, loaders and executives follow everything live, on desktop or mobile',
    'Sincronização de dados': 'Data sync',
    'Operação offline': 'Offline operation',
    'Tempo real': 'Real time',

    // Kyberfood
    'Pedidos': 'Orders',
    'Automação': 'Automation',
    'Retenção': 'Retention',
    'SaaS · Automação &amp; IA': 'SaaS · Automation &amp; AI',
    'Pedidos e gestão para gastronomia': 'Ordering and management for restaurants',
    'Participação no desenvolvimento de um ecossistema SaaS com IA integrada para o setor de gastronomia, criando recursos com foco em automação operacional, retenção de clientes e usabilidade.':
      'Took part in building a SaaS ecosystem with built-in AI for the food service industry, creating features focused on operational automation, customer retention and usability.',
    'Recursos de automação que tiram trabalho manual da operação': 'Automation features that take manual work off the operation',
    'Funcionalidades voltadas à retenção e ao retorno de clientes': 'Features aimed at retaining customers and bringing them back',
    'Melhorias contínuas de usabilidade nas interfaces': 'Continuous usability improvements across the interfaces',
    'IA integrada': 'Built-in AI',

    // KyberGo
    'Demo online': 'Live demo',
    'IA': 'AI',
    'SaaS B2B · IA + WhatsApp': 'B2B SaaS · AI + WhatsApp',
    'Orçamentos profissionais por IA, direto no WhatsApp': 'Professional AI-generated quotes, right on WhatsApp',
    'Plataforma multi-tenant para empresas de serviço. A IA conversa com o cliente no WhatsApp (texto ou áudio), aplica as regras de cálculo da empresa, gera a proposta em PDF, cria o lead no CRM e agenda o follow-up.':
      'Multi-tenant platform for service companies. The AI chats with the customer on WhatsApp (text or audio), applies the company’s pricing rules, generates the proposal as a PDF, creates the lead in the CRM and schedules the follow-up.',
    'Dois modos de orçamento: por regras configuradas ou documento livre — sem a IA inventar preço': 'Two quoting modes: configured rules or a free-form document — the AI never makes up prices',
    'CRM Kanban, automações de follow-up, editor visual de PDF e planos de assinatura': 'Kanban CRM, follow-up automations, visual PDF editor and subscription plans',
    'Integrações desacopladas por adaptadores: WhatsApp, IA e cobrança': 'Decoupled integrations through adapters: WhatsApp, AI and billing',
    'Ver demo<span class="sr-only"> do KyberGo (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'View demo<span class="sr-only"> of KyberGo (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Código<span class="sr-only"> do KyberGo no GitHub (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Code<span class="sr-only"> for KyberGo on GitHub (opens in a new tab)</span> <span aria-hidden="true">↗</span>',

    // SustentaAI
    'Acadêmico': 'Academic',
    'Texto + imagem': 'Text + image',
    'Mapa': 'Map',
    'Projeto acadêmico · Web inteligente': 'Academic project · Smart web',
    'Plataforma web de sustentabilidade com IA': 'AI-powered sustainability web platform',
    'Arquitetura fullstack integrada às APIs do Google Gemini e do Google Maps para analisar o conteúdo enviado pelo usuário e localizar postos de reciclagem por geolocalização.':
      'Fullstack architecture integrated with the Google Gemini and Google Maps APIs to analyze user-submitted content and find recycling points by geolocation.',
    'Análise multimodal de texto e imagem com Google Gemini': 'Multimodal text and image analysis with Google Gemini',
    'Validação assíncrona das informações enviadas': 'Asynchronous validation of submitted information',
    'Geolocalização de postos de reciclagem com Google Maps': 'Recycling point geolocation with Google Maps',
    'Geolocalização': 'Geolocation',

    // Criativos com IA (braindance)
    'Criativos com IA': 'AI creatives',
    'No ar': 'Live',
    'Marketing · IA generativa · Vídeo': 'Marketing · Generative AI · Video',
    'Vídeos criativos com IA': 'Creative AI videos',
    'Reels e criativos para o Instagram @kyberfood': 'Reels and creatives for @kyberfood on Instagram',
    'Do conceito ao vídeo final: produzo vídeos de marketing para a KyberFood combinando geração de cenas por IA, locução com voz sintética e edição manual, com ritmo e acabamento de peça publicitária.':
      'From concept to final cut: I produce marketing videos for KyberFood combining AI-generated scenes, synthetic voice-over and hand editing, with the pacing and polish of an ad.',
    'Geração de cenas com IA no Google Flow': 'AI scene generation in Google Flow',
    'Vozes e locução com ElevenLabs': 'Voices and voice-over with ElevenLabs',
    'Edição manual: cortes, ritmo e finalização no formato vertical para Reels': 'Hand editing: cuts, pacing and finishing in vertical format for Reels',
    'Ferramentas e temas': 'Tools and topics',
    'Edição de vídeo': 'Video editing',
    '<span class="bd__dive-dot" aria-hidden="true"></span>Entrar no braindance': '<span class="bd__dive-dot" aria-hidden="true"></span>Enter the braindance',
    'Ver no Instagram<span class="sr-only"> (@kyberfood, abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'View on Instagram<span class="sr-only"> (@kyberfood, opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Fluxo de produção': 'Production workflow',
    'Conceito &amp; prompts': 'Concept &amp; prompts',
    'Ideia, roteiro e prompts pensados cena a cena.': 'Idea, script and prompts planned scene by scene.',
    'Geração no Google Flow': 'Generation in Google Flow',
    'Cenas geradas por IA a partir dos prompts e das referências.': 'AI-generated scenes built from the prompts and references.',
    'Voz no ElevenLabs': 'Voice in ElevenLabs',
    'Locução e vozes sob medida para cada peça.': 'Voice-over and custom voices for each piece.',
    'Edição manual': 'Hand editing',
    'Cortes, ritmo e finalização para o feed.': 'Cuts, pacing and finishing for the feed.',
    'Vídeo Homem vs IA, produzido com IA': 'Man vs AI video, made with AI',
    'Carregando sinal': 'Loading signal',
    '<span lang="en">BD playback</span> · Homem vs IA': '<span lang="en">BD playback</span> · Man vs AI',
    'Som': 'Sound',

    // Outros projetos
    'Outros projetos': 'Other projects',
    'Transforma vários PDFs em mapas mentais personalizáveis e exportáveis em PNG ou PDF, com IA opcional e fallback automático para NLP local.':
      'Turns multiple PDFs into customizable mind maps you can export as PNG or PDF, with optional AI and automatic fallback to local NLP.',
    'Demo<span class="sr-only"> do BrainMaster (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Demo<span class="sr-only"> of BrainMaster (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Código<span class="sr-only"> do BrainMaster no GitHub (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Code<span class="sr-only"> for BrainMaster on GitHub (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Avaliação comportamental DISC com três modos de questionário e laudos de RH gerados pelo Google Gemini, exportados em relatórios PDF.':
      'DISC behavioral assessment with three questionnaire modes and HR reports generated by Google Gemini, exported as PDF.',
    'Demo<span class="sr-only"> do Sistema DISC (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Demo<span class="sr-only"> of Sistema DISC (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Código<span class="sr-only"> do Sistema DISC no GitHub (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Code<span class="sr-only"> for Sistema DISC on GitHub (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Organização de tarefas e colaboração: grupos, quadros, notas e tarefas compartilhadas, com login Google e conexão em tempo real via Firebase.':
      'Task organization and collaboration: groups, boards, notes and shared tasks, with Google sign-in and real-time sync via Firebase.',
    'Demo<span class="sr-only"> do WorkSync (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Demo<span class="sr-only"> of WorkSync (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Código<span class="sr-only"> do WorkSync no GitHub (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Code<span class="sr-only"> for WorkSync on GitHub (opens in a new tab)</span> <span aria-hidden="true">↗</span>',
    'Automação que gera a planilha mensal de gastos no Excel já formatada, com fórmulas nativas e o planejamento herdado do mês anterior.':
      'Automation that generates the monthly Excel expense spreadsheet already formatted, with native formulas and the budget carried over from the previous month.',
    'Código<span class="sr-only"> do AutoFinanças no GitHub (abre em nova aba)</span> <span aria-hidden="true">↗</span>':
      'Code<span class="sr-only"> for AutoFinanças on GitHub (opens in a new tab)</span> <span aria-hidden="true">↗</span>',

    // Sites & landing pages
    'Sites &amp; landing pages': 'Websites &amp; landing pages',
    'Site para cafeteria em Leme/SP': 'Website for a café in Leme, Brazil',
    'Hamburgueria artesanal com delivery em Leme/SP': 'Craft burger joint with delivery in Leme, Brazil',
    'Site para espetaria': 'Website for a skewer grill',
    'Landing page para empresa de sistemas de segurança': 'Landing page for a security systems company',

    /* ---------------------------------------------------------- Trajetória */
    '<span class="kicker__index">03</span>Trajetória<span class="kicker__game" lang="en">Lifepath</span>':
      '<span class="kicker__index">03</span>Career<span class="kicker__game" lang="en">Lifepath</span>',
    'Cada etapa, um <span class="accent">upgrade.</span>': 'Every step, an <span class="accent">upgrade.</span>',
    'Experiência': 'Experience',
    'Jun 2026 — Presente': 'Jun 2026 — Present',
    'Ativo': 'Active',
    'Suporte de TI &amp; Desenvolvedor Fullstack': 'IT Support &amp; Fullstack Developer',
    '<strong>Desenvolvimento fullstack &amp; SaaS:</strong> novas funcionalidades, regras de negócio e interfaces focadas na experiência do usuário em sistemas SaaS e corporativos de alta performance.':
      '<strong>Fullstack &amp; SaaS development:</strong> new features, business rules and user-experience-focused interfaces in high-performance SaaS and enterprise systems.',
    '<strong>Infraestrutura &amp; suporte:</strong> suporte em infraestrutura de TI, gerenciamento de servidores VPS (Easypanel) e sincronização contínua de rotinas e serviços críticos.':
      '<strong>Infrastructure &amp; support:</strong> IT infrastructure support, VPS server management (Easypanel) and continuous synchronization of critical routines and services.',
    '<strong>Marketing &amp; comunicação:</strong> criação de peças visuais e vídeos criativos com IA para campanhas e para o Instagram @kyberfood, com Google Flow (geração), ElevenLabs (voz) e edição manual.':
      '<strong>Marketing &amp; communication:</strong> visual assets and creative AI videos for campaigns and for @kyberfood on Instagram, using Google Flow (generation), ElevenLabs (voice) and hand editing.',
    'Experiência anterior': 'Previous experience',
    'Concluído': 'Completed',
    'Consultor de Robótica Educacional': 'Educational Robotics Consultant',
    '<strong>Algoritmos &amp; programação:</strong> desenvolvimento e depuração de algoritmos estruturados em linguagem C para sistemas embarcados.':
      '<strong>Algorithms &amp; programming:</strong> development and debugging of structured C algorithms for embedded systems.',
    '<strong>Suporte &amp; qualidade:</strong> suporte técnico a hardware e software, testes práticos e validação lógica.':
      '<strong>Support &amp; quality:</strong> hardware and software technical support, hands-on testing and logic validation.',
    '<strong>Comunicação técnica:</strong> orientação de estudantes em lógica computacional, com clareza didática e trabalho em equipe.':
      '<strong>Technical communication:</strong> mentoring students in computational logic, with clear teaching and teamwork.',
    'Formação <span class="col-title__game" lang="en">Shards</span>': 'Education <span class="col-title__game" lang="en">Shards</span>',
    'Em curso': 'In progress',
    'Bacharelado em Sistemas de Informação': 'Bachelor’s in Information Systems',
    'Previsão de conclusão: 2028': 'Expected graduation: 2028',
    'Técnico em Desenvolvimento de Sistemas': 'Technical Degree in Systems Development',
    'Concluído em 2024': 'Completed in 2024',
    'Informática Profissional': 'Professional IT Course',
    'Português': 'Portuguese',
    'Nativo': 'Native',
    'Inglês': 'English',
    'Intermediário': 'Intermediate',

    /* --------------------------------------------------------------- Stack */
    'Ferramentas para <span class="accent">fazer acontecer.</span>': 'Tools to <span class="accent">make it happen.</span>',
    'O que uso no dia a dia para construir, integrar e manter sistemas em produção.': 'What I use every day to build, integrate and maintain systems in production.',
    'Linguagens': 'Languages',
    'Java (POO)': 'Java (OOP)',
    'Bancos de dados': 'Databases',
    'Integrações &amp; IA': 'Integrations &amp; AI',
    'Infra &amp; ferramentas': 'Infra &amp; tools',
    'Arquitetura &amp; práticas': 'Architecture &amp; practices',
    'Desenvolvimento fullstack': 'Fullstack development',
    'Arquitetura SaaS': 'SaaS architecture',
    'Software corporativo': 'Enterprise software',
    'Lógica algorítmica': 'Algorithmic logic',
    'Criativos &amp; IA generativa': 'Creative &amp; generative AI',
    'Peças visuais': 'Visual assets',
    'Também presentes nos meus projetos: TypeScript, Next.js, Tailwind, Python, D3.js e PDF.js.': 'Also used across my projects: TypeScript, Next.js, Tailwind, Python, D3.js and PDF.js.',

    /* ------------------------------------------------------------- Contato */
    '<span class="kicker__index">05</span>Contato<span class="kicker__game" lang="en">Messages</span>':
      '<span class="kicker__index">05</span>Contact<span class="kicker__game" lang="en">Messages</span>',
    'Tem um sistema para <span class="accent">colocar em movimento?</span>': 'Got a system to <span class="accent">set in motion?</span>',
    'Vamos conversar sobre como posso somar à sua equipe — no desenvolvimento fullstack ou no suporte de TI, presencial ou home office.':
      'Let’s talk about how I can add to your team — in fullstack development or IT support, on-site or remote.',
    'Enviar e-mail <span class="btn__icon" aria-hidden="true">→</span>': 'Send email <span class="btn__icon" aria-hidden="true">→</span>',
    'mailto:pedromarcelinoh7@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio': 'mailto:pedromarcelinoh7@gmail.com?subject=Contact%20from%20your%20portfolio',
    'Copiar e-mail': 'Copy email',

    /* -------------------------------------------------------------- Rodapé */
    'Feito à mão com HTML, CSS e JavaScript <span aria-hidden="true">//</span> <span lang="en">never fade away</span>':
      'Handmade with HTML, CSS and JavaScript <span aria-hidden="true">//</span> <span lang="en">never fade away</span>',
    'Topo <span aria-hidden="true">↑</span>': 'Top <span aria-hidden="true">↑</span>',

    /* ----------------------------------------- Breach protocol (easter egg) */
    'Fechar': 'Close',
    'Monte as sequências escolhendo códigos na matriz. Comece pela <b>linha</b> destacada; a cada escolha, alterne entre <b>coluna</b> e <b>linha</b> a partir do último código.':
      'Build the sequences by picking codes in the matrix. Start on the highlighted <b>row</b>; with each pick, alternate between <b>column</b> and <b>row</b> from the last code.',
    'Matriz de código': 'Code matrix',
    'Sequências': 'Sequences',
    'Nova matriz': 'New matrix',
    // textos gerados pelo breach-protocol.js
    'Derruba o firewall do portfólio': 'Takes down the portfolio’s firewall',
    'Extrai o arquivo contato_pedro.dat': 'Extracts the contato_pedro.dat file',
    'Linha {r}, coluna {c}: {code}': 'Row {r}, column {c}: {code}',
    'já usado': 'already used',
    'vazio': 'empty',
    'Carregado': 'Uploaded',
    'Falhou': 'Failed',
    'Pendente': 'Pending',
    'Acesso concedido': 'Access granted',
    'Firewall derrubado e arquivo extraído: <code>contato_pedro.dat</code>. Brincadeiras à parte, o convite é sério — vamos conversar?':
      'Firewall down and file extracted: <code>contato_pedro.dat</code>. All jokes aside, the invitation is real — shall we talk?',
    'mailto:pedromarcelinoh7@gmail.com?subject=Breach%20protocol%20conclu%C3%ADdo': 'mailto:pedromarcelinoh7@gmail.com?subject=Breach%20protocol%20completed',
    'Enviar e-mail': 'Send email',
    'Ver contatos': 'View contacts',
    'Acesso parcial': 'Partial access',
    'Um daemon foi carregado, mas o buffer não deu conta do outro. Gere uma nova matriz e tente fechar as duas sequências.':
      'One daemon was uploaded, but the buffer couldn’t fit the other. Generate a new matrix and try to complete both sequences.',
    'Breach falhou': 'Breach failed',
    'O ICE venceu desta vez. Gere uma nova matriz e tente de novo.': 'The ICE won this time. Generate a new matrix and try again.',
    'Breach protocol iniciado. Boa sorte, netrunner.': 'Breach protocol initiated. Good luck, netrunner.',
    'Wake up, samurai. Temos sistemas para construir.': 'Wake up, samurai. We have systems to build.',
    '> digite breach() para iniciar o breach protocol · pedromarcelinoh7@gmail.com': '> type breach() to start the breach protocol · pedromarcelinoh7@gmail.com',

    /* ------------------------------------------------- Modo braindance */
    'Modo imersão': 'Immersion mode',
    'Sincronizado': 'Synced',
    'Desconectar <kbd>Esc</kbd>': 'Disconnect <kbd>Esc</kbd>',
    'Camadas': 'Layers',
    '<strong>Visual</strong> cena gerada no Google Flow': '<strong>Visual</strong> scene generated in Google Flow',
    'Áudio': 'Audio',
    '<strong>Áudio</strong> trilha e voz': '<strong>Audio</strong> soundtrack and voice',
    'Térmico': 'Thermal',
    '<strong>Térmico</strong> leitura de calor da cena': '<strong>Thermal</strong> heat reading of the scene',
    'Alterne as camadas e percorra a linha do tempo para analisar a cena, como no editor de braindance.':
      'Toggle the layers and scrub the timeline to analyze the scene, just like in the braindance editor.',
    'Sincronizando<span class="bd-dive__sync-dots">...</span>': 'Syncing<span class="bd-dive__sync-dots">...</span>',
    'Dados da gravação': 'Recording data',
    'Arquivo': 'File',
    'Resolução': 'Resolution',
    'Duração': 'Duration',
    'Voz': 'Voice',
    'Edição': 'Editing',
    'Linha do tempo': 'Timeline',

    /* --------------------------------------------- Textos do main.js */
    'Menu': 'Menu',
    'E-mail copiado ✓': 'Email copied ✓',
    'E-mail copiado para a área de transferência.': 'Email copied to the clipboard.',
    'Não foi possível copiar automaticamente. E-mail: {email}': 'Couldn’t copy automatically. Email: {email}',
    'Pausar': 'Pause',
    'Tocar': 'Play',
  };

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const norm = (text) => String(text).replace(/\s+/g, ' ').trim();
  const dict = new Map(Object.entries(EN).map(([pt, en]) => [norm(pt), en]));

  let lang = root.dataset.lang === 'en' ? 'en' : 'pt';

  const t = (pt, vars) => {
    let text = lang === 'en' ? (dict.get(norm(pt)) ?? pt) : pt;
    if (vars) text = text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''));
    return text;
  };

  /* ------------------------------------------- Registro dos textos da página */
  // conteúdo controlado por JS (main.js / breach-protocol.js) ou que não deve ser traduzido
  const SKIP = [
    'script', 'style', 'noscript', 'svg', '[data-lang-switch]', '.kiroshi-toast',
    '[data-clock]', '[data-year]', '[data-nav-label]', '[data-player-play]', '[data-player-time]',
    '[data-dive-play]', '[data-dive-time]', '[data-dive-res]', '[data-dive-dur]', '[data-copy-status]',
    '[data-breach-matrix]', '[data-breach-buffer]', '[data-breach-daemons]', '[data-breach-result]',
  ].join(', ');
  const HAS_LETTER = /[A-Za-zÀ-ÿ]/;
  const LOOKS_PT = /[ãõçáéíóúâêô]|\b(de|da|do|das|dos|para|com|em|que|no|na|um|uma)\b/i;

  const entries = []; // { el, attr?, pt, en }
  const meta = {
    title: document.title,
    desc: document.querySelector('meta[name="description"]'),
  };
  meta.descPt = meta.desc?.getAttribute('content') ?? '';
  let collected = false;

  function collect() {
    if (collected) return;
    collected = true;
    const missing = [];

    // o menor elemento que tem texto próprio; se ele tem tradução, é trocado inteiro (com a marcação interna)
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const holders = new Set();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (el && HAS_LETTER.test(node.nodeValue) && !el.closest(SKIP)) holders.add(el);
    }

    const owned = new Set();
    const insideOwned = (el) => {
      for (let p = el.parentElement; p; p = p.parentElement) if (owned.has(p)) return true;
      return false;
    };

    holders.forEach((el) => {
      if (insideOwned(el)) return;
      const key = norm(el.innerHTML);
      const en = dict.get(key);
      if (en === undefined || el.querySelector(SKIP)) {
        if (LOOKS_PT.test(el.textContent)) missing.push(key);
        return;
      }
      entries.push({ el, pt: el.innerHTML, en });
      owned.add(el);
    });

    // atributos fixos valem mesmo em elementos cujo conteúdo é do JS (ex.: a matriz do breach)
    document.querySelectorAll('[aria-label], [alt], [title], a[href^="mailto:"]').forEach((el) => {
      if (el.parentElement?.closest(SKIP) || insideOwned(el)) return;
      ['aria-label', 'alt', 'title', 'href'].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value || (attr === 'href' && !value.startsWith('mailto:'))) return;
        const en = dict.get(norm(value));
        if (en !== undefined) entries.push({ el, attr, pt: value, en });
        else if (attr !== 'href' && LOOKS_PT.test(value)) missing.push(`[${attr}] ${value}`);
      });
    });

    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && missing.length) {
      console.warn(`i18n: ${missing.length} texto(s) em português sem tradução em assets/js/i18n.js:`, missing);
    }
  }

  const valueOf = (entry, target) => (target === 'en' ? entry.en : entry.pt);

  // o efeito "decode" do main.js lê o texto final de data-final
  const syncDecode = (el) => {
    if (el.hasAttribute('data-decode')) el.dataset.final = el.textContent;
  };

  function write(entry, value) {
    if (entry.attr) {
      entry.el.setAttribute(entry.attr, value);
      return;
    }
    entry.el.innerHTML = value;
    syncDecode(entry.el);
  }

  function writeMeta() {
    document.title = t(meta.title);
    meta.desc?.setAttribute('content', t(meta.descPt));
    root.lang = lang === 'en' ? 'en' : 'pt-BR';
    root.dataset.lang = lang;
  }

  /* ------------------------------------------- Efeito: scan + decodificação */
  const SWEEP_MS = 650; // a linha atravessa a tela
  const DECODE_MS = 360; // cada texto curto se decodifica
  const GLYPHS = 'ABCDEF0123456789#$%&*+-/<>[]{}=?';
  let running = null;

  const scan = document.createElement('div');
  scan.className = 'kiroshi-scan';
  scan.setAttribute('aria-hidden', 'true');
  scan.style.setProperty('--sweep', `${SWEEP_MS}ms`);

  const plainText = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.textContent;
  };

  const glitch = (el) => {
    el.classList.remove('i18n-glitch');
    void el.offsetWidth; // reinicia a animação
    el.classList.add('i18n-glitch');
    window.setTimeout(() => el.classList.remove('i18n-glitch'), 450);
  };

  function sweep(target) {
    running?.finish();

    const height = window.innerHeight;
    const items = [];
    entries.forEach((entry) => {
      const value = valueOf(entry, target);
      if (entry.attr) {
        write(entry, value);
        return;
      }
      const rect = entry.el.getBoundingClientRect();
      const onScreen = rect.width > 0 && rect.bottom > 0 && rect.top < height;
      if (!onScreen) {
        write(entry, value);
        return;
      }
      const text = value.includes('<') ? null : plainText(value);
      items.push({
        entry,
        value,
        at: Math.max(0, Math.min(1, rect.top / height)) * SWEEP_MS,
        text: text && text.length <= 42 ? text : null, // textos curtos: decodificação; longos: glitch
        done: false,
      });
    });

    if (!scan.isConnected) document.body.append(scan);
    scan.classList.remove('is-running');
    void scan.offsetWidth;
    scan.classList.add('is-running');
    switcher?.classList.add('is-busy');

    const start = performance.now();
    let frame = 0;
    let fallback = 0;

    const finish = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      items.forEach((item) => {
        if (!item.done) write(item.entry, item.value);
        item.done = true;
      });
      scan.classList.remove('is-running');
      switcher?.classList.remove('is-busy');
      running = null;
    };

    const tick = (now) => {
      const elapsed = now - start;
      let pending = false;
      items.forEach((item) => {
        if (item.done) return;
        const local = elapsed - item.at;
        if (local < 0) {
          pending = true;
          return;
        }
        if (!item.text) {
          write(item.entry, item.value);
          glitch(item.entry.el);
          item.done = true;
          return;
        }
        const progress = local / DECODE_MS;
        if (progress >= 1) {
          write(item.entry, item.value);
          item.done = true;
          return;
        }
        const { el } = item.entry;
        if (el.hasAttribute('data-decode')) el.dataset.final = item.text;
        const revealed = Math.floor(progress * item.text.length);
        let out = '';
        for (let i = 0; i < item.text.length; i += 1) {
          const char = item.text[i];
          out += i < revealed || char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        el.textContent = out;
        pending = true;
      });
      if (pending) frame = requestAnimationFrame(tick);
      else finish();
    };

    frame = requestAnimationFrame(tick);
    // garantia: se o rAF pausar (aba em segundo plano), tudo termina traduzido
    fallback = window.setTimeout(finish, SWEEP_MS + DECODE_MS + 300);
    running = { finish };
  }

  /* --------------------------------------------------------- Aviso (HUD) */
  const toast = document.createElement('div');
  toast.className = 'kiroshi-toast';
  toast.setAttribute('role', 'status');
  let toastTimer = 0;

  function hideToast() {
    window.clearTimeout(toastTimer);
    toast.classList.remove('is-visible');
    toastTimer = window.setTimeout(() => toast.replaceChildren(), 400);
  }

  function showToast(message, { action, duration = 2600 } = {}) {
    window.clearTimeout(toastTimer);
    toast.innerHTML = `<span class="kiroshi-toast__tag">Kiroshi optics</span><span class="kiroshi-toast__msg"></span>`;
    toast.querySelector('.kiroshi-toast__msg').textContent = message;
    if (action) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'kiroshi-toast__action';
      button.lang = action.lang;
      button.textContent = action.label;
      button.addEventListener('click', () => {
        hideToast();
        action.run();
      });
      toast.append(button);
    }
    toast.classList.add('is-visible');
    const autoHide = () => {
      // não some enquanto o foco estiver no botão do aviso
      if (toast.matches(':focus-within')) toastTimer = window.setTimeout(autoHide, 1500);
      else hideToast();
    };
    toastTimer = window.setTimeout(autoHide, duration);
  }

  /* ------------------------------------------------------- Troca de idioma */
  const switcher = document.querySelector('[data-lang-switch]');
  const options = [...document.querySelectorAll('[data-lang-set]')];

  const syncSwitch = () => {
    options.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.langSet === lang)));
  };

  const remember = (value) => {
    try { localStorage.setItem('lang', value); } catch { /* navegação privada etc. */ }
  };

  function setLang(next, { animate = true, announce = true } = {}) {
    if (next !== 'pt' && next !== 'en') return;
    collect();
    if (next === lang) return;
    lang = next;
    writeMeta();
    syncSwitch();

    if (animate && !reduceMotion.matches) sweep(next);
    else {
      running?.finish();
      entries.forEach((entry) => write(entry, valueOf(entry, next)));
    }

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    if (announce) showToast(lang === 'en' ? 'PT → EN · translation online' : 'EN → PT · tradução online');
  }

  options.forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.dataset.langSet;
      if (next === lang) return;
      remember(next);
      // um ?lang= na URL não deve desfazer a escolha no próximo carregamento
      const url = new URL(window.location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.delete('lang');
        history.replaceState(history.state, '', url);
      }
      setLang(next);
    });
  });

  window.i18n = {
    get lang() { return lang; },
    t,
    set: (next) => {
      remember(next);
      setLang(next);
    },
    // reescreve um elemento registrado no idioma atual (ex.: depois que um JS mudou o texto dele)
    restore(el) {
      collect();
      const entry = entries.find((item) => item.el === el && !item.attr);
      if (!entry) return false;
      write(entry, valueOf(entry, lang));
      return true;
    },
  };

  /* ---------------------------------------------------------- Inicial */
  document.body.append(toast);
  syncSwitch();

  if (lang === 'en') {
    collect();
    entries.forEach((entry) => write(entry, entry.en));
    writeMeta();
  }
  root.classList.remove('i18n-pending');

  // primeira visita com o navegador em outro idioma: avisa que traduziu e oferece o português
  if (lang === 'en' && root.hasAttribute('data-lang-auto')) {
    let seen = false;
    try { seen = localStorage.getItem('lang-hint') === '1'; } catch { /* sem storage */ }
    if (!seen) {
      try { localStorage.setItem('lang-hint', '1'); } catch { /* sem storage */ }
      window.setTimeout(() => {
        if (lang !== 'en') return;
        showToast('Browser language detected · page translated to English', {
          duration: 8000,
          action: { label: 'Ver em português', lang: 'pt-BR', run: () => window.i18n.set('pt') },
        });
      }, 1400);
    }
  }

  // em português, o registro fica pronto num momento ocioso (a 1ª troca não espera por ele)
  if (!collected) {
    if ('requestIdleCallback' in window) window.requestIdleCallback(collect, { timeout: 3000 });
    else window.setTimeout(collect, 1500);
  }
})();
