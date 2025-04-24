import axios, { AxiosResponse } from 'axios';
import { Pauta, Sessao, Votacao, Resultado, Associado } from '../types';

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

function transformPautaDTO(dto: PautaDTO): Pauta {
  return {
    id: dto.id,
    titulo: dto.titulo,
    descricao: dto.descricao,
    criadoEm: dto.dataCriacao,
    status: dto.sessoes?.length > 0 ? 'ABERTA' : 'FECHADA'
  };
}

const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api/' : '/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Generic methods
  get: async <T>(url: string): Promise<AxiosResponse<T>> => {
    return await axiosInstance.get<T>(url);
  },

  post: async <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return await axiosInstance.post<T>(url, data);
  },

  put: async <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return await axiosInstance.put<T>(url, data);
  },

  delete: async <T>(url: string): Promise<AxiosResponse<T>> => {
    return await axiosInstance.delete<T>(url);
  },

  // Pauta methods
  getPautas: async (): Promise<Pauta[]> => {
    const response = await axiosInstance.get<PautaDTO[]>('/v1/pautas');
    return response.data.map(transformPautaDTO);
  },

  getPauta: async (id: number): Promise<Pauta> => {
    const response = await axiosInstance.get<PautaDTO>(`/v1/pautas/${id}`);
    return transformPautaDTO(response.data);
  },

  createPauta: async (data: Partial<Pauta>): Promise<Pauta> => {
    const response = await axiosInstance.post<PautaDTO>('/v1/pautas', data);
    return transformPautaDTO(response.data);
  },

  updatePauta: async (id: number, data: Partial<Pauta>): Promise<Pauta> => {
    const response = await axiosInstance.put<PautaDTO>(`/v1/pautas/${id}`, data);
    return transformPautaDTO(response.data);
  },

  deletePauta: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/v1/pautas/${id}`);
  },

  // Sessao methods
  getSessoes: async (): Promise<Sessao[]> => {
    const response = await axiosInstance.get<Sessao[]>('/sessoes');
    return response.data;
  },

  getSessao: async (id: number): Promise<Sessao> => {
    const response = await axiosInstance.get<Sessao>(`/sessoes/${id}`);
    return response.data;
  },

  createSessao: async (data: { pautaId: number, duracaoMinutos?: number }): Promise<Sessao> => {
    const response = await axiosInstance.post<Sessao>(`/sessao/${data.pautaId}?duracao=${data.duracaoMinutos || 1}`);
    return response.data;
  },

  createSessaoByPauta: async (pautaId: number, duracaoMinutos?: number): Promise<Sessao> => {
    const url = `/sessoes/${pautaId}`;
    const params = duracaoMinutos ? { duracao: duracaoMinutos } : undefined;
    const response = await axiosInstance.post<Sessao>(url, null, { params });
    return response.data;
  },

  updateSessao: async (id: number, data: Partial<Sessao>): Promise<Sessao> => {
    const response = await axiosInstance.put<Sessao>(`/sessoes/${id}`, data);
    return response.data;
  },

  deleteSessao: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/sessoes/${id}`);
  },

  // Associado methods
  getAssociados: async (): Promise<Associado[]> => {
    const response = await axiosInstance.get<Associado[]>('/associados');
    return response.data;
  },

  getAssociado: async (id: number): Promise<Associado> => {
    const response = await axiosInstance.get<Associado>(`/associados/${id}`);
    return response.data;
  },

  createAssociado: async (data: Partial<Associado>): Promise<Associado> => {
    const response = await axiosInstance.post<Associado>('/associados', data);
    return response.data;
  },

  updateAssociado: async (id: number, data: Partial<Associado>): Promise<Associado> => {
    const response = await axiosInstance.put<Associado>(`/associados/${id}`, data);
    return response.data;
  },

  deleteAssociado: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/associados/${id}`);
  },

  // Votacao methods
  getVotacoes: async (): Promise<Votacao[]> => {
    const response = await axiosInstance.get<Votacao[]>('/votacoes');
    return response.data;
  },

  getVotacao: async (id: number): Promise<Votacao> => {
    const response = await axiosInstance.get<Votacao>(`/votacoes/${id}`);
    return response.data;
  },

  createVotacao: async (data: { sessaoId: number, cpf: string, voto: boolean }): Promise<Votacao> => {
    const response = await axiosInstance.post<Votacao>('/votacoes', data);
    return response.data;
  },

  // Resultado methods
  getResultados: async (): Promise<Resultado[]> => {
    const response = await axiosInstance.get<Resultado[]>('/resultados');
    return response.data;
  },

  getResultado: async (pautaId: number): Promise<Resultado> => {
    const response = await axiosInstance.get<Resultado>(`/resultados/${pautaId}`);
    return response.data;
  }
}; 