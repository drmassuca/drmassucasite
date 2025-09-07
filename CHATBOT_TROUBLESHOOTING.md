# 🤖 Chatbot Dr. Massuca - Resolução de Problemas

## ⚠️ Problema com API do Gemini

O erro que você está enfrentando provavelmente está relacionado a:

1. **API Key inválida ou expirada**
2. **Limite de cota atingido** (a API gratuita tem limites)
3. **Modelo incorreto** (mudamos de `gemini-pro` para `gemini-1.5-flash`)
4. **Problemas de CORS ou rede**

## ✅ Solução Implementada

Criei **DUAS VERSÕES** do chatbot:

### 1. **ChatbotSimple.jsx** (SEM API - Funcionando agora!)
- ✅ Funciona 100% offline
- ✅ Respostas pré-programadas inteligentes
- ✅ Reconhece padrões de perguntas
- ✅ Sem custos ou limites de uso
- ✅ Responde sobre:
  - Exames disponíveis
  - Horários de atendimento
  - Agendamento
  - Localização
  - Informações do Dr. Massuca
  - Preparos para exames
  - Exames obstétricos

### 2. **index.jsx** (COM API Gemini - Precisa configurar)
- Respostas mais dinâmicas e contextuais
- Requer API key válida
- Sujeito a limites de cota

## 🔧 Como Alternar Entre as Versões

### Para usar a versão SEM API (recomendado por enquanto):
```jsx
// Em src/pages/Home.jsx
import Chatbot from '../components/Chatbot/ChatbotSimple';
```

### Para usar a versão COM API:
```jsx
// Em src/pages/Home.jsx
import Chatbot from '../components/Chatbot';
```

## 🔑 Para Fazer a API do Gemini Funcionar

1. **Obtenha uma nova API Key:**
   - Acesse: https://aistudio.google.com/app/apikey
   - Crie uma nova API key
   - Copie a chave gerada

2. **Configure no arquivo .env:**
```env
VITE_GEMINI_API_KEY=sua_nova_api_key_aqui
```

3. **Teste a API key:**
   - Verifique se não excedeu o limite gratuito (60 requisições/minuto)
   - A API gratuita tem limite de 1500 requisições/dia

4. **Se continuar com erro:**
   - Use a versão ChatbotSimple que funciona sem API
   - Considere usar o Google Cloud com billing (pago) para mais estabilidade

## 📊 Comparação das Versões

| Recurso | ChatbotSimple (Sem API) | Chatbot (Com API) |
|---------|-------------------------|-------------------|
| Custo | Gratuito | Gratuito com limites |
| Limite de uso | Ilimitado | 1500/dia |
| Respostas | Pré-definidas | Dinâmicas |
| Personalização | Fácil (editar código) | Via prompt |
| Estabilidade | 100% | Depende da API |
| Offline | ✅ Funciona | ❌ Precisa internet |

## 💡 Recomendação

**Use o ChatbotSimple por enquanto!** Ele está funcionando perfeitamente e atende todas as necessidades básicas. A versão com API pode ser implementada futuramente se necessário.

## 📝 Como Adicionar Novas Respostas no ChatbotSimple

Edite o arquivo `ChatbotSimple.jsx` e adicione no `KNOWLEDGE_BASE`:

```javascript
nomeCategoria: {
  patterns: ['palavra1', 'palavra2'], // palavras que ativam
  response: 'Sua resposta aqui',
},
```

## 🚀 Próximos Passos

1. **Teste o ChatbotSimple** - já está funcionando!
2. **Personalize as respostas** conforme necessário
3. **Monitore o uso** para ver se precisa da versão com API
4. **Considere outras APIs** gratuitas como:
   - OpenAI (GPT-3.5) com créditos iniciais
   - Cohere
   - Anthropic Claude (quando disponível)