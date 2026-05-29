import React, { useState } from 'react';
import { Server, Globe, Calendar, Key, Copy, Check, FileCode, ArrowRight } from 'lucide-react';

export default function Integration() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const githubActionsYaml = `# .github/workflows/netlify-scheduler.yml
name: Trigger Netlify Rebuild (Google Trends)
on:
  schedule:
    # Executa a cada 30 minutos
    - cron: '*/30 * * * *'
  workflow_dispatch: # Permite disparar manualmente

jobs:
  trigger-build:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Build Hook
        run: |
          curl -X POST -d {} https://api.netlify.com/build_hooks/SEU_BUILD_HOOK_ID_AQUI
`;

  const netlifyFunctionCron = `// netlify/functions/scheduled-rebuild.js
const fetch = require('node-fetch');

// Exemplo usando Netlify Scheduled Functions (Cron nativo)
// Nota: Requer configuração no netlify.toml
exports.handler = async function(event, context) {
  console.log("Iniciando verificação de tendências...");
  // Opcional: Acione o Build Hook da própria página
  const response = await fetch('https://api.netlify.com/build_hooks/SEU_BUILD_HOOK_ID', {
    method: 'POST'
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Build hook triggered successfully" })
  };
};
`;

  return (
    <div className="viewport-panel animate-fade">
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Server style={{ color: '#005c8a' }} />
          Manual de Integração Netlify
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
          Este projeto foi planejado para rodar sob o domínio <strong style={{ color: 'var(--text-primary)' }}>geradoresenergiawgl.com.br</strong> na infraestrutura global da Netlify. Abaixo estão as etapas técnicas para produção.
        </p>

        {/* Step 1: DNS & Domain */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border-light)', paddingBottom: '25px' }}>
          <div style={{
            background: 'rgba(0, 92, 138, 0.1)',
            border: '1px solid rgba(0, 92, 138, 0.2)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Globe style={{ color: '#005c8a' }} size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              1. Configuração do Domínio (geradoresenergiawgl.com.br)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5, marginBottom: '10px' }}>
              Na aba de configurações do seu site no painel da Netlify, acesse <strong>Domain Management &gt; Custom Domains</strong> e adicione o domínio.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
              <span style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Configure os servidores DNS do Registro.br apontando para a Netlify:</span>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>dns1.p01.nsone.net</li>
                <li>dns2.p01.nsone.net</li>
                <li>dns3.p01.nsone.net</li>
                <li>dns4.p01.nsone.net</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 2: Serverless Setup */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border-light)', paddingBottom: '25px' }}>
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <FileCode style={{ color: '#8b5cf6' }} size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              2. Funções Serverless de Tendências
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
              O Netlify implanta automaticamente as funções localizadas na pasta <code>netlify/functions</code>. No nosso projeto, o arquivo <code>fetch-trends.js</code> atua como uma API serverless em <code>/api/fetch-trends</code>, ignorando problemas de CORS e ocultando requisições do navegador direto ao Google.
            </p>
          </div>
        </div>

        {/* Step 3: Scheduled rebuilds */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{
            background: 'rgba(255, 122, 0, 0.1)',
            border: '1px solid rgba(255, 122, 0, 0.2)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Calendar style={{ color: '#ff7a00' }} size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              3. Atualização a Cada 30 Minutos (Cron)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5, marginBottom: '15px' }}>
              Como a landing page consome a API de tendências dinamicamente no lado do cliente (Client-side Rendering), ela se mantém atualizada <strong>em tempo real</strong> sem necessidade de rebuilds. 
              <br /><br />
              Porém, se você preferir a abordagem de <strong>Static Site Generation (reconstruir o arquivo HTML estático a cada 30 minutos para SEO ideal)</strong>, configure um Build Hook no painel Netlify (<code>Site Settings &gt; Build &amp; Deploy &gt; Build hooks</code>) e use uma das duas opções abaixo:
            </p>

            {/* Sub-Option A: Github Actions */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#f3f4f6' }}>Opção A: Agendador via GitHub Actions (Recomendado para Estáticos)</span>
                <button 
                  onClick={() => copyToClipboard(githubActionsYaml, 'github')}
                  style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                >
                  {copied === 'github' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  {copied === 'github' ? 'Copiado!' : 'Copiar YAML'}
                </button>
              </div>
              <pre style={{
                background: '#04060a',
                border: '1px solid #1e293b',
                padding: '12px',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '11px',
                fontFamily: 'monospace',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {githubActionsYaml}
              </pre>
            </div>

            {/* Sub-Option B: Netlify Native scheduled function */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#f3f4f6' }}>Opção B: Netlify Scheduled Functions (Cron Nativo)</span>
                <button 
                  onClick={() => copyToClipboard(netlifyFunctionCron, 'cron')}
                  style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                >
                  {copied === 'cron' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  {copied === 'cron' ? 'Copiado!' : 'Copiar JS'}
                </button>
              </div>
              <pre style={{
                background: '#04060a',
                border: '1px solid #1e293b',
                padding: '12px',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '11px',
                fontFamily: 'monospace',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {netlifyFunctionCron}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
