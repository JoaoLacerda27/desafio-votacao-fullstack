import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from '@mui/material';
import { api } from '../services/api';
import { Associado } from '../types';

interface AssociadoFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    associado?: Associado;
}

export const AssociadoForm: React.FC<AssociadoFormProps> = ({
    open,
    onClose,
    onSuccess,
    associado
}) => {
    const [nome, setNome] = useState(associado?.nome || '');
    const [cpf, setCpf] = useState(associado?.cpf || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const cpfLimpo = cpf.replace(/\D/g, '');
    
        try {
            if (associado) {
                await api.updateAssociado(associado.id, { nome, cpf: cpfLimpo });
            } else {
                await api.createAssociado({ nome, cpf: cpfLimpo });
            }
            onSuccess();
        } catch (error) {
            console.error('Erro ao salvar associado:', error);
            setError('Erro ao salvar associado. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const formatCpf = (value: string) => {
        // Remove tudo que não é número
        const numbers = value.replace(/\D/g, '');
        
        // Limita a 11 dígitos
        const limited = numbers.slice(0, 11);
        
        // Formata como XXX.XXX.XXX-XX
        return limited.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {associado ? 'Editar Associado' : 'Novo Associado'}
                </DialogTitle>
                
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            fullWidth
                        />
                        
                        <TextField
                            label="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(formatCpf(e.target.value))}
                            required
                            fullWidth
                            inputProps={{ maxLength: 11 }}
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
        </Dialog>
    );
}; 