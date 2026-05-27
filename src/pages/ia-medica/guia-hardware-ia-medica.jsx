import { useEffect, useRef, useState } from 'react';
import SEOHead from '../../components/SEOHead';

function ArticleLoader({ htmlFile, seoTitle, seoDescription, seoImage }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArticle() {
      try {
        const res = await fetch(htmlFile);
        if (!res.ok) throw new Error('Failed to load article');
        const html = await res.text();
        if (cancelled || !containerRef.current) return;

        const styles = [];
        html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
          styles.push(css);
        });

        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : html;

        const extScripts = [];
        const inlineScripts = [];
        html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, content) => {
          const srcMatch = attrs.match(/src=["']([^"']+)["']/);
          if (srcMatch) {
            extScripts.push(srcMatch[1]);
          } else if (content.trim()) {
            inlineScripts.push(content);
          }
        });

        // Inject styles
        styles.forEach((css) => {
          const style = document.createElement('style');
          style.textContent = css;
          document.head.appendChild(style);
        });

        // Load fonts
        if (!document.querySelector('link[href*="Source+Sans+3"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700&family=JetBrains+Mono:wght@400;600&display=swap';
          document.head.appendChild(link);
        }

        const cleanBody = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
        containerRef.current.innerHTML = cleanBody;

        for (const src of extScripts) {
          if (!document.querySelector(`script[src="${src}"]`)) {
            await new Promise((resolve, reject) => {
              const s = document.createElement('script');
              s.src = src;
              s.onload = resolve;
              s.onerror = reject;
              document.head.appendChild(s);
            });
          }
        }

        for (const code of inlineScripts) {
          const s = document.createElement('script');
          s.textContent = code;
          document.body.appendChild(s);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    }

    loadArticle();
    return () => { cancelled = true; };
  }, [htmlFile]);

  if (error) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>{error}</div>;
  }

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        article={true}
        author="Dr. Massuca"
      />
      <div
        ref={containerRef}
        style={{
          background: '#0a0e17',
          borderRadius: 12,
          maxWidth: 900,
          margin: '0 auto',
          overflow: 'hidden',
        }}
      />
    </>
  );
}

export default function GuiaHardwareIAMedica() {
  return (
    <ArticleLoader
      htmlFile="/articles/guia-hardware-ia-medica.html"
      seoTitle="Qual Computador Comprar Para Usar IA na Medicina — Guia 2026"
      seoDescription="Guia completo de hardware para o médico que quer usar inteligência artificial: notebooks, desktops, GPU, RAM e SSD. Do básico ao future-ready."
      seoImage="https://drmassuca.com.br/images/ia-medica/guia-hardware-og.jpg"
    />
  );
}
