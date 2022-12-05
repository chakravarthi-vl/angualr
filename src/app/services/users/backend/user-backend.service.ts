import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Base} from "../../../base";
import {User} from "../../../store/users/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserBackendService {

  url = `${Base.URL}users`;

  constructor(private readonly http: HttpClient) {
  }


  getUser = (): Observable<User> => {
    return this.http.get<User>(this.url);
  }
}
