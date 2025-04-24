import { Pauta } from '../types';
import { api } from './api';
import { AxiosResponse } from 'axios';

interface PautaDTO {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  sessoes: Array<{
    id: number;
    inicio: string;
    fim: string;
  }>;
}

const API_URL = 'http://localhost:3000/api/v1';

export interface CriarPautaDTO {
    titulo: string;
    descricao: string;
}

function transformPautaDTO(dto: PautaDTO): Pauta {
  return {
    id: dto.id,
    titulo: dto.titulo,
    descricao: dto.descricao,
    criadoEm: dto.dataCriacao,
    status: dto.sessoes?.length > 0 ? 'ABERTA' : 'FECHADA'
  };
}

class PautaService {
    async criar(pauta: Omit<Pauta, 'id' | 'criadoEm' | 'status'>): Promise<Pauta | null> {
        try {
            return await api.createPauta(pauta);
        } catch (error) {
            console.error('Erro ao criar pauta:', error);
            return null;
        }
    }

    async obterPorId(id: number): Promise<Pauta | null> {
        try {
            return await api.getPauta(id);
        } catch (error) {
            console.error(`Erro ao obter pauta ${id}:`, error);
            return null;
        }
    }

    async listar(): Promise<Pauta[]> {
        try {
            return await api.getPautas();
        } catch (error) {
            console.error('Erro ao listar pautas:', error);
            return [];
        }
    }

    async deletar(id: number): Promise<void> {
        await api.delete(`${API_URL}/pautas/${id}`);
    }

    async atualizar(id: number, pauta: Partial<Pauta>): Promise<Pauta | null> {
        try {
            return await api.updatePauta(id, pauta);
        } catch (error) {
            console.error(`Erro ao atualizar pauta ${id}:`, error);
            return null;
        }
    }

    async criarSessao(pautaId: number, duracao: number) {
        const response = await api.post(`${API_URL}/pautas/${pautaId}/sessao`, { duracao });
        return response.data;
    }

    async obterResultado(pautaId: number) {
        const response = await api.get(`${API_URL}/pautas/${pautaId}/resultado`);
        return response.data;
    }

    async excluir(id: number): Promise<boolean> {
        try {
            await api.deletePauta(id);
            return true;
        } catch (error) {
            console.error(`Erro ao excluir pauta ${id}:`, error);
            return false;
        }
    }
}

export const pautaService = new PautaService(); 