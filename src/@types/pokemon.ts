export interface Pokemon {
    index: string;
    nome: string;
    imagem: string;
    tipos: string[];
    poderes: Poder[];
}

export interface Poder {
    nome: string;
    forca: number;
}

