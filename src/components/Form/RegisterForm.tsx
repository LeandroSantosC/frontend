import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { PhoneInput } from './inputs/phoneInput';
import { EmailInput } from './inputs/emailInput';
import { NameInput } from './inputs/nameInput';
import { GenderInput } from './inputs/genderInput';
import { BirthDateInput } from './inputs/birthDateInput';
import { PasswordInput } from './inputs/passwordInput';
import { UserRegister } from '../../context/AuthContext';
import { isValidPhoneNumber } from 'libphonenumber-js';

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

  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterOpen = new URLSearchParams(location.search).get('register') === 'true';
  const [isValid, setIsValid] = React.useState(false);
  const [date, setDate] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');


  const openLogin = () => {
    navigate('?login=true');
  };

  const closeRegister = () => {
    navigate('/');
  };


  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      console.log('email ' + email + ' não ta valido')
    }

    if (!password || password.length < 6) {
      isValid = false;
      console.log('senha ' + password + ' não ta valido')
    }

    if (isValidPhoneNumber(phone)) {
      isValid = false;
      console.log('telefone ' + phone + ' não ta valido')
    }

    if (!name) {
      isValid = false;
      console.log('nome ' + name + ' não ta valido')
    }

    if (!gender) {
      isValid = false;
      console.log('sexo ' + gender + ' não ta valido')
    }

    if (!dayjs(date).isValid() || dayjs(date).isAfter(dayjs()) || dayjs(date).isBefore(dayjs().subtract(100, 'year'))) {
      isValid = false;
      console.log('data ' + date + ' não ta valido')
    }

    setIsValid(isValid);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!isValid) {
      event.preventDefault();
      return;
    }
    const data: UserRegister = {
      fullname: name,
      email: email,
      phoneNumber: phone,
      gender: gender as "masculino" | "feminino",
      birthDate: date,
      login: email,
      password: password,
    }
    console.log(data);
    event.preventDefault();
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
            <div className='overflow-y-scroll w-full flex flex-col h-[45vh]'>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="name">Nome completo</FormLabel>
                <NameInput setData={setName}/>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="email">Email</FormLabel>
                <EmailInput setData={setEmail}/>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="phone">Telefone</FormLabel>
                <PhoneInput setPhone={setPhone}/>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="gender">Genero</FormLabel>
                <GenderInput setData={setGender} />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="birthDate">Data de Nascimento</FormLabel>
                <BirthDateInput setData={setDate} />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="password">Senha</FormLabel>
                <PasswordInput setData={setPassword} />
              </FormControl>
            </div>
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