import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { Sessao, Voto } from '../types';
import { sessaoService } from '../services/sessaoService';
import { votoService } from '../services/votoService';

export const DetalhesSessao: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [sessao, setSessao] = useState<Sessao | null>(null);
    const [votos, setVotos] = useState<Voto[]>([]);
    const [cpf, setCpf] = useState('');
    const [votoValor, setVotoValor] = useState<string>('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            carregarSessao();
            carregarVotos();
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

    const carregarVotos = async () => {
        try {
            const data = await votoService.obterPorSessaoId(Number(id));
            setVotos(data);
        } catch (error) {
            console.error('Erro ao carregar votos:', error);
        }
    };

    const handleVotar = async () => {
        setError('');
        setMessage('');

        if (!cpf.trim()) {
            setError('CPF é obrigatório');
            return;
        }

        if (!votoValor) {
            setError('Selecione uma opção de voto');
            return;
        }

        try {
            await votoService.criar({
                sessaoId: Number(id),
                cpf,
                voto: votoValor === 'true'
            });
            setMessage('Voto registrado com sucesso!');
            setCpf('');
            setVotoValor('');
            carregarVotos();
        } catch (error: any) {
            console.error('Erro ao registrar voto:', error);
            setError(error.response?.data?.message || 'Erro ao registrar voto');
        }
    };

    const contarVotos = () => {
        const sim = votos.filter(v => v.voto).length;
        const nao = votos.filter(v => !v.voto).length;
        return { sim, nao };
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

    const { sim, nao } = contarVotos();

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
            <Button
                variant="outlined"
                onClick={() => navigate(`/pautas/${sessao.pautaId}`)}
                sx={{ mb: 3 }}
            >
                Voltar para Pauta
            </Button>

            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Sessão de Votação #{sessao.id}
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Início: {new Date(sessao.inicio).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Fim: {new Date(sessao.fim).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {isSessaoAberta() ? 'Aberta' : 'Fechada'}
                    </Typography>
                </CardContent>
            </Card>

            {isSessaoAberta() && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            Registrar Voto
                        </Typography>

                        <TextField
                            fullWidth
                            label="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            margin="normal"
                            required
                        />

                        <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
                            <FormLabel component="legend">Seu voto</FormLabel>
                            <RadioGroup
                                value={votoValor}
                                onChange={(e) => setVotoValor(e.target.value)}
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="Sim"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="Não"
                                />
                            </RadioGroup>
                        </FormControl>

                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}

                        {message && (
                            <Typography color="success.main" sx={{ mt: 2 }}>
                                {message}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleVotar}
                            sx={{ mt: 2 }}
                        >
                            Votar
                        </Button>
                    </CardContent>
                </Card>
            )}

            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Resultado Parcial
            </Typography>

            <Card>
                <CardContent>
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                        Total de votos: {votos.length}
                    </Typography>
                    <Typography variant="body1">
                        Sim: {sim} votos ({votos.length > 0 ? ((sim / votos.length) * 100).toFixed(1) : 0}%)
                    </Typography>
                    <Typography variant="body1">
                        Não: {nao} votos ({votos.length > 0 ? ((nao / votos.length) * 100).toFixed(1) : 0}%)
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}; 