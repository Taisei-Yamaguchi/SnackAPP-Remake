import { SnackInputData } from "@/interfaces/index";
import { BACKEND_ENDPOINT } from "@/config/envs";

export const snackCreate = async (snackData:SnackInputData,token: string) => {
    console.log(snackData)
    const formData = new FormData();
    formData.append('name', snackData.name);
    formData.append('maker', snackData.maker);
    formData.append('type', snackData.type);
    formData.append('country', snackData.country);
    formData.append('price', String(snackData.price));
    if(snackData.url){
        formData.append('url', snackData.url); 
    }
    if(snackData.image){
        formData.append('image', snackData.image); 
    }
    console.log(formData)
    try{
        const response = await fetch(`${BACKEND_ENDPOINT}/snack/create/`, {
            method: 'POST',
            headers: {
                "Authorization": `Token ${token}` 
            },
            body: formData
        });

        return response.json();
    }catch (error) {
		console.error(
			"There has been a problem with your fetch operation: ",
			error
		);
		throw error;
	}
    
}
