import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
const TRADE_VOL = 'trade'

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    constructor(private http: HttpClient) {
        const tradeVol = JSON.parse(localStorage.getItem(TRADE_VOL) || 'null');
        if (!tradeVol || tradeVol.length === 0) {
            this.getTradeVol()
        }
    }

    public getTradeVol() {
        return this.http.get<{ values: any }>('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
            .pipe(
                map(res => {
                    localStorage.setItem(TRADE_VOL, JSON.stringify(res.values))
                    return res.values
                }),
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err)
                    return throwError(() => err)
                })
            )
    }
    
    public getBitRate(amount: any) {
        return this.http.get<{ values: any }>(`https://blockchain.info/tobtc?currency=USD&value=${amount}`)
            .pipe(
                map(res =>  res),
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err)
                    return throwError(() => err)
                })
            )
    }
}


