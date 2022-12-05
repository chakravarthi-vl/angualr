import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../store/users/user.model";
import {selectUser, selectUserLoading} from "../../store/users/user.selectors";
import {select, Store} from "@ngrx/store";
import {loadUser} from "../../store/users/user.actions";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav

  maxWidth = '(max-width:800px)';

  user!: User;
  products!: any;
  loadingState!: boolean;

  user$ = this.userStore.pipe(select(selectUser));
  loading$ = this.userStore.pipe(select(selectUserLoading));

  constructor
  (
    private observer: BreakpointObserver,
    private keycloakService: KeycloakService,
    private readonly userStore: Store<User>,
  ) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  ngAfterViewInit() {
    this.observer.observe([this.maxWidth]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  openUserKeycloakAccount() {
    location.href = "http://localhost:8080/auth/realms/brainfree/account/"
  }

  logout() {
    this.keycloakService.logout();
  }


  private initUser(): void {
    this.user$ = this.userStore.pipe(select(selectUser));

    this.userStore.dispatch(loadUser());

    this.user$.subscribe(user => {
      this.user = user;
    })

    this.loading$.subscribe(loadingState => {
      this.loadingState = loadingState;
    })

    //   this.productStore.dispatch(loadProducts());

  }

  openRoute(route: string) {
    location.href = route;
  }

}
