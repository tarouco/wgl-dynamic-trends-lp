// Copywriting Generator for Grupo WGL Dynamic Landing Page
// Dynamically creates headlines, body text, features, products and FAQ tailored to trends.

export const generateCopy = (keyword, category, newsSnippet = "") => {
  const cleanKeyword = keyword || "Energia Inteligente";
  
  switch (category) {
    case "weather":
      return {
        badge: "ALERTA DE SEGURANÇA ENERGÉTICA",
        heroTitle: `Sem energia por causa de "${cleanKeyword}"? Nunca mais.`,
        heroSub: `O assunto do momento é ${cleanKeyword}, e isso nos lembra o quanto somos dependentes da rede elétrica. O Grupo WGL oferece Geradores Solares e Sistemas de Baterias WEG para manter sua casa ligada, aconteça o que acontecer.`,
        ctaText: "Garantir meu Sistema de Backup",
        benefitTitle: "Por que investir em autonomia energética hoje?",
        benefits: [
          {
            title: "Energia Ininterrupta",
            desc: "Transição automática para baterias WEG quando a rede da concessionária cair.",
            icon: "ShieldAlert"
          },
          {
            title: "Geração Própria",
            desc: "Produza sua própria eletricidade através do Sol e armazene para uso noturno ou emergências.",
            icon: "Sun"
          },
          {
            title: "Garantia Integral WEG",
            desc: "Equipamentos de altíssima durabilidade com suporte e assistência técnica em todo o Brasil.",
            icon: "Award"
          }
        ],
        productTitle: "Equipamentos recomendados para Autonomia:",
        products: [
          {
            name: "Sistema de Armazenamento WEG ESS",
            desc: "Baterias de lítio de alta performance integradas para garantir energia contínua durante apagões.",
            image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Inversor Híbrido WEG",
            desc: "A inteligência central que gerencia painéis solares, baterias e rede elétrica de forma automática.",
            image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Dúvidas Frequentes sobre Backup Energético:",
        faqs: [
          {
            q: "Como o sistema de baterias funciona durante uma tempestade?",
            a: "Caso ocorra uma queda na rede elétrica devido a tempestades ou ventos fortes, o inversor híbrido WEG isola sua casa da rede em milissegundos e passa a alimentar suas cargas críticas (geladeira, internet, luzes) usando a energia armazenada nas baterias."
          },
          {
            q: "Posso recarregar as baterias sem sol?",
            a: "Sim. O sistema inteligente pode ser programado para carregar as baterias usando a rede da concessionária em horários de tarifa mais barata (fora de ponta) ou através de geradores a combustão auxiliares."
          },
          {
            q: "Qual a durabilidade das baterias WEG?",
            a: "As baterias de Lítio da WEG possuem vida útil projetada para mais de 10 anos de uso diário contínuo, contando com garantia de fábrica e suporte especializado do Grupo WGL."
          }
        ]
      };

    case "economy":
      return {
        badge: "COMBATE À INFLAÇÃO ENERGÉTICA",
        heroTitle: `Reaja à "${cleanKeyword}" economizando até 95% na conta de luz.`,
        heroSub: `Enquanto o país discute "${cleanKeyword}", a tarifa de energia continua subindo. Proteja seu bolso hoje mesmo com um Gerador Solar WEG dimensionado pelo Grupo WGL. Transforme despesa em investimento.`,
        ctaText: "Simular Minha Economia",
        benefitTitle: "Como a Energia Solar protege seu patrimônio?",
        benefits: [
          {
            title: "Blindagem Tarifária",
            desc: "Fique imune aos aumentos de bandeira tarifária e reajustes anuais da concessionária.",
            icon: "TrendingDown"
          },
          {
            title: "Retorno Rápido (Payback)",
            desc: "O sistema se paga em média de 3 a 5 anos, gerando lucro líquido e economia imediata por décadas.",
            icon: "DollarSign"
          },
          {
            title: "Valorização do Imóvel",
            desc: "Imóveis com sistema de energia solar WEG instalado chegam a valorizar até 10% no mercado imobiliário.",
            icon: "Home"
          }
        ],
        productTitle: "Sistemas recomendados para Economia:",
        products: [
          {
            name: "Gerador Solar Fotovoltaico Residencial",
            desc: "Módulos monocristalinos de alta eficiência WEG combinados com inversores de alta performance.",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Gerador Solar Comercial WEG",
            desc: "Dimensionado para empresas e indústrias reduzirem custos operacionais fixos com energia elétrica.",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Dúvidas Frequentes sobre Economia com Solar:",
        faqs: [
          {
            q: "Como o sistema gera economia de até 95%?",
            a: "Toda a energia gerada pelos painéis durante o dia é consumida imediatamente. O excedente é injetado na rede da concessionária, gerando créditos que abatem o consumo noturno. Você paga apenas a taxa mínima de conexão da rede."
          },
          {
            q: "A economia é imediata?",
            a: "Sim, logo no primeiro mês após a homologação e ligação do sistema pela concessionária local, você já notará a redução drástica no valor da fatura de energia."
          },
          {
            q: "Como funciona em dias nublados ou chuvosos?",
            a: "Os painéis solares WEG de última geração ainda geram energia em dias nublados através da radiação difusa, embora em menor escala. O sistema compensa essa variação usando os créditos acumulados em dias ensolarados."
          }
        ]
      };

    case "tech":
      return {
        badge: "TECNOLOGIA E INOVAÇÃO ENERGÉTICA",
        heroTitle: `Sua casa conectada ao futuro de "${cleanKeyword}".`,
        heroSub: `Avanços como "${cleanKeyword}" demandam infraestrutura elétrica de ponta. O Grupo WGL traz carregadores de carros elétricos WEG WEMOB integrados a geradores solares inteligentes. Tecnologia que move você.`,
        ctaText: "Quero Mobilidade Elétrica",
        benefitTitle: "A sinergia perfeita entre Solar e Mobilidade",
        benefits: [
          {
            title: "Abastecimento 100% Grátis",
            desc: "Use a energia solar gerada no seu telhado para recarregar as baterias do seu veículo elétrico.",
            icon: "Zap"
          },
          {
            title: "Recarga Inteligente & Rápida",
            desc: "Estações de recarga WEG WEMOB com controle por aplicativo, monitoramento de consumo e recarga veloz.",
            icon: "Cpu"
          },
          {
            title: "Tecnologia WEG Home",
            desc: "Automação residencial completa integrada para otimizar o uso da energia gerada no imóvel.",
            icon: "Smartphone"
          }
        ],
        productTitle: "Soluções de Tecnologia e Mobilidade:",
        products: [
          {
            name: "Estação de Recarga WEG WEMOB",
            desc: "Design moderno e segurança máxima para carregar seu veículo elétrico na garagem de casa ou condomínio.",
            image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "Sistema de Monitoramento WEG IoT",
            desc: "Acompanhe a geração de energia solar e controle seus carregadores em tempo real pelo smartphone.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Dúvidas Frequentes sobre Recarga e Solar:",
        faqs: [
          {
            q: "Qualquer carro elétrico é compatível com os carregadores WEG WEMOB?",
            a: "Sim, os carregadores WEG utilizam o padrão de conector Tipo 2 (padrão europeu), que é o mais comum no Brasil, sendo compatível com BYD, GWM, Volvo, BMW, Porsche e outros."
          },
          {
            q: "Quantos painéis solares adicionais preciso para recarregar meu carro?",
            a: "Depende da quilometragem diária. Em média, adicionar de 4 a 6 painéis solares WEG (cerca de 2 kWp) ao seu gerador solar residencial é suficiente para rodar 50 km diários de forma 100% gratuita."
          },
          {
            q: "Os carregadores podem ser instalados ao ar livre?",
            a: "Sim. A linha de carregadores residenciais e comerciais WEG possui proteção IP65 (contra água e poeira) e proteção UV, permitindo a instalação segura em garagens abertas ou estacionamentos descobertos."
          }
        ]
      };

    case "general":
    default:
      return {
        badge: "ENERGIA PARA O SEU DIA A DIA",
        heroTitle: `Energia ininterrupta para curtir "${cleanKeyword}" sem preocupações.`,
        heroSub: `Aproveite as novidades sobre "${cleanKeyword}" com a tranquilidade que apenas a maior marca de engenharia elétrica do Brasil pode dar. O Grupo WGL entrega geradores solares WEG para sua residência ou negócio.`,
        ctaText: "Falar com Especialista WGL",
        benefitTitle: "Conforto e sustentabilidade para você",
        benefits: [
          {
            title: "Tranquilidade WEG",
            desc: "Assistência técnica de fábrica nacional e a marca líder em motores e geradores no país.",
            icon: "Shield"
          },
          {
            title: "Sustentabilidade Real",
            desc: "Reduza sua pegada de carbono gerando eletricidade limpa e renovável no seu próprio telhado.",
            icon: "Leaf"
          },
          {
            title: "Instalação Premium",
            desc: "Equipe técnica WGL certificada que cuida de tudo: desde o projeto até a homologação final.",
            icon: "Wrench"
          }
        ],
        productTitle: "Nossas Soluções Principais WEG:",
        products: [
          {
            name: "Gerador Solar Fotovoltaico WEG",
            desc: "Portfólio completo de kits fotovoltaicos com inversores residenciais de 3kW a 100kW.",
            image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&auto=format&fit=crop&q=60"
          },
          {
            name: "WEG Home Automation & Solar",
            desc: "Monitore toda a energia da sua casa e automatize eletrodomésticos para economizar ainda mais.",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=60"
          }
        ],
        faqTitle: "Perguntas Frequentes sobre Energia Solar:",
        faqs: [
          {
            q: "O Grupo WGL realiza a instalação em todo o Brasil?",
            a: "Como distribuidor autorizado WEG, o Grupo WGL atende e fornece equipamentos para integradores parceiros credenciados em todas as regiões do Brasil, garantindo engenharia qualificada local."
          },
          {
            q: "Como funciona a manutenção do gerador solar?",
            a: "A manutenção é baixíssima. Basicamente consiste em lavagens periódicas dos painéis solares (uma ou duas vezes ao ano, dependendo das chuvas) para remover poeira e manter a eficiência máxima."
          },
          {
            q: "Quais são as formas de financiamento disponíveis?",
            a: "Trabalhamos com diversas linhas de crédito bancário de energia solar (WEG Financiamento, Sicredi, Banco do Brasil, Santander, etc.), que permitem parcelar em até 72x, onde a própria economia na conta paga a parcela."
          }
        ]
      };
  }
};
export const getLucideIconName = (iconKey) => {
  // Mapping custom keys to icon names to easily load dynamically in React
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
    `Com o avanço de "${keyword}", a demanda por eletricidade dispara. Garanta sua autonomia.`,
    `Enquanto todos falam sobre "${keyword}", os clientes do Grupo WGL estão economizando na conta de luz.`,
    `A estabilidade energética que você precisa para acompanhar "${keyword}" sem apagões.`
  ];
};
