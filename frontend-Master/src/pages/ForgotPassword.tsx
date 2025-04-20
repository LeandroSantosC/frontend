import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica de email
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    // Simulação de envio de email de recuperação
    console.log('Enviando email de recuperação para:', email);
    
    // Mostrar mensagem de sucesso
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/im1.png)' }}></div>
          <div className="relative z-10 text-center">
            <button
              onClick={() => {
                console.log('Back button clicked, navigating to previous page');
                try {
                  navigate(-1);
                } catch (error) {
                  console.error('Navigation failed:', error);
                  window.history.back();
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(2px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontSize: '1.5rem'
              }}
            >
              ↩
            </button>
            <h1 
              className="text-5xl font-bold uppercase tracking-wider" 
              style={{ 
                fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                letterSpacing: '0.1em',
                /* transform: 'perspective(500px) rotateX(10deg)', */
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text'
              }}
            >
              <span style={{ 
                background: 'linear-gradient(45deg, #FF9A9E, #FAD0C4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>M</span>
              <span style={{ 
                background: 'linear-gradient(45deg, #A1C4FD, #C2E9FB)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>A</span>
              <span style={{ 
                background: 'linear-gradient(45deg, #FFECD2, #FCB69F)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>T</span>
              <span style={{ 
                background: 'linear-gradient(45deg, #84FAB0, #8FD3F4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>R</span>
              <span style={{ 
                background: 'linear-gradient(45deg, #FF9A9E, #FAD0C4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>A</span>
              <span style={{ 
                background: 'linear-gradient(45deg, #A1C4FD, #C2E9FB)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>C</span>
              <span style={{ 
                background: 'linear-gradient(45deg, #FFECD2, #FCB69F)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>A</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">RECUPERAR SENHA</p>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Digite seu email cadastrado"
                required
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(2px)'
                }}
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-lg text-white font-medium"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  backdropFilter: 'blur(2px)',
                  transition: 'all 0.3s ease'
                }}
              >
                Enviar instruções
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-green-600 text-xl">✓</div>
            <h3 className="text-xl font-medium">Email enviado!</h3>
            <p className="text-gray-600">
              Enviamos instruções para redefinir sua senha para o email {email}.
              Por favor, verifique sua caixa de entrada.
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Voltar para o login
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 