import React, { useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Alert,
    Button,
    Box,
    Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { associadoService } from '../services/associadoService';
import { Associado } from '../types/associado';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';

export const AssociadoList: React.FC = () => {
    const [associados, setAssociados] = useState<Associado[]>([]);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const carregarAssociados = async () => {
        try {
            const data = await associadoService.listar();
            setAssociados(data);
            setError('');
        } catch (err) {
            setError('Erro ao carregar associados');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await associadoService.deletar(id);
            await carregarAssociados();
        } catch (err) {
            setError('Erro ao deletar associado');
            console.error(err);
        }
    };

    const handleNovoAssociado = () => {
        navigate('/associados/novo');
    };

    useEffect(() => {
        carregarAssociados();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" sx={{ color: '#000080', fontWeight: 'bold' }}>
                    Associados
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleNovoAssociado}
                    sx={{
                        bgcolor: '#000080',
                        '&:hover': {
                            bgcolor: '#00004d',
                        },
                    }}
                >
                    Novo Associado
                </Button>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mx: 2 }}>
                    {error}
                </Alert>
            )}
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {associados.map((associado) => (
                            <TableRow key={associado.id}>
                                <TableCell>{associado.nome}</TableCell>
                                <TableCell>{associado.cpf}</TableCell>
                                <TableCell>{associado.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(associado.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => navigate(`/associados/${associado.id}`)}
                                    >
                                        Detalhes
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}; 