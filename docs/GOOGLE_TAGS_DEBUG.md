# 🔧 DEBUG: Google Tags - Dr. Massuca

## 🚨 Problemas Identificados

### 1. **Content Security Policy (CSP) Restritiva**
**Sintoma:** Tags não carregam no servidor, mas funcionam local
**Causa:** Servidor bloqueia scripts externos

### 2. **HTTPS Mixed Content**  
**Sintoma:** Warnings no console sobre HTTP em página HTTPS
**Causa:** Recursos carregando via HTTP instead de HTTPS

### 3. **GTM/GA4 Blocked by Firewall**
**Sintoma:** Requests para googletagmanager.com falham
**Causa:** Firewall ou proxy bloqueando Google

### 4. **Consent Management Issues**
**Sintoma:** Analytics não ativa mesmo após aceitar cookies
**Causa:** Timing ou lógica do consent

## 🛠️ Soluções Implementadas

### **✅ SOLUÇÃO 1: CSP Headers Corretos**

**Para Apache (.htaccess):**
```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://google-analytics.com https://www.google-analytics.com https://ssl.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.instagram.com;"
```

**Para Nginx:**
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://google-analytics.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com;";
```

### **✅ SOLUÇÃO 2: Debug Console Implementado**

**Adicionar ao navegador para debug:**
```javascript
// Verificar se GTM está carregando
console.log('GTM Loaded:', !!window.google_tag_manager);
console.log('DataLayer:', window.dataLayer);
console.log('GTM Container:', window.google_tag_manager?.['GTM-PPH3NLG6']);

// Verificar consent
console.log('Consent granted:', window.gtag?.('get', 'G-T14CXNTC7V', 'analytics_storage'));

// Testar envio manual
window.dataLayer?.push({
  event: 'test_event',
  test_parameter: 'working'
});
```

### **✅ SOLUÇÃO 3: Fallback para Analytics**

**No código (já implementado):**
```javascript
// Fallback se GTM falhar
if (!window.gtag && window.dataLayer) {
  // Implementa gtag básico
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
}
```

### **✅ SOLUÇÃO 4: Monitoring de Erros**

**Sistema de alerta implementado:**
```javascript
// Detecta se analytics está funcionando
setTimeout(() => {
  if (!window.google_tag_manager || !window.dataLayer) {
    console.warn('🚨 Google Tags não carregaram!');
    // Ativa modo fallback
    window.drMassucaAnalytics?.enableFallbackMode();
  }
}, 5000);
```

## 🔍 COMANDOS DE DEBUG

### **1. Verificar se GTM está ativo:**
```javascript
// No console do navegador
console.log('GTM Status:', {
  loaded: !!window.google_tag_manager,
  container: !!window.google_tag_manager?.['GTM-PPH3NLG6'],
  dataLayer: Array.isArray(window.dataLayer),
  gtag: typeof window.gtag
});
```

### **2. Testar consent:**
```javascript
// Verificar consent atual
window.gtag?.('get', 'G-T14CXNTC7V', 'analytics_storage', (value) => {
  console.log('Analytics Storage:', value);
});
```

### **3. Testar envio de evento:**
```javascript
// Enviar evento teste
window.dataLayer?.push({
  event: 'manual_test',
  test_value: Date.now()
});
```

### **4. Verificar network requests:**
```javascript
// Monitora requests para Google
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes('google')) {
      console.log('Google Request:', entry.name, entry.responseStatus);
    }
  });
});
observer.observe({entryTypes: ['resource']});
```

## 🎯 IMPLEMENTAÇÃO NO SERVIDOR

### **Arquivo de teste para servidor:**

Criar `debug-analytics.html` e subir para teste:
```html
<!DOCTYPE html>
<html>
<head>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T14CXNTC7V');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T14CXNTC7V"></script>
</head>
<body>
  <h1>Test Analytics</h1>
  <button onclick="testEvent()">Test Event</button>
  <script>
    function testEvent() {
      gtag('event', 'test_click', {
        event_category: 'debug',
        event_label: 'server_test'
      });
      console.log('Event sent');
    }
    
    // Log status
    console.log('GTM Test Page Loaded');
    setTimeout(() => {
      console.log('DataLayer:', window.dataLayer);
      console.log('GTAG:', typeof window.gtag);
    }, 2000);
  </script>
</body>
</html>
```

## 🚨 TROUBLESHOOTING ESPECÍFICO

### **Problema: GTM não carrega**
**Solução:**
1. Verificar firewall/proxy
2. Testar DNS lookup para googletagmanager.com
3. Verificar CSP headers
4. Testar com GTM direto (sem consent)

### **Problema: Eventos não chegam ao GA4**
**Solução:**
1. Verificar measurement_id correto
2. Testar com DebugView do GA4
3. Verificar consent granted
4. Usar GTM Preview mode

### **Problema: Dados aparece local mas não no servidor**
**Solução:**
1. Comparar headers HTTP vs HTTPS
2. Verificar configuração de domínio
3. Testar com diferentes browsers
4. Verificar logs do servidor

## ✅ STATUS ATUAL

- **✅ Código:** Implementado corretamente
- **✅ Consent:** GDPR compliant
- **✅ Fallbacks:** Sistema robusto
- **❓ Servidor:** Aguardando debug específico

---

**Para debug específico, execute no console e compartilhe o resultado:**

```javascript
// Debug completo
const debug = {
  gtm: !!window.google_tag_manager,
  dataLayer: Array.isArray(window.dataLayer) ? window.dataLayer.length : false,
  gtag: typeof window.gtag,
  domain: window.location.hostname,
  protocol: window.location.protocol,
  userAgent: navigator.userAgent.substring(0, 50)
};
console.table(debug);
```
