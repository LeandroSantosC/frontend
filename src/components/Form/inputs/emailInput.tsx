import React, { useState } from 'react';
import { TextField } from '@mui/material';

export function EmailInput({setData}: { setData: React.Dispatch<React.SetStateAction<string>> }) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');
  const valueId = 'email';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;

    setError(false);
    setHelper('');
    setData('');
    if(!error){
        setRawValue(data);
        setData(data);
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
      required
      fullWidth
      id={valueId}
      placeholder="seu@email.com"
      error={error}
      helperText={helper}
      variant="outlined"
      value={rawValue}
      onBlur={() => {
        if(!/\S+@\S+\.\S+/.test(rawValue)){
            setError(true);
            setHelper('Por favor, insira um email válido');
        }
        else{
            setError(false);
            setHelper('');
        }
      }}
      onChange={handleChange}
    />
  );
}
