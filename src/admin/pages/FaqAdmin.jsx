import { useState, useEffect } from 'react';
import { Check, X, Edit2, Save, XCircle, HelpCircle, Clock, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://auvyolzrjoyzsribmapa.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
import './FaqAdmin.css';

const FaqAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // pending | approved | all
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ question: '', answer: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchItems = async () => {
    setLoading(true);
    let query = supabase.from('faq_items').select('*').order('created_at', { ascending: false });

    if (filter === 'pending') query = query.eq('approved', false);
    if (filter === 'approved') query = query.eq('approved', true);

    const { data, error } = await query;
    if (error) {
      console.error(error);
    }
    setItems(data || []);
    setLoading(false);
  };

  const approve = async id => {
    const { error } = await supabase.from('faq_items').update({ approved: true }).eq('id', id);
    if (error) return showToast('Erro ao aprovar', 'error');
    showToast('✅ Aprovado e publicado!');
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const reject = async id => {
    if (!window.confirm('Deletar esta pergunta permanentemente?')) return;
    const { error } = await supabase.from('faq_items').delete().eq('id', id);
    if (error) return showToast('Erro ao deletar', 'error');
    showToast('🗑 Removido', 'warning');
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const startEdit = item => {
    setEditingId(item.id);
    setEditData({ question: item.question, answer: item.answer || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async id => {
    setSaving(true);
    const { error } = await supabase
      .from('faq_items')
      .update({
        question: editData.question,
        answer: editData.answer,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    setSaving(false);
    if (error) return showToast('Erro ao salvar', 'error');
    showToast('✏️ Salvo com sucesso!');
    setItems(prev => prev.map(i => (i.id === id ? { ...i, ...editData } : i)));
    setEditingId(null);
  };

  const counts = {
    pending: items.filter(i => !i.approved).length,
    approved: items.filter(i => i.approved).length,
  };

  return (
    <div className="faq-admin-page">
      {/* Toast */}
      {toast && <div className={`faq-toast faq-toast--${toast.type}`}>{toast.msg}</div>}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">FAQ – Perguntas Frequentes</h1>
          <p className="page-subtitle">Gerencie as perguntas geradas pela IA antes de publicar</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="faq-tabs">
        <button
          className={`faq-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          <Clock size={15} />
          Aguardando aprovação
          {filter !== 'pending' && <span className="faq-tab-badge">{counts.pending}</span>}
        </button>
        <button
          className={`faq-tab ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          <CheckCircle size={15} />
          Publicados
        </button>
        <button
          className={`faq-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <HelpCircle size={15} />
          Todos
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="faq-loading">
          <div className="faq-spinner" />
          <span>Carregando...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="faq-empty">
          <CheckCircle size={40} color="#22c55e" />
          <p>
            {filter === 'pending'
              ? 'Nenhuma pergunta aguardando aprovação.'
              : 'Nenhum item encontrado.'}
          </p>
        </div>
      ) : (
        <div className="faq-list">
          {items.map(item => (
            <div
              key={item.id}
              className={`faq-card ${editingId === item.id ? 'faq-card--editing' : ''} ${!item.approved ? 'faq-card--pending' : ''}`}
            >
              {/* Badges */}
              <div className="faq-card-badges">
                {item.ai_generated && <span className="badge badge--ai">IA</span>}
                {!item.approved ? (
                  <span className="badge badge--pending">Aguardando</span>
                ) : (
                  <span className="badge badge--approved">Publicado</span>
                )}
                <span className="badge badge--section">{item.section}</span>
                <span className="faq-card-date">
                  {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>

              {/* Corpo — modo edição ou visualização */}
              {editingId === item.id ? (
                <div className="faq-edit-form">
                  <label className="faq-edit-label">Pergunta</label>
                  <input
                    className="faq-edit-input"
                    value={editData.question}
                    onChange={e => setEditData(p => ({ ...p, question: e.target.value }))}
                  />
                  <label className="faq-edit-label">Resposta</label>
                  <textarea
                    className="faq-edit-textarea"
                    rows={6}
                    value={editData.answer}
                    onChange={e => setEditData(p => ({ ...p, answer: e.target.value }))}
                  />
                </div>
              ) : (
                <div className="faq-card-body">
                  <h3 className="faq-card-question">{item.question}</h3>
                  <p className="faq-card-answer">{item.answer || item.short_answer || '—'}</p>
                </div>
              )}

              {/* Ações */}
              <div className="faq-card-actions">
                {editingId === item.id ? (
                  <>
                    <button className="faq-btn faq-btn--ghost" onClick={cancelEdit}>
                      <XCircle size={15} /> Cancelar
                    </button>
                    <button
                      className="faq-btn faq-btn--save"
                      onClick={() => saveEdit(item.id)}
                      disabled={saving}
                    >
                      <Save size={15} /> {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="faq-btn faq-btn--ghost" onClick={() => startEdit(item)}>
                      <Edit2 size={15} /> Editar
                    </button>
                    <button className="faq-btn faq-btn--danger" onClick={() => reject(item.id)}>
                      <X size={15} /> Rejeitar
                    </button>
                    {!item.approved && (
                      <button className="faq-btn faq-btn--approve" onClick={() => approve(item.id)}>
                        <Check size={15} /> Aprovar
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqAdmin;
