export type CaseType = "analise-de-falha" | "inspecao-ou-pericia-tecnica" | "desenvolvimento-de-projeto";

export type CaseTypeLabel = {
  id: CaseType;
  label: string;
  description: string;
};

export const caseTypeLabels: CaseTypeLabel[] = [
  {
    id: "analise-de-falha",
    label: "Case de Análise de falha",
    description: "Diagnóstico de causa raiz e plano técnico de mitigação."
  },
  {
    id: "inspecao-ou-pericia-tecnica",
    label: "Case de Inspeção técnica ou Perícia técnica",
    description: "Inspeção e perícia com rastreabilidade para decisão técnica."
  },
  {
    id: "desenvolvimento-de-projeto",
    label: "Case de Desenvolvimento de projeto",
    description: "Projeto aplicado para ganho de confiabilidade e escala."
  }
];

export type CaseStudy = {
  slug: string;
  title: string;
  type: CaseType;
  sector: string;
  challenge: string;
  approach: string;
  result: string;
  image: string;
  imageAlt: string;
  imageObjectPosition?: string;
  tags: string[];
  href?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "falha-rotor-aerogerador",
    title: "Falha prematura em rotor de aerogerador",
    type: "analise-de-falha",
    sector: "Energia renovável",
    challenge: "Ocorrência recorrente de falhas estruturais com impacto direto na disponibilidade do parque.",
    approach:
      "Investigação de causa raiz com análise fractográfica, ensaios mecânicos e correlação com dados de operação e manutenção.",
    result: "Redução de recorrência em 41% e priorização técnica das ações corretivas para o ciclo seguinte.",
    image: "/inspetion.png",
    imageAlt: "Análise técnica de falha em componente crítico",
    tags: ["Causa raiz", "Confiabilidade", "Rastreabilidade documental"],
    href: "/analise-de-falha-industrial"
  },
  {
    slug: "inspecao-e-pericia-litigio-industrial",
    title: "Inspeção e perícia técnica em litígio industrial",
    type: "inspecao-ou-pericia-tecnica",
    sector: "Indústria de processo",
    challenge: "Divergência técnica entre contratante e fornecedor sobre falha em ativo de alta criticidade.",
    approach:
      "Inspeções estruturadas com ensaios não destrutivos, auditoria técnica e organização da cadeia de evidências para parecer independente.",
    result: "Base técnica consistente para acordo entre as partes com validação das responsabilidades de engenharia.",
    image: "/images/field-engineer-report.jpg",
    imageAlt: "Inspeção e perícia técnica com evidências de campo",
    tags: ["Perícia técnica", "Ensaios não destrutivos", "Auditoria"],
    href: "/pericia-tecnica"
  },
  {
    slug: "retrofit-sistema-transporte-energia",
    title: "Retrofit de sistema para expansão operacional",
    type: "desenvolvimento-de-projeto",
    sector: "Infraestrutura energética",
    challenge: "Limites de capacidade e aumento de indisponibilidade em sistema próximo do fim de vida projetado.",
    approach:
      "Desenvolvimento de projeto com memorial de cálculo, documentação para fabricação, plano de testes piloto e acompanhamento de montagem.",
    result: "Aumento de 14% na disponibilidade anual com previsibilidade de CAPEX e cronograma de implantação.",
    image: "/hero-energia.png",
    imageAlt: "Desenvolvimento de projeto e retrofit em ativos energéticos",
    tags: ["Retrofit", "Projeto executivo", "Implementação"],
    href: "/servicos/desenvolvimento-de-projetos"
  }
];
