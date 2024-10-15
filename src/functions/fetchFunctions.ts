export async function fetchPost(path:string,method:"POST"|"DELETE"|"PATCH" = "POST",body?:any){
    return await fetch(path,{
        method:method,
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    })
}
