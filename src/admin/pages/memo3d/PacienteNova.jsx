import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { createPatient } from '../../../lib/memo3d/api';
import { recordAudit } from '../../../lib/memo3d/audit';
import './memo3d.css';

/**
 * Normaliza o telefone digitado pra formato E.164.
 *  - Remove tudo que não é dígito.
 *  - Se já começa com 55, prefixa apenas com '+'.
 *  - Senão, prefixa com '+55'.
 */
function normalizePhone(raw) {
  const digits = (raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55')) return `+${digits}`;
  return `+55${digits}`;
}

export default function Memo3dPacienteNova() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', phone: '', cpfLast4: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const phone = normalizePhone(form.phone);
      if (!/^\+\d{12,15}$/.test(phone)) {
        throw new Error('Telefone parece incompleto. Inclua DDD + número.');
      }
      const patient = await createPatient({
        fullName: form.fullName.trim(),
        phone,
        cpfLast4: form.cpfLast4.trim(),
        email: form.email.trim() || undefined,
      });
      // Auditoria adicional client-side (o server já registra, mas redundância
      // ajuda em debugging caso o endpoint server falhe silenciosamente).
      recordAudit({
        action: 'patient.create.client',
        resourceType: 'patient',
        resourceId: patient.id,
      });
      navigate(`/admin/memo3d/pacientes/${patient.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="memo3d-page">
      <header className="page-header">
        <div>
          <Link to="/admin/memo3d/pacientes" className="back-link">
            <ArrowLeft size={16} /> Voltar para a lista
          </Link>
          <h1>Nova paciente Memo3D</h1>
          <p>Cadastro mínimo. Exames e mídias são adicionados depois.</p>
        </div>
      </header>

      <form className="memo3d-form" onSubmit={handleSubmit} noValidate>
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
              autoFocus
            />
          </label>
        </div>

        <div className="form-row form-row-2">
          <label>
            <span>Celular *</span>
            <input
              type="tel"
              required
              placeholder="(62) 99999-8888"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
            />
            <small>DDD + número. Sistema converte para +55 automaticamente.</small>
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
            <small>Segundo fator no link de primeiro acesso e QR.</small>
          </label>
        </div>

        <div className="form-row">
          <label>
            <span>Email (opcional)</span>
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
          <Link to="/admin/memo3d/pacientes" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            <Save size={16} />
            {submitting ? 'Salvando...' : 'Cadastrar paciente'}
          </button>
        </div>
      </form>
    </div>
  );
}
