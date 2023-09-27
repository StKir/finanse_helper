import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { MortgageData } from '@/interfaces/mortgage.interface';

interface ISavedSlice {
	loadingStatus: 'idle' | 'error' | 'loading';
	data: ISavedData[];
}

interface ISavedData {
	type: string;
	data: MortgageData[] | any; //Потом добавить новые
}

interface ISavedRespons {
	['username']: ISavedData[];
}

interface ISavedProps {
	user: string;
	data: ISavedData;
}

interface ISavedSet {
	id: string | number;
	type: string;
	data: MortgageData[];
}

const initialState = {
	loadingStatus: 'idle',
	data: null
} as unknown as ISavedSlice;

export const setSavedData = createAsyncThunk<any, ISavedSet>(
	'saved/setSavedData',
	async ({ id, data, type }) => {
		const res = await axios({
			method: 'POST',
			url: `${process.env.NEXT_PUBLIC_DATABASE_LINK}${id}.json`,
			data: {
				type,
				data
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
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(setSavedData.pending, (state) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(setSavedData.rejected, (state) => {
			state.loadingStatus = 'error';
		});
		builder.addCase(setSavedData.fulfilled, (state, { payload }) => {
			console.log(payload);

			state.loadingStatus = 'idle';
		});
		builder.addCase(getSavedData.fulfilled, (state, { payload }) => {
			state.data = Object.values(payload).map((el) => {
				return el;
			});
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
const getAllMortgageSelector = createSelector([selectData], (selectData) =>
	selectData.filter((el) => {
		return el.type === 'mortgage';
	})
);

const getAllВepositsSelector = createSelector([selectData], (selectData) =>
	selectData.filter((el) => {
		return el.type === 'deposit';
	})
);

const { reducer, actions } = SavedSlice;

export default reducer;
