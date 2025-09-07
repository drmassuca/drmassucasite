#!/bin/bash

# Script para baixar imagens de IA Médica
# Execute este script na pasta raiz do projeto: bash scripts/download-ia-images.sh

echo "🏥 Baixando imagens para IA Médica..."

# Criar diretório se não existir
mkdir -p public/images/ia-medica

# URLs de imagens gratuitas relacionadas (substitua pelas URLs reais)
declare -A images=(
    ["hospital-inteligente.jpg"]="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=400&fit=crop"
    ["voa-health.jpg"]="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop"
    ["chestfinder.jpg"]="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop"
    ["cereia.jpg"]="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop"
    ["rebec.jpg"]="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=400&fit=crop"
    ["cfm-debate.jpg"]="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop"
    ["brics-saude.jpg"]="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop"
    ["camara-debate.jpg"]="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=400&fit=crop"
)

# Baixar cada imagem
for filename in "${!images[@]}"; do
    url="${images[$filename]}"
    echo "📥 Baixando: $filename"
    
    if command -v curl >/dev/null 2>&1; then
        curl -L "$url" -o "public/images/ia-medica/$filename"
    elif command -v wget >/dev/null 2>&1; then
        wget "$url" -O "public/images/ia-medica/$filename"
    else
        echo "❌ Erro: curl ou wget não encontrado. Instale um deles para baixar as imagens."
        exit 1
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ $filename baixado com sucesso"
    else
        echo "❌ Erro ao baixar $filename"
    fi
done

echo ""
echo "🎉 Download das imagens concluído!"
echo "📁 Imagens salvas em: public/images/ia-medica/"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Verifique se as imagens estão adequadas ao contexto"
echo "   - Substitua por imagens próprias se necessário"
echo "   - Otimize as imagens para web se estiverem muito grandes"