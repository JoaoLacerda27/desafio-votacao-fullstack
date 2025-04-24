import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { ListaAssociados } from '../components/ListaAssociados';
import { AssociadoForm } from '../components/AssociadoForm';
import { Add as AddIcon } from '@mui/icons-material';

export const AssociadosPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Associados
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Novo Associado
        </Button>
      </Box>
      
      <ListaAssociados />
      
      <AssociadoForm 
        open={openDialog} 
        onClose={handleCloseDialog} 
        onSuccess={handleCloseDialog} 
      />
    </Container>
  );
}; 