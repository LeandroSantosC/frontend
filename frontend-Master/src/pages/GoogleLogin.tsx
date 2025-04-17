import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
}

export default function GoogleLogin() {
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Google login data:', user);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/im1.png)' }}></div>
          <div className="relative z-10 text-center">
            <h1 
              className="text-5xl font-bold uppercase tracking-wider" 
              style={{ 
                fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                letterSpacing: '0.1em',
                transform: 'perspective(500px) rotateX(10deg)',
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
            <p className="mt-2 text-sm text-gray-600">Login com Google</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email do Google
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite seu email do Google"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Esqueceu sua senha?
              </a>
            </div>
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
              Entrar com Google
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Voltar para{' '}
            <button 
              onClick={() => navigate('/settings')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login normal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 