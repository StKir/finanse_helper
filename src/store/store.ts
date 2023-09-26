import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import valuteSlice from './slices/ValuteSlice';
import userSlice from './slices/UserSlice';
import savedSlice from './slices/SavedSlice';

const store = configureStore({
	reducer: {
		valute: valuteSlice,
		user: userSlice,
		saved: savedSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	// Redux-thunk встроен в стандартные мидлвееры!
	// serializableCheck поставлен в false для предотвращения ошибки при записи totalCount (это максимальное кол-во записей words которое приходт с сервера в поле headers.[x-total-count])
	devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
