import React, { useState } from 'react';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from '@mui/material';
import { api } from '../services/api';
import { Pauta } from '../types';

interface PautaFormProps {
    onClose: () => void;
    onSuccess: () => void;
    pauta?: Pauta;
}

export const PautaForm: React.FC<PautaFormProps> = ({
    onClose,
    onSuccess,
    pauta
}) => {
    const [titulo, setTitulo] = useState(pauta?.titulo || '');
    const [descricao, setDescricao] = useState(pauta?.descricao || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (pauta) {
                await api.updatePauta(pauta.id, { titulo, descricao });
            } else {
                await api.createPauta({ titulo, descricao });
            }
            onSuccess();
        } catch (error) {
            console.error('Erro ao salvar pauta:', error);
            setError('Erro ao salvar pauta. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle>
                {pauta ? 'Editar Pauta' : 'Nova Pauta'}
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        fullWidth
                    />
                    
                    <TextField
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        fullWidth
                        multiline
                        rows={4}
                    />

                    {error && (
                        <Box sx={{ color: 'error.main', mt: 1 }}>
                            {error}
                        </Box>
                    )}
                </Box>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={loading}
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </Button>
            </DialogActions>
        </form>
    );
}; 