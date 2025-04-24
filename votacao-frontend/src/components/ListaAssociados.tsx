import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  IconButton, 
  Box,
  Chip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  People as AssociadoIcon
} from '@mui/icons-material';
import { api } from '../services/api';
import { Associado } from '../types';

export const ListaAssociados: React.FC = () => {
  const [associados, setAssociados] = useState<Associado[]>([]);

  const fetchAssociados = async () => {
    try {
      const data = await api.getAssociados();
      setAssociados(data);
    } catch (error) {
      console.error('Erro ao buscar associados:', error);
    }
  };

  useEffect(() => {
    fetchAssociados();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este associado?')) {
      try {
        await api.deleteAssociado(id);
        fetchAssociados();
      } catch (error) {
        console.error('Erro ao deletar associado:', error);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      {associados.map((associado) => (
        <Grid item xs={12} sm={6} md={4} key={associado.id}>
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
                <AssociadoIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" component="div">
                  {associado.nome}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2 }}
              >
                CPF: {associado.cpf}
              </Typography>
              
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
                  onClick={() => {/* TODO: Implement edit */}}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleDelete(associado.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}; 