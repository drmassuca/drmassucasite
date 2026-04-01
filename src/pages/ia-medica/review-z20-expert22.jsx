import { useEffect, useRef, useState } from 'react';
import SEOHead from '../../components/SEOHead';

function ReviewLoader({ htmlFile, seoTitle, seoDescription }) {
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

        styles.forEach((css) => {
          const style = document.createElement('style');
          style.textContent = css;
          document.head.appendChild(style);
        });

        if (!document.querySelector('link[href*="Playfair+Display"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap';
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
        image="https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/banner-z20-vs-expert22.jpeg"
        article={true}
        author="Dr. Massuca"
      />
      <div ref={containerRef} style={{ background: '#fff', borderRadius: 12, maxWidth: 900, margin: '0 auto' }} />
    </>
  );
}

export default function ReviewZ20Expert22() {
  return (
    <ReviewLoader
      htmlFile="/articles/review-z20-expert22.html"
      seoTitle="Samsung HERA Z20 vs GE Voluson Expert 22 — Review Completo"
      seoDescription="Comparativo técnico entre Samsung HERA Z20 e GE Voluson Expert 22: hardware, IA, transdutores, ergonomia e ROI. Dados exclusivos do congresso This Is Us 2026."
    />
  );
}

export function ReviewZ20Expert22EN() {
  return (
    <ReviewLoader
      htmlFile="/articles/review-z20-expert22-en.html"
      seoTitle="Samsung HERA Z20 vs GE Voluson Expert 22 — Full Review"
      seoDescription="Technical comparison between Samsung HERA Z20 and GE Voluson Expert 22: hardware, AI, transducers, ergonomics and ROI. Exclusive data from This Is Us 2026 congress."
    />
  );
}
