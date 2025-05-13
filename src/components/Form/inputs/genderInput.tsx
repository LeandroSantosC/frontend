import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';

export function GenderInput({ setData }: { setData: React.Dispatch<React.SetStateAction<string>> }) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');
  const valueId = 'gender';

  const values = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setError(false);
    setHelper('');
    setData('');
    if (!error) {
      setRawValue(value);
      setData(value);
    }
  };

  return (
    <TextField
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
      }}
      autoComplete={valueId}
      name={valueId}
      select
      required
      fullWidth
      id={valueId}
      placeholder="Masculino"
      error={error}
      helperText={helper}
      variant="outlined"
      value={rawValue}
      onBlur={() => {
        if (!rawValue) {
          setError(true);
          setHelper('Por favor, selecione um gênero');
        }
        else {
          setError(false);
          setHelper('');
        }
      }}
      onChange={handleChange}
    >
      {values.map((option) => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ))
      }
    </TextField>
  );
}
