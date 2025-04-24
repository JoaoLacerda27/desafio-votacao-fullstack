import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de Votação
                </Typography>
                <Button
                    color="inherit"
                    onClick={() => navigate('/pautas')}
                    sx={{
                        textDecoration: location.pathname === '/pautas' ? 'underline' : 'none',
                        mr: 2
                    }}
                >
                    Pautas
                </Button>
                <Button
                    color="inherit"
                    onClick={() => navigate('/sessoes')}
                    sx={{
                        textDecoration: location.pathname === '/sessoes' ? 'underline' : 'none'
                    }}
                >
                    Sessões
                </Button>
            </Toolbar>
        </AppBar>
    );
}; 