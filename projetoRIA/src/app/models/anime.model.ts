export interface Anime{
    id: number;
    nome: string;
    episodios: number;
    status: 'assistido' | 'assistindo' | 'pendente';
    nota: number;
    episodioAtual: number;

}