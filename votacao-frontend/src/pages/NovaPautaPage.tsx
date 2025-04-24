import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NovaPautaPage: React.FC = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/pautas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (response.ok) {
        navigate('/pautas');
      } else {
        setError('Erro ao criar pauta');
      }
    } catch (error) {
      setError('Erro ao criar pauta');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#000080', fontWeight: 'bold' }}>
          Nova Pauta
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: '#000080',
                '&:hover': {
                  bgcolor: '#00004d',
                },
              }}
            >
              Criar Pauta
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/pautas')}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 