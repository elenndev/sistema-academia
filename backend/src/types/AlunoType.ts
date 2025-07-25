export interface PerimetriaType {
    data: Date;
    medidas: {
        nome: string;
        valor: number
    }[]
}

export interface TreinoType {
    categoria: string;
    exercicios: string[];
}

export type NivelAluno = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface AlunoType {
    nome: string;
    objetivo: string;
    dataNascimento: Date;
    professor: string;
    nivel: NivelAluno;
    contato: string;
    dataInicio: Date;
    dataRevisao: Date;
    anaminese: string;
    agenda: string[];
    treino: TreinoType[];
    perimetria: PerimetriaType;
}