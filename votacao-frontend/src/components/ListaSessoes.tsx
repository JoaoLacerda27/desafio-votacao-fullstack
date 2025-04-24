import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  IconButton, 
  Box,
  Chip,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Event as SessaoIcon
} from '@mui/icons-material';
import { api } from '../services/api';
import { Sessao } from '../types';
import { SessaoForm } from './SessaoForm';

export interface ListaSessoesRef {
  fetchSessoes: () => void;
}

export const ListaSessoes = forwardRef<ListaSessoesRef>((props, ref) => {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [selectedSessao, setSelectedSessao] = useState<Sessao | undefined>();
  const [openDialog, setOpenDialog] = useState(false);

  const fetchSessoes = async () => {
    try {
      const data = await api.getSessoes();
      console.log('Dados recebidos da API:', data); // Debug log
      setSessoes(data);
    } catch (error) {
      console.error('Erro ao buscar sessões:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchSessoes
  }));

  useEffect(() => {
    fetchSessoes();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
      try {
        await api.deleteSessao(id);
        fetchSessoes();
      } catch (error) {
        console.error('Erro ao deletar sessão:', error);
      }
    }
  };

  const handleEdit = (sessao: Sessao) => {
    setSelectedSessao(sessao);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedSessao(undefined);
    setOpenDialog(false);
  };

  const handleSuccess = () => {
    fetchSessoes();
    handleCloseDialog();
  };

  const formatDate = (dateString: string) => {
    console.log('Formatando data:', dateString); // Debug log
    
    if (!dateString) {
      console.error('Data vazia recebida');
      return 'Data inválida';
    }

    try {
      // Parse the date string manually
      const [datePart, timePart] = dateString.split('T');
      if (!datePart || !timePart) {
        console.error('Formato de data inválido:', dateString);
        return 'Data inválida';
      }

      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');

      // Format the date directly without creating a Date object
      const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
      console.log('Data formatada:', formattedDate); // Debug log
      return formattedDate;
    } catch (error) {
      console.error('Erro ao formatar data:', error, dateString);
      return 'Data inválida';
    }
  };

  return (
    <>
      <Table>
        <TableBody>
          {sessoes.map((sessao) => (
            <TableRow key={sessao.id}>
              <TableCell>{sessao.id}</TableCell>
              <TableCell>{sessao.pauta?.titulo || `Pauta ${sessao.pautaId}`}</TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 1 }}
                >
                  Início: {formatDate(sessao.inicio)}
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 2 }}
                >
                  Fim: {formatDate(sessao.fim)}
                </Typography>
                
                <Chip 
                  label={new Date(sessao.fim) > new Date() ? 'ABERTA' : 'FECHADA'} 
                  color={new Date(sessao.fim) > new Date() ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton 
                  size="small" 
                  color="primary"
                  onClick={() => handleEdit(sessao)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleDelete(sessao.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <SessaoForm
          sessao={selectedSessao}
          onClose={handleCloseDialog}
          onSuccess={handleSuccess}
        />
      </Dialog>
    </>
  );
}); 