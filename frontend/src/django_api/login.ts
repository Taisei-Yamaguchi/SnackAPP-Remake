"use server"
export const login= async (userData:{username:string,password:string})=>{
    const response = await fetch(`http://localhost:8000/accounts/login/`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    return response.json();
}