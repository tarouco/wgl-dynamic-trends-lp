// Copywriting Generator for Grupo WGL Dynamic Landing Pages
// Seeded from grupowgl.com.br - maps trends to WGL divisions:
// - weather -> WGL Energia (Diesel Generator Leasing / Contingency)
// - economy -> WGL Soluções (Cabins, Substations, Cost Savings, Free Energy Market)
// - tech -> WGL Soluções by RAC (Critical Infrastructure, Termography, Data Centers)
// - general -> WGL Agro by H2O (Irrigation, Rural Solar, Pomps & Valley Pivot Tech)

export const generateCopy = (keyword, category, newsSnippet = "") => {
  const cleanKeyword = keyword || "Operações Ininterruptas";
  
  switch (category) {
    case "weather":
      return {
        division: "WGL Energia",
        badge: "CONTINGÊNCIA E SEGURANÇA OPERACIONAL",
        heroTitle: `Sua operação não pode parar por conta de "${cleanKeyword}"`,
        heroSub: `Apagões e oscilações na rede elétrica decorrentes de "${cleanKeyword}" colocam a segurança e a produtividade de empresas em risco. O Grupo WGL oferece soluções completas de locação de geradores de energia (30 a 2500 kVA) com suporte técnico 24/7 e SLA de resposta em até 3 horas.`,
        miniArticle: `A recente repercussão sobre "${cleanKeyword}" evidencia como fatores externos e climáticos fogem do nosso controle. No cenário empresarial, a falta de energia não é apenas um inconveniente; é sinônimo de perdas severas de produção, falhas de segurança e interrupção de serviços essenciais. A locação de geradores do Grupo WGL protege sua infraestrutura com carenagens super silenciadas de 30 a 2500 kVA, transição em segundos via QTA e monitoramento técnico ativo 24/7. Não permita que imprevistos paralisem sua operação.`,
        ctaText: "Cotar Gerador de Emergência",
        benefitTitle: "Por que alugar geradores com o Grupo WGL?",
        benefits: [
          {
            title: "Atendimento Técnico 24/7",
            desc: "Equipe técnica disponível a qualquer hora do dia ou da noite para garantir energia contínua em operações críticas.",
            icon: "ShieldAlert"
          },
          {
            title: "SLA de Resposta Rápida",
            desc: "SLA contratual de resposta técnica em até 3 horas em caso de falhas, minimizando prejuízos operacionais.",
            icon: "Zap"
          },
          {
            title: "Frota Própria e Moderna",
            desc: "Geradores silenciados de última geração prontos para entrega imediata em mais de 24 estados atendidos.",
            icon: "Award"
          }
        ],
        productTitle: "Sistemas recomendados para contingência climática:",
        products: [
          {
            name: "Geradores Diesel Silenciados (30 a 2500 kVA)",
            desc: "Cabines acústicas super silenciadas de altíssima confiabilidade e baixa emissão, ideais para hospitais, indústrias e shoppings.",
            image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Painéis de Transferência Automática (QTA)",
            desc: "Equipamento inteligente que realiza a transição da rede elétrica para o gerador em poucos segundos assim que detecta a queda.",
            image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Dúvidas Frequentes sobre Locação de Geradores:",
        faqs: [
          {
            q: "Como funciona o suporte do Grupo WGL durante apagões?",
            a: "Nosso time técnico de monitoramento remoto detecta qualquer oscilação ou queda na planta do cliente em até 15 segundos. Caso a transição automática apresente qualquer inconformidade, técnicos certificados são despachados imediatamente sob SLA contratual."
          },
          {
            q: "Qual o tempo mínimo de locação de um gerador?",
            a: "Trabalhamos com formatos flexíveis de locações diárias para emergências rápidas ou eventos pontuais, além de planos mensais e contratos de longo prazo com manutenção preventiva e preditiva inclusa."
          },
          {
            q: "Os geradores são adequados para áreas urbanas ou com limite de ruído?",
            a: "Sim. Toda a nossa frota dedicada é composta por geradores com carenagem de isolamento acústico de alto padrão (silenciados), respeitando as normas da ABNT e os limites de zoneamento ambiental de ruído."
          }
        ]
      };

    case "economy":
      return {
        division: "WGL Soluções",
        badge: "ENGENHARIA E EFICIÊNCIA ENERGÉTICA",
        heroTitle: `Combata os altos custos de energia e "${cleanKeyword}"`,
        heroSub: `Em tempos de "${cleanKeyword}" e reajustes tarifários severos, a engenharia elétrica inteligente é o caminho para proteger o caixa da sua empresa. O Grupo WGL projeta, instala e realiza a manutenção de subestações de média/alta tensão e assessoria para migração ao Mercado Livre de Energia.`,
        miniArticle: `Os debates em torno de "${cleanKeyword}" refletem a urgência em otimizar custos e defender as margens financeiras das empresas frente à inflação energética. A eletricidade representa um dos maiores custos fixos industriais e comerciais. Com a engenharia elétrica do Grupo WGL, sua empresa deixa de ser refém das tarifas tradicionais: projetamos subestações próprias de média/alta tensão e assessoramos a migração completa e segura para o Mercado Livre de Energia, gerando economias sustentáveis de até 35%.`,
        ctaText: "Solicitar Diagnóstico Tarifário",
        benefitTitle: "Como a Engenharia WGL gera eficiência financeira?",
        benefits: [
          {
            title: "Migração para o Mercado Livre (ACL)",
            desc: "Assessoramos sua empresa na compra direta de energia de fontes limpas e baratas, aumentando a previsibilidade do custo operacional em até 35%.",
            icon: "TrendingDown"
          },
          {
            title: "Adequação de Demanda Contratada",
            desc: "Dimensionamento minucioso do contrato de demanda de energia junto à concessionária, eliminando multas.",
            icon: "DollarSign"
          },
          {
            title: "Subestações Próprias (Cabines Primárias)",
            desc: "Projetos em média e alta tensão que viabilizam o consumo com tarifas industriais muito mais econômicas.",
            icon: "Home"
          }
        ],
        productTitle: "Projetos de engenharia para redução de custos:",
        products: [
          {
            name: "Retrofit e Manutenção de Subestações",
            desc: "Modernização de infraestrutura de cabines primárias e painéis antigos para evitar paradas indesejadas e otimizar o fluxo elétrico.",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Estudo de Viabilidade para o Mercado Livre",
            desc: "Diagnóstico completo das faturas históricas de energia e modelagem econômica para migração segura de forma 100% assistida.",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Perguntas Frequentes sobre Eficiência Energética:",
        faqs: [
          {
            q: "O que é a migração para o Mercado Livre de Energia?",
            a: "É a possibilidade de indústrias e comércios de grande porte comprarem energia diretamente de comercializadoras autorizadas, escolhendo o fornecedor e o preço. O Grupo WGL cuida de toda a burocracia técnica e homologação legal."
          },
          {
            q: "Por que investir em uma subestação de média tensão própria?",
            a: "Clientes que consomem em baixa tensão pagam tarifas muito mais caras (Grupo B). A instalação de uma Cabine Primária permite migrar para o Grupo A de faturamento, onde o valor por kWh consumido é substancialmente menor."
          },
          {
            q: "Como evitar cobranças por excesso de reativos na fatura?",
            a: "Instalamos e configuramos bancos de capacitores automáticos dimensionados sob medida. Eles corrigem o fator de potência reativo da sua planta, eliminando essas cobranças indesejadas da concessionária."
          }
        ]
      };

    case "tech":
      return {
        division: "WGL Soluções by RAC",
        badge: "INFRAESTRUTURA DE OPERAÇÃO CRÍTICA",
        heroTitle: `Energia de alta disponibilidade para suportar "${cleanKeyword}"`,
        heroSub: `A era da automação e "${cleanKeyword}" exige infraestrutura de energia com tolerância zero a falhas. O Grupo WGL, através da WGL Soluções by RAC, entrega comissionamento elétrico de ponta, manutenção e adequação técnica de energia para indústrias e data centers.`,
        miniArticle: `A aceleração tecnológica impulsionada por "${cleanKeyword}" demonstra que a modernidade exige estabilidade absoluta. Equipamentos de inteligência artificial, processamento de dados e automação industrial possuem tolerância zero para variações ou quedas na rede de energia. Através da WGL Soluções by RAC, estruturamos a base física que sustenta sua inovação: comissionamento rigoroso de subestações, manutenção preventiva com termografia infravermelha e laudos de adequação às normas NR-10 e NR-12.`,
        ctaText: "Garantir Alta Disponibilidade",
        benefitTitle: "Segurança técnica e conformidade regulatória",
        benefits: [
          {
            title: "Tolerância Zero a Falhas",
            desc: "Projetos de redundância ativa e painéis de potência inteligentes para assegurar uptime elétrico estável de 99.99%.",
            icon: "Cpu"
          },
          {
            title: "Conformidade Legal Avançada",
            desc: "Laudos técnicos de adequação às normas NR-10, NR-12 e NBR 5410/5419 emitidos por engenheiros seniores.",
            icon: "Shield"
          },
          {
            title: "Comissionamento Especializado",
            desc: "Testes de aceitação, ensaios técnicos de equipamentos de grande porte e certificações de conformidade pré-operação.",
            icon: "Smartphone"
          }
        ],
        productTitle: "Soluções de engenharia para TI e Indústria:",
        products: [
          {
            name: "Montagem de Cabines de Média e Alta Tensão",
            desc: "Conexões elétricas robustas de alta segurança com barramentos isolados para suportar picos de demanda sem aquecimento.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Manutenção Preventiva Termográfica",
            desc: "Inspeções por imagem infravermelha em quadros elétricos para identificar anomalias térmicas antes que virem curtos ou incêndios.",
            image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Dúvidas sobre Adequação e Engenharia Crítica:",
        faqs: [
          {
            q: "Qual a importância da adequação à NR-10 e NR-12?",
            a: "Essas normas regulamentadoras federais são obrigatórias e garantem a integridade física de colaboradores que lidam com instalações elétricas e máquinas. A WGL emite laudos detalhados com as devidas ARTs de adequação."
          },
          {
            q: "Como a WGL assegura a continuidade de energia em data centers?",
            a: "Instalamos e integramos infraestrutura de redundância ativa (n+1) contendo paralelismo de geradores a diesel WGL Energia, comutadores de ultra-velocidade e manutenção preventiva rigorosa programada."
          },
          {
            q: "O que é o laudo de SPDA (Para-raios)?",
            a: "É o laudo do Sistema de Proteção contra Descargas Atmosféricas, atestando se a planta física está devidamente aterrada e em conformidade com a NBR 5419, protegendo tanto pessoas quanto computadores e servidores de queimas provocadas por raios."
          }
        ]
      };

    case "general":
    default:
      return {
        division: "WGL Agro",
        badge: "SOLUÇÕES INTEGRADAS PARA O AGRONEGÓCIO",
        heroTitle: `Garantia de produtividade no campo mesmo sob "${cleanKeyword}"`,
        heroSub: `Diante de oscilações provocadas por "${cleanKeyword}" ou desafios de estiagem no campo, o agronegócio moderno exige engenharia integrada de água e energia. O Grupo WGL, por meio da WGL Agro by H2O, desenvolve projetos rurais inteligentes.`,
        miniArticle: `A atenção voltada a "${cleanKeyword}" ressalta a importância de manter processos eficientes e altamente produtivos. No campo, a constância é vital: a falta de água ou energia pode comprometer safras inteiras em poucos dias. O Grupo WGL, através da WGL Agro by H2O, integra energia solar rural e engenharia de irrigação por pivô central Valley® para que seu agronegócio produza com o máximo rendimento, independente das intempéries ou flutuações da rede concessionária.`,
        ctaText: "Falar com Engenheiro do Agro",
        benefitTitle: "Maximizando a produção e reduzindo riscos",
        benefits: [
          {
            title: "Projetos de Irrigação de Precisão",
            desc: "Pivôs centrais e irrigação localizada dimensionados para maximizar a área plantada com consumo eficiente de recursos.",
            icon: "Leaf"
          },
          {
            title: "Energia Solar no Campo",
            desc: "Fotovoltaica em solo ou flutuante para bombear água e beneficiar grãos com custo operacional zero de eletricidade.",
            icon: "Sun"
          },
          {
            title: "Automação e Engenharia de Rede",
            desc: "Revitalização e comissionamento de cabines elétricas rurais para alimentar pivôs de irrigação sem flutuações de tensão.",
            icon: "Wrench"
          }
        ],
        productTitle: "Portfólio de engenharia rural e água:",
        products: [
          {
            name: "Projetos de Pivôs Centrais Valley®",
            desc: "Montagem técnica de pivôs Valley®, líderes globais em irrigação e tecnologia, integrados à nossa automação elétrica.",
            image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Sistemas de Bombeamento por Energia Solar",
            desc: "Dimensionamento elétrico de bombas trifásicas alimentadas por painéis solares para irrigação contínua e autônoma.",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Perguntas Frequentes sobre Soluções Rurais:",
        faqs: [
          {
            q: "Como funciona o dimensionamento de um projeto de irrigação WGL Agro?",
            a: "Avaliamos a outorga de água do cliente, relevo do terreno, tipo de cultura e a potência elétrica necessária. Com esses dados, projetamos a subestação e o pivô ideais para obter o maior rendimento por hectare."
          },
          {
            q: "Qual a vantagem de combinar energia solar com bombeamento?",
            a: "O bombeamento de irrigação é o maior vilão da conta de luz no campo. A energia solar permite bombear água de forma 100% gratuita durante o dia inteiro, amortizando o custo do investimento em poucos anos."
          },
          {
            q: "O Grupo WGL realiza manutenções preventivas no campo?",
            a: "Sim. Como atendemos em mais de 24 estados, possuímos equipes regionais volantes qualificadas que realizam a manutenção elétrica, testes de isolamento e lubrificação estrutural de pivôs centrais de forma ágil."
          }
        ]
      };
  }
};

export const getLucideIconName = (iconKey) => {
  switch (iconKey) {
    case "ShieldAlert": return "ShieldAlert";
    case "Sun": return "Sun";
    case "Award": return "Award";
    case "TrendingDown": return "TrendingDown";
    case "DollarSign": return "DollarSign";
    case "Home": return "Home";
    case "Zap": return "Zap";
    case "Cpu": return "Cpu";
    case "Smartphone": return "Smartphone";
    case "Shield": return "Shield";
    case "Leaf": return "Leaf";
    case "Wrench": return "Wrench";
    default: return "Activity";
  }
};

export const generateMarketingHooks = (keyword) => {
  return [
    `Com a alta demanda provocada por "${keyword}", garantir energia confiável é sobrevivência.`,
    `Não deixe que "${keyword}" prejudique sua operação. O Grupo WGL assegura continuidade total.`,
    `Mais do que geradores, a WGL entrega a engenharia e suporte necessários em tempos de "${keyword}".`
  ];
};
