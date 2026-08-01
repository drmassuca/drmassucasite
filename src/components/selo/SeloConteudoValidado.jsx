import PropTypes from 'prop-types';
import {
  liberaConteudoValidado,
  previaSeloDemonstracao,
  CREDENCIAL_PADRAO,
} from '../../lib/validacao';
import './selo.css';

const formataData = valor => {
  if (!valor) return null;
  // Datas "YYYY-MM-DD" são interpretadas como UTC pelo Date; fixa meio-dia
  // local para não recuar um dia no fuso de Brasília.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(valor) ? new Date(`${valor}T12:00:00`) : new Date(valor);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

/**
 * Selo "Conteúdo Validado" — a logo do site dentro de um distintivo com
 * revisor, registro, data de publicação e data de última revisão.
 *
 * A decisão de exibir é SEMPRE de liberaConteudoValidado() (fail-closed).
 * O componente não decide nada por conta própria: sem liberação, não
 * renderiza. A exceção controlada é a prop `previa` (demonstração /v1),
 * que cai para previaSeloDemonstracao() com a credencial fixa.
 */
export default function SeloConteudoValidado({ artigo, variant = 'completo', previa = false }) {
  const { liberado } = liberaConteudoValidado(artigo);
  const emPrevia = !liberado && previa && previaSeloDemonstracao(artigo);
  if (!liberado && !emPrevia) return null;

  const revisor = liberado ? artigo.revisado_por : CREDENCIAL_PADRAO;
  const dataPublicacao = formataData(artigo.date ?? artigo.published_at);
  const dataRevisao = liberado
    ? formataData(artigo.data_revisao)
    : formataData(artigo.updatedAt ?? artigo.updated_at);
  const rotulo = emPrevia
    ? 'Selo Conteúdo Validado — prévia de demonstração alimentada pelas fontes já citadas'
    : 'Selo Conteúdo Validado';

  if (variant === 'chip') {
    return (
      <span className="selo-chip" title={rotulo}>
        <img className="selo-chip__logo" src="/logo.webp" alt="" width="18" height="18" />
        Conteúdo Validado
      </span>
    );
  }

  return (
    <aside
      className={`selo-validado${emPrevia ? ' selo-validado--previa' : ''}`}
      aria-label={rotulo}
    >
      <div className="selo-validado__medalha">
        <img src="/logo.webp" alt="Logotipo Dr. Massuca" width="58" height="58" />
      </div>
      <div className="selo-validado__corpo">
        <p className="selo-validado__titulo">Conteúdo Validado</p>
        <p className="selo-validado__revisor">Revisado por {revisor}</p>
        <p className="selo-validado__datas">
          {dataPublicacao && <span>Publicado em {dataPublicacao}</span>}
          {dataPublicacao && dataRevisao && <span aria-hidden="true"> · </span>}
          {dataRevisao && <span>Última revisão em {dataRevisao}</span>}
        </p>
        <p className="selo-validado__nota">
          Se o conteúdo mudar, o selo é suspenso até nova revisão e assinatura.
        </p>
      </div>
    </aside>
  );
}

SeloConteudoValidado.propTypes = {
  artigo: PropTypes.object,
  variant: PropTypes.oneOf(['completo', 'chip']),
  previa: PropTypes.bool,
};
