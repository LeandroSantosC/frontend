import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  ImageList,
  ImageListItem,
  CircularProgress,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Pictogram {
  _id: number;
}

const ImageSearchDialog: React.FC<{ open: boolean; onClose: () => void; onSelect: (url: string) => void }> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pictograms, setPictograms] = useState<Pictogram[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.arasaac.org/api/pictograms/pt/search/${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Erro ao buscar pictogramas');
      const data: Pictogram[] = await response.json();
      setPictograms(data);
    } catch (error) {
      console.error(error);
      setPictograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number) => {
    const imageUrl = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;
    onSelect(imageUrl);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Selecionar Imagem</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            fullWidth
            label="Buscar pictograma"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <IconButton onClick={handleSearch} aria-label="buscar">
            <Icon icon="arcticons:pixel-search" width="24" height="24" />
          </IconButton>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <ImageList cols={3} gap={8}>
            {pictograms.map((pictogram) => (
              <ImageListItem key={pictogram._id} onClick={() => handleSelect(pictogram._id)} style={{ cursor: 'pointer' }}>
                <img
                  src={`https://static.arasaac.org/pictograms/${pictogram._id}/${pictogram._id}_500.png`}
                  alt={`Pictograma ${pictogram._id}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageSearchDialog;
