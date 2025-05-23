import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Votação
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/pautas">
            Pautas
          </Button>
          <Button color="inherit" component={RouterLink} to="/sessoes">
            Sessões
          </Button>
          <Button color="inherit" component={RouterLink} to="/associados">
            Associados
          </Button>
          <Button color="inherit" component={RouterLink} to="/votacoes">
            Votações
          </Button>
          <Button color="inherit" component={RouterLink} to="/resultados">
            Resultados
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 