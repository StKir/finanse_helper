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
