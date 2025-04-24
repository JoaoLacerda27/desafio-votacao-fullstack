import React, { useState, useRef } from 'react';
import { Container, Typography, Button, Box, Dialog } from '@mui/material';
import { ListaPautas, ListaPautasRef } from '../components/ListaPautas';
import { PautaForm } from '../components/PautaForm';
import { Add as AddIcon } from '@mui/icons-material';

export const PautasPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const listaPautasRef = useRef<ListaPautasRef>(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSuccess = () => {
    handleCloseDialog();
    listaPautasRef.current?.fetchPautas();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Pautas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nova Pauta
        </Button>
      </Box>
      
      <ListaPautas ref={listaPautasRef} />
      
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <PautaForm 
          onClose={handleCloseDialog} 
          onSuccess={handleSuccess} 
        />
      </Dialog>
    </Container>
  );
}; 