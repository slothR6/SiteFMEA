export type StatItem = {
  label: string;
  value: number;
  suffix: string;
  icon: "diagnosticos" | "judicial" | "energia" | "nacional";
};

export const stats: StatItem[] = [
  { label: "Análises de Falhas Catastróficas", value: 25, suffix: "+", icon: "diagnosticos" },
  { label: "MW impulsionados", value: 20000, suffix: "+", icon: "energia" },
  { label: "De causas ganhas", value: 100, suffix: "%", icon: "judicial" },
  { label: "Atuação nacional", value: 13, suffix: " estados", icon: "nacional" }
];

export type CoverageState = {
  id: string;
  state: string;
  sector: string;
  serviceType: string;
  mw: string;
  description: string; 
};

export const nationalCoverage: CoverageState[] = [
  {
    id: "sp",
    state: "São Paulo",
    sector: "Infraestrutura e energia distribuída",
    serviceType: "Inspeção de ativos críticos e engenharia de confiabilidade",
    mw: "4.200 MW",
    description: "Programas de avaliação técnica para subestações, usinas e linhas de processo em operação contínua."
  },
  {
    id: "rj",
    state: "Rio de Janeiro",
    sector: "Óleo, gás e termoelétricas",
    serviceType: "Diagnóstico de falhas e perícia técnica especializada",
    mw: "2.150 MW",
    description: "Atuação em eventos de alta criticidade com rastreabilidade de evidência e suporte executivo."
  },
  {
    id: "mg",
    state: "Minas Gerais",
    sector: "Mineração e indústria de processo",
    serviceType: "Inspeções por risco e extensão de vida útil",
    mw: "1.380 MW",
    description: "Estruturação de planos de mitigação para ativos rotativos e estruturas sujeitas à fadiga."
  },
  {
    id: "ba",
    state: "Bahia",
    sector: "Eólica e infraestrutura logística",
    serviceType: "Análise de performance e retrofit de sistemas",
    mw: "2.980 MW",
    description: "Projetos de repotenciação com foco em disponibilidade anual e previsibilidade de manutenção."
  },
  {
    id: "ma",
    state: "Maranhão",
    sector: "Parques industriais e operações portuárias",
    serviceType: "Projeto executivo e validação técnica em campo",
    mw: "1.120 MW",
    description: "Acompanhamento técnico de modernização de sistemas eletromecânicos e utilidades."
  },
  {
    id: "ce",
    state: "Ceará",
    sector: "Energia renovável e transmissões",
    serviceType: "Inspeção especializada e diagnóstico de integridade",
    mw: "1.960 MW",
    description: "Apoio técnico para redução de indisponibilidades em corredores de geração e escoamento."
  },
  {
    id: "rn",
    state: "Rio Grande do Norte",
    sector: "Geração eólica",
    serviceType: "Investigação de falhas recorrentes",
    mw: "1.510 MW",
    description: "Diagnósticos de causa raiz com plano estruturado para estabilização de performance."
  },
  {
    id: "pr",
    state: "Paraná",
    sector: "Manufatura e energia de base",
    serviceType: "Governança técnica e auditoria operacional",
    mw: "1.040 MW",
    description: "Implantação de rotina de acompanhamento técnico com indicadores de risco e confiabilidade."
  },
  {
    id: "sc",
    state: "Santa Catarina",
    sector: "Indústria de processo",
    serviceType: "Inspeções multidisciplinares e pareceres técnicos",
    mw: "860 MW",
    description: "Atuação em ativos com criticidade elevada para prevenir paradas não programadas."
  },
  {
    id: "rs",
    state: "Rio Grande do Sul",
    sector: "Energia renovável e infraestrutura",
    serviceType: "Projetos de engenharia aplicada e comissionamento",
    mw: "1.430 MW",
    description: "Estruturação de soluções para ganho de eficiência em ambientes de operação severa."
  },
  {
    id: "pi",
    state: "Piauí",
    sector: "Agroindústria e cogeração",
    serviceType: "Análise de falhas e plano de confiabilidade",
    mw: "980 MW",
    description: "Integração entre engenharia de processos e disponibilidade de ativos para ciclos sazonais."
  },
  {
    id: "to",
    state: "Tocantins",
    sector: "Mineração e infraestrutura energética",
    serviceType: "Diagnóstico de integridade estrutural",
    mw: "1.260 MW",
    description: "Avaliação de ativos em ambiente agressivo com foco em segurança operacional e continuidade."
  },
  {
    id: "ms",
    state: "Mato Grosso do Sul",
    sector: "Bioenergia e operações industriais",
    serviceType: "Engenharia de confiabilidade e investigação de falhas",
    mw: "1.190 MW",
    description: "Diagnóstico técnico de ativos críticos com foco em disponibilidade, segurança operacional e redução de recorrências."
  }
];

export const partnerLogos = [
  { src: "/partners/auren-logo.svg", alt: "Auren Energia" },
  { src: "/partners/engie-logo.svg", alt: "Engie" },
  { src: "/partners/aes-logo.jpeg", alt: "AES" },
  { src: "/partners/gerdau-logo.png", alt: "Gerdau" },
  { src: "/partners/inpasa-logo.webp", alt: "Inpasa" },
  { src: "/partners/polimatec-logo.png", alt: "Polimatec" },
  { src: "/partners/invenergy-logo.png", alt: "Invenergy" },
  { src: "/partners/serra-logo.png", alt: "Serra Morena" },
  { src: "/partners/orto-logo.png", alt: "Ortosintese" },
];
export type TimelineItem = {
  period: string;
  title: string;
  description: string;
  focus: string;
  image: string;
  imageAlt: string;
  imageObjectPosition?: string;
  milestone: string;
};

export const timeline: TimelineItem[] = [
  {
    period: "2017-2019",
    title: "Fundação",
    description: "Estruturação da FMEA Engineering para atuar em engenharia com embasamento técnico-científico.",
    focus: "Padronização metodológica e operação inicial.",
    image: "/images/ufsc.jpg",
    imageAlt: "Infraestrutura industrial para início da operação técnica da FMEA",
    milestone: "Estrutura operacional e método proprietário"
  },
  {
    period: "2020-2022",
    title: "Consolidação técnica",
    description:
      "Expansão de escopo com atuação em sinistros de grandes componentes em todo o país, estruturando inspeções multidisciplinares para antecipação de falhas.",
    focus: "Governança técnica e confiabilidade de entregas.",
    image: "/inspetion.png",
    imageAlt: "Equipe técnica em análise de ativos energéticos",
    milestone: "Escopo nacional e inspeções integradas"
  },
  {
    period: "2023-2025",
    title: "Inovação e Desenvolvimento",
    description: "Escala nacional com desenvolvimento de projetos inovadores e integração entre dados de campo e engenharia aplicada.",
    focus: "Integração entre engenharia, risco e resultado operacional.",
    image: "/images/simulacao.png",
    imageAlt: "Painel de monitoramento técnico para projetos de engenharia",
    milestone: "Projetos em alta criticidade com performance mensurável"
  },
  {
    period: "2026",
    title: "Engenharia estratégica",
    description:
      "Atuação ampliada para programas de longo prazo com monitoramento de performance, previsão de falhas e melhoria contínua.",
    focus: "Arquitetura técnica para resiliência operacional.",
    image: "/hero-energia.png",
    imageAlt: "Parque industrial com monitoramento contínuo de performance",
    milestone: "Programas estruturados de longo prazo"
  }
];

export type ServiceItem = {
  title: string;
  description: string;
  href: "/servicos/analise-de-falhas" | "/servicos/inspecoes" | "/servicos/desenvolvimento-de-projetos";
  highlights: string[];
};

export const services: ServiceItem[] = [
  {
    title: "Análise de Falhas",
    description: "Investigação de causa raiz com rastreabilidade técnica para eliminar recorrências e reduzir perdas.",
    href: "/servicos/analise-de-falhas",
    highlights: ["Estudo de Causa Raiz", "Laudo técnico com embasamento técnico-científico", "Plano de mitigação"]
  },
  {
    title: "Inspeções Técnicas",
    description: "Inspeções presenciais e remotas orientadas por risco, com foco em confiabilidade e conformidade.",
    href: "/servicos/inspecoes",
    highlights: ["Planejamento por criticidade", "Registro de evidências", "Recomendações executivas"]
  },
  {
    title: "Desenvolvimento de Projetos",
    description: "Projetos de engenharia para modernização, retrofit e crescimento operacional em ambientes complexos.",
    href: "/servicos/desenvolvimento-de-projetos",
    highlights: ["Concepção e detalhamento", "Gestão de interfaces", "Apoio do TRL 1 ao TRL 9"]
  }
];

export type CaseStudy = {
  title: string;
  sector: string;
  challenge: string;
  solution: string;
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Repotenciação de complexo eólico",
    sector: "Energia Renovável",
    challenge: "Quedas recorrentes de disponibilidade em conjunto de aerogeradores com histórico de vibração elevada.",
    solution: "Diagnóstico de causa raiz, redefinição de janela de manutenção e projeto de retrofit por prioridade técnica.",
    result: "Aumento de 14% na disponibilidade anual e redução de eventos críticos em 41%."
  },
  {
    title: "Perícia técnica para litígio industrial",
    sector: "Infraestrutura",
    challenge: "Divergência técnica entre contratante e fornecedor sobre falha prematura de componente estrutural.",
    solution: "Mapeamento de evidências, cadeia causal validada e parecer independente com rastreabilidade documental.",
    result: "Subsídio decisivo para acordo judicial com reconhecimento integral da causa técnica."
  },
  {
    title: "Extensão de vida útil em ambiente corrosivo",
    sector: "Indústria de Processo",
    challenge: "Ativos críticos operando acima da taxa de degradação prevista, com risco de parada não programada.",
    solution: "Programa integrado de inspeção, engenharia de materiais e plano de intervenções por risco residual.",
    result: "Extensão de vida útil em 5 anos e previsibilidade de CAPEX para ciclo trienal."
  }
];

export const blogPosts = [
  {
    title: "Gestão de risco técnico em ativos de energia renovável",
    date: "15/02/2026",
    excerpt: "Como integrar inspeção, análise de falhas e engenharia de projetos em um único ciclo decisório."
  },
  {
    title: "Perícia técnica com foco em rastreabilidade de evidências",
    date: "30/01/2026",
    excerpt: "Boas práticas para sustentar conclusões técnicas em auditorias, arbitragens e contextos judiciais."
  },
  {
    title: "TRL aplicado ao desenvolvimento de projetos industriais",
    date: "12/01/2026",
    excerpt: "Uso da escala TRL para reduzir incerteza técnica e acelerar a maturidade de soluções complexas."
  }
];

export const strategicPillars = [
  {
    title: "Autoridade técnica",
    text: "Equipe multidisciplinar com metodologia personalizada para cada desafio."
  },
  {
    title: "Decisão baseada em ciência",
    text: "Laudos, pareceres e projetos estruturados com rastreabilidade e confiabilidade."
  },
  {
    title: "Execução orientada a resultado",
    text: "Planos técnicos com foco em disponibilidade, segurança operacional e previsibilidade financeira."
  }
];

export const ceoProfile = {
  name: "Dra. Eng. Patricia Ortega Cubillos",
  role: "CEO e Diretora Técnica",
  summary:
    "Engenheira com mais de 20 anos de experiência em diagnóstico de falhas, confiabilidade de ativos e engenharia para operações críticas.",
  credentials: [
    "Especialista em investigação de falhas e programas de integridade",
    "Liderança técnica em contratos de energia renovável e infraestrutura",
    "Atuação em perícias técnicas para disputas de alta complexidade"
  ]
};

export const responsibleTechnical = {
  fullName: "Dra. Eng. Patricia Ortega Cubillos",
  title: "Responsável Técnica | CEO | Doutoura em Engenharia de Materiais",
  institutionalText:
    "Responsável pela direção e validação técnica dos trabalhos da FMEA Engineering, com foco em integridade metodológica, rastreabilidade de evidências e confiabilidade das recomendações executivas em ambientes críticos.",
  highlights: [
    "20+ anos em engenharia aplicada para energia e infraestrutura",
    "Gestão técnica de projetos de alta criticidade operacional",
    "Coordenação de perícias e pareceres em disputas complexas"
  ],
  image: "/responsavel-tecnica.png",
  imageObjectPosition: "object-top"
};

export type TechnicalMember = {
  name: string;
  education: string;
  specialty: string;
  certifications: string[];
  miniResume: string;
  image: string;
  imageObjectPosition?: string;
};

export const technicalTeam: TechnicalMember[] = [
  {
    name: "Eng. Renir Reis",
    education: "Mestre em Engenharia Mecânica | UFSC",
    specialty: "Em atualização",
    certifications: ["Em atualização"],
    miniResume:
      "Em atualização.",
    image: "/renirPerfil.png"
  },
  {
    name: "Eng. Matheus Henrique",
    education: "Engenharia Mecânica| UFSC",
    specialty: "Em atualização",
    certifications: ["Em atualização"],
    miniResume:
      "Em atualização.",
    image: "/matheushenrique.png"
  },
  {
    name: "Eng. Antônio Fernandes",
    education: "Engenharia Mecânica | UFSC",
    specialty: "Em atualização",
    certifications: ["Em atualização"],
    miniResume:
      "Em atualização.",
    image: "/antoniofernandes.png"
  },
  {
    name: "Eng. Vinicius Oliveira",
    education: "Mestre em Engenharia Mecânica | UFSC",
    specialty: "Em atualização",
    certifications: ["Em atualização"],
    miniResume:
      "Em atualização",
    image: "/images/engineering-wind-team.jpg"
  }
];

export const contactInfo = {
  email: "contato@fmea.net.br",
  phone: "+55 48 9 8850-2403",
  whatsapp: "+55 48 9 8850-2403",
  office: "Florianópolis, SC",
  coverage: "Atuação nacional"
};

export const trlLevels = [
  { level: 1, description: "Princípios básicos e validação conceitual" },
  { level: 2, description: "Formulação técnica da solução" },
  { level: 3, description: "Prova de conceito em ambiente controlado" },
  { level: 4, description: "Validação em laboratório e simulação" },
  { level: 5, description: "Teste funcional em ambiente relevante" },
  { level: 6, description: "Demonstração de protótipo operacional" },
  { level: 7, description: "Integração em escala piloto" },
  { level: 8, description: "Sistema completo validado em campo" },
  { level: 9, description: "Operação consolidada em ambiente real" }
] as const;
