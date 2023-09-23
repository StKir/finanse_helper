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
