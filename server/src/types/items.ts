export  interface Item {
    id: string;
    name: string;
    price: number;
    category:string;
}

export enum Category{
    FASHION='Fashion',
    BEAUTY='Beauty'
}
