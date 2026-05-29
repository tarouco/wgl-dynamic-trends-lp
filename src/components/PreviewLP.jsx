import React, { useState } from 'react';
import { 
  ShieldAlert, Sun, Award, TrendingDown, DollarSign, Home, 
  Zap, Cpu, Smartphone, Shield, Leaf, Wrench, Phone, 
  Mail, MapPin, Calculator, Send, MessageSquare, Info
} from 'lucide-react';
import { getThemeConfig } from '../utils/themeEngine';
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
  const [billValue, setBillValue] = useState(500);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  if (!trend) return null;

  const theme = getThemeConfig(trend.category);
  const copy = generateCopy(trend.title, trend.category, trend.news?.snippet);

  // Energy Calculator Math
  const annualSavings = Math.round(billValue * 0.95 * 12);
  const requiredKwp = (billValue / 110).toFixed(1);
  const paybackYears = (requiredKwp * 4.5).toFixed(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setLeadForm({ name: '', email: '', phone: '' });
    }, 4000);
  };

  return (
    <div className="sim-body" style={{ '--primary': theme.primary, '--accent': theme.accent }}>
      {/* Dynamic top alert if weather or economy */}
      {trend.category === 'weather' && (
        <div style={{
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '8px 15px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10
        }}>
          <ShieldAlert size={16} /> Alerta de Clima: {trend.title} - Instabilidade na Rede Elétrica local. Garanta sua segurança!
        </div>
      )}

      {/* Landing Page Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: device === 'mobile' ? '12px 15px' : '15px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="https://wgenergia.com.br/wp-content/uploads/2026/02/logo-wg-energia-512w.avif" 
            alt="WG Energia Logo" 
            style={{ height: device === 'mobile' ? '24px' : '32px' }}
          />
          {device !== 'mobile' && (
            <span style={{
              fontSize: '11px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '2px 8px',
              borderRadius: '20px',
              fontWeight: 600,
              letterSpacing: '0.5px'
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
            padding: device === 'mobile' ? '6px 12px' : '8px 16px',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: device === 'mobile' ? '12px' : '14px',
            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)',
            transition: '0.2s'
          }}
        >
          <Phone size={14} /> {device === 'mobile' ? 'Contato' : '(51) 9 9644-1230'}
        </a>
      </header>

      {/* Hero Section */}
      <section style={{
        background: theme.heroBg,
        color: '#ffffff',
        padding: device === 'mobile' ? '40px 20px' : '80px 40px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px'
      }}>
        {/* Dynamic mesh gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.bgMesh,
          opacity: 0.8,
          pointerEvents: 'none'
        }} />

        <span style={{
          color: theme.primary,
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '2px',
          backgroundColor: theme.badgeBg,
          padding: '6px 16px',
          borderRadius: '30px',
          border: `1px solid ${theme.primary}33`,
          zIndex: 2
        }}>
          {copy.badge}
        </span>

        <h1 style={{
          fontSize: device === 'mobile' ? '28px' : '44px',
          fontWeight: 800,
          maxWidth: '800px',
          lineHeight: 1.2,
          color: '#ffffff',
          zIndex: 2,
          textShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {copy.heroTitle}
        </h1>

        <p style={{
          fontSize: device === 'mobile' ? '14px' : '18px',
          color: '#94a3b8',
          maxWidth: '700px',
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
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '16px',
              boxShadow: `0 8px 24px ${theme.primaryGlow}`,
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Zap size={18} fill={theme.btnText} />
            {copy.ctaText}
          </a>
          <span style={{
            display: 'block',
            fontSize: '12px',
            color: '#64748b',
            marginTop: '8px'
          }}>
            Estudo de viabilidade gratuito • Distribuidor Homologado WEG
          </span>
        </div>
      </section>

      {/* Benefits Grid */}
      <section style={{
        padding: device === 'mobile' ? '40px 20px' : '60px 40px',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          fontSize: device === 'mobile' ? '20px' : '28px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '40px',
          color: '#0f172a'
        }}>
          {copy.benefitTitle}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr 1fr',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {copy.benefits.map((benefit, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: device === 'mobile' ? 'center' : 'flex-start',
                textAlign: device === 'mobile' ? 'center' : 'left'
              }}
            >
              <div style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: `${theme.primary}12`,
                display: 'inline-flex'
              }}>
                {renderIcon(benefit.icon, theme.primary)}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{benefit.title}</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Showcase */}
      <section style={{
        padding: device === 'mobile' ? '40px 20px' : '60px 40px',
        backgroundColor: '#ffffff'
      }}>
        <h2 style={{
          fontSize: device === 'mobile' ? '20px' : '28px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '10px',
          color: '#0f172a'
        }}>
          {copy.productTitle}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Garantia e robustez do maior fabricante nacional (WEG).
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {copy.products.map((prod, idx) => (
            <div 
              key={idx}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <img 
                src={prod.image} 
                alt={prod.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  {prod.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '15px' }}>
                  {prod.desc}
                </p>
                <span style={{
                  fontSize: '11px',
                  backgroundColor: '#005c8a15',
                  color: '#005c8a',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 700
                }}>
                  TECNOLOGIA WEG
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator Section */}
      <section style={{
        padding: device === 'mobile' ? '40px 20px' : '60px 40px',
        backgroundColor: '#005c8a',
        color: '#ffffff',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontWeight: 700,
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              SIMULADOR DE ECONOMIA WG
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '15px' }}>
              Calcule seu Gerador Solar WEG
            </h2>
            <p style={{ color: '#93c5fd', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              Descubra em segundos o tamanho estimado do seu sistema solar, seu payback e o quanto você deixará de pagar para a concessionária.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span>Valor médio da sua conta de luz:</span>
                <strong style={{ fontSize: '16px' }}>R$ {billValue}</strong>
              </div>
              <input 
                type="range" 
                min="200" 
                max="5000" 
                step="50"
                value={billValue}
                onChange={(e) => setBillValue(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: theme.primary,
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '3px'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#93c5fd' }}>
                <span>R$ 200</span>
                <span>R$ 5.000+</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Calculator style={{ color: '#005c8a' }} size={24} />
                <h4 style={{ fontWeight: 700, fontSize: '16px' }}>Resultado da Estimativa:</h4>
              </div>
              
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Economia Anual Estimada:</span>
                <strong style={{ fontSize: '24px', color: '#10b981' }}>R$ {annualSavings.toLocaleString('pt-BR')}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Potência Necessária:</span>
                  <strong style={{ display: 'block', fontSize: '16px' }}>{requiredKwp} kWp</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Retorno do Investimento:</span>
                  <strong style={{ display: 'block', fontSize: '16px', color: '#ff7a00' }}>~{paybackYears} anos</strong>
                </div>
              </div>

              <a 
                href="#lead-form-section" 
                style={{
                  textAlign: 'center',
                  backgroundColor: '#005c8a',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  transition: '0.2s'
                }}
              >
                Solicitar Orçamento Executivo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: device === 'mobile' ? '40px 20px' : '60px 40px',
        backgroundColor: '#f8fafc'
      }}>
        <h2 style={{
          fontSize: device === 'mobile' ? '20px' : '28px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '40px',
          color: '#0f172a'
        }}>
          {copy.faqTitle}
        </h2>

        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {copy.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: '0.2s'
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#0f172a',
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
                    padding: '0 20px 18px 20px',
                    fontSize: '14px',
                    color: '#475569',
                    lineHeight: 1.5,
                    borderTop: '1px solid #f1f5f9',
                    backgroundColor: '#fafafa'
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
          padding: device === 'mobile' ? '40px 20px' : '60px 40px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0'
        }}
      >
        <div style={{
          maxWidth: '550px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
            Fale com um Especialista WG
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '30px' }}>
            Preencha os dados abaixo. Nossa equipe especializada em dimensionamento WEG entrará em contato em menos de 1 hora comercial.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '24px',
              borderRadius: '12px',
              color: '#065f46',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle size={32} style={{ color: '#10b981' }} />
              <strong style={{ fontSize: '18px' }}>Solicitação Recebida com Sucesso!</strong>
              <p style={{ fontSize: '14px' }}>
                Nossos consultores já receberam seus dados e estão rodando o dimensionamento para sua conta de luz de <strong>R$ {billValue}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Nome Completo</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: João Silva"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                  style={{
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>E-mail corporativo ou pessoal</label>
                <input 
                  type="email" 
                  required
                  placeholder="Ex: joao@empresa.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                  style={{
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Ex: (51) 99644-1230"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                  style={{
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <button 
                type="submit" 
                style={{
                  backgroundColor: '#ff7a00',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 10px rgba(255, 122, 0, 0.25)',
                  marginTop: '10px'
                }}
              >
                <Send size={16} />
                Receber Meu Estudo de Viabilidade WEG
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '30px 20px',
        backgroundColor: '#0f172a',
        color: '#64748b',
        fontSize: '12px',
        textAlign: 'center',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p>
            © {new Date().getFullYear()} WG Energia. Todos os direitos reservados. Distribuidor Autorizado WEG.
          </p>
          <p style={{ color: '#475569' }}>
            Hospedado sob o domínio oficial do projeto: <strong style={{ color: '#94a3b8' }}>geradoresenergiawgl.com.br</strong> • Origem da análise: Google Trends geo=BR a cada 30 minutos.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termos de Uso</a>
            <span>•</span>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Políticas de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
