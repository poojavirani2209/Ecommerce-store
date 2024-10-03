export interface Discount{
    id:string;
    code:string;
    percent:number;
}

export enum DiscountCodeStatus{
    AVAILABLE="AVAILABLE",
    USED="USED",
    EXPIRED="EXPIRED"
}