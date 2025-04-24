import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { Sessao } from '../types';
import { sessaoService } from '../services/sessaoService';
import { votoService } from '../services/votoService';

export const VotacaoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [sessao, setSessao] = useState<Sessao | null>(null);
    const [cpf, setCpf] = useState('');
    const [voto, setVoto] = useState<string>('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            carregarSessao();
        }
    }, [id]);

    const carregarSessao = async () => {
        try {
            const data = await sessaoService.obterPorId(Number(id));
            setSessao(data);
        } catch (error) {
            console.error('Erro ao carregar sessão:', error);
            setError('Erro ao carregar sessão');
        }
    };

    const handleVotar = async () => {
        setError('');
        setSuccess(false);

        if (!cpf.trim()) {
            setError('CPF é obrigatório');
            return;
        }

        if (!voto) {
            setError('Selecione uma opção de voto');
            return;
        }

        try {
            await votoService.criar({
                sessaoId: Number(id),
                cpf,
                voto: voto === 'true'
            });
            setSuccess(true);
            setCpf('');
            setVoto('');
        } catch (error: any) {
            console.error('Erro ao registrar voto:', error);
            setError(error.response?.data?.message || 'Erro ao registrar voto');
        }
    };

    const isSessaoAberta = () => {
        if (!sessao) return false;
        const agora = new Date();
        const dataFim = new Date(sessao.fim);
        return agora < dataFim;
    };

    if (!sessao) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography>
                    {error || 'Carregando...'}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Button
                variant="outlined"
                onClick={() => navigate(`/sessoes/${sessao.id}`)}
                sx={{ mb: 3 }}
            >
                Voltar para Sessão
            </Button>

            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Votação - Sessão #{sessao.id}
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Início: {new Date(sessao.inicio).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Fim: {new Date(sessao.fim).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Status: {isSessaoAberta() ? 'Aberta' : 'Fechada'}
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success ? (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Seu voto foi registrado com sucesso!
                </Alert>
            ) : isSessaoAberta() ? (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleVotar}
                        disabled={!cpf.trim() || !voto}
                    >
                        Votar
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/sessoes/${sessao.id}`)}
                    >
                        Cancelar
                    </Button>
                </Box>
            ) : (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Esta sessão está fechada para votação.
                </Alert>
            )}
        </Box>
    );
}; 