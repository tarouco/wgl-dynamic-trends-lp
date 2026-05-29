import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, BookOpen, Layout, Wifi, WifiOff } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PreviewLP from './components/PreviewLP';
import Integration from './components/Integration';
import { mockTrends } from './utils/mockData';
import { detectCategory } from './utils/themeEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'integration'
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [trends, setTrends] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const fetchTrendsData = async () => {
    setLoading(true);
    try {
      // Netlify function path
      const res = await fetch('/api/fetch-trends');
      const json = await res.json();
      
      if (json.success && json.data && json.data.length > 0) {
        // Auto detect category for each trend based on keywords
        const processed = json.data.map(item => ({
          ...item,
          category: detectCategory(item.title, item.news?.title || '')
        }));
        setTrends(processed);
        setSelectedTrend(processed[0]);
        setIsLive(true);
        setLastSync(new Date());
      } else {
        throw new Error("Invalid response structure or empty trends list");
      }
    } catch (err) {
      console.warn("API trends fetch failed. Using premium mockData fallback. Error:", err.message);
      // Process mock data categories just in case
      const processedMock = mockTrends.map(item => ({
        ...item,
        category: item.category || detectCategory(item.title, item.news?.title || '')
      }));
      setTrends(processedMock);
      setSelectedTrend(processedMock[0]);
      setIsLive(false);
      setLastSync(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendsData();
  }, []);

  const handleSelectTrend = (trend) => {
    setSelectedTrend(trend);
  };

  const handleCategoryOverride = (newCategory) => {
    setSelectedTrend(prev => ({
      ...prev,
      category: newCategory
    }));
    
    // Update category in main list
    setTrends(prevList => prevList.map(t => 
      t.title === selectedTrend.title ? { ...t, category: newCategory } : t
    ));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="dashboard-header glass-panel" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <div className="logo-container">
          <img 
            src="https://wgenergia.com.br/wp-content/uploads/2026/02/logo-wg-energia-512w.avif" 
            alt="WG Energia" 
            className="logo-img" 
          />
          <span className="badge-weg">Distribuidor WEG</span>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            • Trends LP Engine
          </span>
        </div>

        <div className="header-status">
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
          <div className="status-indicator">
            <span className="dot-green"></span>
            <span>Netlify Sync: OK</span>
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
