import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { getPatient } from '../../../lib/memo3d/api';
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
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewExam, setShowNewExam] = useState(false);
  const [expandedExamId, setExpandedExamId] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const p = await getPatient(id);
      setPatient(p);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

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
        <Link to="/admin/memo3d/pacientes" className="back-link">
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
          <Link to="/admin/memo3d/pacientes" className="back-link">
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
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Exames ({patient.memo_exams.length})</h2>
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

                    <p className="exam-footer-info">
                      {exam.paid
                        ? `Acesso da paciente até ${new Date(exam.expires_at).toLocaleDateString('pt-BR')}`
                        : 'Marque como pago no fluxo da Fase 2.3 para liberar acesso da paciente.'}
                    </p>
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
