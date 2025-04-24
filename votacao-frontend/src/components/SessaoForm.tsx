import React, { useState, useEffect } from 'react';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import { api } from '../services/api';
import { Sessao, Pauta } from '../types';

interface SessaoFormProps {
    onClose: () => void;
    onSuccess: () => void;
    sessao?: Sessao;
}

export const SessaoForm: React.FC<SessaoFormProps> = ({
    onClose,
    onSuccess,
    sessao
}) => {
    const [pautaId, setPautaId] = useState<number>(sessao?.pautaId || 0);
    const [duracaoMinutos, setDuracaoMinutos] = useState<number>(sessao?.duracaoMinutos || 1);
    const [pautas, setPautas] = useState<Pauta[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPautas = async () => {
            try {
                const data = await api.getPautas();
                setPautas(data);
            } catch (error) {
                console.error('Erro ao buscar pautas:', error);
            }
        };

        fetchPautas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (sessao) {
                await api.updateSessao(sessao.id, { pautaId, duracaoMinutos });
            } else {
                const sessionData = {
                    pautaId: pautaId,
                    duracaoMinutos: duracaoMinutos || 1
                };

                await api.createSessao(sessionData);
            }
            onSuccess();
        } catch (error) {
            console.error('Erro ao salvar sessão:', error);
            setError('Erro ao salvar sessão. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle>
                {sessao ? 'Editar Sessão' : 'Nova Sessão'}
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Pauta</InputLabel>
                        <Select
                            value={pautaId}
                            onChange={(e) => setPautaId(Number(e.target.value))}
                            label="Pauta"
                            required
                        >
                            {pautas.map((pauta) => (
                                <MenuItem key={pauta.id} value={pauta.id}>
                                    {pauta.titulo}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Duração (minutos)"
                        type="number"
                        value={duracaoMinutos}
                        onChange={(e) => setDuracaoMinutos(Number(e.target.value))}
                        required
                        fullWidth
                        inputProps={{ min: 1 }}
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
