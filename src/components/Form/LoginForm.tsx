import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserLogin } from '../../context/AuthContext';
import { PasswordInput } from './inputs/passwordInput';
import { EmailInput } from './inputs/emailInput';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Coloque seu email e lhe enviaremos o link para troca de senha.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  borderRadius: '32px',
  zIndex: 100,
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

const SignInContainer = styled(Stack)({
  position: "absolute",
  height: '100vh',
  width: '100vw',
});

export default function SignIn() {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginOpen = new URLSearchParams(location.search).get('login') === 'true';
  const { login, userSnack } = useAuth();

  const openRegister = () => {
    navigate('?register=true');
  };

  const closeLogin = () => {
    navigate('/');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!isValid) {
      return;
    }

    if(email && password){
      const userLogin: UserLogin = {
        login: email,
        password: password,
      }
      
      login(userLogin, rememberMe).then((resolve) => {
        if(resolve){
          closeLogin()
        }
      }).finally(() => {
        setLoading(false)
      })
    }
    
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      isValid = false;
    }

    if (!password) {
      isValid = false;
    }

    return setIsValid(isValid);
  };

  return (isLoginOpen &&
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <div
          onClick={closeLogin}
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
            Entrar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl
            disabled={isLoading}>
              <EmailInput setData={setEmail} />
            </FormControl>
            <FormControl
            disabled={isLoading}>
              <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="password">Senha</FormLabel>
              <PasswordInput autoComplete="current-password" setData={setPassword} />
            </FormControl>
            <FormControlLabel
              disabled={isLoading}
              sx={{
                '& .MuiFormControlLabel-asterisk': {
                  display: 'none',
                },
              }}
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
              label={<Typography sx={{ textAlign: 'center' }}>
                Lembre-se de mim
              </Typography>}
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              loading={isLoading}
              sx={{ borderRadius: '12px' }}
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Entrar
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
              disabled={isLoading}
            >
              Esqueceu sua senha?
            </Link>
          </Box>
          <Divider>ou</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              loading={isLoading}
              sx={{ borderRadius: '12px' }}
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<Icon icon="flat-color-icons:google" width="24" height="24" />}
              href="/login/oauth2/code/google"
            >
              Entre com o google
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Não tem uma conta?{' '}
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={openRegister}
                disabled={isLoading}
              >
                Registre-se
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      {userSnack()}
    </>
  );
}