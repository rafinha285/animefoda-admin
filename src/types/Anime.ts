import {Audio, state, quality, StateType, userAnimeState, priorityValue, weekdayType, Producer} from "./types"
import { EpisodeUser } from "./Episode";
import {Season} from "./Season";

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
