import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Eye,
  TrendingUp,
  Clock,
  Plus,
  Edit,
  Calendar,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    scheduledPosts: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Buscar estatísticas
      const { data: articles, error } = await supabase.from('articles').select('id, status, views');

      if (error) throw error;

      const totalPosts = articles?.length || 0;
      const publishedPosts = articles?.filter(a => a.status === 'published').length || 0;
      const draftPosts = articles?.filter(a => a.status === 'draft').length || 0;
      const scheduledPosts = articles?.filter(a => a.status === 'scheduled').length || 0;
      const totalViews = articles?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        scheduledPosts,
        totalViews,
      });

      // Buscar posts recentes
      const { data: recent } = await supabase
        .from('articles')
        .select('id, title, status, created_at, views')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentPosts(recent || []);

      // Buscar posts mais populares
      const { data: popular } = await supabase
        .from('articles')
        .select('id, title, views')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(5);

      setPopularPosts(popular || []);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = dateString => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getStatusLabel = status => {
    const labels = {
      published: 'Publicado',
      draft: 'Rascunho',
      scheduled: 'Agendado',
      archived: 'Arquivado',
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral do blog IA Médica</p>
        </div>
        <Link to="/admin/posts/new" className="btn btn-primary">
          <Plus size={18} />
          Novo Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.totalPosts}</span>
            <span className="stat-label">Total de Posts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.publishedPosts}</span>
            <span className="stat-label">Publicados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.draftPosts}</span>
            <span className="stat-label">Rascunhos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Eye size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.totalViews.toLocaleString()}</span>
            <span className="stat-label">Visualizações</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Posts */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>
              <Calendar size={18} />
              Posts Recentes
            </h2>
            <Link to="/admin/posts" className="view-all-link">
              Ver todos
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="posts-list">
            {recentPosts.length === 0 ? (
              <p className="empty-message">Nenhum post criado ainda</p>
            ) : (
              recentPosts.map(post => (
                <Link key={post.id} to={`/admin/posts/${post.id}`} className="post-item">
                  <div className="post-item-info">
                    <span className="post-item-title">{post.title}</span>
                    <span className="post-item-date">{formatDate(post.created_at)}</span>
                  </div>
                  <span className={`status-badge status-${post.status}`}>
                    {getStatusLabel(post.status)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Popular Posts */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>
              <BarChart3 size={18} />
              Mais Populares
            </h2>
          </div>
          <div className="posts-list">
            {popularPosts.length === 0 ? (
              <p className="empty-message">Nenhum post publicado ainda</p>
            ) : (
              popularPosts.map((post, index) => (
                <Link key={post.id} to={`/admin/posts/${post.id}`} className="post-item popular">
                  <span className="post-rank">{index + 1}</span>
                  <div className="post-item-info">
                    <span className="post-item-title">{post.title}</span>
                  </div>
                  <span className="post-views">
                    <Eye size={14} />
                    {(post.views || 0).toLocaleString()}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions-card">
          <div className="card-header">
            <h2>Ações Rápidas</h2>
          </div>
          <div className="quick-actions">
            <Link to="/admin/posts/new" className="quick-action">
              <div className="quick-action-icon">
                <Plus size={20} />
              </div>
              <span>Novo Post</span>
            </Link>
            <Link to="/admin/categories" className="quick-action">
              <div className="quick-action-icon">
                <FileText size={20} />
              </div>
              <span>Categorias</span>
            </Link>
            <Link to="/admin/posts?status=draft" className="quick-action">
              <div className="quick-action-icon">
                <Edit size={20} />
              </div>
              <span>Rascunhos</span>
            </Link>
          </div>

          {stats.scheduledPosts > 0 && (
            <div className="scheduled-alert">
              <Clock size={16} />
              <span>{stats.scheduledPosts} post(s) agendado(s)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
