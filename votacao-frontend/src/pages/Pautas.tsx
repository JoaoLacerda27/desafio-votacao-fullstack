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
} from '@mui/material';
import { pautaService } from '../services/pautaService';
import { Pauta } from '../types';

const Pautas = () => {
  const [pautas, setPautas] = useState<Pauta[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [novaPauta, setNovaPauta] = useState({
    titulo: '',
    descricao: '',
  });

  useEffect(() => {
    carregarPautas();
  }, []);

  const carregarPautas = async () => {
    try {
      const data = await pautaService.listar();
      setPautas(data);
    } catch (error) {
      console.error('Erro ao carregar pautas:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNovaPauta({ titulo: '', descricao: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovaPauta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pautaService.criar(novaPauta);
      handleCloseDialog();
      carregarPautas();
    } catch (error) {
      console.error('Erro ao criar pauta:', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Pautas
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Nova Pauta
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data de Criação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pautas.map((pauta) => (
              <TableRow key={pauta.id}>
                <TableCell>{pauta.id}</TableCell>
                <TableCell>{pauta.titulo}</TableCell>
                <TableCell>{pauta.descricao}</TableCell>
                <TableCell>
                  {new Date(pauta.criadoEm).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nova Pauta</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Título"
              name="titulo"
              value={novaPauta.titulo}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Descrição"
              name="descricao"
              value={novaPauta.descricao}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pautas; 