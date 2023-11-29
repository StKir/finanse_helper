import { Button, Result } from 'antd';
import React, { FC } from 'react';

type TError = {
	code?: number;
	massage?: string;
};

const Error: FC<TError> = ({ massage = '', code = 0 }: TError) => {
	return (
		<div>
			<Result
				status='error'
				title={massage ? massage : 'Неизвестная ошибка'}
				subTitle={code ? <span>Код: {code}</span> : ''}
				style={{
					padding: 10
				}}
				extra={[
					<Button type='primary' key='console' href='https://t.me/OG_Kurasaki'>
						Написать разработчику
					</Button>
				]}
			></Result>
		</div>
	);
};

export default Error;
