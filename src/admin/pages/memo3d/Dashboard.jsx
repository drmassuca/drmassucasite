import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Hourglass, Wallet, ArrowRight } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useMemo3dPath } from '../../../lib/memo3d/path-context';
import './memo3d.css';

const startOfMonth = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

export default function Memo3dDashboard() {
  const basePath = useMemo3dPath();
  const [stats, setStats] = useState({
    patients: 0,
    examsPaid: 0,
    expiringSoon: 0,
    monthRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const in30Days = new Date(Date.now() + 30 * 86400000).toISOString();
        const [patientsRes, examsRes, expiringRes, revenueRes] = await Promise.all([
          supabase
            .from('memo_patients')
            .select('id', { count: 'exact', head: true })
            .neq('status', 'deleted'),
          supabase.from('memo_exams').select('id', { count: 'exact', head: true }).eq('paid', true),
          supabase
            .from('memo_exams')
            .select('id', { count: 'exact', head: true })
            .eq('paid', true)
            .gte('expires_at', new Date().toISOString())
            .lte('expires_at', in30Days),
          supabase
            .from('memo_exams')
            .select('paid_amount_cents')
            .gte('paid_at', startOfMonth().toISOString()),
        ]);
        if (cancelled) return;
        const monthCents = (revenueRes.data || []).reduce(
          (sum, r) => sum + (r.paid_amount_cents || 0),
          0
        );
        setStats({
          patients: patientsRes.count || 0,
          examsPaid: examsRes.count || 0,
          expiringSoon: expiringRes.count || 0,
          monthRevenue: monthCents / 100,
        });
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="memo3d-page">
      <header className="page-header">
        <div>
          <h1>Memo3D — Dashboard</h1>
          <p>Visão geral da hospedagem boutique e leads de impressão 3D.</p>
        </div>
      </header>

      {error && <div className="error-banner">Erro ao carregar dados: {error}</div>}

      <div className="stats-grid">
        <StatCard
          icon={Users}
          label="Pacientes cadastradas"
          value={stats.patients}
          loading={loading}
        />
        <StatCard icon={FileText} label="Exames pagos" value={stats.examsPaid} loading={loading} />
        <StatCard
          icon={Hourglass}
          label="Expiram em 30 dias"
          value={stats.expiringSoon}
          loading={loading}
        />
        <StatCard
          icon={Wallet}
          label="Receita do mês"
          value={`R$ ${stats.monthRevenue.toFixed(2).replace('.', ',')}`}
          loading={loading}
        />
      </div>

      <section className="section">
        <h2>Acessos rápidos</h2>
        <div className="quick-links">
          <Link to={`${basePath}/pacientes`} className="quick-link">
            <Users size={20} />
            <div>
              <strong>Pacientes</strong>
              <span>Cadastrar e gerenciar</span>
            </div>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <div className="stat-card">
      <Icon className="stat-icon" />
      <div className="stat-text">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{loading ? '—' : value}</div>
      </div>
    </div>
  );
}
