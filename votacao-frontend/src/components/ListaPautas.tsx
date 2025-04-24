import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  IconButton, 
  Box,
  Chip,
  Dialog
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Description as PautaIcon
} from '@mui/icons-material';
import { api } from '../services/api';
import { Pauta } from '../types';
import { PautaForm } from './PautaForm';

export interface ListaPautasRef {
  fetchPautas: () => void;
}

export const ListaPautas = forwardRef<ListaPautasRef>((props, ref) => {
  const [pautas, setPautas] = useState<Pauta[]>([]);
  const [selectedPauta, setSelectedPauta] = useState<Pauta | undefined>();
  const [openDialog, setOpenDialog] = useState(false);

  const fetchPautas = async () => {
    try {
      const data = await api.getPautas();
      setPautas(data);
    } catch (error) {
      console.error('Erro ao buscar pautas:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchPautas
  }));

  useEffect(() => {
    fetchPautas();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta pauta?')) {
      try {
        await api.deletePauta(id);
        fetchPautas();
      } catch (error) {
        console.error('Erro ao deletar pauta:', error);
      }
    }
  };

  const handleEdit = (pauta: Pauta) => {
    setSelectedPauta(pauta);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPauta(undefined);
    setOpenDialog(false);
  };

  const handleSuccess = () => {
    fetchPautas();
    handleCloseDialog();
  };

  return (
    <>
      <Grid container spacing={3}>
        {pautas.map((pauta) => (
          <Grid item xs={12} sm={6} md={4} key={pauta.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PautaIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" component="div">
                    {pauta.titulo}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 2 }}
                >
                  {pauta.descricao}
                </Typography>
                
                <Chip 
                  label={pauta.status} 
                  color={pauta.status === 'ABERTA' ? 'success' : 'default'}
                  size="small"
                />
                
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <IconButton 
                    size="small" 
                    onClick={() => handleEdit(pauta)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(pauta.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <PautaForm
          pauta={selectedPauta}
          onClose={handleCloseDialog}
          onSuccess={handleSuccess}
        />
      </Dialog>
    </>
  );
}); 