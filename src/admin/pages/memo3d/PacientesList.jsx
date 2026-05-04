import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Plus, Search, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import './memo3d.css';

const STATUS_LABELS = {
  pending: 'Pendente',
  active: 'Ativa',
  expired: 'Expirada',
  deleted: 'Excluída',
};

export default function Memo3dPacientesList() {
  const location = useLocation();
  const navigate = useNavigate();
  const justCreated = location.state?.justCreated || null;
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const { data, error: err } = await supabase
          .from('memo_patients')
          .select('id, full_name, phone, status, created_at, email')
          .neq('status', 'deleted')
          .order('created_at', { ascending: false })
          .limit(500);
        if (cancelled) return;
        if (err) throw err;
        setPatients(data || []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = patients.filter(p => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.full_name.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="memo3d-page">
      <header className="page-header">
        <div>
          <h1>Pacientes Memo3D</h1>
          <p>{patients.length} cadastradas (excluídas ocultas)</p>
        </div>
        <Link to="/admin/memo3d/pacientes/nova" className="btn btn-primary">
          <Plus size={18} /> Nova paciente
        </Link>
      </header>

      <div className="filters">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {justCreated && (
        <div className="success-banner">
          <CheckCircle size={18} />
          <span>
            Paciente <strong>{justCreated.name}</strong> cadastrada com sucesso.
          </span>
          <button
            className="banner-close"
            onClick={() => navigate(location.pathname, { replace: true })}
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <div className="error-banner">Erro: {error}</div>}

      {loading ? (
        <div className="loading-state">Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          {searchTerm
            ? 'Nenhuma paciente encontrada com esses termos.'
            : 'Nenhuma paciente cadastrada ainda. Clica em "Nova paciente" pra começar.'}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Cadastrada em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.full_name}</strong>
                  </td>
                  <td>{p.phone}</td>
                  <td>{p.email || '—'}</td>
                  <td>
                    <span className={`badge badge-${p.status}`}>
                      {STATUS_LABELS[p.status] || p.status}
                    </span>
                  </td>
                  <td>{new Date(p.created_at).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <Link to={`/admin/memo3d/pacientes/${p.id}`} className="link">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
