export function trim(string:String,maxLength:number = 120):string{
    var t = string.substring(0,maxLength-3)
    console.log(t)
    t = t.substring(0,Math.min(t.length,t.lastIndexOf(" ")))+"..."
    return t
}
export function getEpTime(ee:number):string{
    var e = Math.round(ee)
    var h = Math.floor(e/3600).toString()
    let m:string =""
    var s = (e%60).toString()
    var ar:string[] = []

    if (h === "0") {
        s = s.length === 1 ? (s = `0${s}`) : s;
        m = Math.floor((e % 3600) / 60).toString();
        m = m.length === 1 ? `0${m}` : m; // Correção aqui
        ar.push(m, s);
    } else {
        s= s.length === 1 ? (s = `0${s}`) : s;
        m = Math.floor((e % 3600) / 60).toString();
        m = m.length === 1 ? `0${m}` : m; // Correção aqui
        h= h.length === 1 ? (h = `0${h}`) : h;
        ar.push(h, m, s);
    }
    return ar.join(":");
}
export function strTimetoSec(e:string):number{
    var es = e.split(":")
    if(es.length === 3){
        var h = parseInt(es[0])*3600;
        var m = parseInt(es[1])*60;
        var s = parseInt(es[2])%60;
        return h + m+s
    }else if(es.length === 2){
        var m = parseInt(es[0])*60;
        var s = parseInt(es[1])%60;
        return m+s
    }else{
        return 0
    }
}
