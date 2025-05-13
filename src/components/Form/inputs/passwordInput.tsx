import React, { useState } from 'react';
import { FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

export function PasswordInput({ setData, autoComplete }: { setData: React.Dispatch<React.SetStateAction<string>>, autoComplete?: string }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');
  const valueId = 'password';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;

    setError(false);
    setHelper('');
    setData('');
    setRawValue(data);
    if (rawValue.length < 6) {
      setError(true);
      return;
    }
    setData(data);
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
        required
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
