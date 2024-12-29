export enum Audio{
    DUB = "Dublado",
    LEG = "Legendado",
    BOTH = "Dublado/Legendado"
}
export enum languages{
    Japanese = 'ja',
    Portuguese = 'pt',
    English = 'en',
    Spanish = 'es',
}
export type quality = 2160| 1080 | 720 | 480 | -1;
export enum qualityEnum {
    UFHD = "2160P",
    FULLHD = '1080p',
    HD = '720p',
    SD = '480p',
}
export enum state{
    ONGOING="Lançando",
    HIATUS="Hiáto",
    COMPLETED="Completo",
    CANCELED= "Cancelado",
    NOTARING= "Não Lançado"
}
export enum userAnimeState{
    watching="Assistindo",
    completed="Completado",
    on_hold="Em espera",
    dropped="Desistido",
    plan_to_watch="Pretendo assistir"
}
export enum userMangaState{
    reading="Lendo",
    completed="Completado",
    on_hold="Em espera",
    dropped="Desistido",
    plan_to_read="Pretendo ler"
}
export enum roles{
    adm = "adm",
    client = "client",
    creator = "creator"
}
export enum priorityValue{
    LOW="Baixa",
    MEDIUM="Media",
    HIGH="Alta"
}
export type weekdayType = 'Segunda-feira'| 'Terça-feira'| 'Quarta-feira'| 'Quinta-feira'| 'Sexta-feira'| 'Sábado'| 'Domingo'
export type StateType = "ONGOING" | "HIATUS" | "COMPLETED" | "CANCELED";
export const ratingLabel:{[index:string]:string} ={
    0.5:"PUTA QUE PARIU",
    1:"Horrivel",
    1.5:"Muito Ruim",
    2:"Ruim",
    2.5:"Na Média",
    3:"Ok",
    3.5:"Bom",
    4:"Muito Bom",
    4.5:"Incrivel",
    5:"Obra-prima"
}
export const Gens:string[] = [
    'Ação',
    'Aventura',
    'Artes Marciais',
    'Comédia',
    'Cotidiano',
    'Demônios',
    'Drama',
    'Ecchi',
    'Escolar',
    'Espacial',
    'Esportes',
    'Fantasia',
    'Ficção Científica',
    'Harém',
    'Histórico',
    'Horror',
    'Humor Gag',
    'Infantil',
    'Game',
    'Magia',
    'Militar',
    'Mistério',
    'Mecha',
    'Musical',
    'Policial',
    'Paródia',
    'Psicológico',
    'Romance',
    'Samurai',
    'Seinen',
    'Sci-fi',
    'Shoujo-Ai',
    'Shounen',
    'Shounen-Ai',
    'Slice of Life',
    'Sobrenatural',
    'Super Poderes',
    'Suspense',
    'Terror',
    'Tragédia',
    'Thiller',
    'Vampiros',
    'Vida Escolar',
    'Yaoi',
    'Yuri',
];
