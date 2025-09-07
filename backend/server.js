const express = require('express')
const cors = require('cors')
const Anthropic = require('@anthropic-ai/sdk')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Configuração do Claude
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
})

// Middlewares
app.use(cors())
app.use(express.json())

// Endpoint para o chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body

    console.log('📨 Recebendo mensagem:', messages[messages.length - 1])
    
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages
    })

    console.log('✅ Resposta do Claude obtida')
    
    res.json({
      success: true,
      response: response.content[0].text
    })

  } catch (error) {
    console.error('❌ Erro na API do Claude:', error)
    
    let errorMessage = 'Erro interno do servidor'
    let statusCode = 500

    if (error.status === 401) {
      errorMessage = 'Chave da API inválida'
      statusCode = 401
    } else if (error.status === 429) {
      errorMessage = 'Limite de uso atingido'
      statusCode = 429
    } else if (error.status === 400) {
      errorMessage = 'Requisição inválida'
      statusCode = 400
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: error.message
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend do chatbot funcionando!',
    hasApiKey: !!process.env.CLAUDE_API_KEY
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`)
  console.log(`🔑 API Key configurada: ${process.env.CLAUDE_API_KEY ? 'SIM' : 'NÃO'}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`)
})