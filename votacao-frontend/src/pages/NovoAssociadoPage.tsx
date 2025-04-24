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

export const NovoAssociadoPage: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/associados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cpf }),
      });

      if (response.ok) {
        navigate('/associados');
      } else {
        setError('Erro ao criar associado');
      }
    } catch (error) {
      setError('Erro ao criar associado');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#000080', fontWeight: 'bold' }}>
          Novo Associado
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            margin="normal"
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
              Criar Associado
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/associados')}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 