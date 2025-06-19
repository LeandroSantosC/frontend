import { Icon } from "@iconify/react/dist/iconify.js";
import { useCardContext } from "../../context/CardContext";
import { useToolsContext } from "../../context/ToolsContext";
import { Autocomplete, Checkbox, IconButton, TextField } from "@mui/material";


function Tools() {
  const { setCategorySelected, setSearch, editMode, setEditMode } = useToolsContext();
  const { categories } = useCardContext();

  return (
    <div className="flex items-center justify-around sticky bg-gray-100 p-1 h-[6%] w-full">
      <Autocomplete
        multiple
        disableCloseOnSelect
        popupIcon
        fullWidth
        limitTags={1}
        options={categories}
        sx={{
          width: '40%',
          height: '100%',
          '& .MuiAutocomplete-tag': {
            maxWidth: '100%',
            height: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          );
        }}
        onChange={(_, newValue) => {
          setCategorySelected(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categoria"
            variant="outlined"
            sx={{
              textAlign: 'center',
              borderRadius: '32px',
              backgroundColor: 'white',
              height: '100%',
              width: '100%',
              maxWidth: '15rem',
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                height: '100%',
                width: '100%',
                padding: '0 14px',
                flexWrap: 'nowrap',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '16px',
              },
              '& .MuiInputBase-input': {
                padding: '10px 0',
              },
              '& .MuiInputLabel-root': {
                textAlign: 'center',
                top: '-8px',
                '&.Mui-focused': {
                  top: '0' // Cor do rótulo quando focado
                },
              },
              '& .MuiAutocomplete-tag': {
                width: '100%',
                height: '70%',
                flexWrap: 'nowrap',
              },
              '& .MuiAutocomplete-inputRoot': {
                borderRadius: '12px',
                touchAction: 'manipulation',
              },
              '& .MuiAutocomplete-popupIndicator': {
                transform: 'scale(1.5)',
              },
              '& .MuiAutocomplete-clearIndicator': {
                transform: 'scale(1.5)',
              },
            }}
          />
        )}
      />
      <TextField
        label="Buscar"
        variant="outlined"
        sx={{
          textAlign: 'center',
          borderRadius: '32px',
          backgroundColor: 'white',
          height: '100%',
          width: '40%',
          maxWidth: '15rem',
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            height: '100%',
            padding: '0 14px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '16px',
          },
          '& .MuiInputBase-input': {
            padding: '!important 0'
          },
          '& .MuiInputLabel-root': {
            textAlign: 'center',
            top: '-8px',
            '&.Mui-focused': {
              top: '0' // Cor do rótulo quando focado
            },
          },
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        onClick={() => setEditMode(!editMode)}
        sx={{
          display: 'flex',
          height: '100%',
          width: 'auto',
          minWidth: 0,
          padding: 0,
          minHeight: 0,
          backgroundColor: editMode ? 'primary.main' : 'grey.400',
          transform: editMode ? 'rotate(-45deg)' : 'rotate(0deg)',
          transition: 'ease-in-out 0.5s',
          color: 'white',
          borderRadius: 5,
          aspectRatio: '1 / 1',
          '&:hover': {
            backgroundColor: editMode ? 'primary.dark' : 'grey.500',
          },
        }}
      >
        <Icon icon="solar:pen-bold" width="70%" height="100%" />
      </IconButton>
    </div>
  );
}

export default Tools;