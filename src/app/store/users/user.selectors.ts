import {createFeatureSelector, createSelector} from '@ngrx/store';
import *as fromUser from './user.reducer'

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.usersFeatureKey
);


export const selectUserLoading = createSelector(
  selectUserState,

  state => state.loadingState
)


export const selectUser = createSelector(
  selectUserState,

  state => state.user
)
