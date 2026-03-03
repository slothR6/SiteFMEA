import type { FaqItem, RelatedLink } from "@/lib/seo";

export type KeywordServicePath =
  | "/analise-de-falha-industrial"
  | "/inspecao-tecnica"
  | "/pericia-tecnica"
  | "/inspecao-por-ultrassom"
  | "/caracterizacao-de-materiais"
  | "/microscopia-eletronica-mev";

type ServiceTopic = {
  title: string;
  items: string[];
};

export type KeywordServicePage = {
  path: KeywordServicePath;
  title: string;
  eyebrow: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroImage: string;
  heroImageAlt: string;
  scopeIntro: string;
  scopeTopics: ServiceTopic[];
  deliverablesTitle: string;
  deliverablesIntro: string;
  deliverables: string[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
  schemaName: string;
  schemaDescription: string;
  serviceType: string;
  keywords: string[];
};

export const keywordServicePages: Record<KeywordServicePath, KeywordServicePage> = {
  "/analise-de-falha-industrial": {
    path: "/analise-de-falha-industrial",
    title: "Análise de falha industrial com rastreabilidade técnica",
    eyebrow: "Serviço especializado",
    intro:
      "Investigamos falhas em ativos e sistemas industriais com metodologia orientada por evidências, causa raiz validada e plano técnico de mitigação.",
    metaTitle: "Análise de Falha Industrial | FMEA Engineering",
    metaDescription:
      "Investigação de causa raiz, laudo técnico e plano de mitigação para análise de falha industrial em ativos críticos e operações de alta exigência.",
    heroBadge: "Causa raiz, laudo técnico e mitigação",
    heroImage: "/images/field-engineer-report.jpg",
    heroImageAlt: "Equipe conduzindo análise de falha industrial com inspeção técnica em campo",
    scopeIntro:
      "Estruturamos a análise de falha industrial para responder o que falhou, por que falhou, qual é o risco residual e quais ações evitam recorrência.",
    scopeTopics: [
      {
        title: "Diagnóstico inicial",
        items: [
          "Levantamento de histórico operacional, manutenção e contexto do evento",
          "Definição do mecanismo provável de dano e da hipótese de falha",
          "Priorização dos pontos críticos para inspeção e coleta de evidências"
        ]
      },
      {
        title: "Evidências técnicas",
        items: [
          "Inspeção técnica em campo e documentação fotográfica rastreável",
          "Ensaios laboratoriais, fractografia e caracterização de materiais",
          "Correlação entre dados operacionais, ambiente e condições de serviço"
        ]
      },
      {
        title: "Conclusão executiva",
        items: [
          "Causa raiz validada com cadeia causal explícita",
          "Recomendações de contenção, correção e prevenção",
          "Parecer técnico para gestão, fornecedores ou contencioso"
        ]
      }
    ],
    deliverablesTitle: "Entregáveis da análise",
    deliverablesIntro:
      "A saída técnica é desenhada para apoiar decisão de engenharia, negociação contratual e priorização de CAPEX e OPEX.",
    deliverables: [
      "Laudo técnico com causa raiz e evidências verificáveis",
      "Mapa de mecanismos de dano e fatores contribuintes",
      "Plano de ações corretivas e preventivas por criticidade",
      "Recomendações para monitoramento, retrofit ou troca de componente"
    ],
    faq: [
      {
        question: "Quando realizar uma análise de falha industrial?",
        answer:
          "A análise deve começar sempre que houver quebra prematura, recorrência de dano, perda de desempenho ou divergência técnica sobre a origem do evento. Quanto mais cedo a coleta de evidências for iniciada, maior a confiabilidade da conclusão."
      },
      {
        question: "Quais evidências são mais importantes em uma investigação de falha?",
        answer:
          "Histórico operacional, registros de manutenção, condição do componente, amostras preservadas, fotografias rastreáveis e resultados de ensaios são os pilares para fechar a cadeia causal com segurança."
      },
      {
        question: "A análise de falha industrial pode apoiar litígios e negociações?",
        answer:
          "Sim. Quando a investigação é conduzida com método, rastreabilidade e validação técnica, o laudo pode sustentar negociações entre áreas internas, fornecedores, seguradoras e ambientes de perícia técnica."
      }
    ],
    relatedLinks: [
      {
        href: "/caracterizacao-de-materiais",
        title: "Caracterização de materiais para confirmar mecanismos de dano",
        description: "Integra microestrutura, composição química e propriedades do material à investigação da falha."
      },
      {
        href: "/microscopia-eletronica-mev",
        title: "Microscopia eletrônica MEV para fractografia e superfícies de fratura",
        description: "Aprofunda a leitura de trincas, inclusões, corrosão e morfologia de falha em alta resolução."
      },
      {
        href: "/pericia-tecnica",
        title: "Perícia técnica para conclusão independente e documental",
        description: "Transforma o diagnóstico técnico em parecer robusto para auditoria, arbitragem ou disputa contratual."
      }
    ],
    schemaName: "Análise de falha industrial",
    schemaDescription:
      "Serviço de análise de falha industrial com investigação de causa raiz, ensaios laboratoriais e plano de mitigação.",
    serviceType: "Análise de falha industrial",
    keywords: ["análise de falha", "inspeção técnica", "perícia técnica", "caracterização de materiais"]
  },
  "/inspecao-tecnica": {
    path: "/inspecao-tecnica",
    title: "Inspeção técnica industrial para ativos críticos",
    eyebrow: "Serviço especializado",
    intro:
      "Executamos inspeção técnica industrial com foco em integridade, confiabilidade, conformidade e priorização de ações em ativos de alta criticidade.",
    metaTitle: "Inspeção Técnica Industrial | FMEA Engineering",
    metaDescription:
      "Inspeção técnica industrial com avaliação em campo, registro de evidências e recomendações para confiabilidade, integridade e continuidade operacional.",
    heroBadge: "Condição real do ativo e risco residual",
    heroImage: "/inspetion.png",
    heroImageAlt: "Equipe executando inspeção técnica industrial em ativo crítico",
    scopeIntro:
      "A inspeção técnica responde o estado atual do ativo, o nível de risco e quais intervenções precisam ser priorizadas para reduzir indisponibilidade.",
    scopeTopics: [
      {
        title: "Planejamento da inspeção",
        items: [
          "Definição de criticidade, escopo e pontos de verificação",
          "Matriz de risco para priorização de componentes e interfaces",
          "Critérios técnicos alinhados ao objetivo operacional ou contratual"
        ]
      },
      {
        title: "Execução em campo",
        items: [
          "Inspeção visual e dimensional com registro fotográfico rastreável",
          "Aplicação de ensaios complementares e validação de condição real",
          "Levantamento de não conformidades, desvios e riscos latentes"
        ]
      },
      {
        title: "Tomada de decisão",
        items: [
          "Relatório técnico com severidade, criticidade e urgência",
          "Plano de ação com correções imediatas e ações estruturantes",
          "Base documental para manutenção, retrofit ou perícia técnica"
        ]
      }
    ],
    deliverablesTitle: "Saída técnica da inspeção",
    deliverablesIntro:
      "O relatório final precisa orientar manutenção, governança contratual e decisão executiva sem depender de interpretação subjetiva.",
    deliverables: [
      "Relatório de inspeção técnica com checklist e evidências",
      "Mapa de desvios, anomalias e riscos por criticidade",
      "Recomendações de correção, monitoramento e aprofundamento diagnóstico",
      "Base documental para auditoria, due diligence e perícia técnica"
    ],
    faq: [
      {
        question: "O que diferencia inspeção técnica de perícia técnica?",
        answer:
          "A inspeção técnica avalia condição, integridade e conformidade do ativo para orientar ação imediata. A perícia técnica aprofunda a análise com foco em conclusão independente, nexo causal e robustez documental para disputa, auditoria ou arbitragem."
      },
      {
        question: "Quando uma inspeção técnica deve ser priorizada?",
        answer:
          "A inspeção é prioritária quando há queda de desempenho, suspeita de dano, risco de parada não programada, recebimento de ativo crítico, divergência de escopo ou necessidade de auditoria operacional."
      },
      {
        question: "A inspeção técnica pode ser integrada com ensaios não destrutivos?",
        answer:
          "Sim. Em muitos contextos a inspeção técnica é a camada de decisão que define onde aplicar ultrassom, boroscopia, líquidos penetrantes ou outras técnicas complementares."
      }
    ],
    relatedLinks: [
      {
        href: "/inspecao-por-ultrassom",
        title: "Inspeção por ultrassom para medir espessura e detectar descontinuidades",
        description: "Complementa a inspeção técnica em ativos sujeitos a corrosão, perda de seção e trincas internas."
      },
      {
        href: "/pericia-tecnica",
        title: "Perícia técnica para validação independente de evidências",
        description: "Amplia a robustez documental quando a inspeção precisa sustentar decisões contratuais ou judiciais."
      },
      {
        href: "/analise-de-falha-industrial",
        title: "Análise de falha industrial quando a inspeção aponta recorrência",
        description: "Aprofunda a investigação quando a condição observada exige causa raiz e plano de mitigação."
      }
    ],
    schemaName: "Inspeção técnica industrial",
    schemaDescription:
      "Serviço de inspeção técnica industrial para integridade de ativos, avaliação de condição e recomendações de confiabilidade.",
    serviceType: "Inspeção técnica industrial",
    keywords: ["inspeção técnica", "perícia técnica", "inspeção por ultrassom", "análise de falha"]
  },
  "/pericia-tecnica": {
    path: "/pericia-tecnica",
    title: "Perícia técnica com cadeia de evidências validada",
    eyebrow: "Serviço especializado",
    intro:
      "Conduzimos perícia técnica com independência, rastreabilidade documental e nexo causal claro para disputas, auditorias e decisões executivas críticas.",
    metaTitle: "Perícia Técnica Industrial | FMEA Engineering",
    metaDescription:
      "Perícia técnica industrial com rastreabilidade de evidências, cadeia causal validada e parecer independente para auditorias, litígios e arbitragem.",
    heroBadge: "Conclusão independente e documental",
    heroImage: "/images/field-engineer-report.jpg",
    heroImageAlt: "Perícia técnica industrial com análise documental e inspeção em campo",
    scopeIntro:
      "A perícia técnica transforma evidências dispersas em um parecer estruturado, tecnicamente defensável e adequado para ambientes de alta exposição.",
    scopeTopics: [
      {
        title: "Escopo pericial",
        items: [
          "Definição de quesitos técnicos e hipótese central da perícia",
          "Delimitação do objeto, documentos e componentes analisados",
          "Estratégia de inspeção, coleta de evidências e preservação de amostras"
        ]
      },
      {
        title: "Validação de evidências",
        items: [
          "Inspeção técnica, entrevistas e análise de registros operacionais",
          "Ensaios laboratoriais quando necessários para confirmar hipóteses",
          "Matriz causal com fatos, critérios, desvios e conclusões"
        ]
      },
      {
        title: "Parecer final",
        items: [
          "Conclusão independente com rastreabilidade integral",
          "Resposta técnica aos quesitos e pontos controvertidos",
          "Subsídio para negociação, arbitragem, seguro ou judicialização"
        ]
      }
    ],
    deliverablesTitle: "Entregáveis periciais",
    deliverablesIntro:
      "O resultado precisa ser claro para decisores e robusto o suficiente para suportar escrutínio técnico externo.",
    deliverables: [
      "Parecer técnico independente com cadeia de evidências",
      "Quadro comparativo entre hipótese, fato observado e conclusão",
      "Anexos com registros, ensaios e documentação de suporte",
      "Recomendações técnicas para contenção, correção ou responsabilização"
    ],
    faq: [
      {
        question: "Quando a perícia técnica é mais indicada do que uma inspeção técnica?",
        answer:
          "Quando existe disputa de responsabilidade, controvérsia entre partes, sinistro relevante, necessidade de prova técnica ou auditoria de alta exposição, a perícia técnica oferece profundidade e independência superiores."
      },
      {
        question: "A perícia técnica pode incluir análise de falha e ensaios laboratoriais?",
        answer:
          "Sim. Sempre que a resposta aos quesitos depender de causa raiz, integridade material ou condição real do componente, a perícia pode incorporar análise de falha, ultrassom, MEV e caracterização de materiais."
      },
      {
        question: "Como garantir rastreabilidade de evidências em uma perícia técnica?",
        answer:
          "Com cadeia documental clara, registros datados, preservação adequada de amostras, critério técnico explícito e conexão direta entre cada conclusão e a evidência que a sustenta."
      }
    ],
    relatedLinks: [
      {
        href: "/inspecao-tecnica",
        title: "Inspeção técnica para consolidar condição real do ativo",
        description: "Etapa essencial quando a perícia depende de registro objetivo em campo e verificação de integridade."
      },
      {
        href: "/analise-de-falha-industrial",
        title: "Análise de falha industrial para fechar o nexo causal",
        description: "Aprofunda o mecanismo do dano quando a perícia precisa concluir origem, recorrência e responsabilidade."
      },
      {
        href: "/microscopia-eletronica-mev",
        title: "Microscopia eletrônica MEV para apoiar perícias materiais",
        description: "Gera evidências de alta resolução em superfícies de fratura, corrosão e contaminação."
      }
    ],
    schemaName: "Perícia técnica industrial",
    schemaDescription:
      "Serviço de perícia técnica industrial com análise de evidências, parecer independente e suporte para auditorias e litígios.",
    serviceType: "Perícia técnica industrial",
    keywords: ["perícia técnica", "inspeção técnica", "análise de falha", "microscopia eletrônica de varredura (MEV)"]
  },
  "/inspecao-por-ultrassom": {
    path: "/inspecao-por-ultrassom",
    title: "Inspeção por ultrassom para integridade estrutural",
    eyebrow: "Ensaios não destrutivos",
    intro:
      "Aplicamos inspeção por ultrassom para detectar descontinuidades, medir espessura remanescente e apoiar decisões de integridade sem desmontagem invasiva.",
    metaTitle: "Inspeção por Ultrassom | FMEA Engineering",
    metaDescription:
      "Inspeção por ultrassom para detectar descontinuidades, medir espessura e apoiar decisões de integridade em ativos industriais críticos.",
    heroBadge: "END para condição interna e perda de espessura",
    heroImage: "/images/tecnicosimg.jpg",
    heroImageAlt: "Inspeção por ultrassom em componente industrial crítico",
    scopeIntro:
      "O ultrassom é indicado quando a decisão depende de condição interna do material, perda de seção, propagação de descontinuidades ou comparação com limites aceitáveis.",
    scopeTopics: [
      {
        title: "Aplicações típicas",
        items: [
          "Medição de espessura em regiões sujeitas a corrosão e erosão",
          "Detecção de descontinuidades internas em soldas e componentes",
          "Verificação de integridade para aceitação, manutenção ou retrofit"
        ]
      },
      {
        title: "Execução controlada",
        items: [
          "Definição do procedimento conforme material, geometria e risco",
          "Mapeamento de áreas críticas e pontos de medição",
          "Registro rastreável dos sinais, leituras e limitações da inspeção"
        ]
      },
      {
        title: "Interpretação para decisão",
        items: [
          "Correlação com histórico operacional e criticidade do ativo",
          "Indicação de necessidade de reparo, monitoramento ou substituição",
          "Integração com inspeção técnica e análise de falha quando necessário"
        ]
      }
    ],
    deliverablesTitle: "Saída da inspeção por ultrassom",
    deliverablesIntro:
      "O valor do ensaio depende da tradução do dado bruto em recomendação clara de integridade e risco residual.",
    deliverables: [
      "Mapa de espessura ou pontos inspecionados com rastreabilidade",
      "Registro de descontinuidades e critérios de aceitação utilizados",
      "Conclusão sobre integridade e recomendação de intervenção",
      "Base comparativa para monitoramento periódico e gestão de ativos"
    ],
    faq: [
      {
        question: "Como funciona a inspeção por ultrassom?",
        answer:
          "O método emite ondas ultrassônicas no material e interpreta o comportamento do sinal refletido para medir espessura, localizar descontinuidades e avaliar integridade sem necessidade de corte do componente."
      },
      {
        question: "Quando a inspeção por ultrassom é mais indicada?",
        answer:
          "É especialmente indicada em ativos sujeitos a corrosão, perda de espessura, soldas críticas, tubulações, vasos, chapas e componentes onde a condição interna precisa ser conhecida sem intervenção destrutiva."
      },
      {
        question: "Ultrassom substitui a inspeção técnica?",
        answer:
          "Não. O ultrassom é uma técnica complementar. A inspeção técnica define contexto, criticidade e leitura global do ativo, enquanto o ultrassom aprofunda a verificação de integridade material."
      }
    ],
    relatedLinks: [
      {
        href: "/inspecao-tecnica",
        title: "Inspeção técnica para contextualizar os resultados do ultrassom",
        description: "Conecta a leitura do ensaio ao risco operacional, à criticidade e ao plano de ação do ativo."
      },
      {
        href: "/caracterizacao-de-materiais",
        title: "Caracterização de materiais para investigar perda de desempenho",
        description: "Complementa o ultrassom quando o dano pode estar ligado a microestrutura, composição ou tratamento térmico."
      },
      {
        href: "/analise-de-falha-industrial",
        title: "Análise de falha industrial para eventos já materializados",
        description: "Aprofunda o diagnóstico quando a descontinuidade identificada evoluiu para fratura, quebra ou perda severa."
      }
    ],
    schemaName: "Inspeção por ultrassom",
    schemaDescription:
      "Serviço de inspeção por ultrassom para detecção de descontinuidades, medição de espessura e suporte à integridade estrutural.",
    serviceType: "Inspeção por ultrassom",
    keywords: ["inspeção por ultrassom", "inspeção técnica", "análise de falha", "caracterização de materiais"]
  },
  "/caracterizacao-de-materiais": {
    path: "/caracterizacao-de-materiais",
    title: "Caracterização de materiais para diagnóstico confiável",
    eyebrow: "Engenharia de materiais",
    intro:
      "Executamos caracterização de materiais para relacionar composição, microestrutura, propriedades e mecanismos de dano em ativos industriais críticos.",
    metaTitle: "Caracterização de Materiais | FMEA Engineering",
    metaDescription:
      "Caracterização de materiais com análise microestrutural, composição química e propriedades para diagnóstico de falhas e suporte a perícias.",
    heroBadge: "Microestrutura, composição e propriedades",
    heroImage: "/images/simulacao.png",
    heroImageAlt: "Caracterização de materiais aplicada à análise de componentes industriais",
    scopeIntro:
      "A caracterização de materiais é decisiva quando a falha pode estar ligada a seleção inadequada de material, variação metalúrgica, degradação em serviço ou não conformidade de fabricação.",
    scopeTopics: [
      {
        title: "Escopo laboratorial",
        items: [
          "Análise de microestrutura e fases presentes",
          "Avaliação de composição química e conformidade material",
          "Correlação entre propriedades mecânicas e histórico de serviço"
        ]
      },
      {
        title: "Investigação do dano",
        items: [
          "Identificação de corrosão, desgaste, fragilização ou fadiga",
          "Comparação entre condição observada e especificação esperada",
          "Leitura integrada com inspeção técnica e dados operacionais"
        ]
      },
      {
        title: "Resposta aplicada",
        items: [
          "Definição do mecanismo material associado à falha",
          "Orientação para substituição, retratamento ou mudança de especificação",
          "Suporte a laudos de análise de falha e perícia técnica"
        ]
      }
    ],
    deliverablesTitle: "Entregáveis em engenharia de materiais",
    deliverablesIntro:
      "Mais do que emitir um ensaio, o objetivo é transformar dados laboratoriais em decisão prática para fabricação, manutenção ou responsabilização técnica.",
    deliverables: [
      "Relatório de caracterização com microestrutura, composição e interpretação",
      "Correlação entre propriedades do material e modo de falha observado",
      "Conclusão sobre adequação do material ao regime de serviço",
      "Recomendações para especificação, processo ou tratamento térmico"
    ],
    faq: [
      {
        question: "Quando a caracterização de materiais deve ser solicitada?",
        answer:
          "Quando há dúvida sobre composição, microestrutura, tratamento térmico, origem do dano ou adequação do material ao regime de operação. Ela é especialmente útil em falhas prematuras e não conformidades de fabricação."
      },
      {
        question: "A caracterização de materiais substitui a análise de falha?",
        answer:
          "Não. Ela é uma camada técnica que alimenta a análise de falha. Em muitos casos, a causa raiz só pode ser validada quando dados de material são correlacionados com inspeção, operação e histórico de manutenção."
      },
      {
        question: "Quais decisões de engenharia a caracterização de materiais apoia?",
        answer:
          "Apoia aceitação de lote, revisão de especificação, definição de reparo, retrofit, qualificação de fornecedor e conclusão pericial sobre inadequação material."
      }
    ],
    relatedLinks: [
      {
        href: "/microscopia-eletronica-mev",
        title: "Microscopia eletrônica MEV para ampliar a leitura microestrutural",
        description: "Aprofunda a observação de superfícies, inclusões, fraturas e produtos de corrosão em alta resolução."
      },
      {
        href: "/analise-de-falha-industrial",
        title: "Análise de falha industrial para fechar a causa raiz",
        description: "Usa os dados de material como evidência para concluir mecanismo de dano e ação corretiva."
      },
      {
        href: "/pericia-tecnica",
        title: "Perícia técnica quando o material é ponto de controvérsia",
        description: "Leva a interpretação dos ensaios para um parecer com cadeia documental e sustentação independente."
      }
    ],
    schemaName: "Caracterização de materiais",
    schemaDescription:
      "Serviço de caracterização de materiais com análise microestrutural, composição química e suporte a diagnósticos de falha.",
    serviceType: "Caracterização de materiais",
    keywords: ["caracterização de materiais", "análise de falha", "microscopia eletrônica de varredura (MEV)", "perícia técnica"]
  },
  "/microscopia-eletronica-mev": {
    path: "/microscopia-eletronica-mev",
    title: "Microscopia eletrônica de varredura (MEV)",
    eyebrow: "Laboratório avançado",
    intro:
      "Aplicamos microscopia eletrônica de varredura (MEV) para examinar superfícies, fraturas, inclusões e produtos de corrosão com alta resolução e interpretação técnica aplicada.",
    metaTitle: "Microscopia Eletrônica MEV | FMEA Engineering",
    metaDescription:
      "Microscopia eletrônica de varredura (MEV) para fractografia, análise de superfícies e suporte técnico em falhas, perícias e materiais.",
    heroBadge: "Alta resolução para fractografia e superfície",
    heroImage: "/images/engineering-wind-team.jpg",
    heroImageAlt: "Microscopia eletrônica de varredura aplicada à análise de falhas e materiais",
    scopeIntro:
      "O MEV é indicado quando a inspeção visual e os ensaios convencionais não são suficientes para entender origem de trincas, morfologia de fratura, contaminação ou mecanismo de degradação.",
    scopeTopics: [
      {
        title: "Aplicações do MEV",
        items: [
          "Fractografia para identificar sobrecarga, fadiga, fragilização ou corrosão",
          "Leitura de inclusões, partículas e produtos de corrosão",
          "Avaliação de superfície em componentes com dano prematuro"
        ]
      },
      {
        title: "Integração analítica",
        items: [
          "Correlação com caracterização de materiais e composição química",
          "Suporte à validação de mecanismos de falha em laudos técnicos",
          "Leitura de evidências críticas para perícia técnica e auditoria"
        ]
      },
      {
        title: "Resultado aplicável",
        items: [
          "Conclusão sobre morfologia e mecanismo do dano observado",
          "Base técnica para revisão de material, processo ou operação",
          "Evidência de alta resolução para relatórios e pareceres"
        ]
      }
    ],
    deliverablesTitle: "Entregáveis do ensaio MEV",
    deliverablesIntro:
      "O valor do MEV está na interpretação, não apenas na imagem. Por isso o resultado precisa ser conectado ao contexto operacional e ao objetivo da investigação.",
    deliverables: [
      "Imagens em alta resolução com identificação das regiões críticas",
      "Interpretação fractográfica e correlação com hipótese de falha",
      "Suporte técnico para análise de falha, perícia ou estudo material",
      "Recomendações para aprofundamento analítico quando necessário"
    ],
    faq: [
      {
        question: "Quando utilizar microscopia eletrônica de varredura?",
        answer:
          "Quando a conclusão depende de detalhes de superfície que não são visíveis em inspeções convencionais, como morfologia de fratura, inclusões, corrosão localizada, contaminação ou desgaste fino."
      },
      {
        question: "MEV é útil apenas em análise de falha?",
        answer:
          "Não. O MEV também apoia caracterização de materiais, investigação de processos, avaliação de contaminação e perícia técnica sempre que uma evidência de alta resolução for necessária."
      },
      {
        question: "O MEV deve ser combinado com outros ensaios?",
        answer:
          "Na maioria dos casos, sim. A combinação com caracterização de materiais, composição química, inspeção técnica e histórico operacional entrega conclusões muito mais robustas."
      }
    ],
    relatedLinks: [
      {
        href: "/caracterizacao-de-materiais",
        title: "Caracterização de materiais para complementar o MEV",
        description: "Relaciona a morfologia observada às fases, composição e propriedades do material analisado."
      },
      {
        href: "/analise-de-falha-industrial",
        title: "Análise de falha industrial para concluir a causa raiz",
        description: "Transforma as evidências do MEV em decisão técnica aplicável ao ativo e ao plano de mitigação."
      },
      {
        href: "/pericia-tecnica",
        title: "Perícia técnica para sustentar conclusões baseadas em MEV",
        description: "Organiza a evidência microscópica em cadeia causal e parecer independente."
      }
    ],
    schemaName: "Microscopia eletrônica de varredura (MEV)",
    schemaDescription:
      "Serviço de microscopia eletrônica de varredura para fractografia, análise de superfícies e suporte a falhas e perícias.",
    serviceType: "Microscopia eletrônica de varredura (MEV)",
    keywords: [
      "microscopia eletrônica de varredura (MEV)",
      "caracterização de materiais",
      "análise de falha",
      "perícia técnica"
    ]
  }
};

export const genericServiceRelatedLinks: Record<string, RelatedLink[]> = {
  "/servicos/analise-de-falhas": [
    keywordServicePages["/analise-de-falha-industrial"].relatedLinks[0],
    keywordServicePages["/analise-de-falha-industrial"].relatedLinks[1],
    {
      href: "/analise-de-falha-industrial",
      title: "Análise de falha industrial com foco em causa raiz",
      description: "Página dedicada para investigação técnica, laudo estruturado e plano de mitigação."
    }
  ],
  "/servicos/inspecoes": [
    {
      href: "/inspecao-tecnica",
      title: "Inspeção técnica industrial para condição real do ativo",
      description: "Página dedicada para avaliação em campo, criticidade e recomendações de integridade."
    },
    {
      href: "/pericia-tecnica",
      title: "Perícia técnica para auditorias, disputas e sinistros",
      description: "Página dedicada para parecer independente com cadeia de evidências validada."
    },
    {
      href: "/inspecao-por-ultrassom",
      title: "Inspeção por ultrassom para complementar a inspeção técnica",
      description: "Página dedicada para medição de espessura, detecção de descontinuidades e decisão de integridade."
    }
  ],
  "/servicos/desenvolvimento-de-projetos": [
    {
      href: "/inspecao-tecnica",
      title: "Inspeção técnica para diagnosticar condição e requisitos de retrofit",
      description: "Integra dados de campo ao planejamento técnico de projeto e implementação."
    },
    {
      href: "/analise-de-falha-industrial",
      title: "Análise de falha industrial para priorizar correções de projeto",
      description: "Conecta eventos adversos à revisão de engenharia e ações estruturantes."
    },
    {
      href: "/caracterizacao-de-materiais",
      title: "Caracterização de materiais para seleção e especificação de componentes",
      description: "Apoia decisões de projeto quando o desempenho do material define a confiabilidade do ativo."
    }
  ]
};

export const blogRelatedLinksBySlug: Record<string, RelatedLink[]> = {
  "gestao-de-risco-tecnico-em-ativos-de-energia-renovavel": [
    {
      href: "/inspecao-tecnica",
      title: "Inspeção técnica para reduzir risco operacional em ativos renováveis",
      description: "Avalia condição real e prioriza intervenções em ativos com impacto direto na disponibilidade."
    },
    {
      href: "/analise-de-falha-industrial",
      title: "Análise de falha industrial para eventos recorrentes",
      description: "Identifica causa raiz e evita repetição de falhas com impacto em geração e receita."
    },
    {
      href: "/inspecao-por-ultrassom",
      title: "Inspeção por ultrassom para corredores de corrosão e perda de espessura",
      description: "Complementa programas de integridade em estruturas e componentes de alta criticidade."
    }
  ],
  "pericia-tecnica-com-foco-em-rastreabilidade-de-evidencias": [
    {
      href: "/pericia-tecnica",
      title: "Perícia técnica com cadeia de evidências validada",
      description: "Aprofunda a rastreabilidade documental e a resposta a quesitos técnicos."
    },
    {
      href: "/inspecao-tecnica",
      title: "Inspeção técnica para consolidar evidências em campo",
      description: "Produz registros objetivos sobre condição, não conformidades e integridade do ativo."
    },
    {
      href: "/microscopia-eletronica-mev",
      title: "Microscopia eletrônica MEV para reforçar evidências materiais",
      description: "Gera suporte técnico de alta resolução quando a disputa envolve fratura, corrosão ou contaminação."
    }
  ],
  "trl-aplicado-ao-desenvolvimento-de-projetos-industriais": [
    {
      href: "/servicos/desenvolvimento-de-projetos",
      title: "Desenvolvimento de projetos com maturidade técnica controlada",
      description: "Conecta o avanço de TRL à documentação, testes e implementação em campo."
    },
    {
      href: "/inspecao-tecnica",
      title: "Inspeção técnica para validar condição e requisitos do projeto",
      description: "Reduz retrabalho ao incorporar dados reais do ativo antes da execução."
    },
    {
      href: "/caracterizacao-de-materiais",
      title: "Caracterização de materiais para qualificar soluções industriais",
      description: "Apoia seleção de material, validação de protótipos e escalonamento seguro."
    }
  ]
};

export function getKeywordServicePage(path: KeywordServicePath) {
  return keywordServicePages[path];
}
