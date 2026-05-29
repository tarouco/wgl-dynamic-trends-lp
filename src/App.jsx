import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, BookOpen, Layout, Wifi, WifiOff, Settings, ArrowLeft } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PreviewLP from './components/PreviewLP';
import Integration from './components/Integration';
import { mockTrends } from './utils/mockData';
import { detectCategory, parseCityAndTrend, getTrendUrl } from './utils/themeEngine';

// Parse Netlify-pinned trend if baked in at build time
const getPinnedTrend = () => {
  if (typeof window !== 'undefined' && window.VITE_ACTIVE_TREND) {
    return window.VITE_ACTIVE_TREND;
  }
  const pinnedJson = import.meta.env.VITE_ACTIVE_TREND;
  if (pinnedJson && pinnedJson !== 'undefined' && pinnedJson !== 'null') {
    try {
      return JSON.parse(pinnedJson);
    } catch (e) {
      console.error("Erro ao analisar VITE_ACTIVE_TREND:", e);
    }
  }
  return null;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Helper to resolve active trend from path
  const getTrendFromPath = (path) => {
    const urlData = parseCityAndTrend(path);
    if (urlData) {
      if (urlData.isLocal) {
        return {
          title: `${urlData.trendTitle} em ${urlData.cityName}`,
          category: detectCategory(urlData.trendSlug),
          traffic: "Busca Localizada",
          city: urlData.cityName,
          isLocal: true
        };
      } else {
        return {
          title: urlData.trendTitle,
          category: detectCategory(urlData.trendSlug),
          traffic: "Busca Geral",
          isLocal: false
        };
      }
    }
    return getPinnedTrend();
  };

  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'integration'
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile' (for admin preview)
  const [trends, setTrends] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState(getTrendFromPath(window.location.pathname));
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [deploying, setDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState(null);

  // Monitor window resize for full-screen responsive view
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTrendsData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/fetch-trends');
      const json = await res.json();
      
      if (json.success && json.data && json.data.length > 0) {
        const processed = json.data.map(item => ({
          ...item,
          category: detectCategory(item.title, item.news?.title || '')
        }));
        setTrends(processed);
        
        const active = getTrendFromPath(window.location.pathname);
        if (active) {
          setSelectedTrend(active);
        } else {
          const pinned = getPinnedTrend();
          if (pinned) {
            const matched = processed.find(t => t.title === pinned.title);
            setSelectedTrend(matched || pinned);
          } else {
            setSelectedTrend(processed[0]);
          }
        }
        
        setIsLive(true);
        setLastSync(new Date());
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.warn("Using mockData fallback. Error:", err.message);
      const processedMock = mockTrends.map(item => ({
        ...item,
        category: item.category || detectCategory(item.title, item.news?.title || '')
      }));
      setTrends(processedMock);
      
      const active = getTrendFromPath(window.location.pathname);
      if (active) {
        setSelectedTrend(active);
      } else {
        const pinned = getPinnedTrend();
        if (pinned) {
          const matched = processedMock.find(t => t.title === pinned.title);
          setSelectedTrend(matched || pinned);
        } else {
          setSelectedTrend(processedMock[0]);
        }
      }
      
      setIsLive(false);
      setLastSync(new Date());
    } finally {
      setLoading(false);
    }
  };

  const handleForceDeploy = async () => {
    if (!selectedTrend) return;
    setDeploying(true);
    setDeployResult(null);
    try {
      const res = await fetch('/api/trigger-deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trend: selectedTrend })
      });
      const data = await res.json();
      if (data.success) {
        setDeployResult({ success: true, message: "Deploy iniciado com sucesso! O Netlify está compilando. O site atualizará em ~1 min." });
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    } catch (err) {
      console.error("Falha ao forçar deploy:", err);
      setDeployResult({ success: false, message: `Erro: ${err.message}` });
    } finally {
      setDeploying(false);
    }
  };

  useEffect(() => {
    fetchTrendsData();
  }, []);

  // Basic routing handler
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update selected trend if path changes (ignoring non-trend paths like /admin)
  useEffect(() => {
    const active = getTrendFromPath(currentPath);
    if (active) {
      setSelectedTrend(active);
    }
  }, [currentPath]);

  // Redirect root page to localized slug if the active trend is city-related
  useEffect(() => {
    if (currentPath === '/') {
      const active = getTrendFromPath('/');
      if (active && active.city) {
        const targetUrl = getTrendUrl(active.title);
        if (targetUrl && targetUrl !== '/') {
          window.history.replaceState({}, '', targetUrl);
          setCurrentPath(targetUrl);
        }
      }
    }
  }, [currentPath]);

  const handleSelectTrend = (trend) => {
    setSelectedTrend(trend);
  };

  const handleCategoryOverride = (newCategory) => {
    setSelectedTrend(prev => ({
      ...prev,
      category: newCategory
    }));
    
    setTrends(prevList => prevList.map(t => 
      t.title === selectedTrend.title ? { ...t, category: newCategory } : t
    ));
  };

  // --- RENDER VIEW 1: Live Public Landing Page (Full Screen) ---
  if (currentPath !== '/admin') {
    if (loading && !selectedTrend) {
      return (
        <div style={{
          display: 'flex',
          height: '100vh',
          backgroundColor: '#0b0f19',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '15px',
          fontFamily: "'Outfit', sans-serif",
          color: 'white'
        }}>
          <div className="spin" style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTopColor: '#005c8a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span>Carregando Gerador Solar WEG...</span>
        </div>
      );
    }

    // Default to first selected trend in list
    const activeTrend = selectedTrend || trends[0] || mockTrends[0];
    const isMobileDevice = windowWidth < 768;

    return (
      <div className="animate-fade">
        {/* Floating link to admin for demo purposes */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          opacity: 0.8
        }}>
          <button
            onClick={() => navigateTo('/admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '10px 16px',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Settings size={14} />
            Painel Admin
          </button>
        </div>
        
        {/* Render full screen public landing page */}
        <PreviewLP trend={activeTrend} device={isMobileDevice ? 'mobile' : 'desktop'} />
      </div>
    );
  }

  // --- RENDER VIEW 2: Administrator Split-screen Dashboard ---
  return (
    <div className="app-container">
      {/* Header */}
      <header className="dashboard-header glass-panel" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <div className="logo-container">
          <img 
            src="https://grupowgl.com.br/wp-content/uploads/2026/03/logo-wgl-branco.svg" 
            alt="Grupo WGL" 
            className="logo-img" 
          />
          <span className="badge-weg">Distribuidor WEG</span>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            • Painel Administrativo
          </span>
        </div>

        <div className="header-status">
          <button
            onClick={() => navigateTo('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={12} />
            Ver Site Público
          </button>
          
          <div className="status-indicator">
            {isLive ? (
              <>
                <Wifi size={14} className="text-cyan-400" />
                <span style={{ color: '#22d3ee' }}>Google Trends Conectado</span>
              </>
            ) : (
              <>
                <WifiOff size={14} style={{ color: '#fbbf24' }} />
                <span style={{ color: '#fbbf24' }}>Simulador Local Activo</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="dashboard-main">
        {/* Left Column: Dashboard Control Panel */}
        <Dashboard 
          trends={trends} 
          selectedTrend={selectedTrend} 
          onSelectTrend={handleSelectTrend}
          onCategoryOverride={handleCategoryOverride}
          onRefresh={fetchTrendsData}
          loading={loading}
          lastSync={lastSync}
          isLive={isLive}
          onForceDeploy={handleForceDeploy}
          deploying={deploying}
          deployResult={deployResult}
        />

        {/* Right Column: Dynamic Preview / Integration manual */}
        <div className="viewport-panel">
          {/* Tabs header */}
          <div className="viewport-header glass-panel" style={{ padding: '12px 20px', borderRadius: '16px' }}>
            <div className="nav-tabs">
              <button 
                className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                <Layout size={16} />
                Visualizar Landing Page
              </button>
              <button 
                className={`tab-btn ${activeTab === 'integration' ? 'active' : ''}`}
                onClick={() => setActiveTab('integration')}
              >
                <BookOpen size={16} />
                Manual Netlify
              </button>
            </div>

            {activeTab === 'preview' && (
              <div className="viewport-device-toggles">
                <button 
                  className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                  onClick={() => setDevice('desktop')}
                  title="Desktop Preview"
                >
                  <Monitor size={16} />
                </button>
                <button 
                  className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                  onClick={() => setDevice('mobile')}
                  title="Mobile Preview"
                >
                  <Smartphone size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Viewport Frame */}
          {activeTab === 'preview' ? (
            <div className="viewport-frame-container">
              <div className={device === 'desktop' ? 'device-desktop' : 'device-mobile'}>
                <PreviewLP trend={selectedTrend} device={device} />
              </div>
            </div>
          ) : (
            <Integration />
          )}
        </div>
      </main>
    </div>
  );
}
