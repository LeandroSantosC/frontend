import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Profile() {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundColor: 'rgba(144, 238, 144, 0.3)',
        backdropFilter: 'blur(2px)'
      }}
    >
      <div
        className="relative w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(144, 238, 144, 0.2)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/Img1.jpg)' }}></div>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl p-2 rounded-full z-20"
              style={{
                backgroundColor: 'rgba(144, 238, 144, 0.3)',
                backdropFilter: 'blur(2px)',
                border: '1px solid rgba(144, 238, 144, 0.2)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              ↩
            </button>
            <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wider" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', letterSpacing: '0.1em' }}>
              MATRACA
            </h1>
            <p className="mt-2 text-sm text-gray-600">Criar nova conta</p>
          </div>
        </div>

        <div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continuar com Google</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite seu nome completo"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite seu e-mail"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite sua senha"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Confirme sua senha"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-lg text-white font-medium"
              style={{
                backgroundColor: 'rgba(144, 238, 144, 0.8)',
                backdropFilter: 'blur(2px)',
                border: '1px solid rgba(144, 238, 144, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              Cadastrar
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/settings')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}