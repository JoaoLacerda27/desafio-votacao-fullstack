import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { pautaService } from '../services/pautaService';

export const NovaPauta: React.FC = () => {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!titulo.trim() || !descricao.trim()) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        try {
            await pautaService.criar({ titulo, descricao });
            navigate('/pautas');
        } catch (error) {
            console.error('Erro ao criar pauta:', error);
            setError('Erro ao criar pauta. Tente novamente.');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Nova Pauta
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    margin="normal"
                    required
                    multiline
                    rows={4}
                />

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Criar Pauta
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/pautas')}>
                        Cancelar
                    </Button>
                </Box>
            </form>
        </Box>
    );
}; 