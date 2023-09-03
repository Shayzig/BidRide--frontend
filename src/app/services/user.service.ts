import { Injectable, inject } from "@angular/core"
import { BehaviorSubject, catchError, from, mergeMap, of, retry, tap, throwError } from "rxjs"
import { User } from "../models/user.model"
import { storageService } from "./async-storage.service"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"

const ENTITY = 'users'
const LOGGED_IN_USER = 'loggedinuser'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
        const loggedinuser = JSON.parse(sessionStorage.getItem(LOGGED_IN_USER) || 'null')
        if (loggedinuser) {
            this._loggedInUser$.next(loggedinuser)
        }

        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
        }
    }

    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    private _loggedInUser$ = new BehaviorSubject<User | null>(null)
    public loggedInUser$ = this._loggedInUser$.asObservable()

    public getLoggedInUser() {
        return this._loggedInUser$.value
    }

   public logout() {
        this._loggedInUser$.next(null)
    }

    public signup(user: User) {
        this.login(user)
        return from(storageService.post(ENTITY, user))
            .pipe(
                tap(newUser => {
                    const users = this._users$.value
                    users.push(newUser)
                    this._users$.next([...users])
                    return newUser
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public login(user: any) {
        const username = user.username
        return from(storageService.query(ENTITY)).pipe(
            tap(users => {
                const foundUser = users.find(u => u.name === username)
                if (!foundUser) {
                    throw new Error('Invalid user name');
                }
                sessionStorage.setItem(LOGGED_IN_USER, JSON.stringify(foundUser))
                this._loggedInUser$.next(foundUser)
                return of(foundUser)
            })
        )
    }

    private _createUsers() {
        const users: User[] = [
            {
                name: 'admin',
                username: 'admin',
                isAdmin: true,
                _id: '1w',
                bids: []
            },
            {
                name: 'guest',
                username: 'guest',
                isAdmin: false,
                _id: '2w',
                bids: []
            }
        ]
        return users
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }

    public updateUser(user: any) {
        return from(storageService.put(ENTITY, user))
            .pipe(
                tap(updatedUser => {
                    const users = this._users$.value
                    this._users$.next(users.map(user => user._id === updatedUser._id ? updatedUser : user))
                    this.login(updatedUser).subscribe({

                    })
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

}
