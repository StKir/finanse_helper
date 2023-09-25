import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserStore {
	email: string;
	token: string;
	id: string | number;
}

const initialState = {
	email: null,
	token: null,
	id: null
} as unknown as IUserStore;

const valuteSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<IUserStore>) {
			state.email = payload.email;
			state.token = payload.token;
			state.id = payload.id;
		},
		removeUser(state) {
			state = initialState;
		}
	}
});

const { reducer, actions } = valuteSlice;

export const { setUser, removeUser } = actions;

export default reducer;
