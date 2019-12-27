import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../state/app.state';
import * as fromUserAccount from '../reducers/user-account.reducer';

export interface State extends fromRoot.State {
    userDetails: fromUserAccount.UserAccountState;
  }

export const getUserAccountFeatureState = createFeatureSelector<fromUserAccount.UserAccountState>('userDetails');

export const getSignedUserDetail = createSelector(
    getUserAccountFeatureState,
    state => state.userDetails
);