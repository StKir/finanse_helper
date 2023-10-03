import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import {
	INews,
	INewsError,
	INewsRespons,
	NewsAdapter,
	TNewsCategory
} from '@/interfaces/store.interfaces';

const NewsAdater = createEntityAdapter<INews>();

const initialState = {
	entities: {},
	ids: [],
	LoadingStatus: 'idle',
	type: 'top',
	errorMassage: null
} as unknown as NewsAdapter;

export const getAllNews = createAsyncThunk<INewsRespons, TNewsCategory>(
	'news/getAllNews',
	async (type) => {
		const res = await axios({
			method: 'GET',
			url: `https://newsdata.io/api/1/news?country=ru&category=${type}&apikey=${process.env.NEXT_PUBLIC_NEWS_KEY}`
		});
		return res.data;
	}
);

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setType(state, { payload }: PayloadAction<TNewsCategory>) {
			state.type = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllNews.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllNews.rejected, (state, { error }) => {
				state.LoadingStatus = 'error';
				state.errorMassage = error.code!;
			})
			.addCase(getAllNews.fulfilled, (state, { payload }) => {
				const res: INews[] = payload.results?.map((el) => {
					return { ...el, id: el.article_id };
				});
				NewsAdater.addMany(state, res);
				state.LoadingStatus = 'success';
				state.errorMassage = null!;
			});
	}
});

const { reducer, actions } = newsSlice;

export const { selectAll } = NewsAdater.getSelectors<RootState>(
	(state) => state.news
);

export const getAllTypeNews = createSelector(
	[selectAll, (state) => state.news.type],
	(data, type: TNewsCategory) =>
		data.filter((el) => {
			console.log(el.category, type);

			return el.category.includes(type);
		})
);

export const { setType } = actions;

export default reducer;
