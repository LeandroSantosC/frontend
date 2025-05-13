import React, { useState } from 'react';
import { MuiTelInput } from 'mui-tel-input'
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function PhoneInput({setPhone}: { setPhone: React.Dispatch<React.SetStateAction<string>> }) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');

  return (
    <MuiTelInput
    sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
      }}
      autoComplete="phone"
      forceCallingCode
      name="phone"
      required
      fullWidth
      defaultCountry="BR"
      id="phone"
      error={error}
      helperText={helper}
      variant="outlined"
      value={parsePhoneNumberFromString(rawValue, 'BR')?.formatNational() || rawValue}
      onBlur={() => {
        if(rawValue.length == 0 || rawValue.length < 15){
            setError(true);
            setHelper('Por favor, insira um número de celular válido');
        }
        else{
            setError(false);
            setHelper('');
        }
      }}
      onChange={(value) => {
        setRawValue(value)
        setPhone('');
        if(rawValue.length == 0 || rawValue.length < 15){
            setError(true);
            setHelper('Por favor, insira um número de celular válido');
        }else{
            setError(false);
            setHelper('');
            setPhone(value.replace(/\D/g, ''));
        }
      }}
    />
  );
}
