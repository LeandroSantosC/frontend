import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ptBr from 'dayjs/locale/pt-br';

export function BirthDateInput({ setData, data }: { setData: React.Dispatch<React.SetStateAction<string | undefined>>, data?: string }) {
  const [date, setDate] = useState<Dayjs | null>(dayjs(null).locale(ptBr));
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState('');
  const valueId = 'bday';

  useEffect(() => {
    if (data) {
      setDate(dayjs(data).locale(ptBr));
    }
  }, [data])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        value={date}
        format='DD/MM/YYYY'
        onOpen={() => {
          setError(false);
          setHelper('');
        }
        }
        onChange={(date) => {
          setDate(date)

          if (!date || !date.isValid()) {
            return;
          }

          if (!date || date.isAfter(dayjs()) || date.isBefore(dayjs().subtract(100, 'year'))) {
            setError(true);
            setHelper('Por favor, insira uma data válida');
            setData('');
          } else {
            setError(false);
            setHelper('');
            setData(date.format('YYYY-MM-DD'));
          }
        }}
        slotProps={{
          textField: {
            error: error,
            helperText: helper,
            autoComplete: valueId,
            required: true,
            name: valueId,
            id: valueId,
            variant: 'outlined',
            fullWidth: true,
            InputProps: {
              sx: { borderRadius: '12px' }
            }
          },
        }}
      />
    </LocalizationProvider>
  );
}
