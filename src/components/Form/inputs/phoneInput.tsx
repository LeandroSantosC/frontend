import React, { useEffect, useState } from 'react';
import { MuiTelInput } from 'mui-tel-input'
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

export function PhoneInput({ setData, data }: { setData: React.Dispatch<React.SetStateAction<string | undefined>>, data?: string }) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = React.useState(false);
  const [helper, setHelper] = React.useState('');

  useEffect(() => {
      if(data){
        setRawValue(data);
      }
      }, [data])

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
      value={rawValue}
      onBlur={() => {
        if (isValidPhoneNumber(rawValue)) {
          setError(false);
          setHelper('');
        }
        else {
          setError(true);
          setHelper('Por favor, insira um número de celular válido');
        }
      }}
      onChange={(value) => {
        setRawValue(value);
        const parsed = parsePhoneNumberFromString(value)
        if (isValidPhoneNumber(value) && parsed?.isValid) {
          setData(parsed.number);
          setError(false);
          setHelper('');
        } else {
          setData('');
          setError(true);
          setHelper('Por favor, insira um número de celular válido');
        }
      }}
    />
  );
}
