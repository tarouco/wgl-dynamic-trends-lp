// Theme Engine for Dynamic Landing Page Adaptability

export const getThemeConfig = (category) => {
  switch (category) {
    case 'weather':
      return {
        primary: '#06b6d4',      // Cyan
        primaryGlow: 'rgba(6, 182, 212, 0.4)',
        accent: '#f43f5e',       // Rose (Alert)
        heroBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        textColor: '#e2e8f0',
        badgeBg: 'rgba(6, 182, 212, 0.1)',
        badgeText: '#22d3ee',
        btnBg: '#06b6d4',
        btnText: '#0f172a',
        buttonClass: 'btn-weather',
        bgMesh: 'radial-gradient(circle at 10% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 40%)',
        accentGlow: 'rgba(244, 63, 94, 0.25)'
      };
      
    case 'economy':
      return {
        primary: '#10b981',      // Emerald Green
        primaryGlow: 'rgba(16, 185, 129, 0.4)',
        accent: '#fbbf24',       // Gold/Amber
        heroBg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        textColor: '#ecfdf5',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeText: '#34d399',
        btnBg: '#10b981',
        btnText: '#ffffff',
        buttonClass: 'btn-economy',
        bgMesh: 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
        accentGlow: 'rgba(251, 191, 36, 0.25)'
      };
      
    case 'tech':
      return {
        primary: '#8b5cf6',      // Electric Violet
        primaryGlow: 'rgba(139, 92, 246, 0.4)',
        accent: '#ec4899',       // Pink/Magenta
        heroBg: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        textColor: '#f5f3ff',
        badgeBg: 'rgba(139, 92, 246, 0.15)',
        badgeText: '#a78bfa',
        btnBg: '#8b5cf6',
        btnText: '#ffffff',
        buttonClass: 'btn-tech',
        bgMesh: 'radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)',
        accentGlow: 'rgba(236, 72, 153, 0.25)'
      };
      
    case 'general':
    default:
      return {
        primary: '#ff7a00',      // Solar Orange
        primaryGlow: 'rgba(255, 122, 0, 0.4)',
        accent: '#005c8a',       // WEG Blue
        heroBg: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
        textColor: '#f9fafb',
        badgeBg: 'rgba(255, 122, 0, 0.1)',
        badgeText: '#ffa347',
        btnBg: '#ff7a00',
        btnText: '#ffffff',
        buttonClass: 'btn-general',
        bgMesh: 'radial-gradient(circle at 10% 20%, rgba(255, 122, 0, 0.15) 0%, transparent 40%)',
        accentGlow: 'rgba(0, 92, 138, 0.25)'
      };
  }
};
export const getCategoryLabel = (category) => {
  switch (category) {
    case 'weather': return 'Clima & Apagões';
    case 'economy': return 'Economia & Energia';
    case 'tech': return 'Tecnologia & Carros';
    case 'general':
    default: return 'Geral / Eventos';
  }
};
export const detectCategory = (keyword, newsTitle = '') => {
  const combined = `${keyword} ${newsTitle}`.toLowerCase();
  
  if (
    combined.includes('chuva') || 
    combined.includes('apagão') || 
    combined.includes('vento') || 
    combined.includes('tempestade') || 
    combined.includes('calor') || 
    combined.includes('frio') || 
    combined.includes('clima') || 
    combined.includes('seca') || 
    combined.includes('reservatório') ||
    combined.includes('energia elétrica') ||
    combined.includes('sem luz')
  ) {
    return 'weather';
  }
  
  if (
    combined.includes('inflação') || 
    combined.includes('selic') || 
    combined.includes('conta de luz') || 
    combined.includes('bandeira') || 
    combined.includes('tarifa') || 
    combined.includes('aumento') || 
    combined.includes('economia') || 
    combined.includes('custo') || 
    combined.includes('preço') || 
    combined.includes('ouro') || 
    combined.includes('bolsa') || 
    combined.includes('dólar')
  ) {
    return 'economy';
  }
  
  if (
    combined.includes('carro') || 
    combined.includes('byd') || 
    combined.includes('elétrico') || 
    combined.includes('híbrido') || 
    combined.includes('automotivo') || 
    combined.includes('chatgpt') || 
    combined.includes('ia') || 
    combined.includes('inteligência artificial') ||
    combined.includes('tecnologia') ||
    combined.includes('apple') ||
    combined.includes('iphone') ||
    combined.includes('samsung')
  ) {
    return 'tech';
  }
  
  return 'general';
};

export const getHeroImage = (keyword, category) => {
  const kw = (keyword || '').toLowerCase();
  
  // Specific Weather Subcategories
  if (kw.includes('chuva') || kw.includes('tempestade') || kw.includes('temporal') || kw.includes('vento') || kw.includes('apagão') || kw.includes('sem luz') || kw.includes('queda de energia')) {
    return 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1600&auto=format&fit=crop&q=80'; // Dramatic lightning strike/clouds
  }
  if (kw.includes('calor') || kw.includes('quente') || kw.includes('temperatura') || kw.includes('verão') || kw.includes('sol') || kw.includes('graus')) {
    return 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=1600&auto=format&fit=crop&q=80'; // Sun radiating hot lens flare
  }
  
  // Specific Economy/Tariffs
  if (kw.includes('conta') || kw.includes('bandeira') || kw.includes('tarifa') || kw.includes('luz') || kw.includes('aumento') || kw.includes('inflação') || kw.includes('selic') || kw.includes('custo') || kw.includes('preço') || kw.includes('gastos')) {
    return 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&auto=format&fit=crop&q=80'; // Clean solar energy roof grid
  }
  
  // Specific Tech / EV / BYD
  if (kw.includes('byd') || kw.includes('carro') || kw.includes('veículo') || kw.includes('elétrico') || kw.includes('recarga') || kw.includes('hybrid') || kw.includes('híbrido') || kw.includes('wemob')) {
    return 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&auto=format&fit=crop&q=80'; // Electric vehicle charging station
  }

  // Fallback by general category
  switch (category) {
    case 'weather':
      return 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=1600&auto=format&fit=crop&q=80'; // Power grids under dark clouds
    case 'economy':
      return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&auto=format&fit=crop&q=80'; // Industrial solar panel installations
    case 'tech':
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80'; // Connected tech server system
    case 'general':
    default:
      return 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1600&auto=format&fit=crop&q=80'; // Modern premium house illuminated by solar panels
  }
};
