import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';

const USER_KEY = 'User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
                          // BehaviorSubject has read and write mode inside it
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable:Observable<User>
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable()
  }
// the I at the beginning indacates, that this is an interface not a class.
// the main difference between an interface and a class is that you cannot create a new instance from an interface   
  login(userLogin:IUserLogin):Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
    tap({
      next: (user) => {
        this.setUserToLocalStorage(user)
        this.userSubject.next(user)
        this.toastrService.success(
          `Welcome to Foodmine ${user.name}`,
          `Login Successful`
        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Login Failed')
      }
    })
    )
  }

  logout() {
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }

  private setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY)
    if(userJson)return JSON.parse(userJson) as User
    return new User()
  }
}
