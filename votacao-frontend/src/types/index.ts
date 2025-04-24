export interface Pauta {
    id: number;
    titulo: string;
    descricao: string;
    criadoEm: string;
    status: 'ABERTA' | 'FECHADA';
}

export interface Sessao {
    id: number;
    pautaId: number | null;
    pauta?: {
        id: number;
        titulo: string;
        descricao: string;
        dataCriacao: string;
    } | null;
    duracaoMinutos?: number;
    inicio: string;
    fim: string;
    criadoEm: string;
}

export interface Associado {
    id: number;
    nome: string;
    cpf: string;
}

export interface Voto {
    id: number;
    sessaoId: number;
    cpf: string;
    voto: boolean;
    criadoEm: string;
}

export interface Votacao {
    id: number;
    sessaoId: number;
    pautaId: number;
    pautaTitulo: string;
    dataInicio: string;
    dataFim: string;
    status: 'ABERTA' | 'FECHADA';
}

export interface Resultado {
    id: number;
    pauta: string;
    votosSim: number;
    votosNao: number;
    totalVotos: number;
    resultado: 'APROVADO' | 'REJEITADO';
}

export interface ResultadoVotos {
    pautaId: number;
    totalSim: number;
    totalNao: number;
    vencedor: string;
} 