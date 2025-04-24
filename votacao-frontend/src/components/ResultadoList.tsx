import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { api } from '../services/api';

interface Resultado {
  id: number;
  pauta: string;
  votosSim: number;
  votosNao: number;
  totalVotos: number;
  resultado: 'APROVADO' | 'REJEITADO';
}

export const ResultadoList: React.FC = () => {
  const [resultados, setResultados] = useState<Resultado[]>([]);

  useEffect(() => {
    fetchResultados();
  }, []);

  const fetchResultados = async () => {
    try {
      const data = await api.getResultados();
      setResultados(data);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pauta</TableCell>
            <TableCell align="right">Votos Sim</TableCell>
            <TableCell align="right">Votos Não</TableCell>
            <TableCell align="right">Total de Votos</TableCell>
            <TableCell align="center">Resultado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultados.map((resultado) => (
            <TableRow key={resultado.id}>
              <TableCell component="th" scope="row">
                {resultado.pauta}
              </TableCell>
              <TableCell align="right">{resultado.votosSim}</TableCell>
              <TableCell align="right">{resultado.votosNao}</TableCell>
              <TableCell align="right">{resultado.totalVotos}</TableCell>
              <TableCell align="center">
                <Chip
                  label={resultado.resultado}
                  color={resultado.resultado === 'APROVADO' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 