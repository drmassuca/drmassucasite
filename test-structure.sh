#!/bin/bash

echo "🔧 TESTE DE IMPORTAÇÕES - MIGRAÇÃO CLAUDE"
echo "========================================"

echo ""
echo "📂 Verificando estrutura de arquivos..."
echo ""

# Verificar se os arquivos existem
if [ -f "src/components/Chatbot/ChatbotClaude.jsx" ]; then
    echo "✅ ChatbotClaude.jsx existe"
else
    echo "❌ ChatbotClaude.jsx não encontrado"
fi

if [ -f "src/components/Chatbot/index.jsx" ]; then
    echo "✅ index.jsx existe"
else
    echo "❌ index.jsx não encontrado"
fi

if [ -f "backend/server.js" ]; then
    echo "✅ Backend server.js existe"
else
    echo "❌ Backend server.js não encontrado"
fi

if [ -f "backend/.env" ]; then
    echo "✅ Backend .env existe"
else
    echo "❌ Backend .env não encontrado"
fi

echo ""
echo "🎯 STATUS: Estrutura de arquivos verificada"
echo "🚀 Execute: npm run dev (após instalar dependências)"
echo ""