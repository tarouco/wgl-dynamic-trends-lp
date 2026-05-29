import React, { useState } from 'react';
import { 
  ShieldAlert, Sun, Award, TrendingDown, DollarSign, Home, 
  Zap, Cpu, Smartphone, Shield, Leaf, Wrench, Phone, 
  Mail, MapPin, Calculator, Send, MessageSquare, Info, CheckCircle,
  Database, Building2, Droplet, Check
} from 'lucide-react';
import { getThemeConfig, getHeroImage } from '../utils/themeEngine';
import { generateCopy } from '../utils/copyTemplates';

// Dynamic icon loader helper
const renderIcon = (iconName, color) => {
  const props = { size: 36, style: { color } };
  switch (iconName) {
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    case 'Sun': return <Sun {...props} />;
    case 'Award': return <Award {...props} />;
    case 'TrendingDown': return <TrendingDown {...props} />;
    case 'DollarSign': return <DollarSign {...props} />;
    case 'Home': return <Home {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Smartphone': return <Smartphone {...props} />;
    case 'Shield': return <Shield {...props} />;
    case 'Leaf': return <Leaf {...props} />;
    case 'Wrench': return <Wrench {...props} />;
    default: return <Zap {...props} />;
  }
};

export default function PreviewLP({ trend, device }) {
  const [industryType, setIndustryType] = useState('industria');
  const [loadValue, setLoadValue] = useState(250); // demand in kVA
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  if (!trend) return null;

  const theme = getThemeConfig(trend.category);
  const copy = generateCopy(trend.title, trend.category, trend.news?.snippet);

  // Power Demand Math
  const getCalculatorResults = () => {
    let kvaRequired = Math.round(loadValue * 1.25); // safety margin
    let recommText = "Gerador Diesel Silenciado Monobloco";
    let divisionRecomm = "WGL Energia";
    let specDetails = "Recomendado QTA inteligente e monitoramento ativo.";

    if (industryType === 'hospital') {
      kvaRequired = Math.round(loadValue * 1.35); // extra redundancy
      recommText = "Usinas Paralelas em Redundância (N+1)";
      divisionRecomm = "WGL Soluções by RAC";
      specDetails = "QTA com transferência em rampa de milissegundos e no-breaks UPS.";
    } else if (industryType === 'agro') {
      recommText = "Gerador Móvel com Carena UV / Pivô Integrado";
      divisionRecomm = "WGL Agro";
      specDetails = "Chave de partida suave e acoplamento térmico de bombas Valley®.";
    } else if (industryType === 'comercio') {
      kvaRequired = Math.round(loadValue * 1.15);
      recommText = "Gerador Cabinante Acústico de Baixo Ruído";
      divisionRecomm = "WGL Energia";
      specDetails = "Isolamento acústico adequado às normas municipais de ruído.";
    }

    return {
      kvaRequired,
      recommText,
      divisionRecomm,
      specDetails
    };
  };

  const calcResults = getCalculatorResults();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setLeadForm({ name: '', email: '', phone: '', company: '' });
    }, 4500);
  };

  return (
    <div className="sim-body" style={{ 
      '--primary': theme.primary, 
      '--accent': theme.accent,
      backgroundColor: '#0b0f19',
      color: '#f3f4f6',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Dynamic top alert if weather or economy */}
      {trend.category === 'weather' && (
        <div style={{
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '10px 15px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
        }}>
          <ShieldAlert size={16} /> Alerta Climático: {trend.title} - Risco iminente de quedas na rede. Proteja sua operação!
        </div>
      )}

      {/* Landing Page Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: device === 'mobile' ? '12px 15px' : '20px 40px',
        backgroundColor: '#0b0f19',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src="https://grupowgl.com.br/wp-content/uploads/2026/03/logo-wgl-branco.svg" 
            alt="Grupo WGL Logo" 
            style={{ height: device === 'mobile' ? '28px' : '38px', width: 'auto' }}
          />
          {device !== 'mobile' && (
            <span style={{
              fontSize: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#9ca3af',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontWeight: 700,
              letterSpacing: '1px'
            }}>
              DISTRIBUIDOR AUTORIZADO WEG
            </span>
          )}
        </div>

        <a 
          href="https://wa.me/5551996441230" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#10b981',
            color: 'white',
            textDecoration: 'none',
            padding: device === 'mobile' ? '8px 14px' : '10px 20px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: device === 'mobile' ? '12px' : '14px',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
            transition: '0.2s'
          }}
        >
          <Phone size={14} /> {device === 'mobile' ? 'Contato' : 'Falar com Especialista'}
        </a>
      </header>

      {/* Hero Section */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(11, 15, 25, 0.88) 0%, rgba(11, 15, 25, 0.96) 100%), url(${getHeroImage(trend.title, trend.category)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        padding: device === 'mobile' ? '50px 20px' : '100px 40px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Dynamic mesh gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.bgMesh,
          opacity: 0.7,
          pointerEvents: 'none'
        }} />

        <span style={{
          color: theme.primary,
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '2px',
          backgroundColor: theme.badgeBg,
          padding: '6px 16px',
          borderRadius: '30px',
          border: `1px solid ${theme.primary}44`,
          zIndex: 2,
          boxShadow: `0 0 15px ${theme.primary}15`
        }}>
          {copy.badge}
        </span>

        <h1 style={{
          fontSize: device === 'mobile' ? '28px' : '48px',
          fontWeight: 900,
          maxWidth: '850px',
          lineHeight: 1.25,
          color: '#ffffff',
          zIndex: 2,
          textShadow: '0 4px 20px rgba(0,0,0,0.6)'
        }}>
          {copy.heroTitle}
        </h1>

        <p style={{
          fontSize: device === 'mobile' ? '14px' : '18px',
          color: '#9ca3af',
          maxWidth: '750px',
          lineHeight: 1.6,
          zIndex: 2
        }}>
          {copy.heroSub}
        </p>

        {/* Dynamic CTA button with pulsing glow */}
        <div style={{ zIndex: 2, marginTop: '10px' }}>
          <a 
            href="#lead-form-section"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: theme.btnBg,
              color: theme.btnText,
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '16px',
              boxShadow: `0 8px 28px ${theme.primaryGlow}`,
              transition: 'all 0.3s ease'
            }}
          >
            <Zap size={18} fill={theme.btnText} />
            {copy.ctaText}
          </a>
          <span style={{
            display: 'block',
            fontSize: '12px',
            color: '#6b7280',
            marginTop: '10px'
          }}>
            Suporte Técnico 24/7 • Engenharia Própria do Grupo WGL
          </span>
        </div>
      </section>

      {/* Corporate Numbers Section */}
      <section style={{
        padding: '40px 20px',
        backgroundColor: '#0b0f19',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
          gap: '20px',
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {[
            { num: '+24', label: 'Estados Atendidos' },
            { num: '+6.300', label: 'Projetos de Engenharia' },
            { num: '+684 MWh', label: 'Gerados e Distribuídos' },
            { num: '+150', label: 'Colaboradores Especialistas' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: theme.primary, marginBottom: '6px' }}>
                {item.num}
              </h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WGL Divisions Grid */}
      <section style={{
        padding: device === 'mobile' ? '50px 20px' : '80px 40px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: device === 'mobile' ? '22px' : '32px', fontWeight: 800, color: 'white', marginBottom: '15px' }}>
            Ecossistema Integrado Grupo WGL
          </h2>
          <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Mais do que equipamentos, entregamos soluções integradas unindo geração, infraestrutura e engenharia técnica.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr 1fr',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              name: "WGL Energia",
              desc: "Locação de geradores de energia e usinas dedicadas para operações que não podem parar.",
              tag: "Geração & Locação",
              active: copy.division === "WGL Energia",
              color: "#06b6d4"
            },
            {
              name: "WGL Soluções by RAC",
              desc: "Cabines primárias, subestações, conformidade de normas (NR-10/NR-12) e Mercado Livre de Energia.",
              tag: "Engenharia Elétrica",
              active: copy.division.includes("WGL Soluções") && !copy.division.includes("Agro"),
              color: "#8b5cf6"
            },
            {
              name: "WGL Agro",
              desc: "Soluções integradas de água e energia para o agronegócio moderno, com pivôs centrais e solar rural.",
              tag: "Água & Energia",
              active: copy.division === "WGL Agro",
              color: "#10b981"
            }
          ].map((divi, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${divi.active ? divi.color : 'rgba(255,255,255,0.05)'}`,
              boxShadow: divi.active ? `0 8px 30px ${divi.color}15` : 'none',
              padding: '30px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              position: 'relative'
            }}>
              {divi.active && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  backgroundColor: divi.color,
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Recomendado para esta Tendência
                </span>
              )}
              <span style={{ color: divi.color, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                {divi.tag}
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>{divi.name}</h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>{divi.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Commodity Risk Warning Section */}
      <section style={{
        padding: device === 'mobile' ? '50px 20px' : '70px 40px',
        backgroundColor: '#0b0f19',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1.2fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ef4444', marginBottom: '15px' }}>
              O perigo de tratar energia como commodity
            </h2>
            <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '20px' }}>
              Em operações críticas, contratar fornecimento de energia baseado apenas em preço sem engenharia integrada coloca seu negócio em risco.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { t: "Paradas Não Planejadas", d: "Cada minuto sem energia gera desperdícios catastróficos no caixa operacional." },
              { t: "Subdimensionamento de Equipamentos", d: "Flutuações de tensão que queimam servidores, painéis ou motores caros." },
              { t: "Multas e Não Conformidades", d: "Risco de sanções por descumprimento de normas rígidas (NR-10, NR-12)." }
            ].map((risk, i) => (
              <div key={i} style={{ display: 'flex', gap: '15px', background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px' }}>
                <ShieldAlert size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#f3f4f6', marginBottom: '4px' }}>{risk.t}</h4>
                  <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.4 }}>{risk.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Benefits Section */}
      <section style={{
        padding: device === 'mobile' ? '50px 20px' : '80px 40px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <h2 style={{
          fontSize: device === 'mobile' ? '22px' : '30px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '50px',
          color: 'white'
        }}>
          {copy.benefitTitle}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr 1fr',
          gap: '30px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {copy.benefits.map((benefit, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                padding: '30px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: device === 'mobile' ? 'center' : 'flex-start',
                textAlign: device === 'mobile' ? 'center' : 'left'
              }}
            >
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: `${theme.primary}18`,
                display: 'inline-flex'
              }}>
                {renderIcon(benefit.icon, theme.primary)}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>{benefit.title}</h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Solutions Showcase */}
      <section style={{
        padding: device === 'mobile' ? '50px 20px' : '70px 40px',
        backgroundColor: '#0b0f19',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <h2 style={{
          fontSize: device === 'mobile' ? '22px' : '30px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '15px',
          color: 'white'
        }}>
          {copy.productTitle}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#9ca3af',
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          Equipamentos e engenharia homologados com suporte de ponta.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr',
          gap: '40px',
          maxWidth: '950px',
          margin: '0 auto'
        }}>
          {copy.products.map((prod, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img 
                src={prod.image} 
                alt={prod.name} 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
                  {prod.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '20px' }}>
                  {prod.desc}
                </p>
                <span style={{
                  fontSize: '11px',
                  backgroundColor: `${theme.primary}18`,
                  color: theme.primary,
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontWeight: 700
                }}>
                  PADRÃO GRUPO WGL
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Generator Power Demand Calculator */}
      <section style={{
        padding: device === 'mobile' ? '50px 20px' : '80px 40px',
        backgroundColor: '#005c8a',
        color: '#ffffff',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1.1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: 700,
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '15px'
            }}>
              CALCULADORA DE POTÊNCIA WGL
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 900, marginBottom: '15px', lineHeight: 1.2 }}>
              Dimensione seu Grupo Gerador
            </h2>
            <p style={{ color: '#93c5fd', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              Selecione o segmento da sua empresa e arraste a barra para definir a sua demanda de carga estimada. Descubra a potência mínima necessária para seu gerador.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Tipo de Operação:</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'hospital', label: 'Hospital/Clínica' },
                    { id: 'industria', label: 'Indústria' },
                    { id: 'comercio', label: 'Shopping/Loja' },
                    { id: 'agro', label: 'Agronegócio' }
                  ].map((op) => (
                    <button
                      key={op.id}
                      onClick={() => setIndustryType(op.id)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: industryType === op.id ? '#ffffff' : 'rgba(255,255,255,0.1)',
                        color: industryType === op.id ? '#005c8a' : '#ffffff',
                        fontWeight: 700,
                        fontSize: '11px',
                        cursor: 'pointer',
                        transition: '0.2s'
                      }}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>Carga Operacional Estimada:</span>
                  <strong style={{ fontSize: '15px' }}>{loadValue} kVA</strong>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="2000" 
                  step="10"
                  value={loadValue}
                  onChange={(e) => setLoadValue(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#ffffff',
                    cursor: 'pointer',
                    height: '6px',
                    borderRadius: '3px'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#93c5fd' }}>
                  <span>30 kVA</span>
                  <span>2.000+ kVA</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: '35px',
            borderRadius: '16px',
            boxShadow: '0 20px 30px -5px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Calculator style={{ color: '#005c8a' }} size={24} />
                <h4 style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a' }}>Resultado do Dimensionamento:</h4>
              </div>
              
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block', fontWeight: 600 }}>Potência Recomendada do Gerador:</span>
                <strong style={{ fontSize: '28px', color: '#005c8a' }}>{calcResults.kvaRequired} kVA</strong>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block', fontWeight: 600 }}>Estrutura de Equipamento Recomendada:</span>
                <strong style={{ fontSize: '15px', color: '#1e293b', display: 'block', marginTop: '4px' }}>{calcResults.recommText}</strong>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '2px' }}>{calcResults.specDetails}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Divisão Técnica Responsável:</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{calcResults.divisionRecomm}</span>
                </div>
              </div>

              <a 
                href="#lead-form-section" 
                style={{
                  textAlign: 'center',
                  backgroundColor: '#005c8a',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  transition: '0.2s',
                  boxShadow: '0 4px 10px rgba(0, 92, 138, 0.2)'
                }}
              >
                Solicitar Proposta Comercial Técnica
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: device === 'mobile' ? '50px 20px' : '80px 40px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <h2 style={{
          fontSize: device === 'mobile' ? '22px' : '30px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '50px',
          color: 'white'
        }}>
          {copy.faqTitle}
        </h2>

        <div style={{
          maxWidth: '750px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {copy.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: '0.2s'
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ 
                    fontSize: '18px', 
                    color: theme.primary, 
                    transform: isOpen ? 'rotate(45deg)' : 'none', 
                    transition: 'transform 0.2s' 
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    fontSize: '14px',
                    color: '#9ca3af',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    backgroundColor: 'rgba(0,0,0,0.1)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form / Lead Capturing */}
      <section 
        id="lead-form-section"
        style={{
          padding: device === 'mobile' ? '50px 20px' : '80px 40px',
          backgroundColor: '#0b0f19'
        }}
      >
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            {copy.ctaText.includes("Cotar") ? "Fale com Engenharia de Contingência" : "Fale com Especialista WGL"}
          </h2>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '35px', lineHeight: 1.6 }}>
            Preencha os dados e receba uma análise de engenharia e proposta comercial para a sua planta de carga em menos de 2 horas.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              padding: '30px',
              borderRadius: '12px',
              color: '#34d399',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle size={36} style={{ color: '#10b981' }} />
              <strong style={{ fontSize: '18px', color: 'white' }}>Solicitação de Viabilidade Enviada!</strong>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.5 }}>
                Seu diagnóstico para a demanda de <strong>{loadValue} kVA</strong> foi registrado. Nossos engenheiros elétricos estão elaborando o pré-projeto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: device === 'mobile' ? '1fr' : '1.1fr 0.9fr', gap: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>Nome do Responsável</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Dr. João Silva"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>Empresa / Razão Social</label>
                  <input 
                    type="text"
                    placeholder="Ex: Hospital das Clínicas Ltda"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr', gap: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>E-mail Corporativo</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Ex: joao@empresa.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>Telefone / WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Ex: (51) 99644-1230"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                style={{
                  backgroundColor: theme.primary,
                  color: theme.btnText,
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: `0 4px 14px ${theme.primaryGlow}`,
                  marginTop: '10px',
                  transition: '0.2s'
                }}
              >
                <Send size={16} />
                Solicitar Meu Estudo de Engenharia WGL
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 20px',
        backgroundColor: '#0b0f19',
        color: '#6b7280',
        fontSize: '12px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p>
            © {new Date().getFullYear()} Grupo WGL. Todos os direitos reservados. Locação de Geradores e Engenharia Elétrica Integrada.
          </p>
          <p style={{ color: '#4b5563' }}>
            Hospedado sob o domínio do projeto: <strong style={{ color: '#9ca3af' }}>geradoresenergiawgl.com.br</strong> • Origem da análise: Google Trends RSS geo=BR a cada 30 minutos.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px' }}>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Termos de Uso</a>
            <span>•</span>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Políticas de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
