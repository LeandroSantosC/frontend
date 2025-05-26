import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

export function NameInput({ setData, data }: { setData: React.Dispatch<React.SetStateAction<string | undefined>>, data?: string }) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');
  const valueId = 'name';

  useEffect(() => {
      if(data){
        setRawValue(data);
      }
      }, [data])

  const format = (value: string): string => {
    const name = value.replace(/[^\p{L}\s]/gu, '');

    return name;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyLetters = format(e.target.value);

    setError(false);
    setHelper('');
    setData('');
    if(!error){
        setRawValue(onlyLetters);
        setData(onlyLetters);
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
      placeholder="José da Silva"
      error={error}
      helperText={helper}
      variant="outlined"
      value={rawValue}
      onBlur={() => {
        if(rawValue.length == 0){
            setError(true);
            setHelper('Por favor, insira um nome');
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
