import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
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
	LoadingStatus: 'idle'
} as NewsAdapter;

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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllNews.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllNews.rejected, (state, { payload }) => {
				console.log(payload);

				state.LoadingStatus = 'error';
			})
			.addCase(getAllNews.fulfilled, (state, { payload }) => {
				const res: INews[] = payload.results?.map((el) => {
					return { ...el, id: el.article_id };
				});
				NewsAdater.setAll(state, res);
				state.LoadingStatus = 'success';
			});
	}
});

const { reducer, actions } = newsSlice;

export const { selectAll } = NewsAdater.getSelectors<RootState>(
	(state) => state.news
);

export default reducer;
