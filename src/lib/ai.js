/**
 * Serviço de IA para geração de conteúdo usando Google Gemini
 * VERSÃO SIMPLIFICADA - SEM JSON
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const GEMINI_MODEL = 'gemini-2.5-flash';

export const isAIConfigured = () => !!API_KEY && !!genAI;

// ============================================
// FUNÇÃO DE LIMPEZA DE FORMATAÇÃO
// ============================================

export function cleanupFormatting(text) {
  if (!text) return text;

  let cleaned = text;

  // 1. Corrige palavras emendadas após pontuação
  cleaned = cleaned.replace(/([a-záàâãéèêíïóôõöúçñ])\.([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1. $2');
  cleaned = cleaned.replace(/([a-záàâãéèêíïóôõöúçñ]),([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1, $2');
  cleaned = cleaned.replace(/([a-záàâãéèêíïóôõöúçñ])\?([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1? $2');
  cleaned = cleaned.replace(/([a-záàâãéèêíïóôõöúçñ])!([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1! $2');
  cleaned = cleaned.replace(/([a-záàâãéèêíïóôõöúçñ]):([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1: $2');
  cleaned = cleaned.replace(/([a-záàâãéèêíïóôõöúçñ]);([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1; $2');

  // 2. Corrige palavras emendadas (minúscula grudada em maiúscula no meio)
  cleaned = cleaned.replace(
    /([a-záàâãéèêíïóôõöúçñ]{3,})([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][a-záàâãéèêíïóôõöúçñ]{2,})/g,
    (match, p1, p2) => {
      const exceptions = ['YouTube', 'LinkedIn', 'JavaScript', 'TypeScript', 'GitHub', 'McDonald'];
      if (exceptions.some(e => match.includes(e))) return match;
      return `${p1}. ${p2}`;
    }
  );

  // 3. Corrige números emendados: "2025Texto" -> "2025. Texto"
  cleaned = cleaned.replace(/(\d{4})([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][a-záàâãéèêíïóôõöúçñ])/g, '$1. $2');

  // 4. Corrige letra+número: "Em28" -> "Em 28"
  cleaned = cleaned.replace(/([A-Za-záàâãéèêíïóôõöúçñ])(\d)/g, '$1 $2');

  // 5. Corrige colchetes/parênteses emendados
  cleaned = cleaned.replace(/(\])([A-Za-záàâãéèêíïóôõöúçñ])/g, '$1 $2');
  cleaned = cleaned.replace(/(\))([A-Za-záàâãéèêíïóôõöúçñ])/g, '$1 $2');

  // 6. Corrige aspas emendadas
  cleaned = cleaned.replace(/([""])([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '$1 $2');

  // 7. Corrige pontuação emendada com maiúscula
  cleaned = cleaned.replace(/\?([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '? $1');

  return cleaned;
}

// ============================================
// PÓS-PROCESSAMENTO: GARANTE ESTRUTURA HTML
// ============================================

function ensureArticleStructure(content) {
  if (!content) return content;

  let html = content;

  // 1. Remove parágrafos vazios
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p><\/p>/g, '');

  // 2. Garante que começa com article-lead-box
  if (!html.includes('class="article-lead-box"')) {
    const firstPMatch = html.match(/^[\s\n]*<p>([\s\S]*?)<\/p>/);
    if (firstPMatch) {
      html = html.replace(
        firstPMatch[0],
        `<div class="article-lead-box">\n<p>${firstPMatch[1]}</p>\n</div>`
      );
    }
  }

  // 3. Garante que termina com call-to-action
  if (!html.includes('class="call-to-action"')) {
    const lastParagraphs = html.match(
      /<p>[^<]*(?:você|colega|médico|comentar|comentários)[^<]*<\/p>\s*$/i
    );
    if (lastParagraphs) {
      html = html.replace(
        lastParagraphs[0],
        `<div class="call-to-action">\n<h3>E você, colega?</h3>\n${lastParagraphs[0]}\n</div>`
      );
    } else {
      html += `\n\n<div class="call-to-action">\n<h3>E você, colega?</h3>\n<p>O que você pensa sobre isso? Compartilhe sua experiência nos comentários.</p>\n</div>`;
    }
  }

  // 4. Converte tabelas soltas para dentro de highlight-box
  const tableRegex = /<table[\s\S]*?<\/table>/g;
  let match;
  let lastIndex = 0;
  let newHtml = '';

  while ((match = tableRegex.exec(html)) !== null) {
    const beforeTable = html.substring(lastIndex, match.index);
    const table = match[0];

    // Verifica se já está dentro de highlight-box
    const lastHighlightOpen = beforeTable.lastIndexOf('<div class="highlight-box">');
    const lastHighlightClose = beforeTable.lastIndexOf('</div>');

    if (lastHighlightOpen > lastHighlightClose) {
      // Já está dentro de highlight-box
      newHtml += beforeTable + table;
    } else {
      // Envolve a tabela em highlight-box
      newHtml +=
        beforeTable + `<div class="highlight-box">\n<h3>DADOS COMPARATIVOS</h3>\n${table}\n</div>`;
    }

    lastIndex = match.index + table.length;
  }
  newHtml += html.substring(lastIndex);
  html = newHtml || html;

  // 5. Garante que <h2> não está dentro de <p>
  html = html.replace(/<p>\s*<h2>/g, '<h2>');
  html = html.replace(/<\/h2>\s*<\/p>/g, '</h2>');

  // 6. Remove classes do TipTap que não usamos
  html = html.replace(/ class="editor-[^"]*"/g, '');
  html = html.replace(/ style="min-width:[^"]*"/g, '');
  html = html.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, '');
  html = html.replace(/ colspan="1" rowspan="1"/g, '');

  // 7. Limpa espaços extras
  html = html.replace(/\n{3,}/g, '\n\n');

  return html.trim();
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export const generateTitles = async (content, topic = '') => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Gere 5 títulos para um artigo médico sobre IA.
${topic ? `Tema: ${topic}` : ''}
${content ? `Conteúdo: ${content.slice(0, 2000)}` : ''}

Títulos: 50-70 caracteres, atraentes, claros.
Retorne apenas os 5 títulos, um por linha.`;

  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split('\n')
    .filter(line => line.trim())
    .slice(0, 5);
};

export const generateExcerpt = async (content, title = '') => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Gere um resumo de 2-3 frases (máximo 160 caracteres) para SEO.
${title ? `Título: ${title}` : ''}
Conteúdo: ${content.slice(0, 2000)}

Retorne apenas o resumo.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

export const generateTags = async (content, title = '') => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Gere 5-8 tags para este artigo médico.
${title ? `Título: ${title}` : ''}
Conteúdo: ${content.slice(0, 1500)}

Retorne as tags separadas por vírgula.`;

  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split(',')
    .map(t => t.trim())
    .filter(t => t && t.length < 30);
};

export const improveText = async (text, instruction = 'melhorar') => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Reescreva o texto: ${instruction}

Texto: ${text}

Retorne apenas o texto reescrito.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

export const generateDraft = async (topic, keywords = []) => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Crie um rascunho de artigo sobre: ${topic}
${keywords.length > 0 ? `Palavras-chave: ${keywords.join(', ')}` : ''}

800-1200 palavras, linguagem acessível, use ## para subtítulos.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

// Helper para gerar slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

// ============================================
// GERAÇÃO DE ARTIGO COMPLETO - VERSÃO OTIMIZADA
// ============================================

export const generateFullArticle = async (context, options = {}) => {
  if (!genAI) throw new Error('API do Gemini não configurada');

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      maxOutputTokens: 16384,
      temperature: 0.7,
    },
  });

  const { style = 'informativo', length = 'médio' } = options;

  const lengthGuide = {
    curto: '800-1000 palavras',
    médio: '1200-1800 palavras',
    longo: '2000-2800 palavras',
  };

  const styleGuide = {
    informativo: { template: 'classic', tone: 'profissional e acessível' },
    didático: { template: 'classic', tone: 'educativo e claro' },
    científico: { template: 'scientific', tone: 'técnico e baseado em evidências' },
    notícia: { template: 'news', tone: 'jornalístico e crítico' },
    investigativo: { template: 'news', tone: 'questionador e irônico' },
    conversacional: { template: 'classic', tone: 'informal e próximo' },
  };

  const currentStyle = styleGuide[style] || styleGuide.informativo;

  // PROMPT DETALHADO COM ESTRUTURA HTML ESPECÍFICA
  const prompt = `Você é o Dr. Massuca, médico que escreve sobre IA na Medicina. Estilo direto, crítico, opiniões fortes.

CONTEXTO: ${context}
TOM: ${currentStyle.tone}
TAMANHO: ${lengthGuide[length]}

RESPONDA EXATAMENTE NESTE FORMATO:

===TÍTULO===
[Título impactante, 50-70 caracteres]

===SUBTÍTULO===
[Subtítulo complementar, 60-100 caracteres]

===SLUG===
[url-amigavel-sem-acentos]

===EXCERPT===
[Resumo para cards, 120-160 caracteres]

===META_TITLE===
[Título SEO | Dr. Massuca, max 60 chars]

===META_DESCRIPTION===
[Descrição SEO, 150-160 caracteres]

===TAGS===
[tag1, tag2, tag3, tag4, tag5, tag6]

===TEMPLATE===
${currentStyle.template}

===READ_TIME===
[número em minutos]

===HIGHLIGHTS===
[Destaque 1 | Destaque 2 | Destaque 3]

===COVER_BADGES===
[Badge 1 curto (máx 20 chars) | Badge 2 curto (máx 20 chars)]
Exemplos: "1.200+ aprovados | Poucos com evidência" ou "R$ 4,5 bi prometidos | 55% usa papel" ou "93% precisão | 58min → 7min"
Esses textos aparecem como balões na capa do card. Devem ser CURTOS e IMPACTANTES.

===CONTEÚDO===
[ESCREVA O HTML DO ARTIGO SEGUINDO A ESTRUTURA ABAIXO]

===FONTES===
Título 1 | https://url1.com | Tipo1
Título 2 | https://url2.com | Tipo2

===IMAGEM_SUGERIDA===
[Descrição da imagem ideal]

==========================================================
ESTRUTURA OBRIGATÓRIA DO CONTEÚDO HTML:
==========================================================

1. ABERTURA (OBRIGATÓRIO) - Sempre começar com:
<div class="article-lead-box">
<p>Parágrafo de abertura forte, 3-4 frases que capturam atenção e resumem o tema.</p>
</div>

2. SEÇÕES - Use <h2> para títulos (NUNCA <p> para títulos):
<h2>TÍTULO DA SEÇÃO EM MAIÚSCULAS</h2>

<p>Parágrafos normais com conteúdo.</p>

3. CAIXAS DE DESTAQUE - Para listas importantes:
<div class="highlight-box">
<h3>TÍTULO DO DESTAQUE</h3>
<ul>
<li><strong>Item:</strong> Descrição do item</li>
<li><strong>Item:</strong> Descrição do item</li>
</ul>
</div>

4. TABELAS - SEMPRE dentro de highlight-box:
<div class="highlight-box">
<h3>TÍTULO DA TABELA</h3>
<table>
<thead>
<tr><th>Coluna 1</th><th>Coluna 2</th></tr>
</thead>
<tbody>
<tr><td>Dado 1</td><td>Dado 2</td></tr>
</tbody>
</table>
</div>

5. CITAÇÕES EM DESTAQUE:
<div class="article-pullquote">
<p>"Citação impactante ou frase de efeito."</p>
</div>

6. FECHAMENTO (OBRIGATÓRIO) - Sempre terminar com:
<div class="call-to-action">
<h3>E você, colega?</h3>
<p>Pergunta para o leitor e convite para comentar.</p>
</div>

==========================================================
REGRAS CRÍTICAS:
==========================================================
- NUNCA use <p> para títulos. Use <h2> para seções.
- SEMPRE comece com article-lead-box
- SEMPRE termine com call-to-action
- TABELAS sempre com <thead> e <tbody>
- Espaço após pontuação: ". " e não "."
- Use 4-6 seções <h2>
- Use 2-4 highlight-box
- Use 1-2 article-pullquote
- Referências: [1], [2], etc.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Log para debug
  console.log('=== RESPOSTA BRUTA DA IA ===');
  console.log(text.substring(0, 1000));
  console.log('===========================');

  // PARSING
  const getField = (text, field) => {
    const regex = new RegExp(`===${field}===\\s*([\\s\\S]*?)(?====|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  const title = getField(text, 'TÍTULO') || getField(text, 'TITULO');
  const subtitle = getField(text, 'SUBTÍTULO') || getField(text, 'SUBTITULO');
  const slug = getField(text, 'SLUG');
  const excerpt = getField(text, 'EXCERPT');
  const metaTitle = getField(text, 'META_TITLE');
  const metaDescription = getField(text, 'META_DESCRIPTION');
  const tagsRaw = getField(text, 'TAGS');
  const template = getField(text, 'TEMPLATE') || currentStyle.template;
  const readTimeRaw = getField(text, 'READ_TIME');
  const highlightsRaw = getField(text, 'HIGHLIGHTS');
  const coverBadgesRaw = getField(text, 'COVER_BADGES');
  let content = getField(text, 'CONTEÚDO') || getField(text, 'CONTEUDO');
  const sourcesRaw = getField(text, 'FONTES');
  const suggestedImage = getField(text, 'IMAGEM_SUGERIDA');

  // Processa arrays
  const tags = tagsRaw
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  const highlights = highlightsRaw
    .split('|')
    .map(h => h.trim())
    .filter(Boolean);
  const readTime = parseInt(readTimeRaw) || 5;

  // Processa cover badges (balões de capa)
  const coverBadgesLine = coverBadgesRaw.split('\n')[0] || ''; // Pega só a primeira linha
  const coverBadges = coverBadgesLine
    .split('|')
    .map(b => b.trim())
    .filter(Boolean)
    .slice(0, 2);

  // Processa fontes
  const sources = sourcesRaw
    .split('\n')
    .filter(line => line.includes('|'))
    .map(line => {
      const [titlePart, url, type] = line.split('|').map(s => s.trim());
      return { title: titlePart, url: url || '', type: type || 'Referência' };
    })
    .filter(s => s.title);

  // APLICA LIMPEZA E PÓS-PROCESSAMENTO
  content = cleanupFormatting(content);
  content = ensureArticleStructure(content);

  // Log para debug
  console.log('=== CONTEÚDO PROCESSADO (primeiros 500 chars) ===');
  console.log(content.substring(0, 500));
  console.log('=================================================');

  const article = {
    title: title || 'Novo Artigo',
    subtitle: subtitle || '',
    slug: slug || generateSlug(title || 'novo-artigo'),
    excerpt: excerpt || '',
    meta_title: metaTitle || title || '',
    meta_description: metaDescription || excerpt || '',
    tags,
    template: ['classic', 'magazine', 'scientific', 'news'].includes(template)
      ? template
      : 'classic',
    highlights,
    readTime,
    content,
    sources,
    suggestedImage: suggestedImage || '',
    metadata: {
      // Cover badges (balões que aparecem na capa do card)
      ...(coverBadges[0] ? { promise: coverBadges[0] } : {}),
      ...(coverBadges[1] ? { reality: coverBadges[1] } : {}),
    },
  };

  return article;
};

// ============================================
// OUTRAS FUNÇÕES
// ============================================

export const suggestCategory = async (content, title, existingCategories = []) => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const categoriesList = existingCategories.map(c => c.name).join(', ');

  const prompt = `Sugira a melhor categoria para este artigo.

Título: ${title}
Conteúdo: ${content.slice(0, 2000)}
Categorias existentes: ${categoriesList || 'Nenhuma'}

Responda em 3 linhas:
EXISTENTE: [nome ou NENHUMA]
NOVA: [sugestão ou NENHUMA]  
MOTIVO: [explicação]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const lines = text.split('\n');
  let bestExisting = null;
  let suggestedNew = null;
  let reason = '';

  for (const line of lines) {
    if (line.includes('EXISTENTE:')) {
      const val = line.split(':')[1]?.trim();
      if (val && val.toLowerCase() !== 'nenhuma') bestExisting = val;
    } else if (line.includes('NOVA:')) {
      const val = line.split(':')[1]?.trim();
      if (val && val.toLowerCase() !== 'nenhuma') suggestedNew = val;
    } else if (line.includes('MOTIVO:')) {
      reason = line.split(':').slice(1).join(':').trim();
    }
  }

  return { bestExisting, suggestedNew, reason };
};

export const detectFormattingIssues = async content => {
  if (!genAI) throw new Error('API do Gemini não configurada');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const plainText = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const prompt = `Encontre erros de formatação neste texto:

"${plainText.slice(0, 8000)}"

Liste cada erro assim:
ERRO: [texto errado]
CORREÇÃO: [texto corrigido]
---

Procure: palavras grudadas, pontuação sem espaço, datas emendadas.
Máximo 20 erros.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const issues = [];
  const blocks = text.split('---').filter(b => b.trim());

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    let original = '';
    let corrected = '';

    for (const line of lines) {
      if (line.startsWith('ERRO:')) {
        original = line.replace('ERRO:', '').trim();
      } else if (line.startsWith('CORREÇÃO:') || line.startsWith('CORRECAO:')) {
        corrected = line.replace(/CORRE[CÇ][AÃ]O:/, '').trim();
      }
    }

    if (original && corrected && original !== corrected) {
      issues.push({ type: 'formatacao', original, corrected, context: '' });
    }
  }

  return issues;
};

export const applyCorrection = (content, original, replacement) => {
  if (content.includes(original)) {
    return content.split(original).join(replacement);
  }
  return content;
};

export const fixContentFormatting = async content => {
  // Primeiro aplica correção automática via regex
  let fixed = cleanupFormatting(content);

  // Aplica estrutura do artigo
  fixed = ensureArticleStructure(fixed);

  if (!genAI) return fixed;

  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Corrija APENAS formatação neste HTML:
- Palavras grudadas (adicione espaço)
- Pontuação sem espaço (adicione espaço)

MANTENHA todo conteúdo e classes CSS.

HTML:
${fixed.slice(0, 15000)}

Retorne apenas o HTML corrigido.`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();
  text = text.replace(/^```html\n?/i, '').replace(/\n?```$/i, '');
  return text;
};

export default {
  isAIConfigured,
  generateTitles,
  generateExcerpt,
  generateTags,
  improveText,
  generateDraft,
  generateFullArticle,
  suggestCategory,
  detectFormattingIssues,
  applyCorrection,
  fixContentFormatting,
  cleanupFormatting,
  ensureArticleStructure,
};
