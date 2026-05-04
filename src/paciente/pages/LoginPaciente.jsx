import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../paciente.css';

const ERROR_MESSAGES = {
  'Invalid login credentials': 'Email ou senha incorretos.',
  'Email not confirmed': 'Email ainda não confirmado.',
  'Too many requests': 'Muitas tentativas. Aguarde alguns minutos.',
};

export default function LoginPaciente() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) throw err;
      // Limpa marker de sessão pra que Conta.jsx registre patient.login fresh
      // (em vez de re-usar marker de sessão antiga, se existir).
      try {
        window.sessionStorage.removeItem('memo3d_login_recorded');
      } catch (_) {
        /* ignora */
      }
      navigate('/memo3d/conta');
    } catch (err) {
      setError(ERROR_MESSAGES[err.message] || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="paciente-login-page">
      <div className="paciente-login-card">
        <div className="paciente-login-logo">
          <img src="/logo.webp" alt="Dr. Massuca" className="paciente-login-logo-img" />
          <h1>Memo3D</h1>
          <p>suas memórias da gestação</p>
        </div>

        <form onSubmit={handleSubmit} className="paciente-login-form">
          <label>
            <span>
              <Mail size={14} /> Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              autoComplete="email"
              placeholder="seu@email.com"
            />
          </label>

          <label>
            <span>
              <Lock size={14} /> Senha
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spin" size={16} /> Entrando…
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <p className="paciente-login-footer">
          Use o email do seu cadastro e a senha entregue pela recepção.
          <br />
          Em caso de dúvida, fale com a recepção pelo WhatsApp.
        </p>
      </div>
    </div>
  );
}
