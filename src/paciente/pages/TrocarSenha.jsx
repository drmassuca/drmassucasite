import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, KeyRound } from 'lucide-react';
import { changePatientPassword } from '../../lib/memo3d/api';
import '../paciente.css';

export default function TrocarSenha() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (pwd !== confirm) {
      setError('As senhas não conferem.');
      return;
    }
    if (pwd.length < 8) {
      setError('A senha deve ter ao menos 8 caracteres.');
      return;
    }
    if (!/[A-Za-z]/.test(pwd) || !/[0-9]/.test(pwd)) {
      setError('A senha deve ter ao menos uma letra e um número.');
      return;
    }
    setLoading(true);
    try {
      await changePatientPassword(pwd);
      navigate('/memo3d/conta', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="troca-senha-page">
      <div className="troca-senha-card">
        <h1>
          <KeyRound
            size={22}
            style={{ verticalAlign: 'middle', marginRight: 8, color: '#d4af37' }}
          />
          Defina sua senha pessoal
        </h1>
        <p>
          Esta é sua primeira entrada. Por segurança, troque a senha temporária que recebeu na
          recepção por uma de sua escolha. Você usará essa senha para entrar daqui em diante.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>
              <Lock size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Nova senha
            </span>
            <input
              type="password"
              required
              minLength={8}
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              autoFocus
              autoComplete="new-password"
            />
          </label>
          <label>
            <span>
              <Lock size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Confirme a nova
              senha
            </span>
            <input
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </label>

          <div className="troca-senha-rules">
            A senha precisa:
            <ul>
              <li>Ter ao menos 8 caracteres</li>
              <li>Conter ao menos uma letra</li>
              <li>Conter ao menos um número</li>
            </ul>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spin" size={16} /> Salvando…
              </>
            ) : (
              'Confirmar nova senha'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
