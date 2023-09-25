import { Dispatch, SetStateAction } from 'react';
import { MortgageData } from './mortgage.interface';

export interface TColums {
	title: string;
	dataIndex: string;
	key: string;
}

export interface ITable {
	paymentData: MortgageData[];
	columns: TColums[];
}

export interface IAuthProps {
	isOpen: boolean;
	setOpen: (arg: boolean) => void;
}

export interface IAuthType {
	setAuthType: Dispatch<SetStateAction<TModalType>>;
}

export interface IRegistrationFormData {
	confirm: string;
	email: string;
	name: string;
	password: string;
	username: string;
}

export type TodoPreview = Omit<IRegistrationFormData, 'confirm'>;

export interface IAuthorizationFormData {
	password: string;
	remember: boolean;
	username: string;
}

export type TModalType = 'reg' | 'log';
