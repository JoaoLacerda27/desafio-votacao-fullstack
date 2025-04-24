import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Pauta } from '../types';
import { pautaService } from '../services/pautaService';

// Componente sem props, usando apenas estado interno
export const PautaList: React.FC = () => {
    const [pautas, setPautas] = useState<Pauta[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarPautas = async () => {
            try {
                const data = await pautaService.listar();
                // Garantir que data é um array
                if (Array.isArray(data)) {
                    setPautas(data);
                } else if ((data as any)?.pautas && Array.isArray((data as any).pautas)) {
                    setPautas((data as any).pautas);
                } else {
                    console.error('Formato de resposta inesperado:', data);
                    setPautas([]);
                }
            } catch (error) {
                console.error('Erro ao carregar pautas:', error);
                setPautas([]);
            }
        };

        carregarPautas();
    }, []);

    const handleNovaPauta = () => navigate('/pautas/nova');
    const handleVerDetalhes = (id: number) => navigate(`/pautas/${id}`);

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Pautas</Typography>
                <Button variant="contained" color="primary" onClick={handleNovaPauta}>
                    Nova Pauta
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Data de Criação</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pautas.length > 0 ? (
                            pautas.map((pauta) => (
                                <TableRow key={pauta.id}>
                                    <TableCell>{pauta.id}</TableCell>
                                    <TableCell>{pauta.titulo}</TableCell>
                                    <TableCell>{pauta.descricao}</TableCell>
                                    <TableCell>
                                        {new Date(pauta.criadoEm).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleVerDetalhes(pauta.id)}
                                        >
                                            Ver Detalhes
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Nenhuma pauta encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};