# 🔒 Resolução de Erros CSP (Content Security Policy) - Hostinger

## 🚨 Problema Identificado:

O servidor da Hostinger está bloqueando recursos do Google Analytics e Tag Manager devido às políticas de segurança de conteúdo (CSP) muito restritivas.

### Erros no console:
1. **Imagens bloqueadas** do Google Analytics
2. **Frames bloqueados** do Google Tag Manager  
3. **Scripts bloqueados** do DoubleClick/Google Ads
4. **PostMessage falhou** devido às restrições de origem

## ✅ Soluções Implementadas:

### **Solução 1: .htaccess Completo** (Recomendado)

Arquivo criado: `public/.htaccess`

Este arquivo:
- Remove CSP restritivas existentes
- Define novas políticas que permitem Google Analytics/Tag Manager
- Mantém segurança básica contra XSS e clickjacking
- Otimiza cache e compressão
- Configura redirecionamento para SPA

### **Solução 2: .htaccess Simplificado** (Alternativa)

Arquivo criado: `.htaccess-simple`

Versão mais permissiva se a primeira não funcionar:
- CSP totalmente aberto (temporário para testes)
- Configurações mínimas essenciais
- Mais fácil de debugar

## 📝 Como Implementar:

### **Passo 1: Build do projeto**
```bash
cd C:\dev\drmassuca
npm run build
```

### **Passo 2: Preparar arquivos para upload**

A pasta `dist` conterá:
```
dist/
├── .htaccess (será copiado do public/)
├── index.html
├── assets/
├── icons/
├── manifest.webmanifest
└── outros arquivos...
```

### **Passo 3: Upload para Hostinger**

1. Acesse o **Gerenciador de Arquivos** da Hostinger
2. Navegue até a pasta `public_html` ou raiz do domínio
3. Faça upload de TODO o conteúdo da pasta `dist`
4. **IMPORTANTE**: Certifique-se que o `.htaccess` foi enviado

### **Passo 4: Se ainda houver erros**

Se os erros persistirem, tente a versão simplificada:

1. Renomeie `.htaccess-simple` para `.htaccess`
2. Faça upload substituindo o anterior
3. Limpe o cache do navegador
4. Teste novamente

## 🔧 Configurações Alternativas:

### **Via Painel Hostinger (se .htaccess não funcionar):**

1. Acesse o **hPanel** da Hostinger
2. Procure por **"Configurações PHP"** ou **"PHP Configuration"**
3. Adicione estas diretivas no `php.ini` customizado:
```ini
; Desabilita CSP padrão
header_remove("Content-Security-Policy")
```

### **Via Meta Tags (última alternativa):**

Se nada funcionar, adicione no `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
```

## 🎯 Teste de Verificação:

### **Para confirmar que funcionou:**

1. Abra o site no Chrome
2. Abra o Console (F12)
3. Recarregue a página (Ctrl+F5)
4. Aceite os cookies
5. Verifique se os erros CSP sumiram

### **Verificar no Network:**

1. Aba Network do DevTools
2. Filtrar por "google"
3. Todos recursos devem estar com status 200 (verde)

## 🛡️ Considerações de Segurança:

### **CSP Recomendado (após resolver os erros):**

Uma vez funcionando, ajuste gradualmente o CSP para ser mais restritivo:

```apache
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.google-analytics.com https://*.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com;"
```

## 📊 Headers Corretos Esperados:

Após implementação, os headers devem incluir:
```
Content-Security-Policy: [política permissiva para Google]
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```

## 🆘 Suporte Hostinger:

Se nenhuma solução funcionar, contate o suporte da Hostinger:

**Mensagem sugerida:**
```
Olá, estou com problemas de Content Security Policy (CSP) bloqueando Google Analytics e Tag Manager no meu site. 

Os erros no console são:
- "Refused to load image... violates CSP directive"
- "Refused to frame... violates CSP directive"

Preciso permitir:
- *.google-analytics.com
- *.googletagmanager.com
- *.doubleclick.net

Como posso ajustar as políticas CSP no meu plano de hospedagem?
```

## ✅ Resultado Esperado:

- Sem erros CSP no console
- Google Analytics funcionando
- Tag Manager carregando corretamente
- Cookies funcionando após aceite
- Site mantendo segurança básica

---

**Importante:** Após resolver, considere implementar uma CSP mais restritiva gradualmente para manter a segurança do site.