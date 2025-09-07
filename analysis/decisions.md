# 📋 Log de Decisões - Projeto Dr. Massuca Redesign

## Data: 16/08/2025

---

## 🎯 FASE 2 - Decisões sobre SEO e HEAD ✅

### 1. Manutenção da Estrutura SEO Existente
**Decisão**: Manter o componente SEO.jsx exatamente como está.
**Motivo**: Requisito explícito do cliente - "A FORMA ATUAL DA DISPOSIÇÃO DO SEO NO SITE NÃO PODE SER MUDADA"
**Impacto**: 
- Todas as novas páginas devem usar o componente existente
- Não modificar props ou estrutura interna
- Apenas documentar uso correto

### 2. Duplicação de SEO em Páginas FAQ
**Problema Identificado**: Algumas páginas FAQ importam SEO duas vezes (como `Seo` e `SEO`)
**Decisão**: Documentar o problema mas NÃO corrigir automaticamente
**Motivo**: Alterações podem quebrar páginas existentes
**Ação**: 
- Criar documentação clara sobre uso correto
- Nas versões A e B, usar apenas uma instância

### 3. Robots.txt e Sitemap.xml
**Decisão**: Criar ambos os arquivos estáticos + script para geração dinâmica
**Implementação**:
- `public/robots.txt` - criado com regras otimizadas
- `public/sitemap.xml` - criado com todas as URLs principais
- `scripts/generate-sitemap.js` - script Node.js para atualização futura
**Benefícios**:
- Melhora indexação no Google
- Controle sobre crawlers
- Facilita manutenção futura

### 4. Schema.org / Structured Data
**Decisão**: Manter implementação via prop `structuredData` do componente SEO
**Padrões recomendados**:
- MedicalBusiness para página principal
- MedicalTest para páginas de exames
- Question/Answer para FAQ
- ContactPage para contato
**Nota**: Não criar novo sistema, usar o existente

### 5. WhatsApp - Comportamento Especial
**Regra Confirmada**: 
- NUNCA inserir link do WhatsApp diretamente no texto do chatbot
- Sempre indicar que "o link está logo abaixo da caixa de mensagem"
- Link fixo já existe no componente apropriado
**Implementação**: Esta regra será mantida em ambas as versões A e B

---

## 🎨 FASE 3 - Design System ✅ CONCLUÍDA

### Decisões Implementadas:

#### 1. **Tema A - Elegante Clássico** ✅
- **Paleta**: Verde médico escuro (#0f3d2e) + Dourado elegante (#d4af37)
- **Tipografia**: Playfair Display (serif) para títulos, Inter para corpo
- **Animações**: Suaves, sublinhado animado em links, transições elegantes
- **Cards**: Bordas finas, sombras sutis
- **Botões**: Cantos arredondados médios, hover com elevação

#### 2. **Tema B - Moderno Vibrante Indígena** ✅
- **Paleta**: 
  - Terracota/Urucum (#e85d2c) 
  - Turquesa (#00c4c7) 
  - Amarelo Sol (#f59e0b)
  - Roxo Açaí e Verde Floresta como cores adicionais
- **Tipografia**: Poppins (sans moderna) para títulos, DM Sans para corpo
- **Animações**: Ricas com gradientes animados, neumorfismo, glassmorphism
- **Cards**: Cantos muito arredondados (2xl), múltiplas variantes (neo, glass, gradient)
- **Botões**: Pills totalmente redondos, efeitos de shimmer, gradientes

### Estrutura de Temas ✅ IMPLEMENTADA
```
src/
  theme/
    base.js        # Configurações compartilhadas ✅
    themeA.js      # Tema Elegante Clássico ✅
    themeB.js      # Tema Moderno Vibrante ✅
  components/
    ui/
      Section.jsx      # Container responsivo ✅
      PageHeader.jsx   # Cabeçalho com breadcrumb ✅
      Card.jsx        # Card com variantes A/B ✅
      Prose.jsx       # Wrapper para conteúdo markdown ✅
      index.js        # Exportação centralizada ✅
```

### Componentes UI Implementados ✅
- **`<Section>`** ✅ - Container responsivo com props de espaçamento
- **`<PageHeader>`** ✅ - Cabeçalho com breadcrumb, variantes (hero, gradient, dark) e animações Framer Motion
- **`<Card>`** ✅ - Card inteligente que detecta o tema e aplica estilos apropriados
  - Tema A: default, elevated, outline, filled
  - Tema B: default, neo, glass, gradient
- **`<Prose>`** ✅ - Wrapper para markdown com estilos de tipografia apropriados para cada tema

### Recursos Especiais Implementados
- **Dark Mode**: Suporte completo com `useSystemColorMode`
- **Animações**: Framer Motion integrado para animações ricas
- **Gradientes**: Texto com gradiente no Tema B
- **Neumorfismo**: Sombras duplas no Tema B variante neo
- **Glassmorphism**: Efeito de vidro com blur no Tema B
- **Scrollbar Customizada**: Estilizada diferentemente em cada tema

---

## 📊 Métricas de Sucesso

### SEO
- [x] Sitemap.xml criado
- [x] Robots.txt otimizado
- [x] Documentação de SEO completa
- [ ] Zero duplicações de meta tags (pendente correção manual)

### Performance (Meta)
- LCP < 2.5s (permitido cair conforme cliente)
- CLS ~0 (manter estável)
- FID < 100ms
- TTI < 5s

### Acessibilidade
- WCAG AA em contraste
- Navegação por teclado
- ARIA labels apropriados
- Skip links

---

## 🚨 Riscos e Mitigações

### Risco 1: Quebrar SEO existente
**Mitigação**: Não modificar componente SEO, apenas documentar

### Risco 2: Performance com animações ricas
**Mitigação**: 
- Usar CSS transforms (GPU accelerated)
- Lazy loading agressivo
- Code splitting por rota

### Risco 3: Compatibilidade mobile
**Mitigação**:
- Mobile-first design
- Touch targets mínimos de 44x44px
- Testar em dispositivos reais

---

## 📝 Notas Adicionais

1. **Imagens**: Preferir WebP com fallback para JPG
2. **Fontes**: Usar font-display: swap para evitar FOIT
3. **Icons**: Manter react-icons para consistência
4. **Analytics**: Manter GA4 configurado
5. **Cookies**: Banner já implementado, manter
6. **Framer Motion**: Necessário instalar para animações (`npm install framer-motion`)

---

## ✅ Checklist Fase 2 Completa

- [x] Análise do componente SEO existente
- [x] Identificação de duplicações
- [x] Criação de robots.txt
- [x] Criação de sitemap.xml
- [x] Script de geração dinâmica de sitemap
- [x] Documentação de uso do SEO
- [x] Log de decisões técnicas

---

## ✅ Checklist Fase 3 Completa

- [x] Criação do tema base compartilhado
- [x] Implementação do Tema A - Elegante Clássico
- [x] Implementação do Tema B - Moderno Vibrante
- [x] Componentes UI reutilizáveis
- [x] Suporte a Dark Mode
- [x] Animações com Framer Motion
- [x] Variantes específicas por tema

---

**✅ FASE 3 CONCLUÍDA**: Design System com temas A e B implementados

**Próximo passo**: Iniciar FASE 4 - Implementação da Versão A completa