import { useEffect, useRef, useState } from 'react';
import SEOHead from '../../components/SEOHead';

export default function ReviewZ20Expert22() {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArticle() {
      try {
        const res = await fetch('/articles/review-z20-expert22.html');
        if (!res.ok) throw new Error('Falha ao carregar artigo');
        const html = await res.text();
        if (cancelled || !containerRef.current) return;

        // Extract styles from head
        const styles = [];
        html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
          styles.push(css);
        });

        // Extract body content
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : html;

        // Extract external scripts from head (like Chart.js CDN)
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

        // Load Google Fonts
        if (!document.querySelector('link[href*="Playfair+Display"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap';
          document.head.appendChild(link);
        }

        // Inject body (without script tags)
        const cleanBody = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
        containerRef.current.innerHTML = cleanBody;

        // Load external scripts first (Chart.js), then run inline scripts
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

        // Execute inline scripts in order
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
  }, []);

  if (error) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>{error}</div>;
  }

  return (
    <>
      <SEOHead
        title="Samsung HERA Z20 vs GE Voluson Expert 22 — Review Completo"
        description="Comparativo técnico entre Samsung HERA Z20 e GE Voluson Expert 22: hardware, IA, transdutores, ergonomia e ROI. Dados exclusivos do congresso This Is Us 2026."
        image="https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/hera-z20-top-pick.jpeg"
        article={true}
        author="Dr. Massuca"
      />
      <div ref={containerRef} style={{ background: '#fff', borderRadius: 12, maxWidth: 900, margin: '0 auto' }} />
    </>
  );
}
