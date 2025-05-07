import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation, useNavigate } from 'react-router';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  borderRadius: '32px',
  zIndex: 10,
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  height: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
    height: 'auto'
  },
}));

const SignUpContainer = styled(Stack)({
  height: '100vh',
  width: '100vw',
  position: "absolute",
})

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterOpen = new URLSearchParams(location.search).get('register') === 'true';

  const openLogin = () => {
    navigate('?login=true');
  };

  const closeRegister = () => {
    navigate('/');
  };


  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor, insira um email válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha precisa ter mais que 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Nome é requerido.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (isRegisterOpen &&
    <>
      <SignUpContainer direction="column" justifyContent="space-between">
        <div
          onClick={closeRegister}
          style={{
            backgroundImage:
              'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
          }}
        />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
          >
            Registrar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="name">Nome completo</FormLabel>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="José Santos"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="email">Email</FormLabel>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
                required
                fullWidth
                id="email"
                placeholder="seu@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="password">Senha</FormLabel>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              required
              sx={{
                '& .MuiFormControlLabel-asterisk': {
                  display: 'none',
                },
              }}
              control={<Checkbox value="acceptTerms" color="primary" />}
              label={<Typography sx={{ textAlign: 'center' }}>
                Eu concordo com os{' '}
                <Link
                  href=""
                  sx={{ alignSelf: 'center' }}
                >
                  Termos e Condições
                </Link>
              </Typography>}
            />
            <Button
              sx={{ borderRadius: '12px' }}
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Registrar
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              sx={{ borderRadius: '12px' }}
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<Icon icon="flat-color-icons:google" width="24" height="24" />}
            >
              Registrar-se com o Google
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Ja tem uma conta ?{' '}
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={openLogin}
              >
                Entre aqui
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}