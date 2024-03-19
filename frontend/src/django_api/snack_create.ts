import { SnackInputData } from "@/interfaces";

export const snackCreate = async (snackData:SnackInputData,token: string) => {
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
