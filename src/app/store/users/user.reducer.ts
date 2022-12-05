import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from './user.model';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {
  user: User;
  loadingState: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  user: {
    firstName: '',
    lastName: '',
    email: ''
  },
  loadingState: false
});

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => {
    return {
      ...state, loadingState: true
    };
  }),

  on(UserActions.loadUserSuccess,
    (state, action) => {
      return {
        ...state,
        user: action.user,
        loadingState: false
      };
    }),

  on(UserActions.loadUserFailure, (state) => {
    return {
      ...state, loadingState: false
    };
  })
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
