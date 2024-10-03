export interface Discount{
    id:string;
    code:string;
    percent:number;
    status:DiscountCodeStatus
}

export enum DiscountCodeStatus{
    AVAILABLE="AVAILABLE",
    USED="USED",
    EXPIRED="EXPIRED"
}