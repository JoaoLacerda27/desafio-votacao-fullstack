import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { votoService, ResultadoVotosDTO } from '../services/votoService';
import { pautaService } from '../services/pautaService';
import { Pauta } from '../types';

export const ResultadosPage: React.FC = () => {
  const [pautas, setPautas] = useState<Pauta[]>([]);
  const [selectedPauta, setSelectedPauta] = useState<number>(0);
  const [resultado, setResultado] = useState<ResultadoVotosDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const carregarPautas = async () => {
      try {
        const data = await pautaService.listar();
        setPautas(data);
      } catch (err) {
        setError('Erro ao carregar pautas');
        console.error(err);
      }
    };

    carregarPautas();
  }, []);

  useEffect(() => {
    const carregarResultado = async () => {
      if (!selectedPauta) {
        setResultado(null);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const data = await votoService.obterResultado(selectedPauta);
        setResultado(data);
      } catch (err) {
        setError('Erro ao carregar resultado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarResultado();
  }, [selectedPauta]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Resultados das Votações
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Pauta</InputLabel>
            <Select
              value={selectedPauta}
              onChange={(e) => setSelectedPauta(Number(e.target.value))}
              label="Pauta"
              displayEmpty
              renderValue={(value) => {
                if (value === 0) {
                  return <em>Selecione uma pauta</em>;
                }
                return pautas.find(p => p.id === value)?.titulo || '';
              }}
            >
              {pautas.map((pauta) => (
                <MenuItem key={pauta.id} value={pauta.id}>
                  {pauta.titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {loading ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          </Grid>
        ) : resultado ? (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Total de Votos Sim</TableCell>
                    <TableCell>Total de Votos Não</TableCell>
                    <TableCell>Resultado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{resultado.totalSim}</TableCell>
                    <TableCell>{resultado.totalNao}</TableCell>
                    <TableCell>
                      {resultado.vencedor === 'EMPATE' 
                        ? 'EMPATE' 
                        : resultado.vencedor === 'SIM' 
                          ? 'APROVADO' 
                          : 'REJEITADO'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}; 