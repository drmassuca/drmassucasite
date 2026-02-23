import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Archive,
  FileText,
  Calendar,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './PostsList.css';

const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [statusFilter, categoryFilter]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('articles')
        .select(
          `
          *,
          categories (id, name)
        `
        )
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (categoryFilter !== 'all') {
        query = query.eq('category_id', categoryFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== id));
      setActiveMenu(null);
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      alert('Erro ao excluir post');
    }
  };

  const handleDuplicate = async post => {
    try {
      const newPost = {
        title: `${post.title} (Cópia)`,
        slug: `${post.slug}-copia-${Date.now()}`,
        subtitle: post.subtitle,
        excerpt: post.excerpt,
        content: post.content,
        category_id: post.category_id,
        tags: post.tags,
        image_url: post.image_url,
        author: post.author,
        read_time: post.read_time,
        status: 'draft',
        featured: false,
        metadata: post.metadata,
        sources: post.sources,
      };

      const { data, error } = await supabase.from('articles').insert(newPost).select().single();

      if (error) throw error;

      setPosts([data, ...posts]);
      setActiveMenu(null);
      navigate(`/admin/posts/${data.id}`);
    } catch (error) {
      console.error('Erro ao duplicar post:', error);
      alert('Erro ao duplicar post');
    }
  };

  const handleArchive = async id => {
    try {
      const { error } = await supabase.from('articles').update({ status: 'archived' }).eq('id', id);

      if (error) throw error;

      setPosts(posts.map(p => (p.id === id ? { ...p, status: 'archived' } : p)));
      setActiveMenu(null);
    } catch (error) {
      console.error('Erro ao arquivar post:', error);
      alert('Erro ao arquivar post');
    }
  };

  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = dateString => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
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

  return (
    <div className="posts-list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Posts</h1>
          <p className="page-subtitle">Gerencie os artigos do blog IA Médica</p>
        </div>
        <Link to="/admin/posts/new" className="btn btn-primary">
          <Plus size={18} />
          Novo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={18} className="filter-icon" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos os status</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
            <option value="scheduled">Agendados</option>
            <option value="archived">Arquivados</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas categorias</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="card">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="empty-state">
            <FileText className="empty-state-icon" />
            <h3 className="empty-state-title">Nenhum post encontrado</h3>
            <p className="empty-state-text">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Tente ajustar os filtros'
                : 'Comece criando seu primeiro post!'}
            </p>
            {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
              <Link to="/admin/posts/new" className="btn btn-primary">
                <Plus size={18} />
                Criar Post
              </Link>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Views</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map(post => (
                  <tr key={post.id}>
                    <td>
                      <div className="post-cell">
                        <div className="post-thumb">
                          {post.image_url ? (
                            <img src={post.image_url} alt={post.title} />
                          ) : (
                            <div className="post-thumb-placeholder">
                              <FileText size={16} />
                            </div>
                          )}
                        </div>
                        <div className="post-info">
                          <Link to={`/admin/posts/${post.id}`} className="post-title-link">
                            {post.title}
                          </Link>
                          <span className="post-excerpt">{post.excerpt?.substring(0, 80)}...</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{post.categories?.name || '-'}</span>
                    </td>
                    <td>
                      <span className={`status-badge status-${post.status}`}>
                        {getStatusLabel(post.status)}
                      </span>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                    </td>
                    <td>
                      <span className="views-count">
                        <Eye size={14} />
                        {(post.views || 0).toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <div className="actions-menu">
                        <button
                          className="actions-trigger"
                          onClick={() => setActiveMenu(activeMenu === post.id ? null : post.id)}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeMenu === post.id && (
                          <div className="actions-dropdown">
                            <Link
                              to={`/admin/posts/${post.id}`}
                              className="action-item"
                              onClick={() => setActiveMenu(null)}
                            >
                              <Edit size={16} />
                              Editar
                            </Link>
                            <a
                              href={`/ia-medica/artigo/${post.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-item"
                              onClick={() => setActiveMenu(null)}
                            >
                              <Eye size={16} />
                              Visualizar
                            </a>
                            <button className="action-item" onClick={() => handleDuplicate(post)}>
                              <Copy size={16} />
                              Duplicar
                            </button>
                            <button className="action-item" onClick={() => handleArchive(post.id)}>
                              <Archive size={16} />
                              Arquivar
                            </button>
                            <hr />
                            <button
                              className="action-item danger"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 size={16} />
                              Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
