import {Audio, state, quality, StateType, userAnimeState, priorityValue, weekdayType} from "./types"
import { character } from "./characterModel"
// import {Season} from "./seasonModel"
import { Episode } from "./episodeModel";
import { EpisodeUser } from "./episodeModel";
// export interface Anime{
//     _id:string;
// 	name:string;
// 	name2:string;
// 	description:string;
// 	quality:quality;
// 	language:Audio;
// 	state:string;
// 	releasedate:Date;
// 	studios:string[]|string;
// 	producers:string[]|string;
// 	creators:string[]|string;
// 	genre:string[]|string;
// 	seasons?:Season[];
// 	rating?:number;
// 	characters?:character[];
// 	// path?:string;
// 	averageeptime?:number;
// }
// export interface AnimeDocument extends nano.DocumentGetResponse{
// 	_id:string;
// 	name:string;
// 	name2:string;
// 	description:string;
// 	quality:quality;
// 	language:Audio;
// 	state:state;
// 	releasedate:Date;
// 	studios:string[];
// 	producers:string[];
// 	creators:string[];
// 	generos:string[];
// 	seasons?:Season[];
// 	rating?:number;
// 	characters?:character[];
// 	// path?:string;
// 	averageEptime?:number;
// }
// export interface AnimeUser{
// 	animeId:string
//     name:string;
//     watchedEpisodes:number;
//     lastEp:EpisodeUser
// }
// export interface producers{
// 	producerid:number;
// 	producername:string;
// }
// export interface studios{
// 	studioid:number;
// 	studioname:string;
// }
// export interface creators{
// 	creatorid:number;
// 	creatorname:string;
// }
export interface Producer{
	id:string;
	name:string;
}
export interface Season{
    id:string;
    name: string;
    episodes: string[];
    index: number;
}
export interface SeasonList{
	anime_id:string;
	season_id:string;
	total_episodes:number;
	total_rewatched_episodes?:number;
	id?:number;
}
export interface Anime{
    id:string;
	name:string;
	name2:string;
	description:string;
	quality:quality;
	language:Audio;
	state:state;
	releasedate:Date;
	studios:Producer[];
	producers:Producer[];
	creators:Producer[];
	genre:string[];
	seasons?:Season[];
	rating?:number;
	characters?:character[];
	// path?:string;
	averageeptime?:number;
	date_added?:Date;
	visible:boolean;
	weekday?:weekdayType
}
// export class AnimeClass implements Anime{
// 	id:string;
// 	name:string;
// 	name2:string;
// 	description:string;
// 	quality:quality;
// 	language:Audio;
// 	state:string;
// 	releasedate:Date;
// 	studios:types.Tuple[]|string[][]|string[];
// 	producers:types.Tuple[]|string[][]|string[];
// 	creators:types.Tuple[]|string[][]|string[];
// 	genre:string[];
// 	seasons?:Season[]|types.Tuple[];
// 	rating?:number;
// 	characters?:character[];
// 	// path?:string;
// 	averageeptime?:number;
// 	date_added?:Date;

// 	constructor(
// 		id:string,
// 		name:string,
// 		name2:string,
// 		description:string,
// 		quality:quality,
// 		language:Audio,
// 		state:string,
// 		releasedate:Date,
// 		studios:
// 	){
// 		this.id = id
// 	}
// }
export interface AnimeUser{
	user_id:string;
	id:number
	anime_id:string
    name:string;
    // watched_episodes:number;
	start_date?:Date;
	finish_date?:Date;
	rate:number;
	status:userAnimeState;
	// times_watched?:number;
	// rewatched_episodes?:number;
	priority:priorityValue;
    last_ep:EpisodeUser[]
}
export interface AnimeSearch{
	id:string;
	name:string;
	description:string;
	// rating:number;
}
export interface AnimeAgenda{
	id:string;
	name:string;
	description:string;
	rating:number;
	weekday:string
}
export enum animeListStatus{
	'watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'
}
