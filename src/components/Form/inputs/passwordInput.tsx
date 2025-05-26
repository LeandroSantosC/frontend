import React, { useEffect, useState } from 'react';
import { FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

export function PasswordInput({ setData, autoComplete, data, isEdit }: { setData: React.Dispatch<React.SetStateAction<string | undefined>>, autoComplete?: string, data?: string, isEdit?: boolean }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');
  const valueId = 'password';

  useEffect(() => {
      if(data){
        setRawValue(data);
      }
      }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setRawValue(data);

    if (data.length == 0 && isEdit) return;

    if (data.length < 6) {
      setError(true);
      setHelper('Por favor, insira uma senha maior que 6 caracteres');
      setData('');
      return;
    }
    setData(data);
    setHelper('');
    setError(false);
  };

  return (
    <>
      <OutlinedInput
        value={rawValue}
        onChange={handleChange}
        onBlur={() => {
          if (error) {
            setHelper('Por favor, insira uma senha maior que 6 caracteres');
          }
          else {
            setHelper('');
          }
        }}
        required={!isEdit}
        fullWidth
        name={valueId}
        placeholder="••••••"
        id={valueId}
        autoComplete={autoComplete ? autoComplete : "new-password"}
        error={error}
        sx={{
          borderRadius: '12px',
        }}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? 'hide the password' : 'display the password'
              }
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Icon icon="material-symbols-light:visibility-off-rounded" width="32" height="32" /> : <Icon icon="material-symbols-light:visibility-rounded" width="32" height="32" />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={error}>{helper}</FormHelperText>
    </>
  );
}
