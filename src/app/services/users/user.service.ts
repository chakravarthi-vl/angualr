import {Injectable} from '@angular/core';
import {UserBackendService} from "./backend/user-backend.service";
import {Observable} from "rxjs";
import {User} from "../../store/users/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly backendService: UserBackendService) {
  }

  //TODO: PIPE() Mat-Snackbar
  public getUser = (): Observable<User> => {
    return this.backendService.getUser();
  }

}
