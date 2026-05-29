import React, { useState, useEffect } from 'react';
import { 
  Zap, CloudRain, TrendingUp, Globe, Clock, RefreshCw, 
  ChevronRight, AlertTriangle, CheckCircle, Sliders 
} from 'lucide-react';
import { detectCategory, getCategoryLabel, getTrendUrl } from '../utils/themeEngine';

export default function Dashboard({ 
  trends, 
  selectedTrend, 
  onSelectTrend, 
  onCategoryOverride, 
  onRefresh, 
  loading,
  lastSync,
  isLive,
  onForceDeploy,
  deploying,
  deployResult
}) {
  const [countdown, setCountdown] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    // 30 minute countdown simulator
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 1800 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'weather': return <CloudRain size={16} className="text-cyan-400" />;
      case 'economy': return <TrendingUp size={16} className="text-emerald-400" />;
      case 'tech': return <Zap size={16} className="text-violet-400" />;
      case 'general':
      default:
        return <Globe size={16} className="text-yellow-400" />;
    }
  };

  return (
    <div className="control-panel">
      {/* Scheduler Card */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 className="section-title">
          <Clock size={18} className="text-weg-blue" style={{ color: '#005c8a' }} />
          Agendamento Netlify
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Status Cron:</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#10b981' }}>
              <span className="dot-green"></span> Ativo (Cada 30m)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Próxima Sincronização:</span>
            <span style={{ fontWeight: 600, fontFamily: 'monospace', color: 'var(--solar-orange)' }}>
              {formatTime(countdown)}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Último Fetch:</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {lastSync ? new Date(lastSync).toLocaleTimeString('pt-BR') : 'Aguardando...'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Fonte de Dados:</span>
            <span style={{ 
              color: isLive ? '#22d3ee' : '#fbbf24', 
              fontWeight: 500,
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: isLive ? 'rgba(6,182,212,0.1)' : 'rgba(251,191,36,0.1)'
            }}>
              {isLive ? 'Google Trends Real-time' : 'Simulador Offline'}
            </span>
          </div>

          <button 
            className="btn-primary" 
            onClick={onForceDeploy}
            disabled={deploying || !selectedTrend}
            style={{ 
              width: '100%', 
              marginTop: '10px',
              opacity: (!selectedTrend || deploying) ? 0.6 : 1,
              cursor: (!selectedTrend || deploying) ? 'not-allowed' : 'pointer'
            }}
          >
            <RefreshCw size={16} className={deploying ? "spin" : ""} style={{ animation: deploying ? "spin 1s linear infinite" : "none" }} />
            {deploying ? "Disparando Build no Netlify..." : "Forçar Sincronização (Deploy)"}
          </button>
          
          {deployResult && (
            <div style={{
              marginTop: '10px',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '12px',
              border: '1px solid',
              backgroundColor: deployResult.success ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              borderColor: deployResult.success ? '#10b981' : '#ef4444',
              color: deployResult.success ? '#34d399' : '#f87171'
            }}>
              {deployResult.message}
            </div>
          )}
        </div>
      </div>

      {/* Trends List Card */}
      <div className="glass-panel" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 className="section-title" style={{ margin: 0 }}>
            <Globe size={18} style={{ color: '#ff7a00' }} />
            Tendências no Brasil
          </h3>
          <button 
            onClick={onRefresh} 
            disabled={loading}
            title="Recarregar Lista do Google"
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
          </button>
        </div>
        
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Selecione uma tendência para ver a landing page adaptar seu copy e design automaticamente.
        </p>

        {loading ? (
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <RefreshCw size={24} style={{ animation: "spin 1s linear infinite", color: '#005c8a' }} />
          </div>
        ) : (
          <div className="trends-list" style={{ flex: 1 }}>
            {trends.map((trend, idx) => {
              const isActive = selectedTrend?.title === trend.title;
              const catLabel = getCategoryLabel(trend.category);
              
              // Custom active borders/shadows based on category
              const catColors = {
                weather: { border: '#06b6d4', glow: 'rgba(6, 182, 212, 0.2)' },
                economy: { border: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' },
                tech: { border: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' },
                general: { border: '#ff7a00', glow: 'rgba(255, 122, 0, 0.2)' }
              };
              const activeStyle = isActive ? {
                '--active-border-color': catColors[trend.category]?.border,
                '--active-glow-color': catColors[trend.category]?.glow,
              } : {};

              return (
                <div 
                  key={idx}
                  className={`trend-card ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectTrend(trend)}
                  style={activeStyle}
                >
                  <div className="trend-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getCategoryIcon(trend.category)}
                      <span className="trend-keyword">{trend.title}</span>
                    </div>
                    <div className="trend-meta">
                      <span className="trend-volume">{trend.traffic}</span>
                      <span className={`trend-cat-tag tag-${trend.category}`}>
                        {catLabel}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px', fontSize: '11px' }}>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>
                        {getTrendUrl(trend.title)}
                      </span>
                      {isActive && (
                        <a 
                          href={getTrendUrl(trend.title)} 
                          onClick={(e) => e.stopPropagation()} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: '#22d3ee', textDecoration: 'underline', width: 'fit-content' }}
                        >
                          Abrir página da cidade ↗
                        </a>
                      )}
                    </div>
                  </div>
                  {trend.picture && (
                    <img src={trend.picture} alt={trend.title} className="trend-img" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Editor & Overrides Card */}
      {selectedTrend && (
        <div className="glass-panel animate-slide" style={{ padding: '20px' }}>
          <h3 className="section-title">
            <Sliders size={18} style={{ color: '#8b5cf6' }} />
            Customizar Categoria
          </h3>
          
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Altere manualmente a categoria para forçar diferentes temas visuais na landing page.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['weather', 'economy', 'tech', 'general'].map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${selectedTrend.category === cat ? 'active' : ''}`}
                onClick={() => onCategoryOverride(cat)}
                style={{ fontSize: '12px', padding: '8px' }}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
          
          {selectedTrend.news && (
            <div style={{ 
              marginTop: '15px', 
              padding: '10px', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px',
              fontSize: '12px'
            }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                Notícia Associada:
              </strong>
              <span style={{ color: 'var(--text-secondary)' }}>
                {selectedTrend.news.title}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Simple style inject for rotation animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
