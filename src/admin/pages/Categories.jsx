import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, Tag, Palette } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './Categories.css';

// Ícones disponíveis
const AVAILABLE_ICONS = [
  'Brain',
  'TrendingUp',
  'Users',
  'Tag',
  'Calendar',
  'Stethoscope',
  'Heart',
  'Activity',
  'Shield',
  'Globe',
  'Zap',
  'Award',
];

// Cores disponíveis
const AVAILABLE_COLORS = [
  '#3B82F6',
  '#10B981',
  '#8B5CF6',
  '#F59E0B',
  '#EC4899',
  '#EF4444',
  '#06B6D4',
  '#84CC16',
  '#F97316',
  '#6366F1',
  '#14B8A6',
  '#A855F7',
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Tag',
    color: '#3B82F6',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*, articles(count)')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = name => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !editingId ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        // Update
        const { error } = await supabase.from('categories').update(formData).eq('id', editingId);

        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from('categories').insert(formData);

        if (error) throw error;
      }

      await fetchCategories();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = category => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: category.icon || 'Tag',
      color: category.color || '#3B82F6',
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) throw error;

      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir categoria. Verifique se não há posts vinculados.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: 'Tag',
      color: '#3B82F6',
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Categorias</h1>
          <p className="page-subtitle">Organize seus posts por categorias</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary" disabled={showForm}>
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="category-form-card">
          <div className="form-header">
            <h2>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
            <button onClick={resetForm} className="close-btn">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ex: Inteligência Artificial"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="inteligencia-artificial"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows={2}
                placeholder="Breve descrição da categoria..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Tag size={14} />
                  Ícone
                </label>
                <div className="icon-selector">
                  {AVAILABLE_ICONS.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${formData.icon === icon ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                      title={icon}
                    >
                      {icon.substring(0, 2)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Palette size={14} />
                  Cor
                </label>
                <div className="color-selector">
                  {AVAILABLE_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save size={18} /> {editingId ? 'Atualizar' : 'Criar'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="categories-grid">
        {categories.length === 0 ? (
          <div className="empty-state">
            <Tag className="empty-state-icon" />
            <h3 className="empty-state-title">Nenhuma categoria</h3>
            <p className="empty-state-text">Crie sua primeira categoria para organizar os posts.</p>
          </div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="category-card">
              <div
                className="category-icon"
                style={{ backgroundColor: category.color || '#3B82F6' }}
              >
                {category.icon?.substring(0, 2) || 'Tg'}
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-slug">/{category.slug}</span>
                {category.description && (
                  <p className="category-description">{category.description}</p>
                )}
                <span className="category-count">{category.articles?.[0]?.count || 0} posts</span>
              </div>
              <div className="category-actions">
                <button
                  onClick={() => handleEdit(category)}
                  className="action-btn edit"
                  title="Editar"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                  className="action-btn delete"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
