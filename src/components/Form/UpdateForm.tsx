import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router';
import { PhoneInput } from './inputs/phoneInput';
import { EmailInput } from './inputs/emailInput';
import { NameInput } from './inputs/nameInput';
import { GenderInput } from './inputs/genderInput';
import { BirthDateInput } from './inputs/birthDateInput';
import { PasswordInput } from './inputs/passwordInput';
import { useAuth, UserData } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { Card, Container } from './LoginForm'
import { Icon } from '@iconify/react/dist/iconify.js';


export default function UpdateForm() {
  const [isLoading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdateOpen = user && new URLSearchParams(location.search).get('update') === 'true';
  const [date, setDate] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  useEffect(() => {
  if (user) {
    setDate(user.birthDate);
    setPhone(user.phoneNumber);
    setName(user.fullname);
    setEmail(user.email);
    setGender(user.gender);
  }
}, [user]);


function deepEqualSubset(a: UserData, b: UserData | null): boolean {
  for (const key in b) {
    if (!(key in a)) continue; // ignora chaves que não existem em 'a'

    const valA = (a as Record<string, unknown>)[key];
    const valB = (b as Record<string, unknown>)[key];

    const bothAreObjects = valA && valB && typeof valA === 'object' && typeof valB === 'object';

    if (bothAreObjects) {
      if (!deepEqualSubset(valA, valB)) {
        return false;
      }
    } else if (valA !== valB) {
      return false;
    }
  }

  return true;
}

  const closeRegister = () => {
    navigate('/');
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      console.log('email ' + email + ' não ta valido')
    }

    if (password && password.length < 6 && password.length > 0) {
      isValid = false;
      console.log('senha ' + password + ' não ta valido')
    }

    if (!phone) {
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

    if (!date) {
      isValid = false;
      console.log('data ' + date + ' não ta valido')
    }

    return isValid
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const valid = validateInputs();
    if (!valid) {
      setLoading(false);
      return;
    }
    const data: UserData = {
      fullname: name,
      email: email,
      phoneNumber: phone,
      gender: gender as "masculino" | "feminino",
      birthDate: date,
      credentials: {
        login: email,
        password: password
      }
    }

    console.log(data);
    console.log(user);
    console.log(deepEqualSubset(data, user));
    if(deepEqualSubset(data, user)){
      console.log("nao fez req")
      setLoading(false);
      navigate("/");
      return;
    }

    updateUser(data).then((resolve) => {
      console.log("cagou")
        if(resolve){
          closeRegister()
        }
      }).finally(() => {
        setLoading(false)
      })
  };

  return (isUpdateOpen &&
    <>
      <Container direction="column" justifyContent="space-between">
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
          <div className='flex relative flex-row justify-center items-center'>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
              >
              Perfil
            </Typography>
            <Icon className='absolute right-0' icon="line-md:close-circle-filled" width="30" height="30" color={'#1976d2'} onClick={closeRegister} />
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', 
              position: 'relative', 
              flexDirection: 'column', 
              gap: 2, 
              height: '90%', 
              boxSizing: 'border-box',
              margin: '0'
             }}
          >
            <div className='overflow-auto w-full flex flex-col h-full'>
              <FormControl fullWidth variant="outlined"
              disabled={isLoading}>
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="name">Nome completo</FormLabel>
                <NameInput setData={setName} data={name}/>
              </FormControl>
              <FormControl fullWidth variant="outlined"
              disabled={isLoading}>
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="email">Email</FormLabel>
                <EmailInput setData={setEmail} data={email}/>
              </FormControl>
              <FormControl fullWidth variant="outlined"
              disabled={isLoading}>
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="phone">Telefone</FormLabel>
                <PhoneInput setData={setPhone} data={phone}/>
              </FormControl>
              <FormControl fullWidth variant="outlined"
              disabled={isLoading}>
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="gender">Genero</FormLabel>
                <GenderInput setData={setGender} data={gender} />
              </FormControl>
              <FormControl fullWidth variant="outlined"
              disabled={isLoading}>
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="birthDate">Data de Nascimento</FormLabel>
                <BirthDateInput setData={setDate} data={date} />
              </FormControl>
              <FormControl fullWidth variant="outlined"
              disabled={isLoading}>
                <FormLabel sx={{ paddingLeft: 0.5 }} htmlFor="password">Senha</FormLabel>
                <PasswordInput setData={setPassword} isEdit />
              </FormControl>
            </div>
            <Button
              sx={{ borderRadius: '12px' }}
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
            >
              Atualizar
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}