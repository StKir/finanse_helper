import { MortgageData, MortgageInput } from './mortgage.interface';

export interface ValuteAdapter {
	LoadingStatus: 'idle' | 'loading' | 'error' | 'success';
	entities: {};
	ids: [];
	valuts: IValuteInfo[];
}

export interface IValut {
	[name: string]: IValuteInfo;
}

export interface IValuteInfo {
	CharCode: string;
	ID: string;
	Name: string;
	Nominal: number;
	NumCode: string;
	Previous: number;
	Value: number;
}

export interface TValuteRes extends IValuteInfo {
	id: string;
}

export interface IUserStore {
	email: string;
	token: string;
	id: string | number;
	username: string;
	authModalIsOpen: boolean;
	authModalType: TAuthModalType;
	authLoadingStatus: TAuthLoadingStatus;
}

export type TAuthModalType = 'log' | 'reg';
export type TAuthLoadingStatus = 'idle' | 'loading' | 'error' | 'success';

export type IUserStorePayload = Omit<
	IUserStore,
	'authModalIsOpen' | 'authModalType'
>;

export interface ISavedSlice {
	loadingStatus: 'idle' | 'error' | 'loading' | 'success';
	data: ISavedData[];
}

export interface ISavedData {
	type: string;
	name: string;
	initial: MortgageInput;

	data: MortgageData[] | any; //Потом добавить новые
}

export interface ISavedRespons {
	['username']: ISavedData[];
}

export interface ISavedSet {
	id: string | number;
	type: string;
	name: string;
	data: MortgageData[] | any; //Потом добавить новые
	initial: MortgageInput;
}

export interface NewsAdapter {
	LoadingStatus: 'idle' | 'loading' | 'error' | 'success';
	entities: {};
	ids: [];
	errorMassage: string;
	type: TNewsCategory;
}

export interface INewsRespons {
	status: string;
	totalResults: number;
	results: INews[];
	nextPage: string;
}

export interface INews {
	article_id: string;
	title: string;
	link: string;
	keywords: null | string;
	creator: null | string;
	video_url: null | string;
	description: string;
	content: string;
	pubDate: string;
	image_url: null | string;
	source_id: null | string;
	source_priority: string;
	country: string[];
	category: string[];
	language: string;
}

export type TNewsCategory = 'business' | 'technology' | 'top';

export interface INewsError {
	status: string;
	results: { message: string; code: string };
}
