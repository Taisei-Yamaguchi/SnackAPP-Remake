type snackData ={
    name:string,
    maker:string,
    type:string,
    country:string,
    price:number,
    url: string | null,
}
export const snackCreate = async (snackData:snackData,token: string) => {
    const response = await fetch(`http://localhost:8000/snack/create/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}` 
        },
        body: JSON.stringify(snackData)
    });

    return response.json();
}
