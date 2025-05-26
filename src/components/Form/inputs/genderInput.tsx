import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';

export function GenderInput({ setData, data }: { setData: React.Dispatch<React.SetStateAction<string | undefined>>, data?: string }) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');
  const valueId = 'gender';
  
  const values = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
  ]
  
  useEffect(() => {
      if(data){
        setRawValue(data);
      }
      }, [data])
  
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
