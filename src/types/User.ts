import { AnimeUser } from "./Anime"
import { MangaUser } from "./mangaType";
import { priorityValue, roles, userAnimeState } from "./types";
import { EpisodeUser } from "./Episode";

interface GoogleLogin{
    idToken:string;
    accessToken:string;
}
export interface User{
    _id:string;
    name:string;
    surname:string
    username:string;
    birthDate:Date;
    email:string;
    role:roles[]
    superuser:boolean;
}
