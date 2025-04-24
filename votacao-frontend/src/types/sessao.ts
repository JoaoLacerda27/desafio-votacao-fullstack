export interface Sessao {
  id: number;
  pautaId: number;
  duracaoMinutos?: number;
  inicio: string;
  fim: string;
  criadoEm: string;
} 