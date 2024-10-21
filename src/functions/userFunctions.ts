import {Episode} from "../types/episodeModel";
import {GlobalContextType} from "../context/globalContext";
import {roles} from "../types/types";
interface getPrivilegesInterface{
    role:roles[],
    super:boolean
}
export async function getPrivileges():Promise<getPrivilegesInterface>{
    let res= await fetchUser("/user/g/privileges","GET")
    let response:{success:boolean,role:roles[],super:boolean} = await res.json()
    return {role:response.role,super:response.super};
}
export function checkIsLogged(isLogged:boolean){
    if(!isLogged){
        alert("Nenhuma conta conectada")
        window.location.href = '/login/'
    }
}

export async function userSendFile(path:string,file:FormData){
    return await fetch(path,{
        method:"POST",
        body:file,
    })
}

export async function fetchUser(path:string,method:"POST"|"DELETE"|"PATCH"|"GET" = "POST",body?:any,contentType:string = "application/json"){
    let indentifier = getDeviceIndentifier()
    return await fetch(path,{
        method,
        headers:{
            'Content-Type':contentType,
            'timeZone':indentifier.timeZone,
            'webGlRenderer':indentifier.WegGl?.renderer,
            'webGlVendor':indentifier.WegGl?.vendor,
        },
        body:JSON.stringify(body)
    })
}


export async function fetchPublicKey(){
    return await fetch("/public-key").then(r=>r.text())
}
//Usa o agente e a memoria para saber se é o dispositivo
export function getDeviceIndentifier() {
    const fingerprint = {
        userAgent:navigator.userAgent,
        timeZone:getTimeZone(),
        WegGl:getWebGLFingerprint()
    }
    return fingerprint
}
//Funções para pegar as coisas do digest
//mais facil pra debugar
function getWebGLFingerprint() {
    try {
        let canvas = document.createElement('canvas');
        let gl = canvas.getContext('webgl') as WebGLRenderingContext || canvas.getContext('experimental-webgl') as WebGLRenderingContext;

        if (!gl) return null;

        let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            return { vendor, renderer };
        }

        return null
    } catch (e) {
        return null;
    }
}
function getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
export const handlePostSec = async (context:GlobalContextType,ep:Episode,sec: number) => {
    if (context.isLogged) {
        let body = {
            episode_id: ep?.id,
            anime_id: ep?.anime_id,
            dropped_on: sec,
            season_id: ep?.season_id,
        }
        await fetchUser('/ep/user/p/', 'POST', body)
    }
}


