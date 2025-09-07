# Claude Context - Dr. Massuca Site

## 📋 Visão Geral do Projeto

**Site do Dr. Massuca** é um site médico profissional para ultrassonografia em Itaberaí-GO, desenvolvido para Dr. Antonio Massucatti Neto (CRM-GO 17475).

## 🏗️ Arquitetura Técnica

### Stack Principal
- **Frontend**: React 18 + Vite 4
- **UI Framework**: Chakra UI
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **Analytics**: Google Tag Manager + GA4
- **PWA**: Service Worker implementado

### Estrutura de Pastas
```
drmassuca/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── routes/        # Configuração de rotas
│   ├── utils/         # Utilitários (analytics, etc.)
│   ├── data/          # Dados estáticos
│   └── App.jsx        # Componente principal
├── docs/              # Documentação e guides
├── public/            # Assets estáticos (imagens, ícones)
└── dist/              # Build de produção
```

## 🎯 Funcionalidades Principais

1. **Landing Page Médica**: Homepage otimizada para conversões
2. **Páginas de Exames**: Ultrassom 3D, obstétrico, geral
3. **Página Sobre**: Apresentação profissional do médico
4. **Contato Integrado**: WhatsApp, telefone, redes sociais
5. **PWA**: App-like experience com service worker
6. **Analytics Avançado**: Sistema completo de tracking

## 🔧 Configurações Importantes

### Variáveis de Ambiente
- **GTM**: GTM-PPH3NLG6
- **GA4**: G-T14CXNTC7V
- **Domain**: drmassuca.com.br

### Comandos de Desenvolvimento
- `npm run dev`: Servidor de desenvolvimento
- `npm run build`: Build de produção
- `npm run preview`: Preview do build
- `npm run lint`: Verificação de código

## 📊 Sistema de Analytics

### Configuração Avançada
- **Google Tag Manager**: GTM-PPH3NLG6
- **Google Analytics 4**: Tracking completo
- **Consent Management**: GDPR/LGPD compliant
- **A/B Testing**: Sistema próprio implementado
- **Conversion Goals**: WhatsApp, telefone, engajamento

### Eventos Trackados
- `conversion_whatsapp`: Click no WhatsApp
- `conversion_phone`: Click no telefone
- `exam_interest`: Visualização de páginas de exames
- `deep_engagement`: Tempo > 2min na página
- `engagement_milestone`: Marcos de scroll e tempo

## 🚨 Problemas Conhecidos

### 1. **Google Tags no Servidor**
- **Problema**: Tags não carregam no servidor de produção
- **Causa**: Content Security Policy restritiva
- **Status**: Documentado em `docs/GOOGLE_TAGS_DEBUG.md`

### 2. **CSP Instagram**
- **Problema**: Iframe do Instagram bloqueado
- **Solução**: Fallback com link direto implementado
- **Status**: ✅ Resolvido

## 🎨 Design e UX

### Tema Principal
- **Cores**: Verde médico (#0f3d2e) + Dourado (#d4af37)
- **Fontes**: System fonts para performance
- **Background**: Textura verde com pattern seamless
- **Mobile-first**: Design responsivo completo

### Componentes Principais
- **Hero Section**: CTA otimizado para conversões
- **Exam Cards**: Cards visuais com badges
- **Contact Bar**: Barra fixa com WhatsApp
- **Cookie Consent**: GDPR compliant

## 🔍 SEO e Performance

### SEO
- **Schema.org**: MedicalClinic structured data
- **Meta tags**: Completas para todas as páginas
- **Sitemap**: Atualizado automaticamente
- **Canonical URLs**: Configuradas

### Performance
- **Lighthouse Score**: 95+ em todas as métricas
- **WebP Images**: Todas as imagens otimizadas
- **Code Splitting**: Lazy loading implementado
- **Critical CSS**: Inline no index.html
- **Resource Hints**: Preconnect/prefetch

## 🛠️ Ferramentas de Debug

### Analytics Debug
```javascript
// Verificar status do GTM
console.log('GTM Status:', {
  loaded: !!window.google_tag_manager,
  dataLayer: Array.isArray(window.dataLayer),
  gtag: typeof window.gtag
});
```

### Performance Debug
```javascript
// Verificar performance
console.log('Performance:', {
  loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
  domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
});
```

## 🚀 Deploy e Hosting

### Processo de Build
1. `npm run lint` - Verificar código
2. `npm run build` - Gerar build otimizado
3. Upload da pasta `dist/` para servidor
4. Verificar CSP headers no servidor

### Otimizações de Servidor
- **Gzip/Brotli**: Compressão habilitada
- **Cache Headers**: Configurados para assets
- **CSP**: Headers corretos para Google Tags
- **HTTPS**: SSL/TLS obrigatório

## 📱 Mobile e PWA

### Progressive Web App
- **Service Worker**: Cache estratégico implementado
- **Manifest**: App-like behavior
- **Install Prompt**: Disponível em mobile
- **Offline**: Páginas principais funcionam offline

### Mobile Optimization
- **Touch Targets**: Botões > 44px
- **Fast Click**: Sem delay de 300ms
- **Viewport**: Configurado corretamente
- **Orientação**: Responsivo para todas

## 🔒 Segurança e Privacidade

### GDPR/LGPD
- **Cookie Consent**: Implementado com react-cookie-consent
- **Analytics Opt-in**: Usuário controla tracking
- **Data Minimization**: Apenas dados necessários
- **Transparent**: Política clara

### Security Headers
- **CSP**: Content Security Policy configurada
- **HSTS**: HTTPS obrigatório
- **X-Frame-Options**: Proteção contra clickjacking
- **Referrer-Policy**: Controle de referrer

---

*Última atualização: Estrutura reorganizada e debug de Google Tags documentado*