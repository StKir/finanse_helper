import { Dispatch } from 'react';
import { MortgageData } from './mortgage.interface';
import { IUserStorePayload, TAuthModalType } from './store.interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
import { NoticeType } from 'antd/es/message/interface';
import { InvestmentData } from './deposit.inteface';

export interface PaymentDataExcelExporterProps {
	paymentData: MortgageData[];
	name?: string;
}

export interface INewService {
	title: string;
	description: string;
	link: string;
}

export interface DepostDataExcekExporterProps {
	paymentData: InvestmentData[];
	name?: string;
}

export interface TColums {
	title: string;
	dataIndex: string;
	key: string;
}

export interface IMessageProps {
	type: NoticeType;
	content: string;
}

export interface ITable {
	paymentData: MortgageData[] | InvestmentData[];
	columns: TColums[];
}

export interface IAuthProps {
	isOpen: boolean;
}

export interface IPropsDispathc {
	dispathc: Dispatch<
		PayloadAction<TAuthModalType | IUserStorePayload | boolean>
	>;
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
	email: string;
}

export type TModalType = 'reg' | 'log';
