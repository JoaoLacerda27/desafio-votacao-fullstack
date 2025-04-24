import React, { useState } from 'react';
import { Container, Typography, Button, Box, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SessaoForm } from '../components/SessaoForm';

export const SessoesPage: React.FC = () => {
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
          Sessões
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nova Sessão
        </Button>
      </Box>
      
      {/* TODO: Implement SessoesList component */}
      
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <SessaoForm 
          onClose={handleCloseDialog} 
          onSuccess={handleCloseDialog} 
        />
      </Dialog>
    </Container>
  );
}; 