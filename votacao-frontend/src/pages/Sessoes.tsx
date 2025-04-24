import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { sessaoService } from '../services/sessaoService';
import { pautaService } from '../services/pautaService';
import { Sessao, Pauta } from '../types';

const Sessoes: React.FC = () => {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [pautas, setPautas] = useState<Pauta[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [novaSessao, setNovaSessao] = useState({
    pautaId: 0,
    duracaoMinutos: 1,
  });

  useEffect(() => {
    carregarSessoes();
    carregarPautas();
  }, []);

  const carregarSessoes = async () => {
    try {
      const data = await sessaoService.listar();
      setSessoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
    }
  };

  const carregarPautas = async () => {
    try {
      const data = await pautaService.listar();
      setPautas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar pautas:', error);
      setPautas([]);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNovaSessao({ pautaId: 0, duracaoMinutos: 1 });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNovaSessao((prev) => ({
      ...prev,
      [name]:
        name === 'duracaoMinutos'
          ? Math.max(1, parseInt(value) || 1)
          : parseInt(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sessaoService.criar({
        pautaId: novaSessao.pautaId,
        duracaoMinutos: novaSessao.duracaoMinutos,
      });
      handleCloseDialog();
      carregarSessoes();
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
    }
  };

  const formatarData = (data: string) => new Date(data).toLocaleString();

  const formatarStatus = (sessao: Sessao) => {
    const agora = new Date();
    return agora > new Date(sessao.fim) ? 'Encerrada' : 'Em andamento';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sessões de Votação</Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Nova Sessão
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pauta</TableCell>
              <TableCell>Data Início</TableCell>
              <TableCell>Data Fim</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessoes.map((sessao) => {
              // Prioriza o título vindo do objeto pauta, se presente,
              // senão busca pelo ID no estado de pautas
              const pautaTitulo =
                sessao.pauta?.titulo ||
                pautas.find((p) => p.id === sessao.pautaId)?.titulo ||
                'Pauta não encontrada';

              return (
                <TableRow key={sessao.id}>
                  <TableCell>{sessao.id}</TableCell>
                  <TableCell>{pautaTitulo}</TableCell>
                  <TableCell>{formatarData(sessao.inicio)}</TableCell>
                  <TableCell>{formatarData(sessao.fim)}</TableCell>
                  <TableCell>{formatarStatus(sessao)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nova Sessão de Votação</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              select
              label="Pauta"
              name="pautaId"
              value={novaSessao.pautaId}
              onChange={handleInputChange}
              margin="normal"
              required
            >
              {pautas.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.titulo}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Duração (minutos)"
              name="duracaoMinutos"
              value={novaSessao.duracaoMinutos}
              onChange={handleInputChange}
              margin="normal"
              required
              inputProps={{ min: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sessoes;