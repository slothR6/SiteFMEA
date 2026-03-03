import type { LucideIcon } from "lucide-react";
import { FlaskConical, SearchCheck, Wrench } from "lucide-react";

export type ServiceRoute =
  | "/servicos/analise-de-falhas"
  | "/servicos/inspecoes"
  | "/servicos/desenvolvimento-de-projetos";

export type ServiceCategoryId = "analise-de-falha" | "inspecao-tecnica" | "desenvolvimento-de-projeto";

export type ServiceCategory = {
  id: ServiceCategoryId;
  title: string;
  description: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "analise-de-falha",
    title: "Análise de falha",
    description: "Investigação técnica orientada por evidências para determinar causa raiz e reduzir recorrência."
  },
  {
    id: "inspecao-tecnica",
    title: "Inspeção técnica",
    description: "Inspeções e perícias com foco em disponibilidade, integridade de ativos e tomada de decisão."
  },
  {
    id: "desenvolvimento-de-projeto",
    title: "Desenvolvimento de projeto",
    description: "Atuação do conceito à implementação, com base técnica para fabricação, testes e escala."
  }
];

export type ServiceCardItem = {
  categoryId: ServiceCategoryId;
  title: string;
  description: string;
  href: ServiceRoute;
  highlights: string[];
  image: string;
  imageAlt: string;
  imageObjectPosition?: string;
  icon: LucideIcon;
};

export const serviceCards: ServiceCardItem[] = [
  {
    categoryId: "analise-de-falha",
    title: "Análise de Falhas",
    description: "Serviços de consultoria em eventos adversos, análise de riscos e perícias técnicas.",
    href: "/servicos/analise-de-falhas",
    highlights: [
      "Análise fractográfica e mecânica da fratura",
      "Caracterização de materiais e ensaios mecânicos",
      "Simulações numéricas e análise de dados operacionais"
    ],
    image: "/images/wind-farm-landscape.jpg",
    imageAlt: "Ativo industrial para diagnóstico de falhas e perícias técnicas",
    icon: FlaskConical
  },
  {
    categoryId: "inspecao-tecnica",
    title: "Inspeções Técnicas",
    description: "Inspeções técnicas de ponta para avaliar condições, potenciais e disponibilidade de ativos.",
    href: "/servicos/inspecoes",
    highlights: [
      "Inspeções de O&M, due diligence e auditoria técnica",
      "Ensaios não destrutivos e boroscopia",
      "Engenharia reversa e avaliação de dados operacionais"
    ],
    image: "/inspetion.png",
    imageAlt: "Inspeção técnica e monitoramento de ativos críticos",
    icon: SearchCheck
  },
  {
    categoryId: "desenvolvimento-de-projeto",
    title: "Desenvolvimento de Projetos",
    description: "Do conceito à implementação com documentação técnica, gestão de riscos e acompanhamento em campo.",
    href: "/servicos/desenvolvimento-de-projetos",
    highlights: [
      "Desenhos técnicos, memorial de cálculo e lista de materiais",
      "Manuais de operação, manutenção e montagem",
      "Acompanhamento de fabricação e teste piloto"
    ],
    image: "/hero-energia.png",
    imageAlt: "Desenvolvimento e validação de projetos de engenharia",
    icon: Wrench
  }
];

export type ServiceScopeTopic = {
  title: string;
  items: string[];
};

export type ServiceDetailContent = {
  route: ServiceRoute;
  pageTitle: string;
  pageDescription: string;
  introDescription: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageObjectPosition?: string;
  heroBadge: string;
  scopeIntro: string;
  scopeTopics: ServiceScopeTopic[];
  ctaLabel: string;
};

export const serviceDetails: Record<ServiceRoute, ServiceDetailContent> = {
  "/servicos/analise-de-falhas": {
    route: "/servicos/analise-de-falhas",
    pageTitle: "Análise de Falhas",
    pageDescription: "Investigação técnica para diagnóstico de causa raiz e suporte à tomada de decisão.",
    introDescription:
      "Aplicamos metodologia técnico-científica para investigar eventos complexos e sustentar decisões técnicas com rastreabilidade.",
    heroImage: "/images/wind-farm-landscape.jpg",
    heroImageAlt: "Equipe técnica em investigação de falhas de alta complexidade",
    heroBadge: "Escopo baseado no slide de serviços: Análise de Falhas",
    scopeIntro: "Serviços de consultoria em eventos adversos, análise de riscos e perícias técnicas.",
    scopeTopics: [
      {
        title: "Ensaios e caracterização",
        items: [
          "Análise fractográfica",
          "Mecânica da fratura",
          "Caracterização de materiais",
          "Avaliação dimensional",
          "Ensaios mecânicos",
          "Análise de composição química"
        ]
      },
      {
        title: "Modelagem e qualidade",
        items: ["Simulações numéricas", "Ferramentas de engenharia da qualidade"]
      },
      {
        title: "Dados operacionais",
        items: ["Análise de dados operacionais e de manutenção"]
      }
    ],
    ctaLabel: "Solicitar avaliação técnica"
  },
  "/servicos/inspecoes": {
    route: "/servicos/inspecoes",
    pageTitle: "Inspeções Técnicas",
    pageDescription: "Inspeções e perícias orientadas por criticidade para aumentar confiabilidade dos ativos.",
    introDescription:
      "Conduzimos inspeções multidisciplinares para avaliar condição real de ativos e direcionar decisões com base técnica.",
    heroImage: "/inspetion.png",
    heroImageAlt: "Execução de inspeções técnicas especializadas em campo",
    heroBadge: "Escopo baseado no slide de serviços: Inspeções",
    scopeIntro: "Inspeções técnicas de ponta para avaliar condições, potenciais e disponibilidade de ativos.",
    scopeTopics: [
      {
        title: "Inspeções e perícias",
        items: ["Inspeções de O&M", "Perícias técnicas", "Due diligence", "Inspeções para primarização (inventário)"]
      },
      {
        title: "Ensaios e auditoria",
        items: ["Boroscopia e avaliação de lubrificantes", "Ensaios não destrutivos", "Auditoria técnica"]
      },
      {
        title: "Diagnóstico complementar",
        items: ["Engenharia reversa", "Análise de dados operacionais"]
      }
    ],
    ctaLabel: "Solicitar plano de inspeção"
  },
  "/servicos/desenvolvimento-de-projetos": {
    route: "/servicos/desenvolvimento-de-projetos",
    pageTitle: "Desenvolvimento de Projetos",
    pageDescription: "Engenharia aplicada do conceito à implementação para maturidade técnica e ganho operacional.",
    introDescription:
      "Estruturamos projetos para implementação segura, integrando documentação técnica, testes e acompanhamento de fabricação.",
    heroImage: "/hero-energia.png",
    heroImageAlt: "Planejamento e desenvolvimento de projetos de engenharia",
    heroBadge: "Escopo baseado no slide de serviços: Desenvolvimento de Projetos",
    scopeIntro: "Do conceito à implementação.",
    scopeTopics: [
      {
        title: "Planejamento e teste piloto",
        items: [
          "Logística de transporte",
          "Logística para teste piloto",
          "Acompanhamento de teste piloto",
          "Patente"
        ]
      },
      {
        title: "Documentação de engenharia",
        items: [
          "Desenhos técnicos para fabricação",
          "Memorial de cálculo",
          "Lista de materiais",
          "Manuais de operação e manutenção",
          "Análises de riscos",
          "Instruções de trabalho"
        ]
      },
      {
        title: "Fabricação e montagem",
        items: [
          "Procedimentos de solda",
          "Procedimentos de rigging",
          "Acompanhamento de fabricação",
          "Manuais de montagem",
          "Databook de fabricação"
        ]
      }
    ],
    ctaLabel: "Agendar reunião técnica"
  }
};
