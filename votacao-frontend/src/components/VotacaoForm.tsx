import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography
} from '@mui/material';
import { Pauta, Associado } from '../types';
import { pautaService } from '../services/pautaService';
import { votoService, OpcaoVoto } from '../services/votoService';
import { associadoService } from '../services/associadoService';

interface VotacaoFormProps {
    onSubmit: () => void;
}

export const VotacaoForm: React.FC<VotacaoFormProps> = ({ onSubmit }) => {
    const [pautas, setPautas] = useState<Pauta[]>([]);
    const [associados, setAssociados] = useState<Associado[]>([]);
    const [selectedPauta, setSelectedPauta] = useState<number>(0);
    const [selectedAssociado, setSelectedAssociado] = useState<number>(0);
    const [voto, setVoto] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pautasData, associadosData] = await Promise.all([
                    pautaService.listar(),
                    associadoService.listar()
                ]);
                setPautas(pautasData);
                setAssociados(associadosData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!selectedPauta) {
            setError('Selecione uma pauta');
            return;
        }

        if (!selectedAssociado) {
            setError('Selecione um associado');
            return;
        }

        if (!voto) {
            setError('Selecione seu voto');
            return;
        }

        try {
            await votoService.registrarVoto(
                selectedPauta,
                selectedAssociado,
                voto === 'SIM' ? OpcaoVoto.SIM : OpcaoVoto.NAO
            );
            onSubmit();
            setSelectedPauta(0);
            setSelectedAssociado(0);
            setVoto('');
        } catch (error) {
            console.error('Erro ao registrar voto:', error);
            setError('Erro ao registrar voto. Tente novamente.');
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Registrar Voto
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Pauta</InputLabel>
                            <Select
                                value={selectedPauta}
                                onChange={(e) => setSelectedPauta(Number(e.target.value))}
                                label="Pauta"
                                displayEmpty
                                renderValue={(value) => {
                                    if (value === 0) {
                                        return <em>Selecione uma pauta</em>;
                                    }
                                    return pautas.find(p => p.id === value)?.titulo || '';
                                }}
                            >
                                {pautas.map((pauta) => (
                                    <MenuItem key={pauta.id} value={pauta.id}>
                                        {pauta.titulo}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Associado</InputLabel>
                            <Select
                                value={selectedAssociado}
                                onChange={(e) => setSelectedAssociado(Number(e.target.value))}
                                label="Associado"
                                displayEmpty
                                renderValue={(value) => {
                                    if (value === 0) {
                                        return <em>Selecione um associado</em>;
                                    }
                                    return associados.find(a => a.id === value)?.nome || '';
                                }}
                            >
                                {associados.map((associado) => (
                                    <MenuItem key={associado.id} value={associado.id}>
                                        {associado.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Voto</InputLabel>
                            <Select
                                value={voto}
                                onChange={(e) => setVoto(e.target.value)}
                                label="Voto"
                            >
                                <MenuItem value="">Selecione seu voto</MenuItem>
                                <MenuItem value="SIM">Sim</MenuItem>
                                <MenuItem value="NAO">Não</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Registrar Voto
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}; 