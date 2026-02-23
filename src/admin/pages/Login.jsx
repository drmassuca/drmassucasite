import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithMagicLink } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [loginMode, setLoginMode] = useState('password'); // 'password' ou 'magic'

  const handlePasswordLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      console.error('Erro no login:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithMagicLink(email);
      setMagicLinkSent(true);
    } catch (err) {
      console.error('Erro no magic link:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = message => {
    const errors = {
      'Invalid login credentials': 'Email ou senha incorretos',
      'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
      'Too many requests': 'Muitas tentativas. Aguarde um momento.',
    };
    return errors[message] || 'Ocorreu um erro. Tente novamente.';
  };

  if (magicLinkSent) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Brain className="logo-icon" />
            </div>
            <h1>Verifique seu Email</h1>
          </div>

          <div className="magic-link-sent">
            <Mail className="sent-icon" />
            <p>Enviamos um link de acesso para:</p>
            <strong>{email}</strong>
            <p className="sent-note">Clique no link no email para fazer login automaticamente.</p>
            <button className="btn btn-secondary" onClick={() => setMagicLinkSent(false)}>
              Usar outro email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Brain className="logo-icon" />
          </div>
          <h1>IA Médica Admin</h1>
          <p>Faça login para acessar o painel</p>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="login-tabs">
          <button
            className={`tab ${loginMode === 'password' ? 'active' : ''}`}
            onClick={() => setLoginMode('password')}
          >
            <Lock size={16} />
            Senha
          </button>
          <button
            className={`tab ${loginMode === 'magic' ? 'active' : ''}`}
            onClick={() => setLoginMode('magic')}
          >
            <Mail size={16} />
            Magic Link
          </button>
        </div>

        {loginMode === 'password' ? (
          <form onSubmit={handlePasswordLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spinner-icon" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMagicLinkLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <p className="magic-link-info">
              Enviaremos um link de acesso para seu email. Sem senha necessária.
            </p>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spinner-icon" />
                  Enviando...
                </>
              ) : (
                'Enviar Magic Link'
              )}
            </button>
          </form>
        )}

        <div className="login-footer">
          <a href="/" className="back-link">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
