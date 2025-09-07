# 📚 Documentação do Componente SEO

## ⚠️ IMPORTANTE
**A estrutura deste componente NÃO deve ser alterada conforme solicitado pelo cliente.**

## 📝 Uso Básico

```jsx
import SEO from '../components/SEO';

// Dentro do componente
<SEO
  title="Título da Página | Dr. Massuca"
  description="Descrição da página em até 160 caracteres"
  canonical="/caminho-da-pagina"
/>
```

## 🔧 Props Disponíveis

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `title` | string | ✅ | Título da página (máx. 60 caracteres) |
| `description` | string | ✅ | Descrição meta (máx. 160 caracteres) |
| `canonical` | string | ❌ | URL canônica (relativa ou absoluta) |
| `image` | string | ❌ | Imagem para social sharing (padrão: favicon-512.png) |
| `keywords` | string | ❌ | Palavras-chave adicionais |
| `type` | string | ❌ | Tipo OpenGraph (padrão: "website") |
| `structuredData` | object | ❌ | Schema.org JSON-LD |
| `noindex` | boolean | ❌ | Se true, adiciona noindex/nofollow |

## 📋 Exemplos de Uso

### Página Simples
```jsx
<SEO
  title="Sobre | Dr. Massuca"
  description="Conheça Dr. Antonio Massucatti Neto, médico ultrassonografista com mais de 20 anos de experiência em Itaberaí-GO"
  canonical="/sobre"
/>
```

### Página com Schema.org
```jsx
const schema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalTest',
  name: 'Ultrassom Obstétrico',
  // ... mais propriedades
};

<SEO
  title="Ultrassom Obstétrico | Dr. Massuca"
  description="Exame de ultrassom obstétrico para acompanhamento da gestação"
  canonical="/exames/obstetrico"
  structuredData={schema}
/>
```

### Página com Imagem Customizada
```jsx
<SEO
  title="Ultrassom 3D/4D | Dr. Massuca"
  description="Veja seu bebê em detalhes com ultrassom 3D e 4D"
  canonical="/ultrassom-3d"
  image="/img-exams-webp/ultrassom-3d.webp"
/>
```

## ⚠️ Problemas Encontrados e Correções

### ❌ PROBLEMA: Duplicação de SEO
Algumas páginas estão importando SEO duas vezes ou usando tanto SEO quanto Helmet diretamente.

**Exemplo de código com problema:**
```jsx
// NÃO FAÇA ISSO!
import SEO from '../../components/SEO';
import Seo from '../../components/SEO'; // Duplicado!

<SEO title="..." description="..." />
<Seo title="..." description="..." /> // Duplicado!
```

### ✅ SOLUÇÃO: Use apenas uma vez
```jsx
import SEO from '../../components/SEO';

// Use apenas uma vez por página
<SEO
  title="Título único"
  description="Descrição única"
  canonical="/caminho"
/>
```

## 🎯 Boas Práticas

### 1. Títulos
- Formato: `[Conteúdo] | Dr. Massuca`
- Máximo 60 caracteres
- Único para cada página
- Palavras-chave no início

### 2. Descrições
- Máximo 160 caracteres
- Call-to-action quando apropriado
- Mencionar localização (Itaberaí-GO)
- Evitar duplicação entre páginas

### 3. URLs Canônicas
- Sempre sem "www."
- Sem trailing slash "/"
- Use caminho relativo para páginas internas
- Use URL absoluta para conteúdo externo

### 4. Keywords
- Componente já adiciona keywords padrão
- Adicione apenas keywords específicas da página
- Separe com vírgulas
- Máximo 10 keywords adicionais

## 📊 Schema.org Recomendado

### Para Páginas de Exames
```javascript
{
  '@type': 'MedicalTest',
  name: 'Nome do Exame',
  description: 'Descrição',
  medicalSpecialty: 'Ultrassonografia'
}
```

### Para FAQ
```javascript
{
  '@type': 'Question',
  name: 'Pergunta',
  acceptedAnswer: {
    '@type': 'Answer',
    text: 'Resposta'
  }
}
```

### Para Páginas de Contato
```javascript
{
  '@type': 'ContactPage',
  name: 'Contato',
  url: 'https://drmassuca.com.br/contato'
}
```

## 🔍 Checklist de SEO

Antes de fazer deploy, verifique:

- [ ] Cada página tem SEO component único
- [ ] Não há duplicações de SEO
- [ ] Títulos são únicos e descritivos
- [ ] Descrições são únicas e atrativas
- [ ] URLs canônicas estão corretas
- [ ] Imagens para social sharing existem
- [ ] Schema.org está implementado onde apropriado
- [ ] robots.txt está configurado
- [ ] sitemap.xml está atualizado

## 📱 WhatsApp - Regra Importante

Quando o chatbot ou conteúdo mencionar WhatsApp:
- **NÃO** inserir link direto no texto
- **SEMPRE** indicar que "o link está logo abaixo da caixa de mensagem"
- O link fixo já existe no componente apropriado

## 🚀 Performance

O componente SEO está otimizado para:
- Carregamento assíncrono com react-helmet-async
- Preconnect para recursos externos
- Resource hints automáticos
- Zero impacto no CLS (Cumulative Layout Shift)

## 📞 Suporte

Para dúvidas sobre SEO ou necessidade de alterações estruturais, consulte a equipe antes de modificar o componente base.