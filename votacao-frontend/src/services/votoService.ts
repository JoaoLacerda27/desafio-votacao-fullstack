import axios from 'axios';
import { Voto } from '../types';

const API_URL = 'http://localhost:3000/api/votos';

export interface CriarVotoDTO {
    sessaoId: number;
    cpf: string;
    voto: boolean;
}

export interface ResultadoVotosDTO {
    pautaId: number;
    totalSim: number;
    totalNao: number;
    vencedor: string; // "SIM", "NAO" ou "EMPATE"
}

export enum OpcaoVoto {
    SIM = 'SIM',
    NAO = 'NAO'
}

class VotoService {
    async criar(dto: CriarVotoDTO): Promise<Voto> {
        const response = await axios.post(API_URL, dto);
        return response.data;
    }

    async obterPorSessaoId(sessaoId: number): Promise<Voto[]> {
        const response = await axios.get(`${API_URL}/sessao/${sessaoId}`);
        return response.data;
    }

    async obterPorCpf(cpf: string): Promise<Voto[]> {
        const response = await axios.get(`${API_URL}/cpf/${cpf}`);
        return response.data;
    }

    async registrarVoto(sessaoId: number, associadoId: number, voto: OpcaoVoto) {
        const response = await axios.post(API_URL, null, {
            params: {
                sessaoId,
                associadoId,
                voto
            }
        });
        return response.data;
    }

    async deletarVoto(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }

    async obterResultado(id: number): Promise<ResultadoVotosDTO> {
        const response = await axios.get(`${API_URL}/${id}/resultado`);
        return response.data;
    }
}

export const votoService = new VotoService(); 