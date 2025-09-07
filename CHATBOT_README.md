# Chatbot Dr. Massuca - Instruções de Instalação

## 📦 Instalação das Dependências

Para o chatbot funcionar, você precisa instalar a biblioteca do Google Generative AI. Execute:

```bash
npm install @google/generative-ai
```

ou

```bash
npm install
```

## 🔑 Configuração da API Key

1. A API key já está configurada no arquivo `.env`
2. Se precisar trocar, edite o arquivo `.env` e substitua o valor de `VITE_GEMINI_API_KEY`
3. **IMPORTANTE**: Nunca commite o arquivo `.env` no git!

## 🚀 Como Executar

```bash
npm run dev
```

## 📱 Funcionalidades do Chatbot

- **Posição**: Canto inferior direito, flutuante
- **Ícone**: Logo do Dr. Massuca
- **Cores**: Verde escuro (#0f3d2e) e dourado (#d4af37)
- **Integração**: Google Gemini AI
- **Auto-redirect**: Na 5ª interação, sugere WhatsApp

## 🎨 Características Visuais

- Janela de chat tamanho médio (400px largura)
- Mensagens do bot: Fundo branco com texto escuro
- Mensagens do usuário: Fundo verde escuro com texto branco
- Botão de envio dourado
- Link direto para WhatsApp no rodapé do chat

## ⚠️ Observações

- O chatbot NÃO fornece diagnósticos médicos
- NÃO informa valores de exames
- Direciona para WhatsApp após 5 interações
- Responde sobre exames, horários e informações gerais

## 📞 Contato para Agendamentos

WhatsApp: (62) 99660-2117