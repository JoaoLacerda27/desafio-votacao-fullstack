import axios from 'axios';
import { Sessao } from '../types';

const API_URL = 'http://localhost:3000/api';

export interface CriarSessaoDTO {
    pautaId: number;
    duracaoMinutos?: number;
}

class SessaoService {
    async criar(dto: CriarSessaoDTO): Promise<Sessao> {
        const response = await axios.post(`${API_URL}/sessoes`, dto);
        return response.data;
    }

    async obterPorId(id: number): Promise<Sessao> {
        const response = await axios.get(`${API_URL}/sessoes/${id}`);
        return response.data;
    }

    async listar(): Promise<Sessao[]> {
        try {
            console.log('Fetching sessoes from API...');
            const response = await axios.get(`${API_URL}/sessoes`);
            console.log('API response:', JSON.stringify(response.data, null, 2));
            return response.data;
        } catch (error) {
            console.error('Error fetching sessoes:', error);
            return [];
        }
    }

    async obterPorPautaId(pautaId: number): Promise<Sessao[]> {
        const response = await axios.get(`${API_URL}/sessoes/pauta/${pautaId}`);
        return response.data;
    }

    async deletar(id: number): Promise<void> {
        await axios.delete(`${API_URL}/sessoes/${id}`);
    }
}

export const sessaoService = new SessaoService(); 