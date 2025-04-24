import axios from 'axios';
import { Voto } from '../types';

const API_URL = 'http://localhost:3000/api/v1';

export interface RegistrarVotoDTO {
    sessaoId: number;
    associadoId: number;
    voto: 'SIM' | 'NAO';
}

class VotacaoService {
    async registrarVoto(dto: RegistrarVotoDTO): Promise<Voto> {
        const response = await axios.post(`${API_URL}/votos`, null, {
            params: {
                sessaoId: dto.sessaoId,
                associadoId: dto.associadoId,
                voto: dto.voto
            }
        });
        return response.data;
    }

    async obterResultado(sessaoId: number): Promise<{ sim: number; nao: number }> {
        const response = await axios.get(`${API_URL}/votos/${sessaoId}/resultado`);
        return response.data;
    }
}

export const votacaoService = new VotacaoService(); 