import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Plus,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  Film,
  CircleCheck,
  CircleAlert,
  Edit2,
  Trash2,
  KeyRound,
  Copy,
  X,
  Check,
  Activity,
  FileVideo,
  FileImage,
  Share2,
} from 'lucide-react';
import {
  getPatient,
  updatePatient,
  deletePatient,
  setPatientPassword,
  markExamPaid,
} from '../../../lib/memo3d/api';
import { recordAudit } from '../../../lib/memo3d/audit';
import { useMemo3dPath } from '../../../lib/memo3d/path-context';
import { supabase } from '../../../lib/supabase';
import ExameForm from '../../components/memo3d/ExameForm';
import MidiaUploader from '../../components/memo3d/MidiaUploader';
import './memo3d.css';

const STATUS_LABELS = {
  pending: 'Pendente',
  active: 'Ativa',
  expired: 'Expirada',
  deleted: 'Excluída',
};

const TYPE_LABELS = {
  morfologico_1tri: 'Morfo 1º tri',
  morfologico_2tri: 'Morfo 2º tri',
  doppler: 'Doppler',
  obstetrico: 'Obstétrico',
  '4d': '4D',
  outro: 'Outro',
};

const DEVICE_LABELS = {
  voluson_s10: 'Voluson S10',
  hera_z20: 'HERA Z20',
};

export default function Memo3dPacienteDetalhe() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const basePath = useMemo3dPath();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [accessCount, setAccessCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showNewExam, setShowNewExam] = useState(false);
  const [expandedExamId, setExpandedExamId] = useState(null);

  // Edição
  const [editing, setEditing] = useState(false);

  // Geração de senha
  const [generatedPassword, setGeneratedPassword] = useState(null);

  // Confirmação de exclusão
  const [confirmDelete, setConfirmDelete] = useState(false);

  const reload = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const p = await getPatient(id);
      setPatient(p);
      setError(null);

      // Acessos (logins) e compartilhamentos com a família, em paralelo.
      const [logins, shares] = await Promise.all([
        supabase
          .from('memo_audit_log')
          .select('*', { count: 'exact', head: true })
          .eq('patient_id', id)
          .like('action', 'patient.login%'),
        supabase
          .from('memo_audit_log')
          .select('*', { count: 'exact', head: true })
          .eq('patient_id', id)
          .eq('action', 'patient.share.create'),
      ]);
      setAccessCount(logins.count || 0);
      setShareCount(shares.count || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  // Contadores derivados
  const counters = useMemo(() => {
    if (!patient) return { videos: 0, photos: 0, exams: 0 };
    let videos = 0;
    let photos = 0;
    for (const exam of patient.memo_exams || []) {
      for (const m of exam.memo_media || []) {
        if (m.kind === 'video') videos++;
        else photos++;
      }
    }
    return { videos, photos, exams: (patient.memo_exams || []).length };
  }, [patient]);

  if (!id) {
    return (
      <div className="memo3d-page">
        <div className="error-banner">URL inválida — id da paciente ausente.</div>
        <Link to={`${basePath}/pacientes`} className="back-link">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="memo3d-page">
        <div className="loading-state">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="memo3d-page">
        <div className="error-banner">Erro: {error}</div>
        <Link to={`${basePath}/pacientes`} className="back-link">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>
    );
  }

  if (!patient) return null;

  return (
    <div className="memo3d-page">
      <header className="page-header">
        <div>
          <Link to={`${basePath}/pacientes`} className="back-link">
            <ArrowLeft size={16} /> Voltar para a lista
          </Link>
          <h1>{patient.full_name}</h1>
          <div className="patient-meta">
            <span className={`badge badge-${patient.status}`}>
              {STATUS_LABELS[patient.status] || patient.status}
            </span>
            <span>
              <Phone size={14} /> {patient.phone}
            </span>
            {patient.email && (
              <span>
                <Mail size={14} /> {patient.email}
              </span>
            )}
            <span>
              <Calendar size={14} /> Cadastrada em{' '}
              {new Date(patient.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Ações */}
        {!editing && (
          <div className="patient-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditing(true)}
              disabled={patient.status === 'deleted'}
            >
              <Edit2 size={14} /> Editar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={async () => {
                const ok = window.confirm(
                  `Gerar nova senha para ${patient.full_name}?\n\n` +
                    'A senha aparecerá na tela pra você anotar e entregar à paciente. ' +
                    'A paciente será forçada a trocá-la no primeiro login. ' +
                    'Se já existia uma senha, ela é invalidada.'
                );
                if (!ok) return;
                try {
                  const result = await setPatientPassword(patient.id);
                  setGeneratedPassword(result);
                  recordAudit({
                    action: 'patient.password.set.client',
                    resourceType: 'patient',
                    resourceId: patient.id,
                  });
                } catch (err) {
                  alert(`Erro ao gerar senha: ${err.message}`);
                }
              }}
              disabled={patient.status === 'deleted'}
            >
              <KeyRound size={14} /> Gerar senha
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setConfirmDelete(true)}
              disabled={patient.status === 'deleted'}
            >
              <Trash2 size={14} /> Apagar
            </button>
          </div>
        )}
      </header>

      {/* Modal de senha gerada */}
      {generatedPassword && (
        <div className="password-modal">
          <div className="password-modal-card">
            <header>
              <KeyRound size={20} />
              <h3>Senha temporária gerada</h3>
              <button
                type="button"
                className="banner-close"
                onClick={() => setGeneratedPassword(null)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </header>
            <p className="password-modal-info">
              Anote ou imprima essa senha e <strong>entregue presencialmente</strong> à paciente.
              Ela <strong>será obrigada a trocá-la no primeiro login</strong>.
            </p>
            <div className="password-fields">
              <div className="password-field">
                <label>Login (email gerado)</label>
                <div className="password-row">
                  <code>{generatedPassword.loginEmail}</code>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(generatedPassword.loginEmail)}
                    className="btn btn-secondary"
                  >
                    <Copy size={14} /> Copiar
                  </button>
                </div>
                <small>A paciente usa esse email + senha pra entrar.</small>
              </div>
              <div className="password-field">
                <label>Senha temporária</label>
                <div className="password-row">
                  <code className="password-value">{generatedPassword.password}</code>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(generatedPassword.password)}
                    className="btn btn-primary"
                  >
                    <Copy size={14} /> Copiar
                  </button>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setGeneratedPassword(null)}
              >
                <Check size={16} /> Já anotei, entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {confirmDelete && (
        <div className="password-modal">
          <div className="password-modal-card">
            <header>
              <Trash2 size={20} color="#dc2626" />
              <h3>Confirmar exclusão</h3>
              <button
                type="button"
                className="banner-close"
                onClick={() => setConfirmDelete(false)}
              >
                <X size={18} />
              </button>
            </header>
            <p>
              Tem certeza que deseja excluir <strong>{patient.full_name}</strong>?
            </p>
            <p className="muted">
              A paciente é marcada como <strong>excluída</strong> (soft delete). Os arquivos no R2 e
              no Stream são mantidos e apagados automaticamente após o período de carência. A
              auditoria LGPD permanece. Esta ação pode ser revertida via banco.
            </p>
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  try {
                    await deletePatient(patient.id);
                    recordAudit({
                      action: 'patient.delete.client',
                      resourceType: 'patient',
                      resourceId: patient.id,
                    });
                    navigate(`${basePath}/pacientes`);
                  } catch (err) {
                    alert(`Erro: ${err.message}`);
                  }
                }}
              >
                <Trash2 size={14} /> Excluir definitivamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form de edição */}
      {editing && (
        <PatientEditForm
          patient={patient}
          onSaved={() => {
            setEditing(false);
            reload();
          }}
          onCancel={() => setEditing(false)}
        />
      )}

      {/* Contadores */}
      <div className="counters-grid">
        <CounterCard icon={FileVideo} label="Vídeos" value={counters.videos} />
        <CounterCard icon={FileImage} label="Fotos" value={counters.photos} />
        <CounterCard icon={Activity} label="Acessos da paciente" value={accessCount} />
        <CounterCard icon={Share2} label="Compartilhamentos" value={shareCount} />
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Exames ({counters.exams})</h2>
          {!showNewExam && (
            <button className="btn btn-primary" onClick={() => setShowNewExam(true)}>
              <Plus size={16} /> Novo exame
            </button>
          )}
        </div>

        {showNewExam && (
          <div className="new-exam-card">
            <h3>Novo exame</h3>
            <ExameForm
              patientId={patient.id}
              onCreated={() => {
                setShowNewExam(false);
                reload();
              }}
              onCancel={() => setShowNewExam(false)}
            />
          </div>
        )}

        {patient.memo_exams.length === 0 ? (
          <div className="empty-state">
            Nenhum exame cadastrado ainda. Clica em &ldquo;Novo exame&rdquo; para começar.
          </div>
        ) : (
          <ul className="exam-list">
            {patient.memo_exams.map(exam => (
              <li key={exam.id} className="exam-card">
                <button
                  className="exam-header"
                  onClick={() => setExpandedExamId(prev => (prev === exam.id ? null : exam.id))}
                >
                  {expandedExamId === exam.id ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                  <div className="exam-summary">
                    <strong>{new Date(exam.exam_date).toLocaleDateString('pt-BR')}</strong>
                    {exam.exam_type && (
                      <span className="exam-tag">
                        {TYPE_LABELS[exam.exam_type] || exam.exam_type}
                      </span>
                    )}
                    {exam.device && <span className="exam-tag">{DEVICE_LABELS[exam.device]}</span>}
                    <span className={`badge ${exam.paid ? 'badge-active' : 'badge-pending'}`}>
                      {exam.paid ? (
                        <>
                          <CircleCheck size={12} /> Pago
                        </>
                      ) : (
                        <>
                          <CircleAlert size={12} /> Não pago
                        </>
                      )}
                    </span>
                  </div>
                  <span className="exam-media-count">
                    {exam.memo_media.length} {exam.memo_media.length === 1 ? 'mídia' : 'mídias'}
                  </span>
                </button>

                {expandedExamId === exam.id && (
                  <div className="exam-body">
                    {exam.notes && (
                      <p className="exam-notes">
                        <em>{exam.notes}</em>
                      </p>
                    )}

                    {!exam.paid && (
                      <div className="exam-pay-cta">
                        <span>
                          Esse exame ainda não foi pago. Acesso da paciente continua bloqueado até
                          marcar como pago.
                        </span>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={async () => {
                            const ok = window.confirm(
                              `Marcar exame de ${new Date(exam.exam_date).toLocaleDateString(
                                'pt-BR'
                              )} como pago (R$ 30,00)?`
                            );
                            if (!ok) return;
                            try {
                              await markExamPaid(exam.id, 3000);
                              recordAudit({
                                action: 'exam.mark_paid.client',
                                resourceType: 'exam',
                                resourceId: exam.id,
                              });
                              reload();
                            } catch (err) {
                              alert(`Erro: ${err.message}`);
                            }
                          }}
                        >
                          <CircleCheck size={14} /> Marcar como pago
                        </button>
                      </div>
                    )}

                    {exam.memo_media.length > 0 && (
                      <div className="media-list">
                        {exam.memo_media.map(m => (
                          <div key={m.id} className={`media-item media-${m.kind}`}>
                            {m.kind === 'video' ? <Film size={16} /> : <ImageIcon size={16} />}
                            <span className="media-name">{m.filename || m.id}</span>
                            <span className="media-meta">
                              {m.kind === 'video' ? 'Vídeo' : 'Foto'}
                              {m.size_bytes && ` · ${Math.round(m.size_bytes / 1024)} KB`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <MidiaUploader
                      patientId={patient.id}
                      examId={exam.id}
                      onUploaded={() => reload()}
                    />

                    {exam.paid && exam.expires_at && (
                      <p className="exam-footer-info">
                        Acesso da paciente até{' '}
                        {new Date(exam.expires_at).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function CounterCard({ icon: Icon, label, value }) {
  return (
    <div className="stat-card">
      <Icon className="stat-icon" />
      <div className="stat-text">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}

function PatientEditForm({ patient, onSaved, onCancel }) {
  const [form, setForm] = useState({
    fullName: patient.full_name,
    phone: patient.phone,
    cpfLast4: patient.cpf_last4,
    email: patient.email || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function normalizePhone(raw) {
    const digits = (raw || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('55')) return `+${digits}`;
    return `+55${digits}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const phone = normalizePhone(form.phone);
      if (!/^\+\d{12,15}$/.test(phone)) {
        throw new Error('Telefone parece incompleto. Inclua DDD + número.');
      }
      await updatePatient({
        id: patient.id,
        fullName: form.fullName.trim(),
        phone,
        cpfLast4: form.cpfLast4.trim(),
        email: form.email.trim(),
      });
      recordAudit({
        action: 'patient.update.client',
        resourceType: 'patient',
        resourceId: patient.id,
      });
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="memo3d-form patient-edit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Nome completo *</span>
          <input
            type="text"
            required
            minLength={3}
            maxLength={255}
            value={form.fullName}
            onChange={e => update('fullName', e.target.value)}
          />
        </label>
      </div>
      <div className="form-row form-row-2">
        <label>
          <span>Celular *</span>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
          />
        </label>
        <label>
          <span>4 últimos dígitos do CPF *</span>
          <input
            type="text"
            required
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            value={form.cpfLast4}
            onChange={e => update('cpfLast4', e.target.value.replace(/\D/g, ''))}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Email</span>
          <input
            type="email"
            maxLength={255}
            value={form.email}
            onChange={e => update('email', e.target.value)}
          />
        </label>
      </div>
      {error && <div className="error-banner">{error}</div>}
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </form>
  );
}
