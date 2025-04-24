import React from 'react';
import { Container, Typography } from '@mui/material';
import { VotacaoForm } from '../components/VotacaoForm';

export const VotacoesPage: React.FC = () => {
    const handleSubmit = () => {
        // Recarregar a página após submeter um voto
        window.location.reload();
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Registrar Voto
            </Typography>
            <VotacaoForm onSubmit={handleSubmit} />
        </Container>
    );
}; 