import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface ISavedSlice {
	number: number | null;
	data: any;
}

const initialState = {
	number: null,
	data: null
} as ISavedSlice;

export const setTestValue = createAsyncThunk<any, string>(
	'saved/setTestValue',
	async (string) => {
		const res = await axios({
			method: 'POST',
			url: `https://finanse-love-default-rtdb.europe-west1.firebasedatabase.app/${string}.json`,
			data: {
				key: string,
				user: 2123
			}
		});
		return res.data;
	}
);

export const getTestValue = createAsyncThunk<any, string>(
	'saved/getTestValue',
	async (string) => {
		const res = await axios({
			method: 'GET',
			url: `https://finanse-love-default-rtdb.europe-west1.firebasedatabase.app/${string}.json`
		});
		return res.data;
	}
);

// export const getAllValut = createAsyncThunk<IValut>(
// 	'valute/getAllValut',
// 	async () => {
// 		const res = await axios({
// 			method: 'GET',
// 			url: `https://www.cbr-xml-daily.ru/daily_json.js`
// 		});
// 		return res.data;
// 	}
// );

const SavedSlice = createSlice({
	name: 'saved',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(setTestValue.fulfilled, (state, { payload }) => {
			console.log(payload);
		});
		builder.addCase(getTestValue.fulfilled, (state, { payload }) => {
			const data = Object.values(payload).map((el) => {
				return el;
			});
			state.data = data;
		});
	}
});

const { reducer, actions } = SavedSlice;

export default reducer;
