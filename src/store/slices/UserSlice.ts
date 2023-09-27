import {
	IUserStore,
	IUserStorePayload,
	TAuthLoadingStatus,
	TAuthModalType
} from '@/interfaces/store.interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	email: null,
	token: null,
	id: null,
	username: null,
	authModalIsOpen: false,
	authLoadingStatus: 'idle',
	authModalType: 'log'
} as unknown as IUserStore;

const valuteSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<IUserStorePayload>) {
			state.email = payload.email;
			state.token = payload.token;
			state.id = payload.id;
			state.username = payload.username;
			state.authLoadingStatus = 'success';
		},
		removeUser(state) {
			state.email = null!;
			state.token = null!;
			state.id = null!;
			state.username = null!;
		},
		setModalStatus(state, { payload }: PayloadAction<boolean>) {
			state.authModalIsOpen = payload;
		},
		changeAuthStatus(state, { payload }: PayloadAction<TAuthLoadingStatus>) {
			state.authLoadingStatus = payload;
		},
		changeModalType(state, { payload }: PayloadAction<TAuthModalType>) {
			state.authModalType = payload;
		}
	}
});

const { reducer, actions } = valuteSlice;

export const {
	setUser,
	removeUser,
	changeModalType,
	setModalStatus,
	changeAuthStatus
} = actions;

export default reducer;
