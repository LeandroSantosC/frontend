import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function Register() {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!user.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório';
    }
    
    if (!user.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!user.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (user.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulando uma chamada de API
      // Substitua isso pela sua API real quando estiver pronta
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando sucesso no cadastro
      console.log('Usuário cadastrado com sucesso:', {
        username: user.username,
        email: user.email
      });
      
      // Mostrar popup de sucesso
      setShowSuccessPopup(true);
      
      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => {
        navigate('/settings');
      }, 2000);
    } catch (error) {
      setErrors({ general: 'Ocorreu um erro ao tentar cadastrar. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
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
            <p className="mt-2 text-sm text-gray-600">CRIAR NOVA CONTA</p>
          </div>
        </div>

        {showSuccessPopup && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Cadastro efetuado com sucesso! Redirecionando para o login...
                </p>
              </div>
            </div>
          </div>
        )}

        {errors.general && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Digite seu nome de usuário"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

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
              value={user.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Digite seu email"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
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
              className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Digite sua senha"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Confirme sua senha"
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-lg text-white font-medium"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                backdropFilter: 'blur(2px)',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
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