import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Pauta, Sessao } from '../types';
import { pautaService } from '../services/pautaService';
import { sessaoService } from '../services/sessaoService';

export const DetalhesPauta: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pauta, setPauta] = useState<Pauta | null>(null);
    const [sessoes, setSessoes] = useState<Sessao[]>([]);
    const [duracaoMinutos, setDuracaoMinutos] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            carregarPauta();
            carregarSessoes();
        }
    }, [id]);

    const carregarPauta = async () => {
        try {
            const data = await pautaService.obterPorId(Number(id));
            setPauta(data);
        } catch (error) {
            console.error('Erro ao carregar pauta:', error);
            setError('Erro ao carregar pauta');
        }
    };

    const carregarSessoes = async () => {
        try {
            const data = await sessaoService.obterPorPautaId(Number(id));
            setSessoes(data);
        } catch (error) {
            console.error('Erro ao carregar sessões:', error);
        }
    };

    const handleCriarSessao = async () => {
        try {
            const dto = {
                pautaId: Number(id),
                duracaoMinutos: duracaoMinutos ? Number(duracaoMinutos) : undefined
            };
            await sessaoService.criar(dto);
            setDuracaoMinutos('');
            carregarSessoes();
        } catch (error) {
            console.error('Erro ao criar sessão:', error);
            setError('Erro ao criar sessão');
        }
    };

    const handleVerSessao = (sessaoId: number) => {
        navigate(`/sessoes/${sessaoId}`);
    };

    if (!pauta) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography>
                    {error || 'Carregando...'}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/pautas')}
                sx={{ mb: 3 }}
            >
                Voltar para Lista
            </Button>

            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                {pauta.titulo}
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {pauta.descricao}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Criado em: {new Date(pauta.criadoEm).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Sessões de Votação
            </Typography>

            <Box sx={{ mb: 4 }}>
                <TextField
                    type="number"
                    label="Duração em minutos (opcional)"
                    value={duracaoMinutos}
                    onChange={(e) => setDuracaoMinutos(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleCriarSessao}
                    sx={{ mt: 1 }}
                >
                    Criar Nova Sessão
                </Button>
            </Box>

            {sessoes.map((sessao) => (
                <Card key={sessao.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" component="h3">
                            Sessão #{sessao.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Início: {new Date(sessao.inicio).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Fim: {new Date(sessao.fim).toLocaleString()}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => handleVerSessao(sessao.id)}
                        >
                            Ver Detalhes
                        </Button>
                    </CardContent>
                </Card>
            ))}

            {sessoes.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                    Nenhuma sessão encontrada.
                </Typography>
            )}
        </Box>
    );
}; 