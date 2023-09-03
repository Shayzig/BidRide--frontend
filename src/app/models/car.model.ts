export interface Car {
    _id?: string;
    model: string;
    mark: string;
    year: string;
    doors: string;
    ac: string;
    transmission: string;
    imgUrl: string;
    price: number
    [key: string]: any | undefined;
    rentStart: number | string,
    rentEnd: number | string,
    bids: Bid[];
}

export interface Bid {
    bidAmount: any;
    toCar?: any;
    byUser?: any;
    time?: any;
    date?: any
}
export interface FilterBy {
    model: string,
    mark: string
    year: string
}