import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

interface Pauta {
  id: number;
  titulo: string;
}

export const NovaSessaoPage: React.FC = () => {
  const navigate = useNavigate();
  const [pautas, setPautas] = useState<Pauta[]>([]);
  const [pautaId, setPautaId] = useState('');
  const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
  const [dataFim, setDataFim] = useState<Date | null>(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPautas();
  }, []);

  const fetchPautas = async () => {
    try {
      const response = await fetch('/api/v1/pautas');
      const data = await response.json();
      setPautas(data);
    } catch (error) {
      console.error('Erro ao buscar pautas:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pautaId || !dataInicio || !dataFim) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('/api/v1/sessoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pautaId: Number(pautaId),
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString(),
        }),
      });

      if (response.ok) {
        navigate('/sessoes');
      } else {
        setError('Erro ao criar sessão');
      }
    } catch (error) {
      setError('Erro ao criar sessão');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#000080', fontWeight: 'bold' }}>
          Nova Sessão
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Pauta</InputLabel>
            <Select
              value={pautaId}
              onChange={(e) => setPautaId(e.target.value)}
              label="Pauta"
              required
            >
              {pautas.map((pauta) => (
                <MenuItem key={pauta.id} value={pauta.id}>
                  {pauta.titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DateTimePicker
              label="Data e Hora de Início"
              value={dataInicio}
              onChange={(newValue: Date | null) => setDataInicio(newValue)}
              sx={{ mt: 2, width: '100%' }}
            />
            
            <DateTimePicker
              label="Data e Hora de Término"
              value={dataFim}
              onChange={(newValue: Date | null) => setDataFim(newValue)}
              sx={{ mt: 2, width: '100%' }}
            />
          </LocalizationProvider>

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
              Criar Sessão
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/sessoes')}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 