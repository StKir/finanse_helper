import {
	createSlice,
	createAsyncThunk,
	createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import {
	ISavedRespons,
	ISavedSet,
	ISavedSlice
} from '@/interfaces/store.interfaces';

const initialState = {
	loadingStatus: 'idle',
	data: []
} as unknown as ISavedSlice;

export const setSavedData = createAsyncThunk<unknown, ISavedSet>(
	'saved/setSavedData',
	async ({ id, data, type, name, initial }) => {
		const res = await axios({
			method: 'POST',
			url: `${process.env.NEXT_PUBLIC_DATABASE_LINK}${id}.json`,
			data: {
				type,
				data,
				name,
				initial
			}
		});
		return res.data;
	}
);

export const getSavedData = createAsyncThunk<ISavedRespons, string | number>(
	'saved/getSavedData',
	async (id) => {
		const res = await axios({
			method: 'GET',
			url: `${process.env.NEXT_PUBLIC_DATABASE_LINK}${id}.json`
		});
		return res.data;
	}
);

const SavedSlice = createSlice({
	name: 'saved',
	initialState,
	reducers: {
		resetLoadingStatus(state) {
			state.loadingStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(setSavedData.pending, (state) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(setSavedData.rejected, (state) => {
			state.loadingStatus = 'error';
		});
		builder.addCase(setSavedData.fulfilled, (state, { payload }) => {
			state.loadingStatus = 'success';
		});
		builder.addCase(getSavedData.fulfilled, (state, { payload }) => {
			if (payload) {
				state.data = Object.values(payload).map((el) => {
					return el;
				});
			} else {
				state.data = [];
			}
			state.loadingStatus = 'idle';
		});
		builder.addCase(getSavedData.pending, (state) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getSavedData.rejected, (state) => {
			state.loadingStatus = 'error';
			state.data = null!;
		});
	}
});

const selectData = (state: RootState) => state.saved.data;

export const getAllMortgageSelector = createSelector(
	[selectData],
	(selectData) =>
		selectData.filter((el) => {
			return el.type === 'mortage';
		})
);

export const getAllВepositsSelector = createSelector(
	[selectData],
	(selectData) =>
		selectData.filter((el) => {
			return el.type === 'deposit';
		})
);

const { reducer, actions } = SavedSlice;

export const { resetLoadingStatus } = actions;

export default reducer;
