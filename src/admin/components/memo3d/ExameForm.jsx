import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { createExam } from '../../../lib/memo3d/api';
import { recordAudit } from '../../../lib/memo3d/audit';

const EXAM_TYPES = [
  { value: '', label: 'Selecionar...' },
  { value: 'morfologico_1tri', label: 'Morfológico 1º trimestre' },
  { value: 'morfologico_2tri', label: 'Morfológico 2º trimestre' },
  { value: 'doppler', label: 'Doppler obstétrico' },
  { value: 'obstetrico', label: 'Obstétrico de rotina' },
  { value: '4d', label: '4D' },
  { value: 'outro', label: 'Outro' },
];

const DEVICES = [
  { value: '', label: 'Selecionar...' },
  { value: 'voluson_s10', label: 'GE Voluson S10' },
  { value: 'hera_z20', label: 'Samsung HERA Z20' },
];

export default function ExameForm({ patientId, onCreated, onCancel }) {
  const [form, setForm] = useState({
    examDate: new Date().toISOString().slice(0, 10),
    examType: '',
    device: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const exam = await createExam({
        patientId,
        examDate: form.examDate,
        examType: form.examType || undefined,
        device: form.device || undefined,
        notes: form.notes.trim() || undefined,
      });
      recordAudit({
        action: 'exam.create.client',
        resourceType: 'exam',
        resourceId: exam.id,
      });
      onCreated?.(exam);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="memo3d-form inline-form" onSubmit={handleSubmit}>
      <div className="form-row form-row-2">
        <label>
          <span>Data do exame *</span>
          <input
            type="date"
            required
            max={new Date().toISOString().slice(0, 10)}
            value={form.examDate}
            onChange={e => update('examDate', e.target.value)}
          />
        </label>

        <label>
          <span>Tipo</span>
          <select value={form.examType} onChange={e => update('examType', e.target.value)}>
            {EXAM_TYPES.map(t => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Aparelho</span>
          <select value={form.device} onChange={e => update('device', e.target.value)}>
            {DEVICES.map(d => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Observações</span>
          <textarea
            rows={3}
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Detalhes opcionais sobre o exame..."
          />
        </label>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          <X size={16} /> Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          <Save size={16} />
          {submitting ? 'Salvando...' : 'Adicionar exame'}
        </button>
      </div>
    </form>
  );
}
