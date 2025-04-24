import axios from 'axios';
import { Associado } from '../types/associado';

const API_URL = 'http://localhost:3000/api/associados';

export const associadoService = {
  listar: async (): Promise<Associado[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  criar: async (associado: Omit<Associado, 'id'>): Promise<Associado> => {
    const associadoSemMascara = {
      ...associado,
      cpf: associado.cpf.replace(/\D/g, '')
    };
    const response = await axios.post(API_URL, associadoSemMascara);
    return response.data;
  },

  obterPorId: async (id: number): Promise<Associado> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  atualizar: async (id: number, associado: Partial<Associado>): Promise<Associado> => {
    const response = await axios.put(`${API_URL}/${id}`, associado);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 