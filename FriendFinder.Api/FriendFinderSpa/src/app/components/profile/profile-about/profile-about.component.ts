import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user/user";

/* NgRx */
import * as fromUser from "../../../ngrx/selectors/user.selectors";
import * as userActions from "../../../ngrx/actions/user.actions";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

@Component({
  selector: "app-profile-about",
  templateUrl: "./profile-about.component.html"
})
export class ProfileAboutComponent implements OnInit {
  errorMessage$: Observable<string>;
  isNewPhoto$: Observable<boolean>;
  isNewCover$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userStore: Store<fromUser.State>
  ) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get("username");
    if (username) {
      this.userStore.dispatch(new userActions.SetCurrentUser(username));
      this.user$ = this.userStore.pipe(
        select(fromUser.getCurrentUser)
      ) as Observable<User>;
      this.errorMessage$ = this.userStore.pipe(select(fromUser.getError));
      this.isNewCover$ = this.userStore.pipe(select(fromUser.getIsNewCover));
      this.isNewPhoto$ = this.userStore.pipe(select(fromUser.getIsNewPhoto));
    }
  }
}
