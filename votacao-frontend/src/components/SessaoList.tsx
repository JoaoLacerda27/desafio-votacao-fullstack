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
import { Sessao, Pauta } from '../types';
import { sessaoService } from '../services/sessaoService';
import { pautaService } from '../services/pautaService';

export const SessaoList: React.FC = () => {
    const [sessoes, setSessoes] = useState<Sessao[]>([]);
    const [pautas, setPautas] = useState<Pauta[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarSessoes();
        carregarPautas();
    }, []);

    const carregarSessoes = async () => {
        try {
            const data = await sessaoService.listar();
            console.log('Sessões carregadas (raw):', JSON.stringify(data, null, 2));
            setSessoes(data);
        } catch (error) {
            console.error('Erro ao carregar sessões:', error);
        }
    };

    const carregarPautas = async () => {
        try {
            const data = await pautaService.listar();
            console.log('Pautas carregadas:', data);
            setPautas(data);
        } catch (error) {
            console.error('Erro ao carregar pautas:', error);
        }
    };

    const handleVerDetalhes = (id: number) => {
        navigate(`/sessoes/${id}`);
    };

    const isSessaoAberta = (sessao: Sessao) => {
        const agora = new Date();
        const dataFim = new Date(sessao.fim);
        return agora < dataFim;
    };

    // Find pauta by ID
    const getPautaById = (pautaId: number | null) => {
        if (!pautaId) return null;
        return pautas.find(p => p.id === pautaId) || null;
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Sessões de Votação
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Pauta</TableCell>
                            <TableCell>Início</TableCell>
                            <TableCell>Fim</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessoes.map((sessao) => {

                            
                            return (
                                <TableRow key={sessao.id}>
                                    <TableCell>{sessao.id}</TableCell>
                                    <TableCell>{sessao.pauta?.titulo ?? '—'} </TableCell>
                                    <TableCell>
                                        {new Date(sessao.inicio).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(sessao.fim).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {isSessaoAberta(sessao) ? 'Aberta' : 'Fechada'}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleVerDetalhes(sessao.id)}
                                        >
                                            Ver Detalhes
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {sessoes.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                    Nenhuma sessão encontrada.
                </Typography>
            )}
        </Box>
    );
}; 