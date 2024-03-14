export const snackSearch= async (query:string)=>{
    const response = await fetch(`http://localhost:8000/snack/toriko-search/${query}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    });
    return response.json();
}