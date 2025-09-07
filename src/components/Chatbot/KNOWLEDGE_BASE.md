# 📚 Base de Conhecimento - Chatbot Dr. Massuca

## 📊 Status Atual
- **Total de categorias**: 15
- **Total de perguntas mapeadas**: 48
- **Última atualização**: 15/08/2025

## 🗂️ Categorias Implementadas

### 1. AGENDAMENTO E CONTATO (5 perguntas)
- Como agendar exame
- Horários de atendimento
- Necessidade de pedido médico
- Convênios
- Reagendamento/cancelamento

### 2. RESULTADOS E LAUDOS (3 perguntas)
- Tempo para resultado
- Formato do laudo (impresso/digital)
- Envio de imagens/vídeos

### 3. PAGAMENTO (3 perguntas)
- Formas de pagamento
- Parcelamento
- Nota fiscal/recibo

### 4. LOCALIZAÇÃO E ACESSO (3 perguntas)
- Endereço e estacionamento
- Acessibilidade
- Acompanhantes

### 5. SEGURANÇA DO ULTRASSOM (2 perguntas)
- Radiação e segurança
- Ultrassom recreativo

### 6. TIPOS DE ULTRASSOM (2 perguntas)
- Diferença 2D/3D/4D
- O que é Doppler

### 7. PREPAROS PARA EXAMES (7 perguntas)
- Abdome total
- Rins/trato urinário
- Pelve feminina
- Obstétrico inicial
- Vasos e Doppler
- Tireoide/partes moles/mamas
- Instruções gerais

### 8. OBSTETRÍCIA E GESTAÇÃO (7 perguntas)
- Primeira ultrassonografia
- Translucência nucal
- Morfológico 2º trimestre
- Sexo do bebê
- Melhor época para 3D/4D
- Quantidade de exames na gestação
- Segurança para o bebê

### 9. TIPOS DE EXAMES ESPECÍFICOS (7 perguntas)
- Abdome total
- Rins e vias urinárias
- Pélvico feminino
- Mamas
- Tireoide
- Carótidas/vasos
- Partes moles

### 10. CONFORTO E PROCEDIMENTO (4 perguntas)
- Gel (temperatura e manchas)
- Dor/anestesia
- Duração do exame
- Problemas com imagem

### 11. SITUAÇÕES ESPECIAIS (3 perguntas)
- Diabéticos e jejum
- Gestante com urgência
- Medicação contínua

### 12. POLÍTICAS DA CLÍNICA (3 perguntas)
- Atrasos
- Privacidade/dados
- Crianças acompanhando

## 📝 Como Adicionar Novas Perguntas

### Formato para nova categoria:
```javascript
nomeDaCategoria: {
  patterns: ['palavra-chave1', 'palavra-chave2'],
  response: 'Resposta completa aqui',
},
```

### Formato para múltiplas respostas:
```javascript
nomeDaCategoria: {
  patterns: ['palavra-chave1', 'palavra-chave2'],
  responses: [
    'Resposta variação 1',
    'Resposta variação 2',
    'Resposta variação 3',
  ],
},
```

## 🔄 Histórico de Atualizações

### 15/08/2025 - v1.0
- Implementação inicial com 48 perguntas
- Organização em 12 categorias principais
- Respostas baseadas em evidências científicas

## 💡 Sugestões para Próximas Adições

1. **COVID-19 e protocolos**
2. **Telemedicina/laudos online**
3. **Exames específicos para homens**
4. **Preparos especiais para idosos**
5. **Informações sobre equipe médica**
6. **Certificações e credenciais**
7. **Histórico de exames anteriores**
8. **Segunda opinião médica**

## 📊 Métricas de Uso (para implementar)

- Perguntas mais frequentes
- Taxa de redirecionamento para WhatsApp
- Horários de maior uso
- Satisfação do usuário

## 🔗 Referências Científicas Citadas

- AIUM (American Institute of Ultrasound in Medicine)
- FDA (U.S. Food and Drug Administration)
- Mayo Clinic
- Johns Hopkins Medicine
- ISUOG (International Society of Ultrasound)
- Cleveland Clinic
- Cedars-Sinai
- NCBI (National Center for Biotechnology Information)

## 📞 Contato para Manutenção

Para adicionar ou modificar perguntas, edite o arquivo:
`src/components/Chatbot/ChatbotSimple.jsx`

Sempre atualize este documento após mudanças!