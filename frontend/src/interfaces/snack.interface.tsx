export type SnackInputData = {
    name:string,
    maker:string,
    type:string,
    country:string,
    price:number,
    url: string | null,
    image: File | null,
}

export type SnackData = {
    id: number;
    tid: string;
    name: string;
    image: string;
    url: string;
    price: number;
    maker: string;
    type: string;
    liked: boolean;
    like_count: number;
    country: string;
    account: {
        id:number,
        username:string
    } | null
}