import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import {
	IValut,
	TValuteRes,
	ValuteAdapter
} from '@/interfaces/storeInterfaces/store.interfaces';

const ValuteAdater = createEntityAdapter<TValuteRes>();

const initialState = {
	entities: {},
	ids: [],
	LoadingStatus: 'idle',
	valuts: []
} as ValuteAdapter;

export const getAllValut = createAsyncThunk<IValut>(
	'words/getAllTags',
	async () => {
		const res = await axios({
			method: 'GET',
			url: `https://www.cbr-xml-daily.ru/daily_json.js`
		});
		return res.data;
	}
);

const valuteSlice = createSlice({
	name: 'valute',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllValut.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllValut.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'success';
				const res: TValuteRes[] = Object.values(payload.Valute);
				const truePaypoad: TValuteRes[] = res.map((el) => {
					return {
						...el,
						id: el.ID
					};
				}); //с api приходит ответ с ключом ID, а для адаптера нужен id (в lowerCases) поэтому деламе новый объект с слчем id
				ValuteAdater.setAll(state, truePaypoad);
			})
			.addCase(getAllValut.rejected, (state) => {
				state.LoadingStatus = 'error';
			});
	}
});

const { reducer, actions } = valuteSlice;

export const { selectAll } = ValuteAdater.getSelectors<RootState>(
	(state) => state.valute
);

export default reducer;
